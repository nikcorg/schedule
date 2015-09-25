import debug from "debug";
import data from "../../data/schedule";
import React from "react";
import { App } from "./components/app";

const log = debug("app:app");

const OE_GUESSTIMATE = 180;

const initialState = {
    main: {
        view: "next-up"
    },
    time: {
        today: new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate()),
        now: new Date()
    },
    update: {
        available: false
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
        currentState = { ...currentState, [branch]: { ...currentState[branch], ...patch } };
    }

    return true;
}

function renderMain(props) {
    React.render(
        React.createElement(App, props),
        document.querySelector("body")
    );
}

function normaliseSessionData(conference) {
    let days = Object.keys(data.days).map((d, did) => {
        return { id: did, date: new Date(d), tracks: data.days[d].tracks };
    });

    let tracks = days.map(day => {
        return Object.keys(day.tracks).map(t => ({ name: t, day: day.id, sessions: day.tracks[t] }));
    }).
    reduce((a, ts) => a.concat(ts), []).
    map((t, tid) => ({ id: tid, ...t }));

    let sessions = tracks.map(track => {
        return track.sessions.map(s => ({ ...s, track: track.id, start: new Date(days[track.day].date).setHours(...s.start.split(":")) }));
    }).
    reduce((a, ts) => a.concat(ts), []).
    map((s, sid) => ({ id: sid, ...s }));

    return { ...conference, days, tracks, sessions };
}

function updateUpcomingSessions(state) {
    const { sessions, time: { now } } = state;

    let upcoming = sessions.filter(s => now <= s.start).sort((a, b) => a.start - b.start).map(s => s.id);

    return updateState("upcoming", { sessions: upcoming });
}

function updateCurrentSessions(state) {
    const { sessions, time: { now } } = state;

    let current = sessions.filter(s => {
        let duration = (s.hasOwnProperty("duration") ? s.duration : OE_GUESSTIMATE) * 60 * 1000;
        let sessionEnd = Number(s.start) + duration;
        return now >= s.start && Number(now) <= sessionEnd;
    }).
    sort((a, b) => a.start - b.start).
    map(s => s.id);

    return updateState("current", { sessions: current });
}

function updateTimer() {
    return updateState("time", { now: new Date() });
}

export function start() {
    // Wrapped update so state updates re-render the app
    let wrappedUpdate = (...update) => {
        if (updateState(...update)) {
            renderApp();
        }
    };

    let renderApp = () => {
        renderMain({ getState, updateState: wrappedUpdate });
    };

    let tick = () => {
        let updates = [
            updateTimer(),
            updateUpcomingSessions(getState()),
            updateCurrentSessions(getState())
        ];

        if (updates.some(u => u)) {
            renderApp();
        }

        setTimeout(tick, 1000);
    };

    // Subscribe to AppCache events so we can show a notice when an update is available
    window.applicationCache.addEventListener(
        "updateready",
        () => updateState("update", { available: true }),
        false);

    // initial state
    updateState(".", { ...initialState, ...normaliseSessionData(data) });

    // Start ticking
    tick();
}
