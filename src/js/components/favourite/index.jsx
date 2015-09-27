import React, { Component, PropTypes } from "react";

export class Favourite extends Component {
    render() {
        const { selected, onClick } = this.props;

        return (
            <div className="favourite">
                <a href="#" onClick={e => (e.preventDefault(), onClick())}>
                {
                    selected
                    ? "★ Unfavourite"
                    : "☆ Favourite"
                }
                </a>
            </div>
        );
    }
}

Favourite.propTypes = {
    onClick: PropTypes.func.isRequired
};

export default Favourite;
