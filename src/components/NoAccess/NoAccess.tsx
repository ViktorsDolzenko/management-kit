import { Link } from "react-router-dom";
import React from "react";


interface noAccessProps {
    userName: string
}

export const NoAccess = ({ userName }: noAccessProps) => {
    return (
        <div className="page-container__emptyContent">
            <div className="emptyPage">
                <div className="emptyPage__title">
                    <h1>Welcome {userName ? userName : "Guest"}</h1>
                    <h1>You do not have enough privileges to view this page, purchase a subscription to open the functionality.</h1>
                    <hr className="emptyPage__divider" />
                    <Link to="/" className="emptyPage__text">
                        Back To HomePage
                    </Link>
                </div>
            </div>
        </div>
    );
};
