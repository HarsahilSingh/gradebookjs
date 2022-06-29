import React from 'react';
import {Link, useNavigate} from "react-router-dom";
import {useState} from "react";
import axios from "axios";

function CreateLecturer(props) {
    const navigate = useNavigate()
    const [staffID, setStaffID] = useState('');
    const [first_Name, setFirstName] = useState('');
    const [last_Name, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [dob, setDOB] = useState('');

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

    const createLecturer = () => {
        if(localStorage.getItem('token')) {
            const data = {
                'staffID': staffID,
                'first_Name': first_Name,
                'last_Name': last_Name,
                'email': email,
                'dateOfBirth': dob,
            }
            axios.post('https://gradebookjs.herokuapp.com/api/lecturer/', data, {
                headers: {
                    Authorization: "Token "+localStorage.getItem("token")
                }
            }).then((response) => {
                navigate('/Lecturer')
            }).catch((err) => {
                console.log(err)
                alert('Lecturer could not be created!')
            })
        } else {
            alert('Please sign in to create lecturer!')
            navigate('/Login')
        }
    }

    return (
        <div className={'container'}>
            <h1>Create Lecturer</h1>
            <br></br>
            <div>
                <label htmlFor="staffID" className="form-label">Staff ID</label>
                <input id={'staffID'} onChange={staffIDHandler} type={'number'} className={'form-control'} />
            </div>
            <br></br>
            <div>
                <label htmlFor="firstName" className="form-label">First Name</label>
                <input id={'firstName'} onChange={firstNameHandler} type={'text'} className={'form-control'} />
            </div>
            <br></br>
            <div>
                <label htmlFor="lastName" className="form-label">Last Name</label>
                <input id={'lastName'} onChange={lastNameHandler} type={'text'} className={'form-control'} />
            </div>
            <br></br>
            <div>
                <label htmlFor="email" className="form-label">Email</label>
                <input id={'email'} onChange={emailHandler} type={'email'} className={'form-control'} />
            </div>
            <br></br>
            <div>
                <label htmlFor="dob" className="form-label">Date Of Birth</label>
                <input id={'dob'} onChange={dobHandler} type={'date'} className={'form-control'} />
            </div>
            <br></br>
            <button onClick={createLecturer} className={'btn btn-success'} type={'submit'}>Create Lecturer</button>
            <br></br>
            <br></br>
            <Link to={'/Lecturer'} className={'btn btn-danger'}>Cancel</Link>
        </div>
    );
}

export default CreateLecturer;