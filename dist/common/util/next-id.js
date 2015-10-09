"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports["default"] = nextId;
var idIncr = 0;

function nextId() {
    var name = arguments.length <= 0 || arguments[0] === undefined ? "" : arguments[0];

    idIncr += 1;
    return name + "-" + idIncr;
}

module.exports = exports["default"];