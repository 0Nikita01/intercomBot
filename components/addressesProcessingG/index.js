module.exports = class processingGetClass {
    constructor() {
        this.action = false;
        this.address = {};
        this.db = {};
    }

    

    changeAction = (act) => {
        this.action = act;
    }

    changeAdresses = (addr) => {
        this.address = addr;
    }

    getDB = () => {
        return this.db;
    }

    startMethods = (bot, user, address, database) => {
        database.getDataOnce("addresses/").then(value => {
            this.db = value.val();
            //this.getDataFromUserG(bot, "Выберите улицу", user, "street", this.db);
            this.getDataFromUserG(bot, "ДОМ?", user, "home", this.db);
            //let foundAddress = searching.searchAddress(db, address);
    
            //console.log(foundAddress);
        })
    }

    getDataFromUserG = (bot, text, user, act, streets) => {
        const keyboardStreets = this.construcDataForKeyboard(Object.values(streets), user, act);
        //console.log(keyboardStreets);
        bot.sendMessage(user, text, {
            reply_markup: JSON.stringify({
                inline_keyboard: keyboardStreets,
                resize_keyboard: true,
                one_time_keyboard: true,
            })
        })
    }

    construcDataForKeyboard = (data, user, act) => {
        let arr = [[]];
        if (act === "street") {
            arr = data.map((item,index)=>{
                return ([
                    {
                        text: item.street,
                        callback_data: JSON.stringify([item.street, user, "street"]) 
                    }
                ])
            })
        }

        if (act === "home") {
            let i = 0, j = 0;
            // arr.push([{
            //     text: "#        Выберите из списка      #",
            //     callback_data: JSON.stringify(["false", user, "entrance"]),
            // }])
            // arr.push([]);
            // j++;
            for  (let elem in data) {
                console.log(elem);
                arr[j].push({
                    text: data[elem].home,
                    callback_data: JSON.stringify([data[elem].home, user, "entrance"]),
                })
                if (i === 2) {
                    j++;
                    arr.push([]);
                    i = -1;
                }
                i++;
                console.log(arr);
            }
            arr.push([{
                text: "#            В списке дом отсутствует            #",
                callback_data: JSON.stringify([false, user, "notfoundhome"]),
            }])
            // arr = data.map((item, index) => {
            //     return ([
            //         {
            //             text: item.home,
            //             callback_data: JSON.stringify([item.home, user, "entrance"]) 
            //         }
            //     ])
            // }) 
        }
        //console.log(arr);
        return arr;
    }

    
}