/// <reference types="node" />
declare module '@digipolis/probes' {
  import { RequestHandler } from 'express';
  export type ProbesHookFn = () => Promise<any>;

  export interface ProbesConfig {
    hooks?: {
      ready?: ProbesHookFn[];
      alive?: ProbesHookFn[];
    };
  }

  function probes(config?: ProbesConfig): RequestHandler;

  export = probes;
}