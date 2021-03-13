import {gaugeConfig} from '../gauges/actions.js'
import {buffConfig} from '../buffs/buffs.js'
import {getCurrentSettings} from '../config/config-default.js'

var config = getCurrentSettings();

// ===========
// HELPERS
// ============
function setSettings() {
    localStorage.setItem('CodexSettings', JSON.stringify(config));
}
function colorOptions(color) {
    var colors = ['red','blue','green','orange','yellow','purple'];
    return colors.map(function(c){
        var selected = (c === color)? 'selected' : '';
        return `<option value='${c}' ${selected}>${c}</option>`;
    }).join('');
}
function glowsOptions(glow) {
    var glowSelected = glow ? glow : 'noGlow';
    var glows = [
        'noGlow',
        'green',
        'blue',
        'yellow',
        'orange',
        'purple',
        'red',
        'dark',
        'dark2',
        'rock',
        'blue2',
        'fire',
        'sonic',
        'swirl',
        'water',
        'jewel',
        'prism',
        'fireblue',
        'fireblue2',
        'rainbow'];
    return glows.map(function(g) {
        var selected = (g === glowSelected) ? 'selected' : '';
        return `<option value='${g}' ${selected}>${g}</option>`;
    }).join('');
}

function typeOptions(type, typeSelected) {
    var types = [];
    switch(type) {
        case 'timer':
            console.log(type);
            types = ['BAR', 'SQUARE'];
            break;
        case 'gcds':
            types = ['ARROW', 'BAR'];
            break;
    }
    return types.map(function(t) {
        var selected = (t === typeSelected) ? 'selected' : '';
        return `<option value='${t}' ${selected}>${t}</option>`;
    }).join('');
}
document.getElementById('settings-apply').addEventListener('click', function(e){
    setSettings();
});
document.getElementById('job-gauges-collapse').addEventListener('click', function(e){
    document.getElementById('gauge-settings').classList.toggle('hide');
});
document.getElementById('buffs-collapse').addEventListener('click', function(e){
    document.getElementById('buffs-settings').classList.toggle('hide');
});

// UPDATE CONFIG BASED ON FIELDS
document.getElementById('codex-edges').addEventListener('change', function(e){
    config.edges = e.target.value;
});
document.getElementById('codex-zoom').addEventListener('change', function(e){
    config.zoom = e.target.value;
});
document.getElementById('codex-fontsize').addEventListener('change', function(e){
    config.fontSize = e.target.value;
});
document.getElementById('codex-justify-right').addEventListener('change', function(e){
    config.justify_right = e.target.checked;
});
document.getElementById('codex-reverse-row').addEventListener('change', function(e){
    config.reverse_row = e.target.checked;
});
document.getElementById('codex-small-icons').addEventListener('change', function(e){
    config.small_icons = e.target.checked;
});
document.getElementById('codex-horizontal-gauges').addEventListener('change', function(e){
    config.horizontal_gauges = e.target.checked;
});
document.getElementById('codex-timeout').addEventListener('change', function(e){
    if(!isNaN(parseInt(e.target.value))){
        config.timeout = parseInt(e.target.value);
    }
});
document.getElementById('codex-refresh').addEventListener('change', function(e){
    if(!isNaN(parseInt(e.target.value))){
        config.refresh = parseInt(e.target.value);
    }
});
document.getElementById('codex-danger').addEventListener('change', function(e){
    config.danger = e.target.checked;
});
document.getElementById('codex-glow').addEventListener('change', function(e){
    config.glow = e.target.checked;
});
document.getElementById('codex-all-personals').addEventListener('change', function(e){
    config.all_personals = e.target.checked;
});
document.getElementById('codex-own-personals').addEventListener('change', function(e){
    config.own_personals = e.target.checked;
});

// INIT FIELDS
document.getElementById('codex-edges').value = config.edges;
document.getElementById('codex-zoom').value = config.zoom;
document.getElementById('codex-fontsize').value = config.fontSize;
document.getElementById('codex-justify-right').checked = config.justify_right;
document.getElementById('codex-horizontal-gauges').checked = config.horizontal_gauges;
document.getElementById('codex-timeout').value = config.timeout;
document.getElementById('codex-refresh').value = config.refresh;
document.getElementById('codex-danger').checked = config.danger;
document.getElementById('codex-glow').checked = config.glow;
document.getElementById('codex-all-personals').checked = config.all_personals;
document.getElementById('codex-own-personals').checked = config.own_personals;

// =================
// GAUGES
// =================
for(const job in gaugeConfig) {
    var settingsRow = document.createElement('div');
    settingsRow.classList.add('settings-row');
    var gaugeCheckboxes = `
        <span>
            <img class='job-icon' src='img/job_icons/${job}.png'>
            ${job}
        </span>`;
    for(const buffId in gaugeConfig[job].buffs) {
        var checked = config.disabled[buffId] ? '' : 'checked';
        var type = config.gaugeType[buffId] ? config.gaugeType[buffId] : gaugeConfig[job].buffs[buffId].visual.type; // BAR, ARROW, etc.

        var color = config.color[buffId] ? config.color[buffId] : gaugeConfig[job].buffs[buffId].visual.color;
        var color_select = `<select class='codex-color' data-id='${buffId}'> ${colorOptions(color)} </select>`;

        var order = config.order[buffId] ? config.order[buffId] : gaugeConfig[job].buffs[buffId].order;

        var glows = config.glows[buffId] ? config.glows[buffId] : gaugeConfig[job].buffs[buffId].visual.glow;
        var glows_select_1 = `<select class='codex-glows' data-id='${buffId}'> ${glowsOptions(glows)} </select>`;
        var glows_select = (type === 'BAR' && gaugeConfig[job].buffs[buffId].type == 'timer') ? glows_select_1 : ''; // only make bars that count down glow
        
        var type_select = `<select class='codex-type' data-id='${buffId}'> ${typeOptions(gaugeConfig[job].buffs[buffId].type, type)} </select>`;

        var order_select = `
            <span class='text'>#</span>
            <input class='codex-order' data-id='${buffId}' value='${order}'/>`;
        var disabled_select = `<input class='codex-disabled' data-id='${buffId}' type='checkbox' ${checked}/>`;

        gaugeCheckboxes += `
            <div class='settings-row-2'>
                <div class='settings-row-2-header row'>
                    <span class='row-title'>${gaugeConfig[job].buffs[buffId].name}</span>
                    ${order_select}
                    ${disabled_select}
                </div>
                <div class='settings-row-2-body'>
                    ${color_select}
                    ${glows_select}
                    ${type_select}
                </div>
            </div>`;
    }
    settingsRow.innerHTML = gaugeCheckboxes;
    document.getElementById('gauge-settings').appendChild(settingsRow);
}
document.querySelectorAll('.codex-disabled').forEach(function(item) {
    item.addEventListener('change', function(e) {
        config.disabled[e.target.getAttribute('data-id')] = !(e.target.checked);
    });
});
document.querySelectorAll('.codex-color').forEach(function(item) {
    item.addEventListener('change', function(e) {
        config.color[e.target.getAttribute('data-id')] = e.target.value;
    });
});
document.querySelectorAll('.codex-order').forEach(function(item) {
    item.addEventListener('change', function(e) {
        config.order[e.target.getAttribute('data-id')] = e.target.value;
    });
});
document.querySelectorAll('.codex-glows').forEach(function(item) {
    item.addEventListener('change', function(e) {
        config.glows[e.target.getAttribute('data-id')] = e.target.value;
    });
});
document.querySelectorAll('.codex-type').forEach(function(item) {
    item.addEventListener('change', function(e) {
        config.gaugeType[e.target.getAttribute('data-id')] = e.target.value;
    });
});

// ==============
// BUFFS
// ==============
var buffSettingsRow = document.createElement('div');
buffSettingsRow.classList.add('settings-row');
var buffCheckboxes = `<span>PARTY BUFFS</span>`;
for(const jobId in buffConfig) {
    for(const buffId in buffConfig[jobId]) {
        var buff = buffConfig[jobId][buffId];
        var checked = config.buffs_disabled[buffId] ? '' : 'checked';
        var selfTag = buff.self ? '<span class="tag tag-green">ON SELF</span>': '';
        var targetTag = buff.target ? '<span class="tag tag-red">ON TARGET</span>': '';
        var partyTag = buff.party ? '<span class="tag tag-yellow">ON PARTY MEMBER</span>': '';
        buffCheckboxes += `
            <div class='settings-row-2 settings-row-2-header row'>
                <span class='row-title'>${buff.name} ${selfTag} ${targetTag} ${partyTag}</span>
                <input class='codex-buffs-disabled' data-id='${buffId}' type='checkbox' ${checked}/>
            </div>`;
    }
}
buffSettingsRow.innerHTML = buffCheckboxes;
document.getElementById('buffs-settings').appendChild(buffSettingsRow);
document.querySelectorAll('.codex-buffs-disabled').forEach(function(item) {
    item.addEventListener('change', function(e) {
        config.buffs_disabled[e.target.getAttribute('data-id')] = !(e.target.checked);
    });
});