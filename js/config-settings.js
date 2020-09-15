document.querySelector("#settings-apply").addEventListener("click", function(e){
    setSettings();
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
    // TODO: change selects
}
function setSettings() {
    localStorage.setItem("CodexSettings", JSON.stringify(config));
}