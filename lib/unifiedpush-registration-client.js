'use strict';

const registry = require('./registry');

function unifiedPushRegistrationClient(baseUrl) {
    const client = {
        registry: {}
    };

    client.baseUrl = baseUrl;

    for (let func in registry) {
        client.registry[func] = registry[func](client);
    }

    return Promise.resolve(client);
}

module.exports = unifiedPushRegistrationClient;
