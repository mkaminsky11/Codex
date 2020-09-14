var me = {
    buffs: {}
};

var TIMEOUT = 5000;

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

    console.log("ACTION     " + actionName + "  " + actionId);

    if(casterId == me.id) {
        for(buffId in me.buffs) {
            if(actions[me.job].buffs[buffId].ids.indexOf(actionId) !== -1) {
                me.buffs[buffId].count++;
                setCount(buffId, me.buffs[buffId].count);
            }
        }
    }
}

function gainBuff(line){
    var buffId = line[2];
    var sourceId = line[5];
    //var targetId = line[7];
    var buffName = line[3];

    console.log("BUFF     " + buffName + " - " + buffId);

    if(sourceId == me.id && buffId in actions[me.job].buffs) {
        var duration = actions[me.job].buffs[buffId].time * 1000;
        var time = (new Date()).getTime();
        me.buffs[buffId] = {
            startTime: time,
            endTime: time + duration,
            duration: duration,
            max: actions[me.job].buffs[buffId].max,
            count: 0
        };
    }
}

function loseBuff(line){
    var buffId = line[2];
    var targetId = line[7];

    console.log("LOSEBUFF   " + buffId);

    if(targetId == me.id && buffId in me.buffs) {
        delete me.buffs[buffId];
        setTimeout(function(){
            setCount(buffId, 0);
        }, TIMEOUT);
    }
    
}

function resize(){
}


addOverlayListener('onPlayerChangedEvent', (data) => {
    var name = data.detail.name;
    var id = (data.detail.id).toString(16).toUpperCase();
    var job = data.detail.job;
    if(name !== me.name || id !== me.id || job !== me.job) {
        me.name = name;
        me.id = id;
        me.job = job;
        me.buffs = {};
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