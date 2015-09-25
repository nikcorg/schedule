import React, { Component } from "react";

export class Presenter extends Component {
    render() {
        const { presenter } = this.props;

        return (
            <div className="presenter">
                <span className="presenter__name">{presenter.name}</span>

                {
                    presenter.twitter &&
                    <span className="presenter__twitter">
                        <a href="http://twitter.com/{presenter.twitter.substr(1)}">{presenter.twitter}</a>
                    </span>
                }
            </div>
        );
    }
}

export default Presenter;
