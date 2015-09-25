import debug from "debug";
import React, { Component } from "react";
import Track from "../track";

const log = debug("schedule:components:next-up");

export class NextUp extends Component {
    updateNextSessions(props) {
        const { getState } = props;
        const { upcoming, tracks, sessions } = getState();

        this.setState({
            sessions: upcoming.sessions.
                map(id => sessions[id]).
                reduce((a, s) => null == a.find(ss => s.track === ss.track) ? [...a, s] : a, []).
                slice(0, 3).
                map(s => ({ ...tracks[s.track], sessions: [s] }))
        });
    }

    componentWillMount() {
        this.updateNextSessions(this.props);
    }

    componentWillReceiveProps(newProps) {
        this.updateNextSessions(newProps);
    }

    render() {
        const { sessions } = this.state;

        return (
            <div className="next-up">
                {
                    sessions.map(t => {
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
