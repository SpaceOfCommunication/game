// This file can be replaced during build by using the `fileReplacements` array.
// When building for production, this file is replaced with `environment.prod.ts`.

export interface Environment {
  production: boolean;
  apiPath: string;
  pouchURL: string;
}

export const environment: Environment = {
  production: false,
  apiPath: '/api',
  pouchURL: 'http://localhost:5984'
};
