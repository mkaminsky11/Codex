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
    if(actionId in buffs) {
        gainBuff(sourceId, targetId, actionId, buffs[actionId].duration, actionName); //spoof it
    }
}
function gainBuff(sourceId, targetId, buffId, buffTime, buffName){
    if(buffId in buffs) {
        if(
            (buffs[buffId].target && inParty(sourceId)) || // like trick
            (buffs[buffId].self && targetId === me.id)  || // like cards
            (buffs[buffId].party && inParty(sourceId))     // used by someone else
        ) { // either targetted buff, or on me
            if(debug) { console.log("BUFF     " + buffName + " - " + buffId); }
            //
            if(buffs[buffId].noRefresh && me.buffs[buffId].active) { return; } // DON'T REFRESH, LIKE RDM EMBOLDEN
            // setup buff
            me.buffs[buffId] = {
                active: true,
                cd: false,
                startTime: (new Date()).getTime(),
                duration: buffs[buffId].duration
            }
            // make it visible
            unHide(buffId);
            // no longer on cd
            // no longer ready, now active
            buffActive(buffId);
            // set the time
            setTime(buffId, buffs[buffId].duration, buffs[buffId].duration);
            // clear any intervals
            if(buffId in me.intervals) {
                clearInterval(me.intervals[buffId]);
            }
            // make a new interval
            me.intervals[buffId] = setInterval(function() {
                if(buffId in me.buffs && me.buffs[buffId].active) {
                    var timeLeft = me.buffs[buffId].duration - ((new Date()).getTime() - me.buffs[buffId].startTime) / 1000;
                    setTime(buffId, Math.max(0,timeLeft), me.buffs[buffId].duration, true);
                    if(timeLeft <= 0) {
                        cdBuff(sourceId, buffId, buffName);
                    }
                }
            }, REFRESH);
        }
    }
}

function loseBuff(sourceId, targetId, buffId, buffName){
}

function parseJob(sourceId, jobString) {
    if(sourceId == me.id) {
        var jobId = parseInt(jobString.substr(jobString.length - 2,2),16); // last 2 characters are the job id
        switchJob(jobId);
    }
}

function switchJob(jobId) {
    if(jobId in ji) {
        var job = ji[jobId];
        if(job !== me.job) { // switched
            me.job = job;
            setJob(job);
        }
    }
}

function cdBuff(sourceId, buffId, buffName) {
    if(debug) { console.log("LOSEBUFF   " + buffId + " " + buffName); }
    //
    if(buffId in me.intervals) {
        clearInterval(me.intervals[buffId]);
    }
    hide(buffId);
    if(buffs[buffId].noCd) {    // no CD, like cards
        return;
    }
    me.buffs[buffId].active = false;
    me.buffs[buffId].cd = true;
    me.buffs[buffId].duration = buffs[buffId].cd;
    // keep the starttime the same, since it's being counted from when it's first pressed

    // put it on cd
    buffOnCd(buffId);
    // make a cd countdown
    me.intervals[buffId] = setInterval(function() {
        if(buffId in me.buffs && me.buffs[buffId].cd) {
            var timeLeft = me.buffs[buffId].duration - ((new Date()).getTime() - me.buffs[buffId].startTime) / 1000;
            setTime(buffId, Math.max(0,timeLeft), me.buffs[buffId].duration, false);
            if(timeLeft <= SHOW_CD) {
                unHide(buffId);
            }
            if(timeLeft <= 0) {
                readyBuff(sourceId, buffId, buffName);
            }
        }
    }, REFRESH);
}

function readyBuff(sourceId, buffId, buffName) {
    // clear the CD countdown
    if(buffId in me.intervals) {
        clearInterval(me.intervals[buffId]);
    }
    me.buffs[buffId].cd = false;
    buffReady(buffId);
}

function inParty(id) {
    return (id === me.id || id in me.party);
}

function reload() {
    for(id in me.intervals) {
        clearInterval(me.intervals[id]);
    }
    location.reload();
}

//addOverlayListener('LogLine', (data) => {console.log(data.line);});
addOverlayListener('LogLine', (data) => {
    logData(data.line);
});
addOverlayListener('ChangeZone', (data) => {
    if(me.zone !== "" && data.zoneID !== me.zone) {
        reload();
    }
    else {
        me.zone = data.zoneID;
    }
});
addOverlayListener('ChangePrimaryPlayer', (data) => {
    if(me.id !== "" && (data.charID).toString(16).toUpperCase() !== me.id) {
        reload();
    }
});
addOverlayListener('PartyChanged', (data) => {
    me.party = {};
    for(var i = 0; i < data.party.length; i++) {
        me.party[data.party[i].id] = true;
    }
});
startOverlayEvents();

async function init() {
    let combat = (await callOverlayHandler({ call: 'getCombatants' })).combatants;
    if(combat.length > 0) {
        me.name = combat[0].Name;
        me.id = (combat[0].ID).toString(16).toUpperCase();
        switchJob(combat[0].Job);
        for(buffId in buffs) {
            me.buffs[buffId] = {active: false, cd: false};
        }
        setupBuffs();
    }
    else {
        setTimeout(function() {init();}, 1000) // retry every second
    }
}
init();