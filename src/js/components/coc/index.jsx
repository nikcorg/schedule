import debug from "debug";
import React, { Component, PropTypes } from "react";

const log = debug("schedule:components:coc");

export class CoC extends Component {
    render() {
        const {
            event: {
                coc: {
                    link, contact: { twitter, email, name, phone }
                }
            }
        } = this.props.getState();

        const mailtoLink = `mailto:${email}`;
        const twitterLink = `https://twitter.com/${twitter.replace(/^@/, "")}`;

        return (
            <div className="coc">
                <h2>Code of Conduct</h2>
                <p><a href={link}>Link</a></p>

                <div className="coc__contact">
                    <h3>Contact Person</h3>
                    <p>Name: {name}</p>
                    <p>E-mail: <a href={mailtoLink}>{email}</a></p>
                    <p>Twitter: <a href={twitterLink}>{twitter}</a></p>
                    <p>Phone: {phone}</p>
                </div>
            </div>
        );
    }
}

CoC.propTypes = {
    getState: PropTypes.func.isRequired
};

export default CoC;


