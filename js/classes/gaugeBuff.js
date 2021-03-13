class GBuff {
    constructor(id, data) {
        this.id = id;
        this.active = false;
        this.type = data.type;
        this.max = data.max;
        this.count = 0;

        this.data = data;
    }

    usesId(id) {
        if(this.type !== 'gcds') { return false; }
        return (this.data.ids.indexOf(id) !== -1);
    }
}
export {GBuff}