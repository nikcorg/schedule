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

                <div className="coc_header">
                    <p>All attendees, speakers, sponsors and volunteers at JSConf EU are required to agree with the following code of conduct. Organizers will enforce this code throughout the event. We are expecting coorporation from all participants to help ensuring a safe environment for everybody.</p>

                    <p>Read The Quick Version below, or <a href={link}>The Less Quick Version</a> on the JSConf EU website.</p>
                </div>

                <div className="coc__contact">
                    <h3>Contact Person</h3>
                    <p>Name: {name}</p>
                    <p>E-mail: <a href={mailtoLink}>{email}</a></p>
                    <p>Twitter: <a href={twitterLink}>{twitter}</a></p>
                    <p>Phone: {phone}</p>
                </div>

                <div className="coc__content">
                    <h3>The Quick Version</h3>
                    <p>JSConf EU is dedicated to providing a harassment-free conference experience for everyone, regardless of gender, sexual orientation, disability, physical appearance, body size, race, or religion. We do not tolerate harassment of conference participants in any form. Sexual language and imagery is not appropriate for any conference venue, including talks, workshops, parties, Twitter and other online media. Conference participants violating these rules may be sanctioned or expelled from the conference without a refund at the discretion of the conference organizers.</p>
                </div>
            </div>
        );
    }
}

CoC.propTypes = {
    getState: PropTypes.func.isRequired
};

export default CoC;


