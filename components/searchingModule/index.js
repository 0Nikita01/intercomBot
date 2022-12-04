module.exports = class SearchingElement {
    searchAddress = (data, elem) => {
        let foundAddress = null;
        let foundEntrance = null;
        const sepAddress = this.separationAddress(elem);

        console.log(sepAddress);

        for (let key in data) {
            //console.log(data[key]);
            if (data[key].street === sepAddress[0] && data[key].home === sepAddress[1]) {
                foundAddress = data[key];
                for (let key in foundAddress.entrances) {
                    if (foundAddress.entrances[key].number === sepAddress[2]) {
                        foundEntrance = foundAddress.entrances[key];
                        break;
                    }
                }
                break;
            }
        }

        //console.log(foundAddress);
        //console.log(foundEntrance);

        return this.convertAddress({
            address: foundAddress,
            entrance: foundEntrance
        });
    }

    convertAddress = (obj) => {
        return (
            {
                isEntranceExists: obj.entrance ? true : false,
                code: obj.entrance ? obj.entrance.code : obj.address.entrances,
                gate: obj.address.gate
            }
        )
    }

    separationAddress = (str) => {
        return str.split(" ");
    }
}