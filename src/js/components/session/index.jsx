import debug from "debug";
import React, { Component, PropTypes } from "react";
import moment from "moment";
import Presenter from "../presenter";

const log = debug("schedule:components:session");

export class Session extends Component {
    render() {
        const { session } = this.props;
        return (
            <div className="session">
                <h4><a href="{session.link}">{session.title}</a></h4>
                <div className="session__time">
                    <span className="session__start">{moment(session.start).calendar()}</span>
                    {" "}
                    <span className="session__duration">({session.hasOwnProperty("duration") ? `${session.duration} min` : `o.e.`})</span>

                    {
                        session.presenter &&
                        <Presenter presenter={session.presenter} />
                    }
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
