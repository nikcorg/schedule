import debug from "debug";
import moment from "moment";
import data from "../../data/schedule";
import React from "react";
import { App } from "./components/app";

const log = debug("app:app");

const initialState = {
    main: {
        view: "default"
    }
};

let currentState = initialState;

function getState() {
    return { ...currentState };
}

function updateState(branch, patch) {
    if ("." === branch) {
        currentState = { ...currentState, ...patch };
    } else {
        currentState = { ...currentState, [branch]: patch };
    }

    return getState();
}

function renderMain(props) {
    React.render(
        React.createElement(App, props),
        document.querySelector("body")
    );
}

export function start() {
    // Wrapped update so state updates re-render the app
    let wrappedUpdate = (...update) => {
        updateState(...update);
        renderMain({ getState, updateState: wrappedUpdate });
    };

    // Really ugly hack to include the date in the session start time
    Object.keys(data.days).forEach(d => {
        Object.keys(data.days[d].tracks).forEach(t => {
            data.days[d].tracks[t].forEach(s => {
                s.start = new Date(d + " " + s.start);
            });
        });
    });

    wrappedUpdate(".", { ...initialState, ...data });
}
