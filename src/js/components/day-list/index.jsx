import debug from "debug";
import React, { Component, PropTypes } from "react";
import { updateState } from "../../store";
import Day from "../day";

const log = debug("schedule:components:day-list");

const TIME_MARGIN = 60 * 5 * 1000; // Display started events for 5 mins
const MODE_FILTERED = "filtered";
const MODE_ALL = "all";

export class DayList extends Component {
    updateDayListState(props) {
        const { getState } = props;
        const state = getState();
        const { mode } = state.daylist || { mode: MODE_FILTERED };
        const { time: { today, now }, days, tracks, sessions } = state;

        this.setState({
            mode,
            days: days.filter(d => MODE_ALL === mode ? d : today <= d.date).
            map(d => {
                return {
                    ...d,
                    tracks: tracks.
                        filter(t => t.day === d.id).
                        map(t => ({
                            ...t,
                            sessions: sessions.
                                filter(s => s.track === t.id).
                                filter(s => MODE_ALL === mode ? s : now <= s.start + TIME_MARGIN)
                        })).
                        filter(t => 0 < t.sessions.length)
                };
            })
        });
    }

    switchMode(mode) {
        updateState("daylist", { mode });
    }

    componentWillMount() {
        this.updateDayListState(this.props);
    }

    componentWillReceiveProps(newProps) {
        this.updateDayListState(newProps);
    }

    render() {
        const { days, mode } = this.state;

        return (
            <div className="daylist">
                <div className="daylist__mode-switcher">
                    <a href="#" onClick={e => (e.preventDefault(), this.switchMode(MODE_ALL))}
                        className={MODE_ALL === mode && "active"}>All</a>
                    {" | "}
                    <a href="#" onClick={e => (e.preventDefault(), this.switchMode(MODE_FILTERED))} className={MODE_FILTERED === mode && "active"}>Upcoming</a>
                </div>

                {
                    days.map(d => {
                        return (
                            <div className="daylist__day">
                                <Day key={Number(d.date)} {...d} />
                            </div>
                        );
                    })
                }
            </div>
        );
    }
}

DayList.propTypes = {
    getState: PropTypes.func.isRequired
};

export default DayList;
