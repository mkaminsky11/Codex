var TIMEOUT = config.timeout;
var REFRESH = config.refresh;
var debug = false;

var user = new User();

function logData(line){
    switch(line[0]){
        case "03":
            user.bindPet(line[6].toUpperCase(), line[2], line[3]);
            break;
        case "21":
            logAction(line[2], line[4], line[5]);
            break;
        case "22":
            logAction(line[2], line[4], line[5], true);
            break;
        case "26":
            gainBuff(line[5], line[2], parseFloat(line[4]), line[3]);
            break;
        case "30":
            loseBuff(line[5], line[2], line[3]);
            break;
        case "31":
            parseJob(line[2], line[3]);
            break;
        case "33":
            if(line[3] === "40000010") { reload(); } // on wipe
            break;
    }
}

function logAction(sourceId, actionId, actionName, isAoe=false){
    if(sourceId == user.id || sourceId == user.pet.id) {
        // ignore multihit for aoe
        if(isAoe) {
            var time = (new Date()).getTime();
            if(actionId in user.lastCast && (time - user.lastCast[actionId] < 100)) { return; }
            user.lastCast[actionId] = time;
        }
        if(debug){ console.log("ACTION     " + actionName + "  " + actionId);}
        //
        user.iterateBuffs(function(buff) {
            if(buff.active) {
                switch(buff.type) {
                    case "gcds":
                        if(buff.checkId(actionId)) {
                            buff.count++;
                            setCountUI(buff.id, buff.count);
                        }
                        break;
                }
            }
        });
        if(user.hasBuff(actionId)) { // treat action like buff
            var buff = user.getBuff(actionId);
            gainBuff(sourceId, actionId, buff.data.time, actionName);
            user.resetTimer(actionId);
            user.timers[actionId] = setTimeout(function() {
                loseBuff(sourceId, actionId, actionName);
            }, 1000 * buff.data.time);
        }
        if(user.hasAlias(actionId)) {
            logAction(sourceId, user.getAlias(actionId), actionName);
        }
    }
}

function gainBuff(sourceId, buffId, buffTime, buffName){
    if(sourceId == user.id) {
        if(debug) { console.log("BUFF     " + buffName + " - " + buffId); }
        //
        if(user.hasBuff(buffId)) {
            var buff = user.getBuff(buffId);
            if(buff.active && buff.data.noRefresh){return;} // block refreshing
            switch(buff.type) {
                case "gcds":
                    buff.count = 0;
                    buff.active = true;
                    break;
                case "timer":
                    buff.startTime = (new Date()).getTime();
                    buff.count = parseFloat(buffTime);
                    buff.active = true;
                    user.resetInterval(buffId);
                    user.intervals[buffId] = setInterval(function() {
                        if(user.hasBuff(buffId)) {
                            var b_ = user.getBuff(buffId);
                            if(b_.active) {
                                var count = b_.count - ((new Date()).getTime() - b_.startTime) / 1000;
                                setCountUI(buffId, Math.max(0,count));
                            }
                        }
                    }, REFRESH);
            }
            if(buff.data.hides) { // buff hides another bar
                hide(buff.data.hides);
                unHide(buffId);
            }
        }
        if(user.hasAlias(buffId)) {
            gainBuff(sourceId, user.getAlias(buffId), buffTime, buffName);
        }
    }
}

function loseBuff(sourceId, buffId, buffName){
    if(sourceId == user.id) {
        if(user.hasBuff(buffId)) {
            var buff = user.getBuff(buffId);
            if(buff.active) {
                if(debug) { console.log("LOSEBUFF   " + buffId + " " + buffName); }
                //
                switch(buff.type) {
                    case "gcds":
                        break;
                    case "timer":
                        user.resetInterval(buffId);
                        setCountUI(buffId, 0);
                        break;
                }
                buff.active = false;
                setTimeout(function() {
                    setCountUI(buffId, 0);
                }, TIMEOUT)
            }
            if(user.hasAlias(buffId)) {
                loseBuff(sourceId, user.getAlias(buffId), buffName);
            }
        }
    }
}

function parseJob(sourceId, jobString) {
    if(sourceId == user.id) {
        var jobId = parseInt(jobString.substr(jobString.length - 2,2),16); // last 2 characters are the job id
        switchJob(jobId);
    }
}

function switchJob(jobId) {
    if(user.setJob(jobId)) {
        user.initGBuffs();
        setJobUI(user.job);
    }
}

function reload() {
    user.reset();
    user.initGBuffs();
    clearDanger();
    setJobUI(user.job);
}

//addOverlayListener('LogLine', (data) => {console.log(data.line);});
addOverlayListener('LogLine', (data) => {
    logData(data.line);
});
addOverlayListener('ChangePrimaryPlayer', (data) => {
    if(user.id !== "" && (data.charID).toString(16).toUpperCase() !== user.id) { location.reload(); }
});
addOverlayListener('ChangeZone', (data) => {
    if(!user.setZone(data.zoneID)){
        reload();
    }
});
document.addEventListener('onOverlayStateUpdate', (e) => {
    let docClassList = document.documentElement.classList;
    if (e.detail.isLocked)
        docClassList.add('locked');
    else
        docClassList.remove('locked');
});
startOverlayEvents();

async function init() {
    let combat = (await callOverlayHandler({ call: 'getCombatants' })).combatants;
    if(combat.length > 0) {
        user.init((combat[0].ID).toString(16).toUpperCase());
        switchJob(combat[0].Job);
    }
    else {
        setTimeout(function() {init();}, 1000) // retry every second
    }
}
init();