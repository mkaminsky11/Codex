document.getElementById("settings-apply").addEventListener("click", function(e){
    setSettings();
});
// CHANGE CONFIG
document.getElementById("codex-edges").addEventListener("change", function(e){
    config.edges = e.target.value;
});
document.getElementById("codex-zoom").addEventListener("change", function(e){
    config.zoom = e.target.value;
});
document.getElementById("codex-fontsize").addEventListener("change", function(e){
    config.fontSize = e.target.value;
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
    document.getElementById("codex-zoom").value = config.zoom;
    document.getElementById("codex-fontsize").value = config.fontSize;
    // SETUP JOB ITEMS
    for(job in actions) {
        var settingsRow = document.createElement("div");
        settingsRow.classList.add("settings-row");
        var gaugeCheckboxes = "";
        gaugeCheckboxes += "<span>" + job + "</span>";
        for(buffId in actions[job].buffs) {
            var checked = config.disabled[buffId] ? "" : "checked";
            gaugeCheckboxes += "<div class='settings-row-2 row'><span>" + actions[job].buffs[buffId].name + "</span><input class='codex-disabled' data-id='" + buffId + "' type='checkbox' " + checked + "/></div>";
        }
        settingsRow.innerHTML = gaugeCheckboxes;
        document.getElementById("settings-body").appendChild(settingsRow);
    }
    document.querySelectorAll(".codex-disabled").forEach(function(item) {
        item.addEventListener("change", function(e) {
            config.disabled[e.target.getAttribute("data-id")] = !(e.target.checked);
        });
    });
}
function setSettings() {
    localStorage.setItem("CodexSettings", JSON.stringify(config));
}

getSettings();