define(["exports", "module"], function (exports, module) {
    "use strict";

    module.exports = nextId;
    var idIncr = 0;

    function nextId() {
        var name = arguments.length <= 0 || arguments[0] === undefined ? "" : arguments[0];

        idIncr += 1;
        return name + "-" + idIncr;
    }
});