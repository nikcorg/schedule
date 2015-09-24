import debug from "debug";
import React, { Component, PropTypes } from "react";
import Day from "../day";

const log = debug("schedule:components:day-list");

export class DayList extends Component {
    render() {
        const { getState } = this.props;
        const { days } = getState();
        const now = new Date();
        const today = Number(new Date(now.getFullYear(), now.getMonth(), now.getDate()));

        let dayComps = Object.keys(days).
            map(d => ({ date: new Date(d), tracks: days[d].tracks })).
            filter(d => today <= Number(d.date)).
            map(d => {
                return (
                    <div className="daylist__day">
                        <Day key={Number(d.date)} {...d} />
                    </div>
                );
            });

        return (
            <div className="daylist">
                {dayComps}
            </div>
        );
    }
}

DayList.propTypes = {
    getState: PropTypes.func.isRequired
};

export default DayList;
