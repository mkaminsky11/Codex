import {getCurrentSettings, setupReload} from '../config/config-default.js'

function getSettings() {
    var config = getCurrentSettings();
    setupReload();
    return config;
}

export {getSettings}