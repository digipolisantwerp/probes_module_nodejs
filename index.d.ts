/// <reference types="typescript" />
import { RequestHandler } from 'express';

type ProbesHookFn = () => Promise<void>;

interface ProbesConfig {
  hooks?: {
    ready?: ProbesHookFn[];
    alive?: ProbesHookFn[];
  };
}

export default function probes(config?: ProbesConfig): RequestHandler;
