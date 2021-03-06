import debug from "debug";
import data from "../../data/schedule";
import React from "react";
import { getState, updateState, onUpdate } from "./store";
import { App } from "./components/app";

const log = debug("app:app");

const OE_GUESSTIMATE = 180;

const initialState = {
    main: {
        view: "next-up"
    },
    time: {
        today: new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate()),
        now: 0
    },
    update: {
        available: false
    },
    favourites: {
        sessions: []
    },
    daylist: {
        mode: "filtered"
    }
};

function renderMain(props) {
    React.render(
        React.createElement(App, props),
        document.querySelector("body")
    );
}

function normaliseSessionData(conference) {
    let days = Object.keys(conference.days).map((d, did) => {
        return { id: did, date: new Date(d), tracks: data.days[d].tracks };
    }).
    map(day => {
        return {
            ...day,
            tracks: Object.keys(day.tracks).map(t => ({ name: t, day: day.id, sessions: day.tracks[t] }))
        };
    });

    let tracks = days.map(d => d.tracks).
    reduce((a, ts) => a.concat(ts), []).
    map((t, tid) => ({ id: tid, ...t }));

    let sessions = tracks.map(track => {
        return track.sessions.map(s => ({ ...s, track: track.id, start: new Date(days[track.day].date).setHours(...s.start.split(":")) }));
    }).
    reduce((a, ts) => a.concat(ts), []).
    map((s, sid) => ({ id: sid, ...s }));

    // Drop sessions from tracks
    tracks = tracks.map(t => {
        let { sessions, ...rest } = t;
        return rest;
    });

    // Drop tracks from days
    days = days.map(d => {
        let { tracks, ...rest } = d;
        return rest;
    });

    return { ...conference, sessions, tracks, days };
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

function updateTimer(state) {
    let { time } = state;
    let now = new Date();

    let tzDiff = (now.getTimezoneOffset() - state.event.tzOffset) * 60 * 1000;

    if (now !== time.now) {
        return updateState("time", { now: new Date(Number(now) + tzDiff) });
    }

    return false;
}

let getPersistedState = (keys) => {
    return keys.map(key => {
        let defaultValue = initialState[key];
        let serialised = localStorage.getItem(key);

        let value = null == serialised ? defaultValue : JSON.parse(serialised);

        return { [key]: value };
    }).
    reduce((a, v) => ({ ...a, ...v }), {});
};

let setPersistedState = (key, state) => {
    if (state.hasOwnProperty(key) && null != state[key]) {
        localStorage.setItem(key, JSON.stringify(state[key]));
    }
};

export function start() {
    const persistKeys = ["favourites", "main", "daylist"];
    let { daylist, main, favourites } = getPersistedState(persistKeys);

    // Wrapped update so state updates re-render the app
    let wrappedUpdate = (...update) => {
        if (updateState(...update)) {
            renderApp();
        }
    };

    let renderApp = () => {
        renderMain({ getState, updateState: wrappedUpdate });
    };

    onUpdate(renderApp);

    persistKeys.forEach(key => onUpdate(key, () => setPersistedState(key, getState())));

    onUpdate("time", () => {
        updateUpcomingSessions(getState());
        updateCurrentSessions(getState());
    });

    let tick = () => {
        updateTimer(getState());
        setTimeout(tick, 1000);
    };

    // Subscribe to AppCache events so we can show a notice when an update is available
    window.applicationCache.addEventListener(
        "updateready",
        () => updateState("update", { available: true }),
        false);

    // initial state
    updateState(".", { ...initialState, ...normaliseSessionData(data), favourites, daylist, main });

    // Start ticking
    tick();
}
