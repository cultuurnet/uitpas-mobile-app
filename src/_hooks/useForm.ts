import { useEffect, useState } from 'react';

import { TApiError, TValidationError } from '../_http';
import i18n from '../_translations/i18n';
import { TValidatorResponse } from '../_utils/formValidation';
import { deepCopy, isEmptyObject } from '../_utils/objectHelpers';
import { useToggle } from './useToggle';

/**
 * FormValidationErrors type explanation:
 * 1. We check to see if the value of property Key is a primitive, if it is, we just require a validator response (TValidatorResponse).
 * 2. We check if the value of property Key is an array, if it is, we proceed to 3, else to 5
 * 3. We check if the Type of the element of the array, using infer, is a Primitive.
 *    If the value is not a Primitive, proceed to 4, otherwise, we just require a list of validator responses (TValidatorResponse[]).
 * 4. If the Array is not a primitive, we use the type we extracted with infer and require an array of FormValidationErrors<InferredArrayType>.
 * 5. If the array is not a primitive, and not an array, it's an object, so we just recursively use FormValidationErrors with the given type.
 */
type TPrimitive = string | number | boolean;
export type TFormValidationErrors<TForm = Record<string, unknown>> = {
  [Key in keyof TForm]?: TForm[Key] extends TPrimitive // 1.
    ? TValidatorResponse
    : TForm[Key] extends Array<infer TArray> // 2.
    ? TArray extends TPrimitive // 3.
      ? TValidatorResponse[]
      : Array<TFormValidationErrors<TArray>> // 4
    : TFormValidationErrors<TForm[Key]>; // 5
};

export type TSubmitFormFunction<TForm> = (values: TForm, setFormValues: (values: TForm) => void) => void;
type TValidateFormFunction<TForm, TFormErrors> = (values: TForm) => TFormValidationErrors<TFormErrors>;

type TParams<TForm, TFormErrors> = {
  error?: TApiError;
  initialForm: TForm;
  submitForm: TSubmitFormFunction<TForm>;
  validateForm: TValidateFormFunction<TForm, TFormErrors>;
};

type TResponse<TForm, TFormErrors> = {
  hasValidationErrors: boolean;
  isDirty: boolean;
  setAttribute: (value: unknown, name: string) => void;
  setValues: (setter: (values: TForm) => void) => void;
  submit: () => boolean;
  submitWithParams: (params: Partial<TParams<TForm, TFormErrors>>) => boolean;
  validationErrors: TFormValidationErrors<TFormErrors>;
  values: TForm;
};

export type TFormHook<TForm, TFormErrors = TForm> = TResponse<TForm, TFormErrors>;

function mapToFormValidationErrors<TForm>(error: TApiError): TFormValidationErrors<TForm> {
  const mapError = (validationError: TValidationError) => {
    if (validationError.children.length > 0) {
      return validationError.children.reduce((acc, child) => ({ ...acc, [child.property]: { ...mapError(child) } }), {});
    }
    let message: string = i18n.t('ERRORS.VALIDATION.INVALID');
    if (validationError.constraints?.isNotEmpty) message = i18n.t('ERRORS.VALIDATION.REQUIRED');
    return { isValid: false, message };
  };
  return Object.keys(error.validationErrors).reduce((acc, key) => {
    return { ...acc, [key]: { ...mapError(error.validationErrors[key]) } };
  }, {});
}

function isValidatorResponse(object: unknown): object is TValidatorResponse {
  return Object.keys(object).includes('isValid');
}

function trimObjectProperties(objectToTrim) {
  for (const key in objectToTrim) {
    if (objectToTrim[key].constructor && objectToTrim[key].constructor == Object) trimObjectProperties(objectToTrim[key]);
    else if (objectToTrim[key].trim) objectToTrim[key] = objectToTrim[key].trim();
  }
}

export function hasValidationErrors(errors: TFormValidationErrors): boolean {
  if (isEmptyObject(errors)) return false;
  if (Array.isArray(errors)) return errors.some(hasValidationErrors);
  if (typeof errors === 'object') {
    if (isValidatorResponse(errors)) return !errors.isValid;
    return Object.keys(errors).some(key => hasValidationErrors(errors[key]));
  }
  return false;
}

export function useForm<TForm, TFormErrors = TForm>(params: TParams<TForm, TFormErrors>): TResponse<TForm, TFormErrors> {
  const { error, initialForm, submitForm, validateForm } = params;
  const [values, setFormValues] = useState<TForm>(initialForm);
  const [validationErrors, setValidationErrors] = useState<TFormValidationErrors<TFormErrors>>({});
  const [isDirty, setIsDirty] = useToggle(false);

  const submit = (
    submitFunction: TSubmitFormFunction<TForm> = submitForm,
    validateFunction: TValidateFormFunction<TForm, TFormErrors> = validateForm,
  ): boolean => {
    trimObjectProperties(values);

    const errors = validateFunction(values);
    const hasErrors = hasValidationErrors(errors);
    if (!hasErrors) {
      submitFunction(values, setFormValues);
      setIsDirty(false);
    }
    setValidationErrors(errors);
    return !hasErrors;
  };

  /**
   * In some cases, you want to use a different submit / validate function than the default one.
   */
  const submitWithParams = (params: Partial<TParams<TForm, TFormErrors>>): boolean =>
    submit(params.submitForm, params.validateForm);

  /**
   * Use this function if the (simple) name of the field matches the name within the form.
   * Do not use it when the field is an array or (part of) a nested object. Use 'setValues' instead.
   *
   * The name of the input field should be equal to the simple property name within the form.
   * E.g. By using this function with '<Input name='title' />', the new value will be set on 'values.title'.
   */
  const setAttribute = (value: unknown, name: string) => {
    setFormValues({ ...values, [name]: value });
    setIsDirty(true);
  };

  /**
   * Use this function if you cannot change the value with 'setAttribute' because it is (part of) a nested object or an array.
   * If it is a simple value, we recommend to use 'setAttribute' for performance reasons.
   *
   * The name of the input field is not used to set any value here, as the value is set directly in the values
   */
  const setValues = (setter: (values: TForm) => void) => {
    const newValues = deepCopy(values);
    setter(newValues);
    setFormValues(newValues);
    setIsDirty(true);
  };

  const clearValues = () => setFormValues(initialForm);

  // Map server errors to form validation errors
  useEffect(() => {
    if (error?.validationErrors) {
      setValidationErrors(mapToFormValidationErrors(error));
    }
  }, [error]);

  useEffect(() => {
    setFormValues(initialForm);
    setIsDirty(false);
    // Clear all if the component unmounts
    return () => {
      clearValues();
      setValidationErrors({});
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return {
    hasValidationErrors: hasValidationErrors(validationErrors),
    isDirty,
    setAttribute,
    setValues,
    submit,
    submitWithParams,
    validationErrors,
    values,
  };
}
