import {User} from '../classes/user.js'
import {buffConfig} from './buffs.js'
import {setupBuffsUI, setTimeUI, hide, unHide, buffOnCdUI, buffReadyUI, buffActiveUI} from './visual.js'
import {getSettings} from './settings.js'
import {setup} from '../general/init.js'

var user = new User();
var config = getSettings();
var REFRESH = config.refresh;
var SHOW_CD = 30;
var debug = false;

function logAction(sourceId, actionId, actionName, targetId, isAoe){
    if(user.usesBuff(actionId)) {
        gainBuff(sourceId, targetId, actionId, user.getBuff(actionId).data.duration, actionName);
    }
}
function gainBuff(sourceId, targetId, buffId, buffTime, buffName){
    if(user.usesBuff(buffId)) {
        var buff = user.getBuff(buffId);
        if(
            (buff.target && user.inParty(sourceId)) ||
            (buff.self   && targetId === user.id)   ||
            (buff.party  && user.inParty(sourceId))
        ) {
            if(debug) { console.log(`BUFF ${buffId} ${buffName}`); }
            //
            if(buff.data.noRefresh && buff.active) { return; }
            buff.active = true;
            buff.cd = false;
            buff.startTime = (new Date()).getTime();
            buff.duration = buff.data.duration;
            unHide(buffId);
            buffActiveUI(buffId);
            setTimeUI(buffId, buff.data.duration, buff.data.duration, user, config);
            user.resetInterval(buffId);
            user.intervals[buffId] = setInterval(function() {
                if(user.usesBuff(buffId)) {
                    var b_ = user.getBuff(buffId);
                    if(b_.active) {
                        var timeLeft = b_.duration - ((new Date()).getTime() - b_.startTime) / 1000;
                        setTimeUI(buffId, Math.max(0,timeLeft), b_.duration, true, user, config);
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
    if(debug) { console.log(`LOSEBUFF ${buffId} ${buffName}`); }
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
        if(user.usesBuff(buffId)) {
            var b_ = user.getBuff(buffId);
            if(b_.cd) {
                var timeLeft = b_.duration - ((new Date()).getTime() - b_.startTime) / 1000;
                setTimeUI(buffId, Math.max(0,timeLeft), b_.duration, false, user, config);
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

function switchJob(jobId) {
    if(user.setJob(jobId)) {
        user.initPBuffs(buffConfig, config.all_personals, config.own_personals, config.buffs_disabled);
        setupBuffsUI(user, config);
    }
}

function reload() {
    user.reset();
    user.initPBuffs(buffConfig, config.all_personals, config.own_personals, config.buffs_disabled);
    setupBuffsUI(user, config);
}

function parseJob(sourceId, jobId) {
    if(sourceId == user.id) {
        switchJob(jobId);
    }
}
function wipe(){
    reload();
}
function bindPet(ownerId, petId, petName){
}

setup(
    logAction,
    gainBuff,
    loseBuff,
    parseJob,
    bindPet,
    wipe,
    // ==========
    (playerId) => {
        if(user.id !== '' && playerId !== user.id) { location.reload(); }
    },
    (zoneId) => {
        if(!user.setZone(zoneId)) { reload(); }
    },
    (party) => {
        user.changeParty(party);
    },
    (playerId, playerJob) => {
        user.init(playerId);
        switchJob(playerJob);
    }
)