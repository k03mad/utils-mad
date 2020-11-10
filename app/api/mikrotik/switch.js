'use strict';

const write = require('./write');

/**
 * @param {string} cmd
 * @param {string} name
 * @returns {Promise<string>}
 */
module.exports = async (cmd, name) => {
    const print = await write(`${cmd}/print`);
    const rule = print.find(elem => elem.name === name);

    const status = rule.disabled === 'false' ? 'disable' : 'enable';
    await write([`${cmd}/${status}`, `=.id=${rule['.id']}`]);

    return `${status}d`;
};
