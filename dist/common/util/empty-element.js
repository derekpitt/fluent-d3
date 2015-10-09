"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports["default"] = empty;

function empty(node) {
    while (node.firstChild) {
        node.removeChild(node.firstChild);
    }
}

module.exports = exports["default"];