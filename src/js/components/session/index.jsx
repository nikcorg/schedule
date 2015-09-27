import debug from "debug";
import React, { Component, PropTypes } from "react";
import moment from "moment";
import { getState, updateState } from "../../store";
import Presenter from "../presenter";
import Favourite from "../favourite";

const log = debug("schedule:components:session");

export class Session extends Component {
    resolveIsFavourite(props) {
        const { session } = props;
        const { favourites } = getState();

        this.setState({ isFavourite: favourites.sessions.some(id => id === session.id) });
    }

    componentWillMount() {
        this.resolveIsFavourite(this.props);
    }

    componentWillReceiveProps(newProps) {
        this.resolveIsFavourite(newProps);
    }

    toggleFavourite() {
        const { isFavourite } = this.state;
        const { favourites } = getState();
        const { session } = this.props;

        if (isFavourite) {
            updateState("favourites", { sessions: favourites.sessions.filter(id => id !== session.id) });
        } else {
            updateState("favourites", { sessions: [...favourites.sessions, session.id] });
        }
    }

    render() {
        const { isFavourite } = this.state;
        const { session } = this.props;

        return (
            <div className={"session " + (isFavourite ? "session--favourite" : "")}>
                <h4><a href={session.link}>{session.title}</a></h4>
                <div class="session__favourite">
                    <Favourite selected={isFavourite} onClick={() => this.toggleFavourite() } />
                </div>
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
