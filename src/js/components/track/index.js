import debug from "debug";
import React, { Component, PropTypes } from "react";
import SessionList from "../session-list";

const log = debug("schedule:components:track");

export class Track extends Component {
    constructor(props) {
        super(props);
        this.state = {
            collapsed: false
        };
    }

    toggleCollapsed() {
        this.setState({ collapsed: !this.state.collapsed });
    }

    render() {
        const { collapsed } = this.state;
        const { name, sessions } = this.props;

        return (
            <div className="track">
                <div className="track__header">
                    <h2>Track: {name}</h2>

                    <div className="track__collapser">
                        <button onClick={() => this.toggleCollapsed()}>{collapsed ? "+" : "-"}</button>
                    </div>
                </div>

                <div className="track__session-list">
                    {
                        !collapsed &&
                        <SessionList sessions={sessions} />
                    }
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
