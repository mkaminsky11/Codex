document.getElementById("settings-apply").addEventListener("click", function(e){
    setSettings();
});
// CHANGE CONFIG
document.getElementById("codex-edges").addEventListener("change", function(e){
    config.edges = e.target.value;
});

// GET / SET
function getSettings() {
    var s = localStorage.getItem("CodexSettings");
    if(s != null) {
        s = JSON.parse(s);
        for(key in s) { // copy over configs
            config[key] = s[key];
        }
    }
    // CHANGE FIELDS
    document.getElementById("codex-edges").value = config.edges;
}
function setSettings() {
    localStorage.setItem("CodexSettings", JSON.stringify(config));
}

getSettings();