document.getElementById("settings-apply").addEventListener("click", function(e){
    setSettings();
});
document.getElementById("job-gauges-collapse").addEventListener("click", function(e){
    document.getElementById("gauge-settings").classList.toggle("hide");
});
document.getElementById("buffs-collapse").addEventListener("click", function(e){
    document.getElementById("buffs-settings").classList.toggle("hide");
});

// UPDATE CONFIG BASED ON FIELDS
document.getElementById("codex-edges").addEventListener("change", function(e){
    config.edges = e.target.value;
});
document.getElementById("codex-zoom").addEventListener("change", function(e){
    config.zoom = e.target.value;
});
document.getElementById("codex-fontsize").addEventListener("change", function(e){
    config.fontSize = e.target.value;
});
document.getElementById("codex-danger").addEventListener("change", function(e){
    config.danger = e.target.checked;
});
document.getElementById("codex-force-ast").addEventListener("change", function(e){
    config.force_ast = e.target.checked;
});

// MISC
function colorOptions(color) {
    var colors = ["red","blue","green","orange","yellow","purple"];
    return colors.map(function(c){
        var selected = (c === color)? "selected" : "";
        return `<option value='${c}' ${selected}>${c}</option>`;
    }).join("");
}

// GET / SET
function getSettings() {
    // INIT CONFIG
    var s = localStorage.getItem("CodexSettings");
    if(s != null) {
        s = JSON.parse(s);
        for(key in s) { // copy over configs
            config[key] = s[key];
        }
    }
    // INIT FIELDS
    document.getElementById("codex-edges").value = config.edges;
    document.getElementById("codex-zoom").value = config.zoom;
    document.getElementById("codex-fontsize").value = config.fontSize;
    document.getElementById("codex-danger").checked = config.danger;
    document.getElementById("codex-force-ast").checked = config.force_ast;

    // SETUP JOB ITEMS
    for(job in actions) {
        var settingsRow = document.createElement("div");
        settingsRow.classList.add("settings-row");
        var gaugeCheckboxes = "";
        gaugeCheckboxes += `<span><img class='job-icon' src='img/job_icons/${job}.png'>${job}</span>`;
        for(buffId in actions[job].buffs) {
            var checked = config.disabled[buffId] ? "" : "checked";
            var color = config.color[buffId] ? config.color[buffId] : actions[job].buffs[buffId].visual.color;
            var color_select = `<select class='codex-color' data-id='${buffId}'>${colorOptions(color)}</select>`;
            var order = config.order[buffId] ? config.order[buffId] : actions[job].buffs[buffId].order;
            gaugeCheckboxes += 
                `<div class='settings-row-2 row'><span class='row-title'>${actions[job].buffs[buffId].name}</span>` + 
                `<span>Order</span><input class='codex-order' data-id='${buffId}' value='${order}'/>` +
                color_select + 
                `<input class='codex-disabled' data-id='${buffId}' type='checkbox' ${checked}/>` + 
                "</div>";
        }
        settingsRow.innerHTML = gaugeCheckboxes;
        document.getElementById("gauge-settings").appendChild(settingsRow);
    }

    // CHANGE CONFIG TO MATCH FIELDS
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