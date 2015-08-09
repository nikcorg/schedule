import debug from "debug";

const debugMask = process.env.DEBUG || "*";

if ("production" !== process.env.NODE_ENV) {
    debug.enable(debugMask);
} else {
    debug.disable();
}

const log = debug("bootstrap");

function domready(f) {
    if ("undefined" === typeof document) {
        throw new Error(require("path").basename(__filename) + " is browser only");
    }

    if (/interactive|complete/.test(document.readyState)) {
        f();
    } else {
        document.addEventListener("DOMContentLoaded", f);
    }
}

function start() {
    log("starting app, build version=%s", document.querySelector("html").dataset.buildVersion);
    require("./app").start();
}

domready(start);
