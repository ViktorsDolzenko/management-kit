import React, { useContext, useEffect, useState } from 'react';
import "./newTeam.scss";
import { Controller, useForm } from "react-hook-form";
import ReactSelect from "react-select";
import { Button, BUTTON_STYLE } from "../Button";
import { BUTTON_TYPE } from "../Button/buttonProps";
import { useTranslation } from "react-i18next";
import { db } from "../../Service/firebase";
import { StorageContext } from "../../context/storage";
import { updateTeams } from "../../context/actions";

interface NewTeamProps {
    onClickClose: () => void;
}

const customStyles = {
    control: (base: any) => ({
        ...base,
        background: "#eaeaea"
    })
};

export const NewTeam = ({ onClickClose }: NewTeamProps) => {
    const [allUsers, setAllUsers] = useState([]);
    const { handleSubmit, control, register } = useForm();
    const { dispatch } = useContext(StorageContext);

    const onSubmit = async (data: any) => {
        const team = data.teamMembers.map((item: { value: string; }) => item.value);
        const title = data.title;
        await db
            .collection("teams")
            .doc()
            .set({ title: title, members: team });
        dispatch(updateTeams({ title: title, members: team }));
        onClickClose();
    };

    const getUsers = async () => {
        const usersDb = await db.collection("users").get();
        const usersWithId = usersDb.docs.map((doc) => {
            const allDoc = doc.data();
            return {
                ...allDoc,
                id: doc.id
            };
        });
        // @ts-ignore
        setAllUsers(usersWithId);
    };

    useEffect(() => {
        getUsers();
    }, []);

    const { t } = useTranslation();

    return (
        <>
            <div className="overlay-new-team" onClick={onClickClose} />
            <div className="new-team">
                <div className="new-team__wrapper">
                    <div className="new-team__header">
                        <h2>{t("phrases.addNewTeam")}</h2>
                        <button
                            className="new-team__header_exit"
                            onClick={onClickClose}
                        />
                    </div>
                    <hr className="new-team__divider" />
                    <form className="new-team__form" onSubmit={handleSubmit(onSubmit)}>
                        <div className="new-team__input-wrapper">
                            <label className="new-team__label">{t("phrases.newTeam")}</label>
                            <input
                                className="new-team__input"
                                type="text"
                                ref={register}
                                required
                                name="title"
                                placeholder={t("phrases.newTeamTitle")}
                            />
                        </div>
                        <div className="new-team__input-wrapper">
                            <label className="new-team__label">{t('phrases.selectMembers')}</label>
                            <Controller
                                as={
                                    <ReactSelect
                                        styles={customStyles}
                                        placeholder={`${t('phrases.selectAssignTo')}...`}
                                        options={allUsers.map(({ userName }) => {
                                            return { value: userName, label: userName };
                                        })}
                                        defaultValue={null}
                                        isMulti
                                    />
                                }
                                name="teamMembers"
                                id="teamMembers"
                                required
                                control={control}
                                onChange={([selected]: any) => {
                                    return { value: selected };
                                }}
                            />
                        </div>
                        <Button
                            category={BUTTON_STYLE.Basic}
                            title="addTeam"
                            type={BUTTON_TYPE.Submit}
                        />
                    </form>
                </div>
            </div>
        </>
    );
};
