'use strict';

const request = require('request');
const fs = require('fs');

/**
* @module registry
*/

module.exports = {
    registerDevice: registerDevice,
    unregisterDevice: unregisterDevice,
    importer: importer
};

/**
  A function to register a device to the UnifiedPush Server
  @param {object} settings - An settings object
  @param {string} settings.variantId - The id of the variant - used for authentication and variant lookup
  @param {string} settings.secret - The variant secret - used for authentication
  **Device Options**
  These are metadata for each Device.  The Device Token is the only required thing
  @param {object} deviceOptions - a deviceOptions object
  @param {string} deviceOptions.deviceToken - unique string to identify an Installation with its PushNetwork
  @param {string} [deviceOptions.alias] - string to map the Installation to an actual user.
  @param {boolean} [deviceOptions.enabled] - Flag if the actual client installation is enabled (default) or not.
  @param {string} [deviceOptions.platform] - the name of the platform. FOR ADMIN UI ONLY - Helps with setting up Routes
  @param {string} [deviceOptions.deviceType] - the type of the registered device
  @param {string} [deviceOptions.operatingSystem] - the name of the Operating System.
  @param {string} [deviceOptions.osVersion] - the version string of the mobile OS.
  @params {Array} [deviceOptions.categories] - set of all categories the client is in
  @returns {Promise} A promise that will resolve with the device options registered
  @example
  registrationClient(baseUrl)
    .then((client) => {
      client.registry.registerDevice(settings, deviceOptions)
        .then((device) => {
        console.log(device) // {...}
      });
    });
 */
function registerDevice (client) {
    return function registerDevice (settings, deviceOptions) {
        return new Promise((resolve, reject) => {
            settings = settings || {};
            const req = {
                url: `${client.baseUrl}/rest/registry/device/`,
                method: 'POST',
                body: deviceOptions,
                json: true,
                auth: {
                    user: settings.variantId,
                    pass: settings.secret
                }
            };

            request(req, (err, response, body) => {
                if (err) {
                    return reject(err);
                }

                if (response.statusCode !== 200) {
                    return reject(response.statusMessage);
                }

                return resolve(body);
            });
        });
    };
}

/**
  A function to unregister a device to the UnifiedPush Server
  @param {object} settings - An settings object
  @param {string} settings.variantId - The id of the variant - used for authentication and variant lookup
  @param {string} settings.secret - The variant secret - used for authentication
  @param {string} settings.deviceToken - unique string to identify an Installation with its PushNetwork
  @returns {Promise} A promise that will resolve
  @example
  registrationClient(baseUrl)
    .then((client) => {
      client.registry.unregisterDevice(settings)
        .then(() => {
        console.log('success');
      });
    });
 */
function unregisterDevice (client) {
    return function unregisterDevice (settings) {
        return new Promise((resolve, reject) => {
            settings = settings || {};
            const req = {
                url: `${client.baseUrl}/rest/registry/device/${settings.deviceToken}`,
                method: 'DELETE',
                json: true,
                auth: {
                    user: settings.variantId,
                    pass: settings.secret
                }
            };

            request(req, (err, response, body) => {
                if (err) {
                    return reject(err);
                }

                if (response.statusCode !== 204) {
                    return reject(body);
                }

                return resolve(body);
            });
        });
    };
}

/**
  A function for uploading a JSON file to allow massive device registration (aka import)
  @param {object} settings - An settings object
  @param {string} settings.variantId - The id of the variant - used for authentication and variant lookup
  @param {string} settings.secret - The variant secret - used for authentication
  @param {Array|Stream|String} devices - This is the list of Devices to upload.
  @returns {Promise} A promise that will resolve
  @example
  registrationClient(baseUrl)
    .then((client) => {
      client.registry.importer(settings, devices)
        .then(() => {
        console.log('success');
      });
    });
 */
function importer (client) {
    return function importer (settings, devices) {
        return new Promise((resolve, reject) => {
            settings = settings || {};
            const req = {
                url: `${client.baseUrl}/rest/registry/device/importer`,
                method: 'POST',
                json: true,
                auth: {
                    user: settings.variantId,
                    pass: settings.secret
                }
            };

            const formData = {};
            if (typeof devices === 'string') {
              formData.file = fs.createReadStream('./build/importer-test.json');
            } else if (devices instanceof require('stream').Readable) {
              formData.file = devices;
            } else {
              formData.file = JSON.stringify(devices);
            }

            req.formData = formData;

            request(req, (err, response, body) => {
                if (err) {
                    return reject(err);
                }

                if (response.statusCode !== 200) {
                    return reject(body);
                }

                return resolve(body);
            });
        });
    };
}
