import debug from "debug";
import React, { Component, PropTypes } from "react";
import Session from "../session";

const log = debug("schedule:components:session-list");

const MARGIN = 60 * 5 * 1000; // Display started events for 5 mins

export class SessionList extends Component {
    render() {
        const { sessions } = this.props;

        let now = Date.now();
        let sessionComps = sessions.
            filter(s => now <= Number(s.start) + MARGIN).
            map(s => {
                return (
                    <div className="session-list__session">
                        <Session session={s} />
                    </div>
                );
            });

        return (
            <div className="session-list">
                {sessionComps}
            </div>
        );
    }
}

SessionList.propTypes = {
    getState: PropTypes.func.isRequired
};

export default SessionList;
