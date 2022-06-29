import React from 'react';
import {Link, useLocation, useNavigate} from "react-router-dom";
import {useState} from "react";
import axios from "axios";

function UpdateStudent(props) {
    const location = useLocation()
    const { ID, studentId, studentFirstName, studentLastName, studentEmail, studentDOB } = location.state

    const navigate = useNavigate()
    const [studentID, setStudentID] = useState(studentId);
    const [first_Name, setFirstName] = useState(studentFirstName);
    const [last_Name, setLastName] = useState(studentLastName);
    const [email, setEmail] = useState(studentEmail);
    const [dob, setDOB] = useState(studentDOB);
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

    const updateStudent = () => {
        if(localStorage.getItem('token')) {
            const data = {
                'studentID': studentID,
                'first_Name': first_Name,
                'last_Name': last_Name,
                'email': email,
                'dateOfBirth': dob,
            }
            axios.put('https://gradebookjs.herokuapp.com/api/student/'+ID+'/', data, {
                headers: {
                    Authorization: "Token "+localStorage.getItem("token")
                }
            }).then((response) => {
                navigate('/Student')
            }).catch((err) => {
                console.log(err)
                alert('Student could not be update!')
            })
        } else {
            alert('Please sign in to update student!')
            navigate('/Login')
        }
    }

    return (
        <div className={'container'}>
            <h1 >Update Student</h1>
            <br></br>
            <div >
                <label htmlFor="studentID" className="form-label">Student ID</label>
                <input id={'studentID'} onChange={studentIDHandler} type={'number'} className={'form-control'} defaultValue={studentId} />
            </div>
            <br></br>
            <div >
                <label htmlFor="firstName" className="form-label">First Name</label>
                <input id={'firstName'} onChange={firstNameHandler} type={'text'} className={'form-control'} defaultValue={studentFirstName} />
            </div>
            <br></br>
            <div >
                <label htmlFor="lastName" className="form-label">Last Name</label>
                <input id={'lastName'} onChange={lastNameHandler} type={'text'} className={'form-control'} defaultValue={studentLastName} />
            </div>
            <br></br>
            <div >
                <label htmlFor="email" className="form-label">Email</label>
                <input id={'email'} onChange={emailHandler} type={'email'} className={'form-control'} defaultValue={studentEmail} />
            </div>
            <br></br>
            <div >
                <label htmlFor="dob" className="form-label">Date Of Birth</label>
                <input id={'dob'} onChange={dobHandler} type={'date'} className={'form-control'} defaultValue={studentDOB} />
            </div>
            <br></br>
            <button onClick={updateStudent} className={'btn btn-success'} type={'submit'}>Update</button>
            <br></br>
            <br></br>
            <Link to={'/Student'} className={'btn btn-danger'}>Back</Link>
        </div>
    );
}

export default UpdateStudent;