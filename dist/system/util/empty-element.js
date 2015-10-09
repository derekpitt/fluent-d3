System.register([], function (_export) {
    "use strict";

    _export("default", empty);

    function empty(node) {
        while (node.firstChild) {
            node.removeChild(node.firstChild);
        }
    }

    return {
        setters: [],
        execute: function () {}
    };
});