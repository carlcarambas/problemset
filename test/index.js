const doAsync = require('../index').doAsync;
const assert = require('assert');

describe(`doAsync function`, function () {
    it(`should fail if the input is not an array`, async function () {
        const result = await doAsync('not array')
        assert.equal(result, 'Input should be an array')
    });

    it(`should fail if the input is not a string array`, async function () {
        const result = await doAsync([2])
        assert.equal(result, 'Input should only be array of strings')
    });
});