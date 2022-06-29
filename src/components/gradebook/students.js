import React from 'react';
import {Link, useLocation, useNavigate} from "react-router-dom";
import {useEffect, useReducer, useState} from "react";
import axios from "axios";

const initialState = {
    loading: false,
    enrolments: {},
    error: ''
}
const reducer = (state, action) => {
    switch (action.type) {
        case 'success':
            return {
                loading: true,
                enrolments: action.payload,
                error: ''
            }
        case 'error':
            return {
                loading: true,
                enrolments: [],
                error: "Error when fetching data!"
            }
    }
}

function Students(props) {
    const location = useLocation()
    const { classID, studentList } = location.state
    const [state, dispatch] = useReducer(reducer, initialState)
    const [token, setToken] = useState('')
    const navigate = useNavigate()

    useEffect(() => {
        if (localStorage.getItem("token")){
            setToken(localStorage.getItem("token"))
            axios.get('https://gradebookjs.herokuapp.com/api/studentEnollment/', {
                headers: {
                    Authorization: "Token "+localStorage.getItem("token")
                }
            }).then(response => {
                dispatch({type: 'success', payload: response.data});
            }).catch(error => {
                dispatch({type: 'error'});
                console.log(error);
            })
        } else {
            setToken('')
            navigate('/Login')
            alert('Please sign in to see gradebook!')
        }
    }, [token]);

    return (
        <div className={'container'}>
            <h1 style={{marginBottom: "30px"}}>Gradebook</h1>
            <h2>Students</h2>
            <table className={"table table-dark table-striped"}>
                <thead>
                <tr>
                    <th scope={'col'}>Student</th>
                    <th scope={'col'}>Grade</th>
                    <th scope={'col'}>GradeTime</th>
                    <th><Link to={-1} className={'btn btn-primary'} style={{float: "right"}}>Back</Link></th>
                    <th></th>
                </tr>
                </thead>
                <tbody>
                {
                    state.loading ? state.enrolments.map(enrolment => {
                        if (enrolment.class_id === classID) {
                            return(
                            <tr>
                                {
                                    studentList.map(student => {
                                        return (enrolment.student_id === student.id ? <td>{student.first_Name} {student.last_Name}</td> : '')
                                    })
                                }
                                <td>{enrolment.grade}</td>
                                <td>{enrolment.gradeTime}</td>
                                <td><Link to={'/Gradebook/grades'} state={{
                                    enrolmentID: enrolment.id,
                                    enrolmentStudent: enrolment.student_id,
                                    enrolmentClass: enrolment.class_id,
                                    enrolmentGrade: enrolment.grade,
                                }} className={'btn btn-success'} style={{float: "right"}}>Grade</Link></td>
                            </tr>
                            )
                        }
                    }) : 'Loading...'
                }
                </tbody>
            </table>
        </div>
    );
}

export default Students;