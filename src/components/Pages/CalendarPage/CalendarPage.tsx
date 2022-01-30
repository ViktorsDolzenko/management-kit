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
import { db, fieldValue } from "../../../Service/firebase";
import { Button, BUTTON_STYLE } from "../../Button";
import { BUTTON_TYPE } from "../../Button/buttonProps";

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

export const CalendarPage = () => {
    const [newEvent, setNewEvent] = useState<any>({ title: "", start: "", end: "" });
    const [allEvents, setAllEvents] = useState<any>([]);

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


    function handleAddEvent () {
        db.collection('calendar').doc("events").update({
            allEvents: fieldValue.arrayUnion(newEvent)
        });
        setAllEvents([...allEvents, newEvent]);
    }

    useEffect(() => {
        getEvents();
    }, []);

    return (
        <Layout>
            <div className="calendar-page">
                <div>
                    <input className="calendar-input" type="text" placeholder="Add Title"
                        value={newEvent.title} onChange={(e) => setNewEvent({ ...newEvent, title: e.target.value })} />
                    <DatePicker popperPlacement="bottom"
                        showTimeSelect
                        timeFormat="HH:mm"
                        className="calendar-input" dateFormat="dd/MM/yyyy" placeholderText="Start Date" selected={newEvent.start}
                        onChange={(start) => setNewEvent({ ...newEvent, start })} />
                    <DatePicker popperPlacement="bottom"
                        showTimeSelect
                        timeFormat="HH:mm"
                        className="calendar-input" dateFormat="dd/MM/yyyy"
                        placeholderText="End Date" selected={newEvent.end} onChange={(end) => setNewEvent({ ...newEvent, end })} />
                    <div className="button-wrapper-calendar">
                        <Button title={'addNewEvent'}
                            onClick={handleAddEvent}
                            category={BUTTON_STYLE.Primary}
                            type={BUTTON_TYPE.Default}
                        />
                    </div>
                </div>
                <Calendar localizer={localizer} events={allEvents} startAccessor="start" endAccessor="end" style={{ height: 500, margin: "50px" }} />
            </div>
        </Layout>
    );
};
