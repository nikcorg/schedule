import debug from "debug";
import React, { Component, PropTypes } from "react";
import CoC from "../coc";
import DayList from "../day-list";

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
        case "coc":
            return <CoC { ...this.props } />;
        default:
            return <DayList { ...this.props } />;
        }
    }

    render() {
        const { getState } = this.props;
        const { event: { name, coc }, main: { view } } = getState();

        return (
            <div>
                <header className="header"><h1>{name}</h1></header>
                <main>
                    {this.getMainView(view)}
                </main>
                <footer className="footer">
                    <a href={coc.link} onClick={(e) => this.onCocClicked(e)}><abbr title="Code of Conduct">CoC</abbr></a> |
                    <a href="/" onClick={(e) => this.onTLClicked(e)}>Track list</a>
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
