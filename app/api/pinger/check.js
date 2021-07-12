'use strict';

const convert = require('../../utils/array/convert');
const diff = require('../../utils/date/diff');
const filenamify = require('../../utils/string/filenamify');
const ms = require('ms');
const notify = require('./notify');
const path = require('path');
const {promises: fs} = require('fs');
const {tcpPingPort} = require('tcp-ping-port');

const getFileFullPath = (folder, ping) => {
    const fileName = filenamify(`${ping.host}:${ping.port}`);
    const fileExt = '.json';

    return path.join(folder, fileName + fileExt);
};

/**
 * @param {object | Array<object>} checks
 * @param {string} checks.domain
 * @param {string|number} [checks.port]
 * @param {object} [opts]
 * @param {string} [opts.folder]
 * @param {string} [opts.token]
 */
module.exports = async (checks, {
    folder = './.pinger',
    token,
} = {}) => {
    await fs.mkdir(folder, {recursive: true});
    await fs.writeFile(path.join(folder, '.gitignore'), '*');

    await Promise.all(convert(checks).map(async ({domain, port = 80}) => {
        const ping = await tcpPingPort(domain, Number(port));

        let previousCheck;

        try {
            const savedData = await fs.readFile(getFileFullPath(folder, ping));
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
                getFileFullPath(folder, ping),
                JSON.stringify({...ping, time: Date.now()}),
            );
        }
    }));
};
