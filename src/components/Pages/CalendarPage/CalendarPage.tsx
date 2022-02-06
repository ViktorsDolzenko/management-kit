import format from "date-fns/format";
import getDay from "date-fns/getDay";
import parse from "date-fns/parse";
import startOfWeek from "date-fns/startOfWeek";
import React, { useEffect, useState } from "react";
import { Calendar, dateFnsLocalizer } from "react-big-calendar";
import "react-big-calendar/lib/css/react-big-calendar.css";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "./calendarPage.scss";
import { Layout } from "../../layout/Layout";
import { auth, db, fieldValue } from "../../../Service/firebase";
import { Button, BUTTON_STYLE } from "../../Button";
import { BUTTON_TYPE } from "../../Button/buttonProps";
import { NoAccess } from "../../NoAccess";
import { BeatLoader } from "react-spinners";
import { css } from "@emotion/react";
import { useTranslation } from "react-i18next";

const locales = {
    lv: require("date-fns/locale/lv")
};
const localizer = dateFnsLocalizer({
    format,
    parse,
    startOfWeek,
    getDay,
    locales
});

const override = css`
  display: block;
  position: fixed;
  top: 50%;
  left: 50%;
`;

export const CalendarPage = () => {
    const [currentUser, setCurrentUser] = useState<any>(null);
    const [newEvent, setNewEvent] = useState<any>({ title: "", start: "", end: "" });
    const [allEvents, setAllEvents] = useState<any>([]);
    const [subscription, setSubscription] = useState<Boolean>(false);
    const [loading, setLoading] = useState<any>(true);

    // function to get all events from database and set it to calendar
    const getEvents = async () => {
        const eventsDb = await db.collection("calendar").doc("events");
        const eventsData = await eventsDb.get();
        const data = eventsData.data();
        const parsedData = data?.allEvents.map((item: any) => {
            return { ...item, start: item.start.toDate(), end: item.end.toDate() };
        });

        // @ts-ignore
        setAllEvents(...allEvents, parsedData);
    };

    // function to get and check for  subscriber user
    const getSubscribedUser = async () => {
        const userId = currentUser?.uid;
        const user = await db.collection("users").doc(`${userId}`).get();
        const userField = user.data();
        setSubscription(userField?.subscription);
        setLoading(false);
    };

    // function add new event
    function handleAddEvent () {
        db.collection('calendar').doc("events").update({
            allEvents: fieldValue.arrayUnion(newEvent)
        });
        setAllEvents([...allEvents, newEvent]);
    }

    // fhook to set current user and check for subscription and if user subscriber show him calendar
    useEffect(() => {
        setLoading(true);
        auth.onAuthStateChanged((user) => {
            setCurrentUser(user);
            getSubscribedUser().then(() => {
                getEvents();
            });
        });
    }, [currentUser, subscription]);


    // translation hook
    const { t } = useTranslation();

    return (
        <Layout pageTitle={t('phrases.Calendar')}>
            {loading ? <div className="blur">
                <BeatLoader color="#ffffff" loading={loading} css={override} size={50}/>
            </div> :
                <>
                    {subscription ?
                        <div className="calendar-page">
                            <div>
                                <input className="calendar-input" type="text" placeholder="Add Title"
                                    value={newEvent.title}
                                    onChange={(e) => setNewEvent({ ...newEvent, title: e.target.value })}/>
                                <DatePicker popperPlacement="bottom"
                                    showTimeSelect
                                    timeFormat="HH:mm"
                                    className="calendar-input" dateFormat="dd/MM/yyyy"
                                    placeholderText="Start Date" selected={newEvent.start}
                                    onChange={(start) => setNewEvent({ ...newEvent, start })}/>
                                <DatePicker popperPlacement="bottom"
                                    showTimeSelect
                                    timeFormat="HH:mm"
                                    className="calendar-input" dateFormat="dd/MM/yyyy"
                                    placeholderText="End Date" selected={newEvent.end}
                                    onChange={(end) => setNewEvent({ ...newEvent, end })}/>
                                <div className="button-wrapper-calendar">
                                    <Button title={'addNewEvent'}
                                        onClick={handleAddEvent}
                                        category={BUTTON_STYLE.Primary}
                                        type={BUTTON_TYPE.Default}
                                    />
                                </div>
                            </div>
                            <Calendar localizer={localizer} events={allEvents} startAccessor="start"
                                endAccessor="end" style={{ height: 500, margin: "50px", backgroundColor: 'white' }}/>
                        </div> : <NoAccess userName={currentUser?.displayName}/>}
                </>
            }
        </Layout>
    );
};
