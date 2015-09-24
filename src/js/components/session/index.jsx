import debug from "debug";
import React, { Component, PropTypes } from "react";
import moment from "moment";

const log = debug("schedule:components:session");

export class Session extends Component {
    render() {
        const { session } = this.props;
        return (
            <div className="session">
                <h4>{session.title}</h4>
                <div className="session__time">
                    <span className="session__start">{moment(session.start).calendar()}</span>
                    {" "}
                    <span className="session__duration">({session.hasOwnProperty("duration") ? `${session.duration} min` : `o.e.`})</span>
                </div>
            </div>
        );
    }
}

Session.propTypes = {
    session: PropTypes.shape({
        title: PropTypes.string.isRequired,
        start: PropTypes.instanceOf(Date).isRequired
    })
};

export default Session;
