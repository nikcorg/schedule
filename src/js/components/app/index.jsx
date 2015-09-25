import debug from "debug";
import React, { Component, PropTypes } from "react";
import CoC from "../coc";
import DayList from "../day-list";
import RepoInfo from "../repo-info";

const log = debug("schedule:components:app");

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
        const { event: { name, coc }, main: { view } } = getState();

        const links = [
            { title: "Code of Conduct", view: "coc" },
            { title: "Session list", view: "default" },
            { title: "Fork me", view: "repo-info" }
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
                <footer className="footer">{footerLinks}</footer>
            </div>
        );
    }
}

App.propTypes = {
    getState: PropTypes.func.isRequired,
    updateState: PropTypes.func.isRequired
};

export default App;
