import React from 'react';
import {Link, useNavigate} from "react-router-dom";
import {useState} from "react";
import axios from "axios";

function CreateStudent(props) {
    const navigate = useNavigate()
    const [studentID, setStudentID] = useState('');
    const [first_Name, setFirstName] = useState('');
    const [last_Name, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [dob, setDOB] = useState('');

    const studentIDHandler = e => {
        setStudentID(e.target.value)
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

    const createStudent = () => {
        if(localStorage.getItem('token')) {
            const data = {
                'studentID': studentID,
                'first_Name': first_Name,
                'last_Name': last_Name,
                'email': email,
                'dateOfBirth': dob,
            }
            axios.post('https://gradebookjs.herokuapp.com/api/student/', data, {
                headers: {
                    Authorization: "Token "+localStorage.getItem("token")
                }
            }).then((response) => {
                navigate('/Student')
            }).catch((err) => {
                console.log(err)
                alert('Student could not be created!')
            })
        } else {
            alert('Please sign in to create student!')
            navigate('/Login')
        }
    }

    return (
        <div className={'container'}>
            <h1 style={{marginBottom: "30px"}}>Create Student</h1>
            <div>
                <label htmlFor="studentID" className="form-label">Student ID</label>
                <input id={'studentID'} onChange={studentIDHandler} type={'number'} className={'form-control'} />
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
            <button onClick={createStudent} className={'btn btn-success'} type={'submit'}>Create Student</button>
            <br></br>
            <br></br>
            <Link to={'/Student'} className={'btn btn-danger'}>Cancel</Link>
        </div>
    );
}

export default CreateStudent;