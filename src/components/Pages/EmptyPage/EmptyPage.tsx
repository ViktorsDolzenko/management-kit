import { Layout } from "components/layout/Layout";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import { countDownFunc } from "utils";

import "./emptyPage.scss";
import { auth } from "Service/firebase";
import { useTranslation } from "react-i18next";

export const EmptyPage = () => {
    const [timer, setTimer] = useState<string>("");
    const [currentUser, setCurrentUser] = useState<any>(null);

    // hook to set current user
    useEffect(() => {
        auth.onAuthStateChanged(setCurrentUser);
    }, []);

    // hook for interval timer
    useEffect(() => {
        let interval: any;

        interval = setInterval(() => {
            countDownFunc(setTimer);
        });

        return () => clearInterval(interval);
    }, [timer]);

    // translation hook
    const { t } = useTranslation();

    return (
        <Layout pageTitle="Not found">
            <div className="page-container__emptyContent">
                <div className="emptyPage">
                    <div className="emptyPage__title">
                        <h1>Welcome {currentUser ? currentUser.displayName : "Guest"}</h1>
                        <h1>{t('phrases.reconstruction')}</h1>
                        <hr className="emptyPage__divider" />
                        <p>{timer}</p>
                        <Link to="/" className="emptyPage__text">
              Back To HomePage
                        </Link>
                    </div>
                </div>
            </div>
        </Layout>
    );
};
