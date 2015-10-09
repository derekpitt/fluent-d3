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
        global.emptyElement = mod.exports;
    }
})(this, function (exports, module) {
    "use strict";

    module.exports = empty;

    function empty(node) {
        while (node.firstChild) {
            node.removeChild(node.firstChild);
        }
    }
});