var me = {
    buffs: {},
    intervals: {}
};

var TIMEOUT = 5000;
var REFRESH = 100;
var debug = false;

function logData(line){
    switch(line[0]){
        case "21":
            logAction(line);
            break;
        case "22":
            logAction(line);
            break;
        case "26":
            gainBuff(line);
            break;
        case "30":
            loseBuff(line);
            break;
    }
}

function logAction(line){
    var casterId = line[2];

    if(casterId == me.id) {
        var actionId = line[4];
        var actionName = line[5];
        if(debug){ console.log("ACTION     " + actionName + "  " + actionId);}
        //
        for(buffId in me.buffs) {
            if(me.buffs[buffId].active) {
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
    }
}

function gainBuff(line){
    var sourceId = line[5];

    if(sourceId == me.id) {
        var buffId = line[2];
        var buffTime = parseFloat(line[4]);
        var buffName = line[3];
        if(debug) { console.log("BUFF     " + buffName + " - " + buffId); }
        //
        if(buffId in actions[me.job].buffs) {
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
                        startTime: (new Date(line[1])).getTime(),
                        max: actions[me.job].buffs[buffId].max,
                        count: parseFloat(buffTime),
                        active: true
                    };
                    if(!(buffId in me.intervals)) {
                        me.intervals[buffId] = setInterval(function(){
                            if(buffId in me.buffs && me.buffs[buffId].active) {
                                var count = 1 + me.buffs[buffId].count - ((new Date()).getTime() - me.buffs[buffId].startTime) / 1000; // have to offset this for some reason
                                setCount(buffId, Math.max(0,count));
                            }
                        }, REFRESH);
                    }
                    break;
            }
        }
    }
}

function loseBuff(line){
    var buffId = line[2];
    var targetId = line[7];

    if(targetId == me.id && buffId in me.buffs &&  me.buffs[buffId].active) {
        if(debug) { console.log("LOSEBUFF   " + buffId); }
        //
        switch(me.buffs[buffId].type) {
            case "gcds":
                break;
            case "timer":
                clearInterval(me.intervals[buffId]);
                break;
        }
        me.buffs[buffId].active = false;
        setTimeout(function(){
            setCount(buffId, 0);
        }, TIMEOUT);
    }
    
}

function resize(){
}

//addOverlayListener('LogLine', (data) => {
//  console.log(data.line);
//});
addOverlayListener('onPlayerChangedEvent', (data) => {
    var job = data.detail.job;
    if(job !== me.job) {
        var name = data.detail.name;
        var id = (data.detail.id).toString(16).toUpperCase();

        me.name = name;
        me.id = id;
        me.job = job;
        me.buffs = {};
        for(buffId in actions[job].buffs) {
            me.buffs[buffId] = {active: false};
        }
        console.log("SETJOB " + job);
        setJob(job);
    }
});
addOverlayListener('LogLine', (data) => {
    logData(data.line);
});
startOverlayEvents();

window.onresize = resize;
resize();