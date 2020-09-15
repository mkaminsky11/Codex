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
    var actionId = line[4];
    //var targetId = line[6];
    var actionName = line[5];
    if(debug){
        console.log("ACTION     " + actionName + "  " + actionId);
    }

    if(casterId == me.id) {
        for(buffId in me.buffs) {
            if(me.buffs[buffId] != false) {
                if(actions[me.job].buffs[buffId].type === "gcds") { // KEEPING TRACK OF GCDS
                    if(actions[me.job].buffs[buffId].ids.indexOf(actionId) !== -1) {
                        me.buffs[buffId].count++;
                        setCount(buffId, me.buffs[buffId].count);
                    }
                }
            }
        }
    }
}

function gainBuff(line){
    var buffId = line[2];
    var buffTime = parseFloat(line[4]);
    var sourceId = line[5];
    //var targetId = line[7];
    var buffName = line[3];
    if(debug) {
        console.log("BUFF     " + buffName + " - " + buffId);
    }

    if(sourceId == me.id && buffId in actions[me.job].buffs) {
        if(actions[me.job].buffs[buffId].type === "gcds") { // KEEPING TRACK OF GCDS
            me.buffs[buffId] = {
                type: "gcds",
                max: actions[me.job].buffs[buffId].max,
                count: 0
            };
        }
        else if(actions[me.job].buffs[buffId].type === "timer") { // KEEPING TRACK OF TIMERS
            me.buffs[buffId] = {
                type: "timer",
                startTime: (new Date(line[1])).getTime(),
                max: actions[me.job].buffs[buffId].max,
                count: parseFloat(buffTime)
            };
            if(!(buffId in me.intervals)) {
                me.intervals[buffId] = setInterval(function(){
                    if(me.buffs[buffId] != false) {
                        var count = 2 + me.buffs[buffId].count - ((new Date()).getTime() - me.buffs[buffId].startTime) / 1000; // have to offset this for some reason
                        setCount(buffId, Math.max(0,count));
                    }
                }, REFRESH);
            }
        };
    }
}

function loseBuff(line){
    var buffId = line[2];
    var targetId = line[7];
    if(debug) {
        console.log("LOSEBUFF   " + buffId);
    }

    if(targetId == me.id && me.buffs[buffId] != false) {
        if(me.buffs[buffId].type === "gcds") {
        }
        else if(me.buffs[buffId].type === "timer") {
            clearInterval(me.intervals[buffId].interval);
        }
        me.buffs[buffId] = false;
        setTimeout(function(){
            setCount(buffId, 0);
        }, TIMEOUT);
    }
    
}

function resize(){
}

function reload(){
    location.reload();
}

//addOverlayListener('LogLine', (data) => {
//  console.log(data.line);
//});
addOverlayListener('onPlayerChangedEvent', (data) => {
    var name = data.detail.name;
    var id = (data.detail.id).toString(16).toUpperCase();
    var job = data.detail.job;
    if(name !== me.name || id !== me.id || job !== me.job) {
        me.name = name;
        me.id = id;
        me.job = job;
        me.buffs = {};
        for(buffId in actions[job].buffs) {
            me.buffs[buffId] = false;
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