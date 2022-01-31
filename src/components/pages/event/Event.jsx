import React, { useState, useEffect } from 'react'
import Main from '../../layouts/dashborad/Main'
import ProtectedPage from '../../layouts/ProtectedPage'
import { Table, Button } from "react-bootstrap";
import AddEventModal from './AddEventModal';
import { GoogleLogin } from "react-google-login";
import axios from "axios";

export default function Event() {


    const [show, setShow] = useState(false)
    const [event_list, setEventList] = useState([])

    useEffect(() => {
        //ask google to get all evetns
        //setEventList()//[]

    }, [])

    // gCal bgn
    const responseGoogle = (response) => {
        console.log(response);
        const { code } = response;
        axios
            .post("event/create-tokens", { code })
            // .post("http://localhost:4000/api/create-tokens", { code })
            .then((response) => {
                console.log(response.data);
                setisLoggedIn(true);
            })
            .catch((error) => {
                console.log(error.message);
            });
    };

    const responseError = (error) => {
        console.log(error);
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        //  console.log(summary, description, location, startDateTime, endDateTime);
        console.log(startDateTime);
        axios
            .post("event/create-event", {
                summary,
                description,
                location,
                startDateTime,
                endDateTime,
            })
            .then((response) => {
                console.log(response.data);
            })
            .catch((error) => {
                console.log(error.message);
            });
    };

    const [summary, setSummary] = useState("");
    const [description, setDescription] = useState("");
    const [location, setLocation] = useState("");
    const [startDateTime, setStartDateTime] = useState("");
    const [endDateTime, setEndDateTime] = useState("");
    const [isLoggedIn, setisLoggedIn] = useState(false);
    // gCal end

    return (

        <ProtectedPage>
            <Main title="Event Management">
                {!isLoggedIn ? (
                    <div>
                        <GoogleLogin
                            clientId='631849936298-3d06hqhckd5u1c1qnlsb5d0nicm3qbgp.apps.googleusercontent.com'
                            buttonText='Authorize Google Calendar'
                            onSuccess={responseGoogle}
                            onFailure={responseError}
                            cookiePolicy={"single_host_origin"}
                            //Important! Required for getting the refresh-token on backend
                            responseType='code'
                            accessType='offline'
                            scope='openid email profile https://www.googleapis.com/auth/calendar'
                        />
                    </div>
                ) : (
                    <div>
                        <form onSubmit={handleSubmit}>
                            <label htmlFor='summary'> Summary </label>
                            <br />
                            <input
                                type='text'
                                id='summary'
                                value={summary}
                                onChange={(e) => setSummary(e.target.value)}
                            />
                            <br />
                            <label htmlFor='description'> Description </label>
                            <br />
                            <input
                                type='text'
                                id='description'
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                            />
                            <br />
                            <label htmlFor='location'> Location </label>
                            <br />
                            <input
                                type='text'
                                id='location'
                                value={location}
                                onChange={(e) => setLocation(e.target.value)}
                            />
                            <br />
                            <label htmlFor='startDateTime'> Start Date and Time </label>
                            <br />
                            <input
                                type='datetime-local'
                                id='startDateTime'
                                value={startDateTime}
                                onChange={(e) => setStartDateTime(e.target.value)}
                            />
                            <br />
                            <label htmlFor='endDateTime'> End Date and Time </label>
                            <br />
                            <input
                                type='datetime-local'
                                id='endDateTime'
                                value={endDateTime}
                                onChange={(e) => setEndDateTime(e.target.value)}
                            />
                            <br />
                            {/* <button type='submit'>Create Event</button> */}
                            <Button type='submit' variant='primary'>
                                Create Event
                            </Button>
                        </form>
                    </div>
                )}

            </Main>
        </ProtectedPage>
    )
}
