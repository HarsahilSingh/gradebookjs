import React from 'react';
import {useReducer, useState} from "react";
import {Link, useLocation, useNavigate} from "react-router-dom";
import axios from "axios";

function EnrolStudent(props) {
    const location = useLocation()
    const { studentList, classList } = location.state

    const navigate = useNavigate()
    const [student_id, setStudent] = useState('');
    const [class_id, setClass] = useState('');

    const studentHandler = e => {
        setStudent(e.target.value)
    }
    const classHandler = e => {
        setClass(e.target.value)
    }

    const enrolStudent = () => {
        if(localStorage.getItem('token')) {
            const data = {
                'student_id': student_id,
                'class_id': class_id,
            }
            axios.post('https://gradebookjs.herokuapp.com/api/studentEnollment/', data, {
                headers: {
                    Authorization: "Token "+localStorage.getItem("token")
                }
            }).then((response) => {
                navigate('/Student/enrolments')
            }).catch((err) => {
                console.log(err)
                alert('Student could not be enrolled!')
            })
        } else {
            navigate('/login')
            alert('Please sign in to enrol student!')
        }
    }

    return (
        <div className={'container'}>
            <h1 style={{marginBottom: "30px"}}>Enrol Students</h1>
            <div >
                <label htmlFor="student" className={'form-label'}>Student</label>
                <select className={'form-select'} name={'student'} onChange={studentHandler}>
                    <option disabled={true} selected={true}></option>
                    {
                        studentList.map(student => {
                            return(<option value={student.id}>{student.first_Name} {student.last_Name}</option>)
                        })
                    }
                </select>
            </div>
            <br></br>
            <div >
                <label htmlFor="class" className={'form-label'}>Class</label>
                <select className={'form-select'} name={'class'} onChange={classHandler}>
                    <option disabled={true} selected={true}></option>
                    {
                        classList.map(class1 => {
                            return(<option value={class1.id}>{class1.number}</option>)
                        })
                    }
                </select>
            </div>
            <br></br>
            <button onClick={enrolStudent} className={'btn btn-success'} type={'submit'}>Enrol Student</button>
            <br></br>
            <br></br>
            <Link to={'/Student/enrolments'} className={'btn btn-danger'}>Back</Link>
        </div>
    );
}

export default EnrolStudent;