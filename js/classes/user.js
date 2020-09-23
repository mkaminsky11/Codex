class User {
    constructor() {
        this.id = "";
        this.job = "";
        this.zone = "";
        this.party = {};
    }
    // INIT
    init(id) {
        this.id = id;
    }
    // JOB
    setJob(jobId) {
        if(!(jobId in ji)) { return false; }
        if(this.job !== ji[jobId]) {
            this.job = ji[jobId];
            this.reset();
            console.log("SETJOB " + this.job);
            return true;
        }
        return false;
    }
    // BUFFS
    hasBuff(buffId) {
        return (buffId in this.buffs);
    }
    getBuff(buffId) {
        return this.buffs[buffId];
    }
    iterateBuffs(callback) {
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
    initGBuffs() {
        for(const buffId in actions[this.job].buffs) {
            this.buffs[buffId] = new GBuff(buffId, actions[this.job].buffs[buffId]);
        }
        for(const aliasId in actions[this.job].alias) {
            this.alias[aliasId] = actions[this.job].alias[aliasId];
        }
    }
    // PARTY BUFFS
    initPBuffs() {
        for(const buffId in buffs) {
            this.buffs[buffId] = new PBuff(buffId, buffs[buffId]);
        }
    }
    // PETS
    bindPet(ownerId, petId, petName) {
        if(ownerId !== this.id) { return false; }
        console.log("BIND   " + petName);
        this.pet = {
            id: petId.toUpperCase(),
            name: petName
        };
    }
    // ZONE
    setZone(zone) {
        if(this.zone !== "" && zone !== this.zone) { return false; }
        this.zone = zone;
        return true;
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
        this.pet = {name: "", id: ""};
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