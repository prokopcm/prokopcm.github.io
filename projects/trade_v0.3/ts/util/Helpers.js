var Helpers = {
    _generatedShipNames: Array(),
    _generatedCityNames: Array(),
    generateId: function (seed) {
        var id = "" + Math.floor(Math.random() * new Date().getTime()) +
            new Date().getMilliseconds();
        return id;
    },
    generateCityName: function (unique) {
        if (unique === void 0) { unique = false; }
        var names = ['Kiev', "Istanbul", "Beirut", "Sochi", "Thessaloniki",
            "Benghazi", "Bracelona", "Marseille", "Naples"], name = names[Math.floor(Math.random() * names.length)];
        if (unique) {
        }
        this._generatedCityNames.push(name);
        return name;
    },
    generateShipName: function (unique) {
        if (unique === void 0) { unique = false; }
        var prefixes = ["Old", "Young", "Salty", "Flying", "Brave"], names = ["Skipper", "Yeller", "Destroyer", "Sailor", "Maiden", "Explorer"], name = prefixes[Math.floor(Math.random() * prefixes.length)] +
            " " + names[Math.floor(Math.random() * names.length)];
        return name;
    }
};
//# sourceMappingURL=Helpers.js.map