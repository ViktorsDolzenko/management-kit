import React from "react";
import Card from "react-credit-cards";


import {
    formatCreditCardNumber,
    formatCVC,
    formatExpirationDate
} from "./cardUtils";

import "react-credit-cards/es/styles-compiled.css";
import "./profile.scss";
import { Layout } from "../../layout/Layout";
import { Button, BUTTON_STYLE } from "../../Button";
import { BUTTON_TYPE } from "../../Button/buttonProps";

export class SubscriptionPage extends React.Component {
    state = {
        number: "",
        name: "",
        expiry: "",
        cvc: "",
        issuer: "",
        focused: "",
        formData: null
    };

    handleCallback = ({ issuer } : any, isValid: any) => {
        if (isValid) {
            this.setState({ issuer });
        }
    };

    handleInputFocus = ({ target } : any) => {
        this.setState({
            focused: target.name
        });
    };

    handleInputChange = ({ target } : any) => {
        if (target.name === "number") {
            target.value = formatCreditCardNumber(target.value);
        } else if (target.name === "expiry") {
            target.value = formatExpirationDate(target.value);
        } else if (target.name === "cvc") {
            // @ts-ignore
            target.value = formatCVC(target.value);
        }

        this.setState({ [target.name]: target.value });
    };


    render () {
        // eslint-disable-next-line no-unused-vars
        const { name, number, expiry, cvc, focused, issuer, formData } = this.state;


        return (
            <Layout>
                <div key="Payment">
                    <div className="App-payment">
                        <h1 className="card-h1">OPEN FEATURES</h1>
                        <h4 className="card-h4">SUBSCRIPTION</h4>
                        <Card
                            number={number}
                            name={name}
                            expiry={expiry}
                            cvc={cvc}
                            // @ts-ignore
                            focused={focused}
                            callback={this.handleCallback}
                        />
                        <form className="card-form">
                            <div className="form-group">
                                <input
                                    type="tel"
                                    name="number"
                                    className="form-control card-input"
                                    placeholder="Card Number"
                                    pattern="[\d| ]{16,22}"
                                    required
                                    onChange={this.handleInputChange}
                                    onFocus={this.handleInputFocus}
                                />
                            </div>
                            <div className="form-group">
                                <input
                                    type="text"
                                    name="name"
                                    className="form-control card-input"
                                    placeholder="Name"
                                    required
                                    onChange={this.handleInputChange}
                                    onFocus={this.handleInputFocus}
                                />
                            </div>
                            <div className="form-group">
                                <input
                                    type="tel"
                                    name="expiry"
                                    className="form-control card-input"
                                    placeholder="Valid Thru"
                                    pattern="\d\d/\d\d"
                                    required
                                    onChange={this.handleInputChange}
                                    onFocus={this.handleInputFocus}
                                />
                            </div>
                            <div className="form-group">
                                <input
                                    type="tel"
                                    name="cvc"
                                    className="form-control card-input"
                                    placeholder="CVC"
                                    pattern="\d{3,4}"
                                    required
                                    onChange={this.handleInputChange}
                                    onFocus={this.handleInputFocus}
                                />
                            </div>
                            <input className="card-input" type="hidden" name="issuer" value={issuer} />
                            <div className="form-actions">
                                <Button title={'subscribe'}
                                    category={BUTTON_STYLE.Basic}
                                    type={BUTTON_TYPE.Default}
                                />
                            </div>
                        </form>
                    </div>
                </div>
            </Layout>
        );
    }
}
