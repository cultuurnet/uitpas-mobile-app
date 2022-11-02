import React, { useState } from 'react';
import { Trans, useTranslation } from 'react-i18next';
import { ScrollView, View } from 'react-native';

import { Button, ErrorMessage, Icon, InputField, Text } from '../_components';
import { InputWrapper } from '../_components/input/InputWrapper';

import { styles } from './Home.styles';

const Home = () => {
  const [text, setText] = useState<string>();
  const [imgLink, setImgLink] = useState<string>(
    'https://images.unsplash.com/photo-153497002876-38ce47ef7d8d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2264&q=80',
  );
  const { t } = useTranslation();

  return (
    <ScrollView contentContainerStyle={styles.scrollContainer} contentInsetAdjustmentBehavior="automatic">
      <Text size={20} weight="bold">
        {t('TITLE')}
      </Text>
      <Text color="orange">{t('EXAMPLE.SINGLE_VARIABLE', { variable: '1' })}</Text>
      <Text color="primary" weight="light">
        {t('EXAMPLE.MULTIPLE_VARIABLES', { variable_1: 1, variable_2: '2' })}
      </Text>
      <Trans components={{ bold: <Text size={12} weight="bold" /> }} i18nKey="EXAMPLE.HTML" parent={Text} />
      <Trans
        components={{ bold: <Text color="errorText" weight="light" /> }}
        i18nKey="EXAMPLE.HTML_VARIABLE"
        parent={Text}
        values={{ variable: 'here' }}
      />

      <View style={styles.section}>
        <Text weight="bold">Inputs</Text>
        <InputWrapper label="Test" labelIcon="Home" required>
          <Text>This is an input wrapper.</Text>
        </InputWrapper>
        <InputField label="firstName" name="firstName" onChange={value => setText(value)} value={text} />
        <InputField
          label="lastName"
          name="lastName"
          onChange={value => setText(value)}
          validation={{ isValid: false, message: 'Somethings missing' }}
          value={text}
        />
      </View>

      <View style={styles.section}>
        <Text weight="bold">Buttons</Text>
        <Button onPress={() => {}} style={styles.button}>
          This is a Button!
        </Button>
        <Button
          icon="Home"
          mode="contained"
          onPress={() => {
            setImgLink(
              'https://images.unsplash.com/photo-1534970028765-38ce47ef7d8d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2264&q=80',
            );
          }}
          style={styles.button}
        >
          Press me!
        </Button>
        <Button loading mode="outlined" onPress={() => {}} style={styles.button}>
          Loading...
        </Button>
        <View style={styles.row}>
          <Button disabled mode="outlined" onPress={() => {}}>
            Disabled
          </Button>
          <Button mode="contained" onPress={() => {}} style={styles.rowItem}>
            Saving
          </Button>
          <Button color="errorText" mode="outlined" onPress={() => {}} style={styles.rowItem}>
            Cancel
          </Button>
        </View>
      </View>

      <View style={styles.section}>
        <Text weight="bold">Icons</Text>
        <View style={styles.row}>
          <Icon borderless={true} color="primary" name="ArrowLeft" onPress={() => {}} />
          <Icon color="errorText" name="Home" size="small" style={styles.rowItem} />
          <Icon color="primary" name="User" style={styles.rowItem} />
        </View>
      </View>

      <View style={styles.section}>
        <Text weight="bold">Error messages</Text>
        <ErrorMessage isVisible>This is an error.</ErrorMessage>
        <ErrorMessage isGlobal isVisible>
          This is a global error.
        </ErrorMessage>
      </View>
    </ScrollView>
  );
};

export default Home;
