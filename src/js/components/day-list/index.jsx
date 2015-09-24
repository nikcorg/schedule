import debug from "debug";
import React, { Component, PropTypes } from "react";
import moment from "moment";
import Day from "../day";

const log = debug("schedule:components:day-list");

export class DayList extends Component {
    render() {
        const { getState } = this.props;
        const { days } = getState();

        let dayComps = Object.keys(days).map(d => <Day key={d} date={new Date(d)} tracks={days[d].tracks} />);

        return (
            <div className="daylist">
                <div className="daylist__day">{dayComps}</div>
            </div>
        );
    }
}

DayList.propTypes = {
    getState: PropTypes.func.isRequired
};

export default DayList;
