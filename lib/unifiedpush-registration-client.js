'use strict';

/**
* @module unified-push-registration-client
*/

const registry = require('./registry');

/**
  Creates a new UnifiedPush Registration Client
  @param {string} baseUrl - The baseurl for the AeroGear UnifiedPush server - ex: http://localhost:8080/ag-push,
  @returns {Promise} A promise that will resolve with the client object.
  @instance
  @example

  const registrationClient = require('unifiedpush-registration-client')
  const baseUrl: 'http://127.0.0.1:8080/ag-push',

  registrationClient(baseUrl)
    .then((client) => {
      client....
      ...
      ...
    })
 */
function unifiedPushRegistrationClient (baseUrl) {
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
