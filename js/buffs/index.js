var me = {
    id: "",
    buffs: {},
    intervals: {},
    party: {},
    zone: "",
};
var REFRESH = 100;
var debug = false;

function logData(line){
    switch(line[0]){
        case "26":
            gainBuff(line[5], line[7], line[2], parseFloat(line[4]), line[3]);
            break;
        case "30":
            loseBuff(line[5], line[7], line[2], line[3]);
            break;
    }
}
function gainBuff(sourceId, targetId, buffId, buffTime, buffName){
    if(buffId in buffs) {
        if((!buffs[buffId].self && inParty(sourceId)) || (buffs[buffId].self && targetId === me.id)) { // either targetted buff, or on me
            if(debug) { console.log("BUFF     " + buffName + " - " + buffId); }
            //
            if(buffs[buffId].noRefresh) { return; } // DON'T REFRESH, LIKE RDM EMBOLDEN
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

function inParty(id) {
    return (id === me.id || id in me.party);
}

function loseBuff(sourceId, targetId, buffId, buffName){
}

function cdBuff(sourceId, buffId, buffName) {
    if(debug) { console.log("LOSEBUFF   " + buffId + " " + buffName); }
    //
    if(buffId in me.intervals) {
        clearInterval(me.intervals[buffId]);
    }
    if(buffs[buffId].noCd) {    // no CD, like cards
        hide(buffId);
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

//addOverlayListener('LogLine', (data) => {console.log(data.line);});
addOverlayListener('LogLine', (data) => {
    logData(data.line);
});
addOverlayListener('ChangeZone', (data) => {
    if(me.zone !== "" && data.zoneID !== me.zone) {
        location.reload();
    }
    else {
        me.zone = data.zoneID;
    }
});
addOverlayListener('ChangePrimaryPlayer', (data) => {
    if(me.id !== "" && (data.charID).toString(16).toUpperCase() !== me.id) {
        location.reload();
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