'use strict';

const test = require('tape');
const fs = require('fs');
const registrationClient = require('../../');
const adminClient = require('unifiedpush-admin-client');

const importerFileLocation =  __dirname + '/../../build/importer-test.json';

const baseUrl = 'http://localhost:8082/ag-push';


// First need to setup a Push Application and Variant(we will use Android for the test);
const setup = () => {
    const admingSettings = {
        username: 'admin',
        password: 'admin',
        kcUrl: 'http://localhost:8080/auth',
        kcRealmName: 'master'
    };

    return adminClient(baseUrl, admingSettings)
        .then((client) => {
            return client.applications.create({name: 'For Android Variant'}).then((application) => {
                const variantOptions = {
                    pushAppId: application.pushApplicationID,
                    name: 'Android Variant',
                    type: 'android',
                    android: {
                        googleKey: 'abcd-1234',
                        'projectNumber': '1234567'
                    }
                };

                return client.variants.create(variantOptions).then((variant) => {
                    variant.pushAppId = application.pushApplicationID;
                    return variant;
                });
            });
        });
};

const remove = (pushAppId) => {
    const admingSettings = {
        username: 'admin',
        password: 'admin',
        kcUrl: 'http://localhost:8080/auth',
        kcRealmName: 'master'
    };

    return adminClient(baseUrl, admingSettings).then((client) => {
        return client.applications.remove(pushAppId);
    });
};


test('Register Device - sucess', (t) => {
    const deviceOptions ={
        deviceToken: 'c8apwu2iJvc:APA91bGRBqDHCl15jqyjDVyHk8irqz8pyiLR0QHYSqRdNF844SlmlrwRZ2vuek56_lcfBeXCxeExP51reF7ESVnygE6Y6qpxrkBur2d5-aC6QcfaRFuPP6qbQmO93e4YhpmD3HalExL6',
        alias: 'Android Thing'
    };
    // Once we have all the setup,  Register
    setup().then((variant) => {
        return registrationClient(baseUrl).then((client) => {
            const settings = {
                variantId: variant.variantID,
                secret: variant.secret
            };

            t.equals(typeof client.registry.registerDevice, 'function', 'should have the registerDevice function');

            return client.registry.registerDevice(settings, deviceOptions).then((device) => {
                t.equal(device.deviceToken, deviceOptions.deviceToken, 'deviceTokens should be the same');
                t.equal(device.alias, deviceOptions.alias, 'alias should be the same');

                remove(variant.pushAppId);
                t.end();
            });
        });
    });
});

test('Register Device - fail on missing deviceToken', (t) => {
    const deviceOptions ={
        alias: 'Android Thing'
    };
    // Once we have all the setup,  Register
    setup().then((variant) => {
        return registrationClient(baseUrl).then((client) => {
            const settings = {
                variantId: variant.variantID,
                secret: variant.secret
            };

            t.equals(typeof client.registry.registerDevice, 'function', 'should have the registerDevice function');

            return client.registry.registerDevice(settings, deviceOptions).catch((err) => {
                t.equal(err, 'Bad Request', 'should be a bad request error');
                remove(variant.pushAppId);
                t.end();
            });
        });
    });
});

test('unRegister Device - sucess', (t) => {
    const deviceOptions ={
        deviceToken: 'c8apwu2iJvc:APA91bGRBqDHCl15jqyjDVyHk8irqz8pyiLR0QHYSqRdNF844SlmlrwRZ2vuek56_lcfBeXCxeExP51reF7ESVnygE6Y6qpxrkBur2d5-aC6QcfaRFuPP6qbQmO93e4YhpmD3HalExL6',
        alias: 'Android Thing'
    };
    // Once we have all the setup,  Register
    setup().then((variant) => {
        return registrationClient(baseUrl).then((client) => {
            const settings = {
                variantId: variant.variantID,
                secret: variant.secret
            };

            t.equals(typeof client.registry.unregisterDevice, 'function', 'should have the unregisterDevice function');

            // Just need to register a device first
            return client.registry.registerDevice(settings, deviceOptions).then((device) => {
                return device;
            }).then((device) => {
                settings.deviceToken = device.deviceToken;
                return client.registry.unregisterDevice(settings);
            }).then(() => {
                remove(variant.pushAppId);
                t.end();
            });
        });
    });
});

test('unRegister Device - fail', (t) => {
    const deviceOptions ={
        deviceToken: 'c8apwu2iJvc:APA91bGRBqDHCl15jqyjDVyHk8irqz8pyiLR0QHYSqRdNF844SlmlrwRZ2vuek56_lcfBeXCxeExP51reF7ESVnygE6Y6qpxrkBur2d5-aC6QcfaRFuPP6qbQmO93e4YhpmD3HalExL6',
        alias: 'Android Thing'
    };
    // Once we have all the setup,  Register
    setup().then((variant) => {
        return registrationClient(baseUrl).then((client) => {
            const settings = {
                variantId: variant.variantID,
                secret: variant.secret
            };

            t.equals(typeof client.registry.unregisterDevice, 'function', 'should have the unregisterDevice function');

            // Just need to register a device first
            return client.registry.registerDevice(settings, deviceOptions).then((device) => {
                return device;
            }).then((device) => {
                settings.deviceToken = 'WRONG_TOKEN';
                return client.registry.unregisterDevice(settings);
            }).catch((err) => {
                t.pass('should fail');
                remove(variant.pushAppId);
                t.end();
            });
        });
    });
});

test('test importer - file as a string- success', (t) => {
    // Once we have all the setup,  Register
    setup().then((variant) => {
        return registrationClient(baseUrl).then((client) => {
            const settings = {
                variantId: variant.variantID,
                secret: variant.secret
            };

            t.equals(typeof client.registry.importer, 'function', 'should have the importer function');

            // Just need to register a device first
            return client.registry.importer(settings, importerFileLocation).then(() => {
                remove(variant.pushAppId);
                t.end();
            });
        });
    });
});

test('test importer - file as a object- success', (t) => {
    // Once we have all the setup,  Register
    setup().then((variant) => {
        return registrationClient(baseUrl).then((client) => {
            const settings = {
                variantId: variant.variantID,
                secret: variant.secret
            };

            t.equals(typeof client.registry.importer, 'function', 'should have the importer function');


            const devices = require(importerFileLocation);
            // Just need to register a device first
            return client.registry.importer(settings, devices).then(() => {
                remove(variant.pushAppId);
                t.end();
            });
        });
    });
});


test('test importer - file as a readStream- success', (t) => {
    // Once we have all the setup,  Register
    setup().then((variant) => {
        return registrationClient(baseUrl).then((client) => {
            const settings = {
                variantId: variant.variantID,
                secret: variant.secret
            };

            t.equals(typeof client.registry.importer, 'function', 'should have the importer function');

            // Just need to register a device first
            return client.registry.importer(settings, fs.createReadStream(importerFileLocation)).then(() => {
                remove(variant.pushAppId);
                t.end();
            });
        });
    });
});

test('test importer - file as a string- failure', (t) => {
    // Once we have all the setup,  Register
    setup().then((variant) => {
        return registrationClient(baseUrl).then((client) => {
            const settings = {
                variantId: variant.variantID,
                secret: variant.secret + '1'
            };

            t.equals(typeof client.registry.importer, 'function', 'should have the importer function');

            // Just need to register a device first
            return client.registry.importer(settings, importerFileLocation).catch((err) => {
                t.pass('should fail');
                remove(variant.pushAppId);
                t.end();
            });
        });
    });
});
