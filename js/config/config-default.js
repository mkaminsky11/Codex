var config = {
    // GENERAL
    timeout: 5000,
    refresh: 100,

    // GAUGES
    edges: "round",
    zoom: 1,
    fontSize: 15,
    justify_right: false,
    reverse_row: false,
    horizontal_gauges: false,
    small_icons: false,
    disabled: {},
    gaugeType: {},
    color: {},
    order: {},
    danger: false,
    glow: true,
    glows: {},

    // BUFFS
    all_personals: false,
    own_personals: true,
    buffs_disabled: {},
    buffs_small: false
};

function setupReload(){
    // RELOAD WHEN SETTINGS ARE CHANGED
    window.addEventListener("storage", function(e) {
        console.log(e);
        if(e.key != "CodexSettings") { return; }
        location.reload();
    });
}

function getCurrentSettings(){
    var s = localStorage.getItem("CodexSettings");
    if(s != null) {
        s = JSON.parse(s);
        for(const key in s) { // copy over configs
            config[key] = s[key];
        }
    }
    return config;
}

export {getCurrentSettings, setupReload}