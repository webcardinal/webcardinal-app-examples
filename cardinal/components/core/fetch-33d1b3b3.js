import { A as ActiveRouter } from './active-router-f528d396.js';
import './match-path-760e1797.js';

function injectHistory(Component) {
    ActiveRouter.injectProps(Component, ['history', 'location']);
}

function executeFetch(url, options) {
    // check if we need to add the BASE_URL to the prefix of the url
    const isBaseUrlSet = window['$$'] && $$.SSAPP_CONTEXT && $$.SSAPP_CONTEXT.BASE_URL && $$.SSAPP_CONTEXT.SEED && url.indexOf($$.SSAPP_CONTEXT.BASE_URL) !== 0;
    if (isBaseUrlSet && url.indexOf("data:image") !== 0) {
        // BASE_URL ends with / so make sure that url doesn't already start with /
        url = `${$$.SSAPP_CONTEXT.BASE_URL}${url.indexOf("/") === 0 ? url.substr(1) : url}`;
    }

    return fetch(url, options);
}

export { executeFetch as e, injectHistory as i };
