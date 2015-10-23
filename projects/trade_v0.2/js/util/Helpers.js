var Helpers = {
    generateId: function(seed) {
        var id = "" + parseInt(Math.random() * new Date()) + 
            new Date().getMilliseconds();
        return id;
    },

    _generatedShipNames: [],
    _generatedCityNames: [],

    generateShipName: function(unique) {
        var prefixes = ["Old", "Young", "Salty", "Flying", "Brave"],
            names = ["Skipper", "Yeller", "Destroyer", "Sailor", "Maiden", "Explorer"],
            name = prefixes[parseInt(Math.random() * prefixes.length, 10)] + 
                " " + names[parseInt(Math.random() * names.length, 10)];

        return name;
    },

    generateCityName: function(unique) {
        var names = ["Kiev", "Istanbul", "Beirut", "Sochi", "Thessaloniki", 
            "Benghazi", "Bracelona", "Marseille", "Naples"],
            name = names[parseInt(Math.random() * names.length, 10)];

        if (unique) {
            // TODO: copy city array by value, remove _generatedCityNames
        }

        _generatedCityNames.push(name);

        return name;
    }
};

function NS(namespace) {
        var nsparts = namespace.split(".");
        var parent = window;
     
        for (var i = 0; i < nsparts.length; i++) {
            var partname = nsparts[i];
            if (typeof parent[partname] === "undefined") {
                parent[partname] = {};
            }
            parent = parent[partname];
        }
        return parent;
    }