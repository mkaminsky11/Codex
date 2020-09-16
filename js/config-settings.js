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
// MISC
function colorOptions(color) {
    var colors = ["red","blue","green","orange","yellow","purple"];
    return colors.map(function(c){
        var selected = (c === color)? "selected" : "";
        return "<option value='" + c + "' " + selected + ">" + c + "</option>";
    }).join("");
}

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
            var color = config.color[buffId] ? config.color[buffId] : actions[job].buffs[buffId].visual.color;
            var color_select = "<select class='codex-color' data-id='" + buffId + "'>" + colorOptions(color) + "</select>";
            var order = config.order[buffId] ? config.order[buffId] : actions[job].buffs[buffId].order;
            gaugeCheckboxes += 
                "<div class='settings-row-2 row'><span class='row-title'>" + actions[job].buffs[buffId].name + "</span>" + 
                "<span>Order</span><input class='codex-order' data-id='" + buffId + "' value='" + order + "'/>" +
                color_select + 
                "<input class='codex-disabled' data-id='" + buffId + "' type='checkbox' " + checked + "/>" + 
                "</div>";
        }
        settingsRow.innerHTML = gaugeCheckboxes;
        document.getElementById("settings-body").appendChild(settingsRow);
    }
    document.querySelectorAll(".codex-disabled").forEach(function(item) {
        item.addEventListener("change", function(e) {
            config.disabled[e.target.getAttribute("data-id")] = !(e.target.checked);
        });
    });
    document.querySelectorAll(".codex-color").forEach(function(item) {
        item.addEventListener("change", function(e) {
            config.color[e.target.getAttribute("data-id")] = e.target.value;
        });
    });
    document.querySelectorAll(".codex-order").forEach(function(item) {
        item.addEventListener("change", function(e) {
            config.order[e.target.getAttribute("data-id")] = e.target.value;
        });
    });
}
function setSettings() {
    localStorage.setItem("CodexSettings", JSON.stringify(config));
}
getSettings();