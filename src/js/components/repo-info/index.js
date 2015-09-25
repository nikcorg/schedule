import React, { Component } from "react";

export class RepoInfo extends Component {
    render() {
        return (
            <div className="repo-info">
                <h2>Fork the schedule!</h2>
                <p>Fantastic idea!</p>
                <p>I built this slapdash offline schedule on the flight over from Finland, which means not a lot of time went in to it's making, which means it could use some more love. I'll continue building on this throughout the conference, but I'm more than happy to receive contributions.</p>
                <p>Send PR's or fork the project on <a href="https://github.com/nikcorg/schedule">GitHub</a>.</p>
            </div>
        );
    }
}

export default RepoInfo;
