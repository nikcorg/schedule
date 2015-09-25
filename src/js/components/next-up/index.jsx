import debug from "debug";
import React, { Component } from "react";
import Track from "../track";

const log = debug("schedule:components:next-up");

export class NextUp extends Component {
    render() {
        const { getState } = this.props;
        const { days, time: { today, now } } = getState();

        let currentDay = Object.keys(days).filter(d => today <= new Date(d)).shift();
        let tracks = Object.keys(days[currentDay].tracks).map(name => ({ name, sessions: days[currentDay].tracks[name] }));

        let nextSessions = tracks.map(t => {
            return {
                ...t,
                sessions: [t.sessions.filter(s => now <= s.start).shift()]
            };
        }).
        sort((a, b) => {
            return Number(a.sessions[0].start) - Number(b.sessions[0].start);
        });

        return (
            <div className="next-up">
                {
                    nextSessions.map(t => {
                        return (
                            <div key={t.name} className="next-up__track">
                                <Track { ...t } />
                            </div>
                        );
                    })
                }
            </div>
        );
    }
}

export default NextUp;
