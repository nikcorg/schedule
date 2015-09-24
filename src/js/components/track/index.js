import debug from "debug";
import React, { Component, PropTypes } from "react";
import SessionList from "../session-list";

const log = debug("schedule:components:track");

export class Track extends Component {
    render() {
        const { name, sessions } = this.props;

        return (
            <div className="track">
                <h2>Track: {name}</h2>
                <div className="track__session-list">
                    <SessionList sessions={sessions} />
                </div>
            </div>
        );
    }
}

Track.propTypes = {
    name: PropTypes.string.isRequired,
    sessions: PropTypes.array.isRequired
};

export default Track;
