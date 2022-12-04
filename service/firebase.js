const { initializeApp } = require('firebase/app');
const { getDatabase, ref, set, onValue, get, child, push} = require('firebase/database');

const firebaseConfig = {
    apiKey: "AIzaSyA4Zp1fqPYyf3C_Wx4wT32_GIFMM8uNEF0",
    authDomain: "intercomcode-e986e.firebaseapp.com",
    projectId: "intercomcode-e986e",
    storageBucket: "intercomcode-e986e.appspot.com",
    messagingSenderId: "1066298968395",
    appId: "1:1066298968395:web:1462557d7047716cad40ce"
};

module.exports = class Firebase {
    constructor() {
        this.app = initializeApp(firebaseConfig);
        this.database = getDatabase(this.app);
        //this.success = "Данные сохранены успешно!";
        //this.failure = "Произошла ошибка, попробуйте ввести и отправить данные заново"
    }

    getDataSocket = (path, cb) => {
        const reference = ref(this.database, path);
        
        onValue(reference, (snapshot) => {
            cb(snapshot.val());
        })
    }

    postNewData = (path, data, bot, user) => {
        const newKey = push(child(ref(this.database), path)).key;
        let success = "Данные сохранены успешно!";
        let failure = "Произошла ошибка, попробуйте ввести и отправить данные заново";

        set(ref(this.database, path + newKey), data).then(() => {
            bot.sendMessage(user, success);
          })
        .catch((error) => {
            bot.sendMessage(user, failure);
          });
	}

    postData = (path, data, bot, user) => {
        let success = "Данные сохранены успешно!";
        let failure = "Произошла ошибка, попробуйте ввести и отправить данные заново";

        set(ref(this.database, path), data).then(() => {
            bot.sendMessage(user, success);
          })
          .catch((error) => {
            bot.sendMessage(user, failure);
          });
    }

    getDataOnce = async (path) => {
        const dbRef = ref(this.database);
        return await get(child(dbRef, path));
    }

    
}