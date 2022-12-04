

module.exports = class adressesProcesingS {
    constructor() {
        this.address = {};
        this.objNames = [
            "street", "home", "entrances", "enCode", "gate"
        ];
        this.action = false;
    }

    constructData = () => {
        const data = {
            street: this.address.street,
            home: this.address.home,
            entrances:[
                {number: this.address.entrances, code: this.address.enCode}
            ],
            gate: this.address.gate
        }
    
        return data;
        
    }
    
    addDataToObj = (text) => {
        this.address[this.objNames[Object.keys(this.address).length]] = text;
    }

    isFirstQuestion = (text) => {
        return this.action === '/setcode' && text === '/setcode';
    }
    
    isAnyMoreQuestions = (text) => {
        return this.action === '/setcode' && Object.keys(this.address).length < 4 && text !== '/setcode';
    }
    
    isLastQuestion = () => {
        return this.action === '/setcode' && Object.keys(this.address).length === 4;
    }

    chacgeAction = (act) => {
        this.action = act;
    }

    changeAdresses = (addr) => {
        this.address = addr;
    }

    getAddresses = () => {
        return this.address;
    }
}