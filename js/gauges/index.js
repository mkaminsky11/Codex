import {User} from '../classes/user.js'
import {gaugeConfig} from './actions.js'
import {setJobUI, setGaugeValue, addGlow, removeGlow, clearDanger, hide, unHide} from './visual.js'
import {getSettings} from './settings.js'
import {setup} from '../general/init.js'

var user = new User();
var config = getSettings();
var TIMEOUT = config.timeout;
var REFRESH = config.refresh;
var debug = false;

function logAction(sourceId, actionId, actionName, targetId, isAoe){
    if(sourceId == user.id || sourceId == user.pet.id) {
        // ignore multihit for aoe
        if(isAoe) {
            var time = (new Date()).getTime();
            if(actionId in user.lastCast && (time - user.lastCast[actionId] < 100)) { return; }
            user.lastCast[actionId] = time;
        }
        if(debug){ console.log(`ACTION ${actionId} ${actionName}`); }

        user.allBuffs(function(buff) { // count action usage towards gauge (ie, fell cleaves under IR)
            if(buff.active && buff.type === 'gcds' && buff.usesId(actionId)) {
                buff.count++;
                setGaugeValue(buff.id, buff.count, user, config);
            }
        });
        if(user.usesBuff(actionId)) { // treat action like buff
            var buff = user.getBuff(actionId);
            gainBuff(sourceId, targetId, actionId, buff.data.time, actionName);
            user.resetTimer(actionId);
            user.timers[actionId] = setTimeout(function() {
                loseBuff(sourceId, targetId, actionId, actionName);
            }, 1000 * buff.data.time);
        }
        if(user.hasAlias(actionId)) {
            logAction(sourceId, user.getAlias(actionId), actionName, targetId, isAoe);
        }
    }
}

function gainBuff(sourceId, targetId, buffId, buffTime, buffName){
    if(sourceId == user.id) {
        if(debug) { console.log(`BUFF ${buffId} ${buffName}`); }
        //
        if(user.usesBuff(buffId)) {
            var buff = user.getBuff(buffId);
            if(buff.active && buff.data.noRefresh) { return; } // block refreshing
            switch(buff.type) {
                case 'gcds':
                    buff.count = 0;
                    buff.active = true;
                    break;
                case 'timer':
                    buff.startTime = (new Date()).getTime();
                    buff.count = parseFloat(buffTime);
                    buff.active = true;
                    user.resetInterval(buffId);
                    user.intervals[buffId] = setInterval(function() { // automatically expire after set amount of time
                        if(user.usesBuff(buffId)) {
                            var b_ = user.getBuff(buffId);
                            if(b_.active) {
                                var count = b_.count - ((new Date()).getTime() - b_.startTime) / 1000;
                                setGaugeValue(buffId, Math.max(0,count), user, config);
                            }
                        }
                    }, REFRESH);
                    break;
            }

            /*if(user.exploreZone()) { // TODO: exploration zones are wonky
                user.resetTimer(buffId);
                user.timers[buffId] = setTimeout(function() {
                    loseBuff(sourceId, targetId, buffId, buffName);
                }, 1000 * parseFloat(buffTime));
            }*/

            if(config.glow) {
                addGlow(buffId);
            }
            if(buff.data.hides) { // buff hides another bar
                hide(buff.data.hides);
                unHide(buffId);
            }
        }
        if(user.hasAlias(buffId)) {
            gainBuff(sourceId, targetId, user.getAlias(buffId), buffTime, buffName);
        }
    }
}

function loseBuff(sourceId, targetId, buffId, buffName){
    if(sourceId == user.id) {
        if(user.usesBuff(buffId)) {
            var buff = user.getBuff(buffId);
            if(buff.active) {
                if(debug) { console.log(`LOSEBUFF ${buffId} ${buffName}`); }
                //
                switch(buff.type) {
                    case 'gcds':
                        break;
                    case 'timer':
                        user.resetInterval(buffId);
                        setGaugeValue(buffId, 0, user, config);
                        break;
                }
                buff.active = false;
                setTimeout(function() {
                    setGaugeValue(buffId, 0, user, config);
                }, TIMEOUT)
                if(config.glow) {
                    removeGlow(buffId);
                }
            }
            if(user.hasAlias(buffId)) {
                loseBuff(sourceId, targetId, user.getAlias(buffId), buffName);
            }
        }
    }
}

function switchJob(jobId) {
    if(user.setJob(jobId)) {
        user.initGBuffs(gaugeConfig);
        setJobUI(user, config);
    }
}
function reload() {
    user.reset();
    user.initGBuffs(gaugeConfig);
    clearDanger();
    setJobUI(user, config);
}


function parseJob(sourceId, jobId) {
    if(sourceId == user.id) {
        switchJob(jobId);
    }
}
function bindPet(ownerId, petId, petName){
    user.bindPet(ownerId, petId, petName);
}
function wipe(){
    location.reload();
}
setup(
    logAction,
    gainBuff,
    loseBuff,
    parseJob,
    bindPet,
    wipe,
    // =========
    (playerId) => {
        if(user.id !== '' && playerId !== user.id) { location.reload(); }
    },
    (zoneId) => {
        if(!user.setZone(zoneId)) { reload(); }
    },
    (party) => {},
    (playerId, playerJob) => {
        user.init(playerId);
        switchJob(playerJob);
    }
)