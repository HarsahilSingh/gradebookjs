import React from 'react';
import {Link, useLocation, useNavigate} from "react-router-dom";
import {useState} from "react";
import axios from "axios";

function UpdateLecturer(props) {
    const location = useLocation()
    const { ID, staffId, lecturerFirstName, lecturerLastName, lecturerEmail, lecturerDOB } = location.state

    const navigate = useNavigate()
    const [staffID, setStaffID] = useState(staffId);
    const [first_Name, setFirstName] = useState(lecturerFirstName);
    const [last_Name, setLastName] = useState(lecturerLastName);
    const [email, setEmail] = useState(lecturerEmail);
    const [dob, setDOB] = useState(lecturerDOB);

    const staffIDHandler = e => {
        setStaffID(e.target.value)
    }
    const firstNameHandler = e => {
        setFirstName(e.target.value)
    }
    const lastNameHandler = e => {
        setLastName(e.target.value)
    }
    const emailHandler = e => {
        setEmail(e.target.value)
    }
    const dobHandler = e => {
        setDOB(e.target.value)
    }

    const updateLecturer = () => {
        if(localStorage.getItem('token')) {
            const data = {
                'staffID': staffID,
                'first_Name': first_Name,
                'last_Name': last_Name,
                'email': email,
                'dateOfBirth': dob,
            }
            axios.put('https://gradebookjs.herokuapp.com/api/lecturer/'+ID+'/', data, {
                headers: {
                    Authorization: "Token "+localStorage.getItem("token")
                }
            }).then((response) => {
                navigate('/Lecturer')
            }).catch((err) => {
                console.log(err)
                alert('Lecturer could not be update!')
            })
        } else {
            alert('Please sign in to update lecturer!')
            navigate('/Login')
        }
    }

    return (
        <div className={'container'}>
            <h1>Update Lecturer</h1>
            <br></br>
            <div>
                <label htmlFor="staffID" className="form-label">Staff ID</label>
                <input id={'staffID'} onChange={staffIDHandler} type={'number'} className={'form-control'} defaultValue={staffId} />
            </div>
            <br></br>
            <div className="mb-3">
                <label htmlFor="firstName" className="form-label">First Name</label>
                <input id={'firstName'} onChange={firstNameHandler} type={'text'} className={'form-control'} defaultValue={lecturerFirstName} />
            </div>
            <br></br>
            <div>
                <label htmlFor="lastName" className="form-label">Last Name</label>
                <input id={'lastName'} onChange={lastNameHandler} type={'text'} className={'form-control'} defaultValue={lecturerLastName} />
            </div>
            <br></br>
            <div>
                <label htmlFor="email" className="form-label">Email</label>
                <input id={'email'} onChange={emailHandler} type={'email'} className={'form-control'} defaultValue={lecturerEmail} />
            </div>
            <br></br>
            <div>
                <label htmlFor="dob" className="form-label">Date Of Birth</label>
                <input id={'dob'} onChange={dobHandler} type={'date'} className={'form-control'} defaultValue={lecturerDOB} />
            </div>
            <br></br>
            <button onClick={updateLecturer} className={'btn btn-success'} type={'submit'}>Update Lecturer</button>
            <br></br>
            <br></br>
            <Link to={'/Lecturer'} className={'btn btn-danger'}>Cancel</Link>
        </div>
    );
}

export default UpdateLecturer;