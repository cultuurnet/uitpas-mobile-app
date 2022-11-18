import { Config } from 'react-native-config';

const environments = ['beta', 'production'] as const;

const NODE_ENV = Config.NODE_ENV.toLocaleLowerCase() as TConfigEnvironment;

export type TConfigEnvironment = typeof environments[number];
export const TConfigEnvironment = environments.includes(NODE_ENV) ? NODE_ENV : 'production';
