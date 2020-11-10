'use strict';

const auth = require('../ya/auth');
const getDevice = require('./getDevice');
const getScenario = require('./getScenario');
const getToken = require('./getToken');
const got = require('../../utils/request/got');
const {android} = require('../../const/ua');

/**
 * @param {object} opts
 * @param {string} opts.login
 * @param {string} opts.password
 * @param {string} opts.deviceName
 * @param {string} opts.scenarioName
 * @param {'phrase_action'|'text_action'} opts.instance
 * @param {string} opts.value
 * @returns {Array}
 */
module.exports = async opts => {
    let [cookie, token, scenario, device] = await Promise.all([
        auth(opts),
        getToken(opts),
        getScenario(opts),
        getDevice(opts),
    ]);

    const requestOpts = {
        headers: {
            'x-csrf-token': token,
            'user-agent': android.pp,
            cookie,
        },
        json: {
            name: opts.scenarioName,
            icon: 'ball',
            trigger_type: 'scenario.trigger.voice',
            devices: [
                {
                    id: device.id,
                    capabilities: [
                        {
                            type: 'devices.capabilities.quasar.server_action',
                            state: {
                                instance: opts.instance,
                                value: opts.value,
                            },
                        },
                    ],
                },
            ],
            requested_speaker_capabilities: [],
        },
    };

    if (scenario) {
        await got(`https://iot.quasar.yandex.ru/m/user/scenarios/${scenario.id}`, {
            method: 'PUT',
            ...requestOpts,
        });
    } else {
        await got('https://iot.quasar.yandex.ru/m/user/scenarios/', {
            method: 'POST',
            ...requestOpts,
        });

        scenario = await getScenario(opts, '0m');
    }

    await got(`https://iot.quasar.yandex.ru/m/user/scenarios/${scenario.id}/actions`, {
        method: 'POST',
        headers: {
            'x-csrf-token': token,
            'user-agent': android.pp,
            cookie,
        },
    });
};
