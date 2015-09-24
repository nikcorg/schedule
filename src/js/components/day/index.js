import debug from "debug";
import moment from "moment";
import React, { Component, PropTypes } from "react";
import TrackList from "../track-list";

const log = debug("schedule:components:day");

const DATE_FORMAT = "ddd MMM DD YYYY";

export class Day extends Component {
    render() {
        const { date, tracks } = this.props;
        return (
            <div className="day">
                <h2>{moment(date).format(DATE_FORMAT)}</h2>
                <div className="day__track-list">
                    <TrackList tracks={tracks} />
                </div>
            </div>
        );
    }
}

Day.propTypes = {
    date: PropTypes.instanceOf(Date).isRequired,
    tracks: PropTypes.shape
};

export default Day;
