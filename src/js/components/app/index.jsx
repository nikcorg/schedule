import debug from "debug";
import moment from "moment";
import React, { Component, PropTypes } from "react";
import CoC from "../coc";
import DayList from "../day-list";
import RepoInfo from "../repo-info";

const log = debug("schedule:components:app");

const DATE_FORMAT = "HH:mm";

export class App extends Component {
    onCocClicked(e) {
        e.preventDefault();
        this.switchView("coc");
    }

    onTLClicked(e) {
        e.preventDefault();
        this.switchView("tracklist");
    }

    switchView(view) {
        this.props.updateState("main", { view });
    }

    getMainView(view) {
        switch (view) {
        case "repo-info":
            return <RepoInfo />
        case "coc":
            return <CoC { ...this.props } />;
        default:
            return <DayList { ...this.props } />;
        }
    }

    render() {
        const { getState } = this.props;
        const { event: { name }, main: { view }, time: { now } } = getState();

        const links = [
            { title: "CoC", view: "coc" },
            { title: "Sessions", view: "default" },
            { title: "Fork!", view: "repo-info" }
        ];

        let footerLinks = links.map(l => {
            return (
                <div className="footer__link">
                    <a href="#" onClick={e => (e.preventDefault(), this.switchView(l.view))}>{l.title}</a>
                </div>
            );
        });

        return (
            <div>
                <header className="header"><h1>{name}</h1></header>
                <main>
                    {this.getMainView(view)}
                </main>
                <footer className="footer">
                    <div className="footer__navigation">{footerLinks}</div>
                    <div className="footer__current-time">{moment(now).format(DATE_FORMAT)}</div>
                </footer>
            </div>
        );
    }
}

App.propTypes = {
    getState: PropTypes.func.isRequired,
    updateState: PropTypes.func.isRequired
};

export default App;
