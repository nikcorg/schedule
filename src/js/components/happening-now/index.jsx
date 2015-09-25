import debug from "debug";
import React, { Component } from "react";
import Track from "../track";

const log = debug("schedule:components:happening-now");

export class HappeningNow extends Component {
    updateCurrentSessions(props) {
        const { getState } = props;
        const { current, tracks, sessions } = getState();

        this.setState({
            sessions: current.sessions.
                map(id => sessions[id]).
                reduce((a, s) => null == a.find(ss => s.track === ss.track) ? [...a, s] : a, []).
                slice(0, 3).
                map(s => ({ ...tracks[s.track], sessions: [s] }))
        });
    }

    componentWillMount() {
        this.updateCurrentSessions(this.props);
    }

    componentWillReceiveProps(newProps) {
        this.updateCurrentSessions(newProps);
    }

    render() {
        const { sessions } = this.state;

        return (
            <div className="current-sessions">
                {
                    sessions.map(t => {
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
