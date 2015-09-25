import debug from "debug";
import React, { Component } from "react";
import Track from "../track";

const OE_GUESSTIMATE = 180;
const log = debug("schedule:components:happening-now");

export class HappeningNow extends Component {
    render() {
        const { getState } = this.props;
        const { days, time: { today, now } } = getState();

        let currentDay = Object.keys(days).filter(d => today <= new Date(d)).shift();
        let tracks = Object.keys(days[currentDay].tracks).map(name => ({ name, sessions: days[currentDay].tracks[name] }));

        let currentSessions = tracks.map(t => {
            return {
                ...t,
                sessions: t.sessions.filter(s => {
                    let duration = (s.hasOwnProperty("duration") ? s.duration : OE_GUESSTIMATE) * 60 * 1000;
                    let sessionEnd = Number(s.start) + duration;
                    return now >= s.start && Number(now) <= sessionEnd;
                }).slice(0, 1)
            };
        }).
        filter(t => 0 < t.sessions.length);
        currentSessions = currentSessions.sort((a, b) => {
            return Number(a.sessions[0].start) - Number(b.sessions[0].start);
        });

        return (
            <div className="current-sessions">
                {
                    currentSessions.map(t => {
                        return (
                            <div key={t.name} className="current-sessions__track">
                                <Track { ...t } />
                            </div>
                        );
                    })
                }
            </div>
        );
    }
}

export default HappeningNow;
