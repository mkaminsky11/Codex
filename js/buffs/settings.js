import {getCurrentSettings, setupReload} from '../config/config-default.js'

function getSettings() {
    var config = getCurrentSettings();
    setupReload();

    if(config.buffs_small) {
        document.documentElement.classList.add("buff-small");
    }

    return config;
}

export {getSettings}