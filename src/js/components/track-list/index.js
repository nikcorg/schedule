import debug from "debug";
import React, { Component, PropTypes } from "react";
import Track from "../track";

const log = debug("schedule:components:track-list");

export class TrackList extends Component {
    render() {
        const { tracks } = this.props;

        return (
            <div className="track-list">
                {tracks.map(track => {
                    return (
                        <div className="track-list__track">
                            <Track {...track} />
                        </div>
                    );
                })}
            </div>
        );
    }
}

TrackList.propTypes = {
    tracks: PropTypes.shape
};

export default TrackList;
