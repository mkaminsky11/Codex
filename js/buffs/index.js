var me = {
    id: "",
    buffs: {},
    intervals: {},
    party: {},
    zone: "",
};
var REFRESH = 100;
var SHOW_CD = 30;
var debug = false;

var user = new User();

function logData(line){
    switch(line[0]){
        case "21":
            logAction(line[2], line[4], line[5], line[6]);
            break;
        case "22":
            logAction(line[2], line[4], line[5], line[6]);
            break;
        case "26":
            gainBuff(line[5], line[7], line[2], parseFloat(line[4]), line[3]);
            break;
        case "30":
            loseBuff(line[5], line[7], line[2], line[3]);
            break;
        case "31":
            parseJob(line[2], line[3]);
            break;
        case "33":
            if(line[3] === "40000010") { reload(); } // on wipe
            break;
    }
}
function logAction(sourceId, actionId, actionName, targetId){
    if(user.hasBuff(actionId)) {
        gainBuff(sourceId, targetId, actionId, user.getBuff(actionId).data.duration, actionName);
    }
}
function gainBuff(sourceId, targetId, buffId, buffTime, buffName){
    console.log(buffId);
    if(user.hasBuff(buffId)) {
        var buff = user.getBuff(buffId);
        if(
            (buff.target && user.inParty(sourceId)) ||
            (buff.self   && targetId === user.id)   ||
            (buff.party  && user.inParty(sourceId))
        ) {
            if(debug) { console.log("BUFF     " + buffName + " - " + buffId); }
            //
            if(buff.data.noRefresh && buff.active) { return; }
            buff.active = true;
            buff.cd = false;
            buff.startTime = (new Date()).getTime();
            buff.duration = buff.data.duration;
            unHide(buffId);
            buffActiveUI(buffId);
            setTimeUI(buffId, buff.data.duration, buff.data.duration);
            user.resetInterval(buffId);
            user.intervals[buffId] = setInterval(function() {
                if(user.hasBuff(buffId)) {
                    var b_ = user.getBuff(buffId);
                    if(b_.active) {
                        var timeLeft = b_.duration - ((new Date()).getTime() - b_.startTime) / 1000;
                        setTimeUI(buffId, Math.max(0,timeLeft), b_.duration, true);
                        if(timeLeft <= 0) {
                            cdBuff(sourceId, buffId, buffName);
                        }
                    }
                }
            }, REFRESH)
        }
    }
}

function loseBuff(sourceId, targetId, buffId, buffName){
}

function cdBuff(sourceId, buffId, buffName) {
    if(debug) { console.log("LOSEBUFF   " + buffId + " " + buffName); }
    //
    user.resetInterval(buffId);
    hide(buffId);
    var buff = user.getBuff(buffId);
    if(buff.data.noCd) { return; }
    buff.active = false;
    buff.cd = true;
    buff.duration = buff.data.cd;
    buffOnCdUI(buffId);
    user.intervals[buffId] = setInterval(function() {
        if(user.hasBuff(buffId)) {
            var b_ = user.getBuff(buffId);
            if(b_.cd) {
                var timeLeft = b_.duration - ((new Date()).getTime() - b_.startTime) / 1000;
                setTimeUI(buffId, Math.max(0,timeLeft), b_.duration, false);
                if(timeLeft <= SHOW_CD) {
                    unHide(buffId);
                }
                if(timeLeft <= 0) {
                    readyBuff(sourceId, buffId, buffName);
                }
            }
        }
    }, REFRESH);
}

function readyBuff(sourceId, buffId, buffName) {
    user.resetInterval(buffId);
    user.getBuff(buffId).cd = false;
    buffReadyUI(buffId);
}

function parseJob(sourceId, jobString) {
    if(sourceId == user.id) {
        var jobId = parseInt(jobString.substr(jobString.length - 2,2),16); // last 2 characters are the job id
        switchJob(jobId);
    }
}

function switchJob(jobId) {
    if(user.setJob(jobId)) {
        user.initPBuffs();
        setJobUI(user.job);
    }
}

function inParty(id) {
    return (id === me.id || id in me.party);
}

function reload() {
    user.reset();
    user.initPBuffs();
    setupBuffsUI();
}
//addOverlayListener('LogLine', (data) => {console.log(data.line);});
addOverlayListener('LogLine', (data) => {
    logData(data.line);
});
addOverlayListener('ChangePrimaryPlayer', (data) => {
    if(user.id !== "" && (data.charID).toString(16).toUpperCase() !== user.id) { location.reload(); }
});
addOverlayListener('ChangeZone', (data) => {
    if(!user.setZone(data.zoneId)){
        reload();
    }
});
addOverlayListener('PartyChanged', (data) => {
    user.changeParty(data.party);
});
startOverlayEvents();

async function init() {
    let combat = (await callOverlayHandler({ call: 'getCombatants' })).combatants;
    if(combat.length > 0) {
        user.init((combat[0].ID).toString(16).toUpperCase());
        switchJob(combat[0].Job);
        setupBuffsUI();
    }
    else {
        setTimeout(function() {init();}, 1000) // retry every second
    }
}
init();