import {getCurrentSettings, setupReload} from '../config/config-default.js'

document.querySelector("#settings").addEventListener("click", function(e){
    window.open(
        'config.html',
        'Settings',
        `width=800,height=600`
      )
});

// GET
function getSettings() {
    var config = getCurrentSettings();
    setupReload();

    // ADD CLASSES
    if(config.justify_right) {
        document.documentElement.classList.add("justify-right");
    }
    if(config.reverse_row){
        document.documentElement.classList.add("reverse-row");
    }
    if(config.horizontal_gauges) {
        document.documentElement.classList.add("horizontal-gauges");
    }
    // ADD STYLE
    var style = document.createElement('style');
    var h = "body{zoom:" + config.zoom + ";}" +
            ".data-text{font-size:" + config.fontSize + "px;}";
    style.innerHTML = h;
    document.head.appendChild(style);

    return config;
}

export {getSettings}