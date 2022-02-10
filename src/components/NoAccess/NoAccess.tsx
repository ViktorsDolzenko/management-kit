import { Link } from "react-router-dom";
import React from "react";


interface noAccessProps {
    userName: string,
    text: string;
}


export const NoAccess = ({ userName, text }: noAccessProps) => {
    return (
        <div className="page-container__emptyContent">
            <div className="emptyPage">
                <div className="emptyPage__title">
                    <h1>Welcome {userName ? userName : "Guest"}</h1>
                    <h1>{text}</h1>
                    <hr className="emptyPage__divider" />
                    <Link to="/" className="emptyPage__text">
                        Back To HomePage
                    </Link>
                </div>
            </div>
        </div>
    );
};
