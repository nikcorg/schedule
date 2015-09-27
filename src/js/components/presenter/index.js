import React, { Component } from "react";

export class Presenter extends Component {
    resolveTwitterLink(props) {
        const { presenter } = props;
        let twitterUrl = presenter.hasOwnProperty("twitter")
            ? `http://twitter.com/${presenter.twitter.replace(/^@/, "")}`
            : null;

        this.setState({ twitterUrl });
    }

    componentWillMount() {
        this.resolveTwitterLink(this.props);
    }

    componentWillReceiveProps(newProps) {
        this.resolveTwitterLink(newProps);
    }

    render() {
        const { twitterUrl } = this.state;
        const { presenter } = this.props;

        return (
            <div className="presenter">
                <span className="presenter__name">{presenter.name}</span>

                {
                    presenter.twitter &&
                    <span className="presenter__twitter">
                        <a href={twitterUrl}>{presenter.twitter}</a>
                    </span>
                }
            </div>
        );
    }
}

export default Presenter;
