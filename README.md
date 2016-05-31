[![Build Status](https://travis-ci.org/bucharest-gold/unifiedpush-registration-client.svg?branch=master)](https://travis-ci.org/bucharest-gold/unifiedpush-registration-client)
[![Coverage Status](https://coveralls.io/repos/github/bucharest-gold/unifiedpush-registration-client/badge.svg?branch=master)](https://coveralls.io/github/bucharest-gold/unifiedpush-registration-client?branch=master)

## Unified Push Registration Client

A client for registering Devices to the AeroGear UnifiedPush - https://aerogear.org/docs/specs/aerogear-unifiedpush-rest/#home


## API Documentation

http://bucharest-gold.github.io/unifiedpush-registration-client/


## Example

    'use strict';

    const registrationClient = require('unifiedpush-registration-client');

    const baseUrl = 'http://127.0.0.1:8080/ag-push';

    const settings = {
        variantId: 'SOME_VARIANT_ID',
        secret: 'VARIANT_SECRET'
    };

    const deviceOptions = {
        deviceToken: 'SOME_VALID_DEVICE_TOKEN',
        alias: 'thing'
    }

    registrationClient(baseUrl)
      .then((client) => {
        return client.registry.registerDevice(deviceOptions)
          .then((deviceRegistration) => {
            console.log('deviceRegistration', deviceRegistration);
          });
      })
      .catch((err) => {
        console.log('Error', err);
      });
