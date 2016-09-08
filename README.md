# Unified Push Registration Client

[![Coverage Status](https://coveralls.io/repos/github/bucharest-gold/unifiedpush-registration-client/badge.svg?branch=master)](https://coveralls.io/github/bucharest-gold/unifiedpush-registration-client?branch=master)
[![Build Status](https://travis-ci.org/bucharest-gold/unifiedpush-registration-client.svg?branch=master)](https://travis-ci.org/bucharest-gold/unifiedpush-registration-client) 
[![Known Vulnerabilities](https://snyk.io/test/npm/unifiedpush-registration-client/badge.svg)](https://snyk.io/test/npm/unifiedpush-registration-client) 
[![dependencies Status](https://david-dm.org/bucharest-gold/unifiedpush-registration-client/status.svg)](https://david-dm.org/bucharest-gold/unifiedpush-registration-client)

[![NPM](https://nodei.co/npm/unifiedpush-registration-client.png)](https://npmjs.org/package/unifiedpush-registration-client)

A client for registering Devices to the AeroGear UnifiedPush - https://aerogear.org/docs/specs/aerogear-unifiedpush-rest/#home

|                 | Project Info  |
| --------------- | ------------- |
| License:        | Apache-2.0  |
| Build:          | make  |
| Documentation:  | http://bucharest-gold.github.io/unifiedpush-registration-client/  |
| Issue tracker:  | https://github.com/bucharest-gold/unifiedpush-registration-client/issues  |
| Engines:        | Node.js 4.x, 5.x, 6.x

## Installation

`npm install unifiedpush-registration-client -S`

## Usage

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


### Importer

There is also a `importer` function that allows mass device registration.

Along with the settings object, you also need to pass it a list of devices.

This list of devices must be an array and can be passed in as a .json file or a JSON object

## Contributing

Please read the [contributing guide](./CONTRIBUTING.md)
