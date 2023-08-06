import React from 'react';
import { isDevEnv } from './constants.util';

async function reportAccessibility(
  App: typeof React,
  config?: Record<string, unknown>,
): Promise<void> {
  if (isDevEnv) {
    const axe = await import('@axe-core/react');
    const ReactDOM = await import('react-dom');

    axe.default(App, ReactDOM, 1000, config).catch(() => {});
  }
}

export default reportAccessibility;
