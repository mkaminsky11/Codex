var me = {
    id: "",
    buffs: {},
    intervals: {},
    timers: {},
    pet: {name: "", id: ""},
    zone: "",
};
var TIMEOUT = 5000;
var REFRESH = 100;
var debug = false;

function logData(line){
    switch(line[0]){
        case "03":
            bindPet(line[6].toUpperCase(), line[2], line[3]);
            break;
        case "21":
            logAction(line[2], line[4], line[5]);
            break;
        case "22":
            logAction(line[2], line[4], line[5]);
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

function logAction(sourceId, actionId, actionName){
    if(sourceId == me.id || sourceId == me.pet.id) {
        if(debug){ console.log("ACTION     " + actionName + "  " + actionId);}
        //
        for(buffId in me.buffs) {
            if(me.buffs[buffId].active) { // count it under a buff
                switch(actions[me.job].buffs[buffId].type) {
                    case "gcds":
                        if(actions[me.job].buffs[buffId].ids.indexOf(actionId) !== -1) {
                            me.buffs[buffId].count++;
                            setCount(buffId, me.buffs[buffId].count);
                        }
                        break;
                }
            }
        }
        if(actionId in me.buffs) { // treat the action as a buff, like with hypercharge
            gainBuff(sourceId, actionId, actions[me.job].buffs[actionId].time, actionName); // spoof it
            if(actionId in me.timers) {
                clearTimeout(me.timers[actionId]);
            }
            me.timers[actionId] = setTimeout(function() {
                loseBuff(sourceId, actionId);
            }, 1000 * actions[me.job].buffs[actionId].time);
        }
        if(actionId in actions[me.job].alias) {
            logAction(sourceId, actions[me.job].alias[actionId], actionName);
        }
    }
}

function gainBuff(sourceId, buffId, buffTime, buffName){
    if(sourceId == me.id) {
        if(debug) { console.log("BUFF     " + buffName + " - " + buffId); }
        //
        if(buffId in actions[me.job].buffs) {
            if(me.buffs[buffId].active && actions[me.job].buffs[buffId].noRefresh){return;} // block refreshing, like RDM embolden (which emits and new buff each decay)
            switch(actions[me.job].buffs[buffId].type) {
                case "gcds": // GCDS; START COUNTER AT 0
                    me.buffs[buffId] = {
                        type: "gcds",
                        max: actions[me.job].buffs[buffId].max,
                        count: 0,
                        active: true
                    };
                    break;
                case "timer": // TIMER; START TICKING DOWN
                    me.buffs[buffId] = {
                        type: "timer",
                        startTime: (new Date()).getTime(),
                        max: actions[me.job].buffs[buffId].max,
                        count: parseFloat(buffTime),
                        active: true
                    };
                    if(buffId in me.intervals) {
                        clearInterval(me.intervals[buffId]);
                    }
                    me.intervals[buffId] = setInterval(function(){
                        if(buffId in me.buffs && me.buffs[buffId].active) {
                            var count = me.buffs[buffId].count - ((new Date()).getTime() - me.buffs[buffId].startTime) / 1000;
                            setCount(buffId, Math.max(0,count));
                        }
                    }, REFRESH);
                    break;
            }
            if(actions[me.job].buffs[buffId].hides) { // buff hides another bar
                hide(actions[me.job].buffs[buffId].hides);
                unHide(buffId);
            }
        }
        if(buffId in actions[me.job].alias) {
            gainBuff(sourceId, actions[me.job].alias[buffId], buffTime, buffName);
        }
    }
}

function loseBuff(sourceId, buffId, buffName){
    if(sourceId == me.id) {
        if(buffId in me.buffs &&  me.buffs[buffId].active) {
            if(debug) { console.log("LOSEBUFF   " + buffId + " " + buffName); }
            //
            switch(me.buffs[buffId].type) {
                case "gcds":
                    break;
                case "timer":
                    clearInterval(me.intervals[buffId]);
                    setCount(buffId, 0);
                    break;
            }
            me.buffs[buffId].active = false;
            setTimeout(function(){  // reset it after a certain amount of time
                setCount(buffId, 0);
            }, TIMEOUT);
        }
        if(buffId in actions[me.job].alias) {
            loseBuff(sourceId, actions[me.job].alias[buffId], buffName);
        }
    }   
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
            me.buffs = {};
            me.job = job;
            for(buffId in actions[job].buffs) {
                me.buffs[buffId] = {active: false};
            }
            console.log("SETJOB " + job);
            setJob(job);
        }
    }
}

function bindPet(ownerId, petId, petName) {
    if(ownerId == me.id) {
        console.log("BIND   " + petName);
        me.pet = {
            id: petId.toUpperCase(),
            name: petName
        };
    }
}

function reload() {
    for(id in me.intervals) {
        clearInterval(me.intervals[id]);
    }
    for(id in me.timers) {
        clearTimeout(me.timers[id]);
    }
    for(buffId in actions[me.job].buffs) {
        me.buffs[buffId] = {active: false};
    }
    clearDanger();
    setJob(me.job);
}

//addOverlayListener('LogLine', (data) => {console.log(data.line);});
addOverlayListener('LogLine', (data) => {
    logData(data.line);
});
addOverlayListener('ChangePrimaryPlayer', (data) => {
    if(me.id !== "" && (data.charID).toString(16).toUpperCase() !== me.id) {
        location.reload();
    }
});
addOverlayListener('ChangeZone', (data) => {
    if(me.zone !== "" && data.zoneID !== me.zone) {
        reload();
    }
    else {
me.zone = data.zoneID;
    }
});
startOverlayEvents();

async function init() {
    let combat = (await callOverlayHandler({ call: 'getCombatants' })).combatants;
    if(combat.length > 0) {
        me.name = combat[0].Name;
        me.id = (combat[0].ID).toString(16).toUpperCase();
        switchJob(combat[0].Job);
    }
    else {
        setTimeout(function() {init();}, 1000) // retry every second
    }
}
init();