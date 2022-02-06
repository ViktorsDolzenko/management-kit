import React, { useEffect, useState } from "react";
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
import { auth, db } from "../../../Service/firebase";
import { BeatLoader } from "react-spinners";
import { css } from "@emotion/react";
import crownImg from '../../../assets/crown.png';
import { useTranslation } from "react-i18next";

const override = css`
  display: block;
  position: fixed;
  top: 50%;
  left: 50%;
`;

export const SubscriptionPage = () => {
    const [currentUser, setCurrentUser] = useState<any>(null);
    const [name, setName] = useState<string>('');
    const [number, setNumber] = useState<any>('');
    const [expiry, setExpiry] = useState<string>('');
    const [cvc, setCvc] = useState<string>('');
    const [issuer, setIssuer] = useState<string>('');
    const [focused, setFocused] = useState<any>('');
    const [subscription, setSubscription] = useState<Boolean>(false);
    const [loading, setLoading] = useState<any>(false);

    // function to set issuer
    const handleCallback = ({ issuer } : any, isValid: any) => {
        if (isValid) {
            setIssuer(issuer);
        }
    };

    // function to handle focus on input
    const handleInputFocus = ({ target } : any) => {
        setFocused(target.name);
    };

    // function to handle input change data
    const handleInputChange = ({ target } : any) => {
        if (target.name === "number") {
            setNumber(formatCreditCardNumber(target.value));
        } else if (target.name === "expiry") {
            setExpiry(formatExpirationDate(target.value));
        } else if (target.name === "cvc") {
            // @ts-ignore
            setCvc(formatCVC(target.value));
        } else if (target.name === 'name') {
            setName(target.value);
        }
    };

    // function to submit fake payment to database and change variable to true
    const handleSubmit = () => {
        const userId = currentUser.uid;
        db.collection('users').doc(`${userId}`).update({
            subscription: true
        }).then(() => {
            console.log("Subscribed");
            window.location.reload();
        })
            .catch((error) => {
                console.error("Error on subscription: ", error);
            });
    };

    // function to get subscribed user
    const getSubscribedUser = async () => {
        const userId = currentUser?.uid;
        const user = await db.collection("users").doc(`${userId}`).get();
        const userField = user.data();
        setSubscription(userField?.subscription);
        setLoading(false);
    };

    // dynamically set and check for current user
    useEffect(() => {
        setLoading(true);
        auth.onAuthStateChanged((user) => {
            setCurrentUser(user);
            getSubscribedUser();
        });
    }, [currentUser, subscription]);

    // translation hook
    const { t } = useTranslation();

    return (
        <Layout>
            {loading ? <div className="blur">
                <BeatLoader color="#ffffff" loading={loading} css={override} size={50}/>
            </div> :
                <>
                    {!subscription ?
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
                                    callback={handleCallback}
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
                                            onChange={handleInputChange}
                                            onFocus={handleInputFocus}
                                        />
                                    </div>
                                    <div className="form-group">
                                        <input
                                            type="text"
                                            name="name"
                                            className="form-control card-input"
                                            placeholder="Name"
                                            required
                                            onChange={handleInputChange}
                                            onFocus={handleInputFocus}
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
                                            onChange={handleInputChange}
                                            onFocus={handleInputFocus}
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
                                            onChange={handleInputChange}
                                            onFocus={handleInputFocus}
                                        />
                                    </div>
                                    <input className="card-input" type="hidden" name="issuer" value={issuer}/>
                                    <div className="form-actions">
                                        <Button
                                            onClick={handleSubmit}
                                            title={'subscribe'}
                                            category={BUTTON_STYLE.Basic}
                                            type={BUTTON_TYPE.Default}
                                        />
                                    </div>
                                </form>
                            </div>
                        </div> : <div className="subscribed">
                            <p style={{ color: "white" }}>{t('phrases.alreadySub')}</p>
                            <img src={crownImg} alt="crown"/>
                        </div>}
                </>
            }
        </Layout>
    );
};
