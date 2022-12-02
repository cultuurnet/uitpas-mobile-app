import { Config } from 'react-native-config';

const environments = ['beta', 'production'] as const;

const NODE_ENV = Config.NODE_ENV.toLocaleLowerCase() as ConfigEnvironment;

export type ConfigEnvironment = typeof environments[number];
export const ConfigEnvironment = environments.includes(NODE_ENV) ? NODE_ENV : 'production';
