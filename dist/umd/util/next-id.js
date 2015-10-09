(function (global, factory) {
    if (typeof define === "function" && define.amd) {
        define(["exports", "module"], factory);
    } else if (typeof exports !== "undefined" && typeof module !== "undefined") {
        factory(exports, module);
    } else {
        var mod = {
            exports: {}
        };
        factory(mod.exports, mod);
        global.nextId = mod.exports;
    }
})(this, function (exports, module) {
    "use strict";

    module.exports = nextId;
    var idIncr = 0;

    function nextId() {
        var name = arguments.length <= 0 || arguments[0] === undefined ? "" : arguments[0];

        idIncr += 1;
        return name + "-" + idIncr;
    }
});