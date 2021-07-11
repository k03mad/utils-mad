'use strict';

const convert = require('../../utils/array/convert');
const diff = require('../../utils/date/diff');
const hasha = require('hasha');
const ms = require('ms');
const notify = require('./notify');
const path = require('path');
const {promises: fs} = require('fs');
const {tcpPingPort} = require('tcp-ping-port');

/**
 * @param {object | Array<object>} checks
 * @param {object} opts
 * @param {string} opts.folder
 * @param {string} opts.token
 */
module.exports = async (checks, {
    folder = './.pinger',
    token,
} = {}) => {
    await fs.mkdir(folder, {recursive: true});
    await fs.writeFile(path.join(folder, '.gitignore'), '*');

    await Promise.all(convert(checks).map(async ({domain, port}) => {
        const ping = await tcpPingPort(domain, port);

        let previousCheck;

        try {
            const savedData = await fs.readFile(path.join(folder, `${hasha(domain + port)}.json`));
            previousCheck = JSON.parse(savedData);
        } catch {}

        if (previousCheck?.online !== ping.online) {
            const status = ping.online ? 'UP' : 'DOWN';
            const text = [
                `\`${status}\` `,
                ping.host,
                ping.port ? `:${ping.port}` : '',
                ping.ip ? ` (${ping.ip})` : '',
            ];

            if (previousCheck) {
                const prettyDiff = ms(diff({date: previousCheck.time, period: 'milliseconds'}));
                text.push(`\n_${prettyDiff} since the previous status_`);
            }

            await notify({text: text.filter(Boolean).join('')}, token);

            await fs.writeFile(
                path.join(folder, `${hasha(domain + port)}.json`),
                JSON.stringify({...ping, time: Date.now()}),
            );
        }
    }));
};
