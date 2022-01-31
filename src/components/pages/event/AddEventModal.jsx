import React from 'react'
import { useState, useEffect, useContext } from 'react'
import MyModal from '../../layouts/modal/MyModal'
import Input from '../../layouts/form/Input'
import Select from '../../layouts/form/Select'
import axios from 'axios'


export default function AddEventModal({ show, setShow }) {

    /**
     * {
"title": "demo",
"description":"demo desc",
"priority":"low",
"assigned_to":9,
"assigned_by":1,
"privacy":"private",
"progress_rate":50,
"deadline":"2021-05-22 23:07:15",
"created_at":"2021-05-22 23:07:15"
}
     */

    const [event, setEvent] = useState({
        title: "",
        description: "",
        location: "",
        startDateTime: "",
        endDateTime: "",
    })

    const createEvent = async () => {

        //axios
        console.log(event)
        setShow(false)


    }

    const onChange = (e) => {
        setEvent({ ...event, [e.target.name]: e.target.value })
    }

    return (
        <>
            <MyModal
                title="Create new event" show={show} setShow={setShow} onSubmit={createEvent}
            >

                <Input name="title" type="text" title="Event title" value={event.title} onChange={onChange} />
                <Input name="description" type="text" title="Description" value={event.description} onChange={onChange} />
                <Input name="startDateTime" type="datetime-local" title="Start date and time" value={event.startDateTime} onChange={onChange} />
                <Input name="endDateTime" type="datetime-local" title="End date and time" value={event.endDateTime} onChange={onChange} />

            </MyModal>
        </>
    )
}
