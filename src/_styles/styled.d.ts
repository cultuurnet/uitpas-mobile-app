/* eslint-disable @typescript-eslint/no-empty-object-type */
import { Theme } from './theme';

declare module 'styled-components/native' {
  export interface DefaultTheme extends Theme {}
}
