import debug from "debug";
import moment from "moment";
import React, { Component, PropTypes } from "react";
import CoC from "../coc";
import DayList from "../day-list";
import NextUp from "../next-up";
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
        case "sessions":
            return <DayList { ...this.props } />;
        default:
            return <NextUp { ...this.props } />;
        }
    }

    render() {
        const { getState } = this.props;
        const { event: { name }, main: { view }, time, update } = getState();

        const links = [
            { title: "CoC", view: "coc" },
            { title: "Next up", view: "next-up" },
            { title: "Sessions", view: "sessions" },
            { title: "Fork me!", view: "repo-info" }
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
                <header className="header">
                    <h1>{name}</h1>
                    {
                        update.available &&
                        <div className="header__update-notice">
                            <p>A new version is available. Reload to apply update.</p>
                        </div>
                    }
                </header>
                <main>
                    {this.getMainView(view)}
                </main>
                <footer className="footer">
                    <div className="footer__navigation">{footerLinks}</div>
                    <div className="footer__current-time">{moment(time.now).format(DATE_FORMAT)}</div>
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
