module.exports = class processingGetClass {
    constructor() {
        this.action = false;
        this.address = {};
    }

    

    changeAction = (act) => {
        this.action = act;
    }

    changeAdresses = (addr) => {
        this.address = addr;
    }

    startMethods = (bot, user, address, database) => {
        database.getDataOnce("addresses/").then(value => {
            let db = value.val();
            
            this.getDataFromUserG(bot, "Выберите улицу", user, "street", db);

            //let foundAddress = searching.searchAddress(db, address);
    
            //console.log(foundAddress);
        })
    }

    getDataFromUserG = (bot, text, user, act, streets) => {
        if (act === "street") {
            const keyboardStreets = this.construcDataForKeyboard(Object.values(streets), user);
            console.log(keyboardStreets);
            bot.sendMessage(user, text, {
                reply_markup: JSON.stringify({
                    inline_keyboard: keyboardStreets,
                    resize_keyboard: true,
                    one_time_keyboard: true
                })
            })
        }
    }

    construcDataForKeyboard = (data, user) => {
        let arr = data.map((item,index)=>{
            return ([
                {
                    text: item.street,
                    callback_data: JSON.stringify([item.street, user]) 
                }
            ])
        })

        return arr;
    }

    
}