const TelegramBot = require('node-telegram-bot-api');
const token = '5635630992:AAFWrEKOnJhg7nkmXCW-A7lvbtWQTHBH4_Y';
const bot = new TelegramBot(token, {
    polling: true
});

const master = 938017717;

const Firebase = require('./service/firebase.js');
const database = new Firebase();

const addressesProcessingS = require('./components/addressesProcessingS/index.js');
const processingS = new addressesProcessingS();

const processingGetClass = require('./components/addressesProcessingG/index.js');
const processingG = new processingGetClass();

const searchingClass = require('./components/searchingModule/index.js');
const searching = new searchingClass();

let addressesData = {};



//bot.sendMessage(master, 'Пожалуйста, ожидайте...');

const questions = [
    "Укажите улицу",
    "Укажите номер дома",
    "Укажите подъезд",
    "Введите код от подъезда",
    "Введите код от калитки, если он отсутствует, то отправьте 'Нет'"
]

const getDataFromUser = (bot, text, user) => {
    bot.sendMessage(user, text);
}

const activateSetMethods = (bot, questions, userId, text) => {
    if (processingS.isFirstQuestion(text)) {
        getDataFromUser(bot, questions[Object.keys(processingS.getAddresses()).length], userId);
    } else if (processingS.isAnyMoreQuestions(text)) {
        processingS.addDataToObj(text); // добавление в объект адреса информации
        console.log(processingS.getAddresses());
        getDataFromUser(bot, questions[Object.keys(processingS.getAddresses()).length], userId);

    } else if (processingS.isLastQuestion()) {
        processingS.addDataToObj(text); // добавление в объект адреса информации

        processingS.chacgeAction(false);

        // отправление данных в бд
        database.postNewData("addresses/", processingS.constructData(), bot, master);
    }

    return 0;
}

const actiovateGetMethods = (bot, user, address) => {
    processingG.startMethods(bot, user, address, database);
}

// database.getDataSocket('addresses/', (cb) => {
//     //console.log(cb);
//     addressesData = cb;
//     searching.searchAddress(cb, "Чистопольская");
// })

actiovateGetMethods(bot, master, "Чист 14 2");

bot.on("message", function(msg){
    let id = msg.chat.id,
        name = msg.chat.first_name,
        text = msg.text;

    
    console.log("id = " + id);
    if (id === master) {

        switch (text) {
            case "/setcode" :
                processingS.chacgeAction('/setcode');
                processingS.changeAdresses({});
                //text = "setstart";
                break;
            case "/getcode" :
                console.log("getcode");
                processingG.changeAction('/getcode');
                processingG.changeAdresses({});
                actiovateGetMethods(bot, master, "Чист 14 2");
                break;
            default :
                break;
        }
    
        
        activateSetMethods(bot, questions, id, text);
        

    }
    

})

let serchedAddress = {};

bot.on("callback_query", function(cb){
    const data = JSON.parse(cb.data);
    const [elem, user, config] = data;

    if (config === "street") {
        processingG.changeAdresses(elem);
        processingG.getDataFromUserG(bot, "Дом?", user, "home", processingG.getDB());
    }

    

})
