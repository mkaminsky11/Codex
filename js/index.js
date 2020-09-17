var me = {
    buffs: {},
    intervals: {},
    timers: {},
    pet: {name: "", id: ""}
};
var TIMEOUT = 5000;
var REFRESH = 100;
var debug = false;

function logData(line){
    switch(line[0]){
        case "03":
            bindPet(line[6].toUpperCase(), line[2], line[3]);
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
            loseBuff(line[5], line[2]);
            break;
        case "31":
            switchJob(line[2], parseInt(line[3], 16));
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
        if(actionId in me.buffs) { // triggers a buff for some reason
            gainBuff(sourceId, actionId, actions[me.job].buffs[actionId].time, actionName); // spoof it
            if(actionId in me.timers) {
                clearTimeout(me.timers[actionId]);
            }
            me.timers[actionId] = setTimeout(function() {
                loseBuff(sourceId, actionId);
            }, 1000 * actions[me.job].buffs[actionId].time);
        }
    }
}

function gainBuff(sourceId, buffId, buffTime, buffName){
    if(sourceId == me.id) {
        if(debug) { console.log("BUFF     " + buffName + " - " + buffId); }
        //
        if(buffId in actions[me.job].buffs) {
            if(me.buffs[buffId].active && actions[me.job].buffs[buffId].noRefresh){return;} // block refreshing
            switch(actions[me.job].buffs[buffId].type) {
                case "gcds": // KEEPING TRACK OF GCDS
                    me.buffs[buffId] = {
                        type: "gcds",
                        max: actions[me.job].buffs[buffId].max,
                        count: 0,
                        active: true
                    };
                    break;
                case "timer": // KEEPING TRACK OF TIMERS
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
                            var count = me.buffs[buffId].count - ((new Date()).getTime() - me.buffs[buffId].startTime) / 1000; // have to offset this for some reason
                            setCount(buffId, Math.max(0,count));
                        }
                    }, REFRESH);
                    break;
            }
            if(actions[me.job].buffs[buffId].hides) {
                hide(actions[me.job].buffs[buffId].hides);
                unHide(buffId);
            }
        }
    }
}

function loseBuff(sourceId, buffId){
    if(sourceId == me.id && buffId in me.buffs &&  me.buffs[buffId].active) {
        if(debug) { console.log("LOSEBUFF   " + buffId); }
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
        setTimeout(function(){
            setCount(buffId, 0);
        }, TIMEOUT);
    }   
}

var jobIds = {
    37: "GNB", 33: "AST", 19: "PLD", 21: "WAR", 32: "DRK", 28: "SCH", 24: "WHM", 23: "BRD", 22: "DRG", 27: "SMN", 34: "SAM", 25: "BLM", 35: "RDM", 31: "MCH", 38: "DNC", 30: "NIN", 20: "MNK", 36: "BLU"
};
function switchJob(sourceId, jobId) {
    if(sourceId == me.id && jobId in jobIds) {
        var job = jobIds[jobId];
        if(job !== me.job) {
            me.buffs = {};
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

//addOverlayListener('LogLine', (data) => {console.log(data.line);});

addOverlayListener('LogLine', (data) => {
    logData(data.line);
});
startOverlayEvents();

async function init() {
    let combat = (await callOverlayHandler({ call: 'getCombatants' })).combatants[0];
    me.name = combat.name;
    me.id = (combat.ID).toString(16).toUpperCase();
    switchJob(me.id, combat.Job);

}
init();
