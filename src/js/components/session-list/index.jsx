import debug from "debug";
import React, { Component, PropTypes } from "react";
import Session from "../session";

const log = debug("schedule:components:session-list");


export class SessionList extends Component {
    render() {
        const { sessions } = this.props;

        return (
            <div className="session-list">
                {
                    sessions.map(s => {
                        return (
                            <div className="session-list__session">
                                <Session session={s} />
                            </div>
                        );
                    })
                }
            </div>
        );
    }
}

SessionList.propTypes = {
    sessions: PropTypes.array.isRequired
};

export default SessionList;
