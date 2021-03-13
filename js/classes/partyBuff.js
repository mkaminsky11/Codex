class PBuff {
    constructor(id, job, data) {
        this.id = id;
        this.active = false;
        this.cd = false;
        this.self = data.self;
        this.target = data.target;
        this.party = data.party;
        this.job = job;
        
        this.data = data;
    }
}
export {PBuff}