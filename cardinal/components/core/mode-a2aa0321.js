import { s as setMode } from './index-f6e31a6c.js';

const appGlobalScript = () => setMode(element => {
  return element.mode || element.getAttribute('mode') || 'default';
});

export { appGlobalScript as a };
