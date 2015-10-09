define(["exports", "module"], function (exports, module) {
    "use strict";

    module.exports = empty;

    function empty(node) {
        while (node.firstChild) {
            node.removeChild(node.firstChild);
        }
    }
});