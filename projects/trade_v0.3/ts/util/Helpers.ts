var Helpers = {
    
    _generatedShipNames: Array<String>(),

    _generatedCityNames: Array<String>(),

    generateId(seed?): string {
        var id = "" + Math.floor(Math.random() * new Date().getTime()) + 
            new Date().getMilliseconds();
        return id;
    },

    generateCityName(unique: boolean = false): string {
        var names = ['Kiev', "Istanbul", "Beirut", "Sochi", "Thessaloniki", 
            "Benghazi", "Bracelona", "Marseille", "Naples"],
            name = names[Math.floor(Math.random() * names.length)];

        if (unique) {
            // TODO: copy city array by value, remove _generatedCityNames
        }

        this._generatedCityNames.push(name);

        return name;
    },
    
    generateShipName(unique: boolean = false): string {
        var prefixes = ["Old", "Young", "Salty", "Flying", "Brave"],
            names = ["Skipper", "Yeller", "Destroyer", "Sailor", "Maiden", "Explorer"],
            name = prefixes[Math.floor(Math.random() * prefixes.length)] + 
                " " + names[Math.floor(Math.random() * names.length)];

        return name;
    }
}