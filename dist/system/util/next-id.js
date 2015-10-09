System.register([], function (_export) {
    "use strict";

    var idIncr;

    _export("default", nextId);

    function nextId() {
        var name = arguments.length <= 0 || arguments[0] === undefined ? "" : arguments[0];

        idIncr += 1;
        return name + "-" + idIncr;
    }

    return {
        setters: [],
        execute: function () {
            idIncr = 0;
        }
    };
});