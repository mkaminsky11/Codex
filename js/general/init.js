async function init(onInit) {
    let combat = (await callOverlayHandler({ call: 'getCombatants' })).combatants;
    if(combat.length > 0) {
        onInit((combat[0].ID).toString(16).toUpperCase(), combat[0].Job);
    }
    else {
        setTimeout(function() {init(onInit);}, 1000) // retry every second
    }
}

var logFunctions = {}
function onLog(line){
    switch(line[0]){
        case '03':
            logFunctions.onBindPet(line[6].toUpperCase(), line[2], line[3]);
            break;
        case "21":
            logFunctions.onAction(line[2], line[4], line[5], line[6], false);
            break;
        case "22":
            logFunctions.onAction(line[2], line[4], line[5], line[6], true);
            break;
        case "26":
            logFunctions.onGainBuff(line[5], line[7], line[2], parseFloat(line[4]), line[3]);
            break;
        case "30":
            logFunctions.onLoseBuff(line[5], line[7], line[2], line[3]);
            break;
        case "31":
            var jobId = parseInt(line[3].substr(line[3].length - 2,2),16);
            logFunctions.onJobChange(line[2], jobId)
            break;
        case "33":
            if(line[3] === '40000010') { logFunctions.onWipe(); } // on wipe
            break;
    }
}

function setup(
        onAction,
        onGainBuff,
        onLoseBuff,
        onJobChange,
        onBindPet,
        onWipe,
        
        onPlayerChange,
        onZoneChange,
        onPartyChange,
        onInit
    ){
    logFunctions.onAction = onAction;
    logFunctions.onGainBuff = onGainBuff;
    logFunctions.onLoseBuff = onLoseBuff;
    logFunctions.onJobChange = onJobChange;
    logFunctions.onBindPet = onBindPet;
    logFunctions.onWipe = onWipe;

    addOverlayListener('LogLine', (data) => {
        onLog(data.line);
    });
    addOverlayListener('ChangePrimaryPlayer', (data) => {
        onPlayerChange((data.charID).toString(16).toUpperCase());
    });
    addOverlayListener('ChangeZone', (data) => {
        onZoneChange(data.zoneID);
    });
    addOverlayListener('PartyChanged', (data) => {
        onPartyChange(data.party);
    });
    document.addEventListener('onOverlayStateUpdate', (e) => {
        let docClassList = document.documentElement.classList;
        if (e.detail.isLocked)
            docClassList.add('locked');
        else
            docClassList.remove('locked');
    });
    startOverlayEvents();
    
    init(onInit);
}

export {setup}