import debug from "debug";
import React, { Component, PropTypes } from "react";
import Session from "../session";

const log = debug("schedule:components:session-list");

const MARGIN = 60 * 5 * 1000; // Display started events for 5 mins
const MODE_FILTERED = "filtered";
const MODE_ALL = "all";

export class SessionList extends Component {
    constructor(props) {
        super(props);

        this.state = {
            mode: MODE_FILTERED
        };
    }

    switchMode(mode) {
        this.setState({ mode });
    }

    render() {
        const { mode } = this.state;
        const { sessions } = this.props;

        let now = Date.now();
        let show = MODE_FILTERED !== mode ? sessions : sessions.filter(s => now <= Number(s.start) + MARGIN);
        let sessionComps = show.map(s => {
            return (
                <div className="session-list__session">
                    <Session session={s} />
                </div>
            );
        });

        return (
            <div className="session-list">
                {
                    1 < sessionComps.length &&
                    <div className="session-list__mode-switcher">
                        <a href="#" onClick={e => (e.preventDefault(), this.switchMode(MODE_ALL))}
                            className={mode !== MODE_FILTERED && "active"}>All</a>
                        {" | "}
                        <a href="#" onClick={e => (e.preventDefault(), this.switchMode(MODE_FILTERED))} className={mode === MODE_FILTERED && "active"}>Upcoming</a>
                    </div>
                }

                {sessionComps}
            </div>
        );
    }
}

SessionList.propTypes = {
    sessions: PropTypes.array.isRequired
};

export default SessionList;
