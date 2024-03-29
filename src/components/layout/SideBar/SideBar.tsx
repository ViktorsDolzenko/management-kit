import React, { useContext, useEffect, useState } from "react";
import { useMediaQuery } from "react-responsive";
import { getAllTeams, StorageContext } from "../../../context/storage";

import {
    sideBarItemsMenu
} from "components/SideBarMenu/sideBarItems";
import { SideBarMenu } from "components/SideBarMenu";
import { Button, BUTTON_STYLE } from "components/Button";
import { BUTTON_TYPE } from "../../Button/buttonProps";
import { auth, db, storage } from "Service/firebase";
import { simpleIcon } from "../../../const";

import "./sideBar.scss";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import { getTeams, showNewTeamForm } from "../../../context/actions";

interface SidebarProps {
  onLoginClick: () => void;
  isOpenMenu: boolean;
  onMenuClick: () => void;
}


export const SideBar = ({
    onLoginClick,
    isOpenMenu,
    onMenuClick
}: SidebarProps) => {
    const [currentUser, setCurrentUser] = useState<any>(null);
    const [showLogout, setShowLogout] = useState(false);
    const [subscription, setSubscription] = useState<Boolean>(false);
    const { state, dispatch } = useContext(StorageContext);

    // function to show logout button
    const showLogoutButton = () => {
        setShowLogout(!showLogout);
    };
    // function to hide logout button
    const hideLogOutButton = () => {
        setShowLogout(false);
    };

    // function to sign out
    const signOut = () => {
        auth.signOut().then();
    };

    // open new team dialog

    const openNewTeamDialog = () => {
        dispatch(showNewTeamForm(true));
    };

    // function to get user avatar for database and update user profile
    const getAvatarUrl = async (userId: string): Promise<void> => {
        const user = await db.collection("users").doc(`${userId}`).get();
        const userField = user.data();
        if (userField?.avatarUrl) {
            await currentUser.updateProfile({
                photoURL: `${userField.avatarUrl}?alt=media`
            });
        }
    };

    // get subscriber user function
    const getSubscribedUser = async () => {
        const userId = currentUser?.uid;
        const user = await db.collection("users").doc(`${userId}`).get();
        const userField = user.data();
        setSubscription(userField?.subscription);
    };

    // hook for media query
    const isDesktopOrLaptop = useMediaQuery({
        query: "(min-device-width: 1224px)"
    });

    // get completed tasks count
    const getDoneTasksLength = state.tasks.filter((tasks) => tasks.done).length;

    // upload profile img to storage
    const uploadProfileImg = async (file: File | undefined) => {
        if (!file) return;
        const imageFileName = file?.name;
        const storageRef = storage.ref(
            `users/${currentUser.uid}/avatar/${imageFileName}`
        );
        const storageSnapshot = await storageRef.put(file);
        const fileUrl = await storageSnapshot.ref.getDownloadURL();
        const url = new URL(fileUrl);
        const preparedUrl = `${url.origin}${url.pathname}`;
        await db
            .collection("users")
            .doc(currentUser?.uid)
            .set({ avatarUrl: preparedUrl }, { merge: true });
        await currentUser.updateProfile({
            photoURL: `${preparedUrl}?alt=media`
        });
        window.location.reload();
    };

    const getTeamsArray = async () => {
        const allTeams = await getAllTeams();
        dispatch(getTeams(allTeams));
    };


    // hook to dynamically set user,update avatar, check for subscription
    useEffect(() => {
        auth.onAuthStateChanged(setCurrentUser);
        if (currentUser) {
            getAvatarUrl(currentUser.uid);
            getSubscribedUser();
        }
        getTeamsArray();
    }, [currentUser, subscription]);

    // translation hook
    const { t } = useTranslation();

    return (
        <div
            className={`sidebar ${
                !isDesktopOrLaptop && isOpenMenu ? "sidebar-opened" : ""
            } `}
        >
            {!isDesktopOrLaptop && (
                <div className="sidebar__close">
                    <i className="fas fa-times" onClick={onMenuClick} />
                </div>
            )}
            {isDesktopOrLaptop && (
                <div>
                    <span className="sidebar__header">ToDoeX</span>
                </div>
            )}
            {currentUser && (
                <div className="sidebar__profile">
                    <div>
                        <label htmlFor="file">
                            <img
                                className="sidebar__profile--img"
                                src={currentUser?.photoURL || "https://via.placeholder.com/48"}
                                alt="avatar"
                            />
                        </label>
                        <input
                            type="file"
                            id="file"
                            name="file"
                            style={{ display: "none" }}
                            onChange={({ target }) => uploadProfileImg(target?.files?.[0])}
                        />
                    </div>
                    <div className="sidebar__profile--info">
                        <Link to="/subscription" className="sidebar__profile--info name">
                            {currentUser.displayName} {subscription ? '👑' : ""}
                        </Link>
                    </div>
                    {!showLogout && isDesktopOrLaptop && (
                        <Button
                            category={BUTTON_STYLE.Clear}
                            titleIcon={simpleIcon}
                            onMouseEnter={showLogoutButton}
                            type={BUTTON_TYPE.Default}
                            title={''}
                        />
                    )}
                    {showLogout && (
                        <Button
                            onMouseLeave={hideLogOutButton}
                            title="signOut"
                            type={BUTTON_TYPE.Default}
                            category={BUTTON_STYLE.Clear}
                            onClick={signOut}
                        />
                    )}

                    {!isDesktopOrLaptop && (
                        <Button
                            onMouseLeave={hideLogOutButton}
                            title="signOut"
                            type={BUTTON_TYPE.Default}
                            category={BUTTON_STYLE.Clear}
                            onClick={signOut}
                        />
                    )}
                </div>
            )}
            {!currentUser && (
                <div className="sidebar__profile">
                    <Button
                        category={BUTTON_STYLE.Important}
                        onClick={onLoginClick}
                        type={BUTTON_TYPE.Default}
                        title="login"
                    />
                </div>
            )}
            <div className="sidebar__tasks">
                <div className="sidebar__tasks completed">
                    <span className="completed__count">{getDoneTasksLength}</span>
                    <span className="completed__title">{t("phrases.completedTasks")}</span>
                </div>
                <div className="sidebar__tasks open-tasks">
                    <span className="open-tasks__count">{state.tasks.length}</span>
                    <span className="open-tasks__title">{t("phrases.openTasks")}</span>
                </div>
            </div>
            <SideBarMenu items={sideBarItemsMenu} title="Menu" />
            <SideBarMenu items={state.teams} title="Teams" />
            {isDesktopOrLaptop && (
                <Button onClick={openNewTeamDialog} category={BUTTON_STYLE.Danger} title="addTeam" />
            )}
        </div>
    );
};
