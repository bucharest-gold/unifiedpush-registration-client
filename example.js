'use strict';

const registrationClient = require('./');

const baseUrl = 'http://localhost:8082/ag-push';

registrationClient(baseUrl).then((client) => {
    const settings = {
        variantId: 'c82e79c0-1c26-45dc-b482-8f75ce35510d',
        secret: '9a2906ee-95da-45d6-8fdb-643b2d0f9a43'
    };

    const deviceOptions ={
        deviceToken: 'c8apwu2iJvc:APA91bGRBqDHCl15jqyjDVyHk8irqz8pyiLR0QHYSqRdNF844SlmlrwRZ2vuek56_lcfBeXCxeExP51reF7ESVnygE6Y6qpxrkBur2d5-aC6QcfaRFuPP6qbQmO93e4YhpmD3HalExL6',
        alias: 'android node'
    };

    return client.registry.registerDevice(settings, deviceOptions).then((deviceRegistration) => {
        console.log(deviceRegistration);
    });
}).catch((err) => {
    console.log('error', err);
});
