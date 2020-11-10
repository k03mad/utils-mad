'use strict';

const delay = require('../../utils/promise/delay');
const {mikrotik} = require('../../../env');
const {RouterOSAPI} = require('node-routeros');

/**
 * @param {string|Array} cmd
 * @param {object} router
 * @returns {Promise<Array>}
 */
module.exports = async (cmd, router = mikrotik) => {
    const tries = 3;

    let client, error, res;

    try {
        const api = new RouterOSAPI(router);
        client = await api.connect();

        const response = [];
        const send = [];

        if (typeof cmd === 'string') {
            send.push([cmd]);
        } else if (Array.isArray(cmd) && typeof cmd[0] === 'string') {
            send.push(cmd);
        } else if (Array.isArray(cmd) && Array.isArray(cmd[0])) {
            send.push(...cmd);
        }

        for (const elem of send) {
            for (let i = 1; i <= tries; i++) {
                try {
                    const data = await client.write(elem);
                    response.push(data);
                    break;
                } catch (err) {
                    if (i === tries) {
                        throw err;
                    } else {
                        await delay();
                    }
                }
            }
        }

        res = response;
    } catch (err) {
        error = err;
    }

    try {
        await client.close();
    } catch {}

    if (res) {
        if (res.length === 1) {
            return res.flat();
        }

        return res;
    }

    throw error;
};
