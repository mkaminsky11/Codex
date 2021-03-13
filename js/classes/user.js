import {GBuff} from './gaugeBuff.js'
import {PBuff} from './partyBuff.js'
import {jobIds} from '../general/ids.js'

class User {
    constructor() {
        this.id = '';
        this.job = '';
        this.zone = '';
        this.party = {};
        this.lastCast = {};
    }
    init(id) {
        this.id = id;
    }
    setJob(jobId) {
        if(!(jobId in jobIds)) { return false; }
        if(this.job !== jobIds[jobId]) {
            this.job = jobIds[jobId];
            this.reset();
            console.log(`SETJOB ${this.job}`);
            return true;
        }
        return false;
    }
    usesBuff(buffId) {
        return (buffId in this.buffs);
    }
    getBuff(buffId) {
        return this.buffs[buffId];
    }
    getIconName(buff){
        return buff.data.name.toLowerCase().replace(/[ ]/g, '');
    }
    allBuffs(callback) {
        for(const i in this.buffs) {
            callback(this.buffs[i]);
        }
    }
    hasAlias(buffId) {
        return (buffId in this.alias);
    }
    getAlias(buffId) {
        return this.alias[buffId];
    }
    // GAUGES
    initGBuffs(actions) {
        for(const buffId in actions[this.job].buffs) {
            this.buffs[buffId] = new GBuff(buffId, actions[this.job].buffs[buffId]);
        }
        for(const aliasId in actions[this.job].alias) {
            this.alias[aliasId] = actions[this.job].alias[aliasId];
        }
    }
    // PARTY BUFFS
    initPBuffs(buffs, configAllPersonals, configOwnPersonals, configDisabledBuffs) {
        var allPersonals = (this.job === 'AST') || configAllPersonals;
        for(const jobId in buffs) {
            for(const buffId in buffs[jobId]) {
                var buff = buffs[jobId][buffId];
                if(configDisabledBuffs[buffId]) { continue; }
                if( buff.self ||
                    buff.target || 
                    allPersonals || 
                    (jobId == this.job && configOwnPersonals)
                ) {
                    this.buffs[buffId] = new PBuff(buffId, jobId, buff);
                }
            }
        }
    }
    // PETS
    bindPet(ownerId, petId, petName) {
        if(ownerId !== this.id) { return false; }
        console.log(`BIND ${petName}`);
        this.pet = {
            id: petId.toUpperCase(),
            name: petName
        };
    }
    // ZONE
    setZone(zone) {
        if(this.zone !== '' && zone !== this.zone) { 
            this.zone = zone;
            return false;
        }
        this.zone = zone;
        return true;
    }
    exploreZone() {
        if(this.zone == 920) {
            return true;
        }
        return false;
    }
    // PARTY
    changeParty(party) {
        this.party = {};
        for(var i = 0; i < party.length; i++) {
            if(party[i].inParty) {
                this.party[party[i].id] = true;
            }
        }
    }
    inParty(id) {
        return (id === this.id || id in this.party);
    }
    // RESET TIMERS AND STUFF
    resetAttrs() {
        this.intervals = {};
        this.timers = {};
        this.buffs = {};
        this.alias = {};
        this.pet = {name: '', id: ''};
    }
    reset() {
        this.resetIntervals();
        this.resetTimers();
        this.resetAttrs();
    }
    resetInterval(buffId) {
        clearInterval(this.intervals[buffId]);
    }
    resetIntervals() {
        for(const id in this.intervals) { this.resetInterval(id); }
    }
    resetTimer(buffId) {
        clearTimeout(this.timers[buffId]);
    }
    resetTimers() {
        for(const id in this.timers) { this.resetTimer(id); }
    }
}

export {User}