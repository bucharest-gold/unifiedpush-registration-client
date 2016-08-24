'use strict';

const test = require('tape');
const adminClient = require('../../');

test('test client should return a promise with the client object', (t) => {
  let baseUrl = 'http://127.0.0.1:8080/ag-push';

  const upsClient = adminClient(baseUrl);
  t.equal(upsClient instanceof Promise, true, 'should return a Promise');

  upsClient.then((client) => {
    t.equal(typeof client.baseUrl, 'string', 'client should contain a baseUrl String');
    t.equal(client.baseUrl, 'http://127.0.0.1:8080/ag-push', 'client should have a base url property');
    t.end();
  });
});
