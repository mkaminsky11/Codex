class PBuff {
    constructor(id, data) {
        this.id = id;
        this.active = false;
        this.cd = false;
        this.self = data.self;
        this.target = data.target;
        this.party = data.party;

        this.data = data;
    }
}