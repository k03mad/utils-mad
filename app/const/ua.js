'use strict';

const randomMua = require('random-mua');

module.exports = {
    win: {
        chrome: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/86.0.4240.193 Safari/537.36',
    },
    android: {
        chrome: 'Mozilla/5.0 (Linux; Android 10) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/86.0.4240.185 Mobile Safari/537.36',
        pp: '5.0 (Linux; arm_64; Android 9) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/85.0.4183.127 YaApp_Android/20.92.0 YaSearchBrowser/20.92.0 BroPP/1.0 (beta) SA/3 Mobile Safari/537.36',
    },
    tools: {
        curl: 'curl/7.73.0',
    },
    random: {

        /** @returns {string} */
        desktop: () => randomMua(),

        /** @returns {string} */
        mobile: () => randomMua('m'),
    },
};
