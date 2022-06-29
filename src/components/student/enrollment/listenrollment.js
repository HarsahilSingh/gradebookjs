import React from 'react';
import {useEffect, useReducer, useState} from "react";
import {Link, useNavigate} from "react-router-dom";
import axios from "axios";

const initialEnrolmentState = {
    loading: false,
    enrolments: {},
    error: ''
}
const initialStudentState = {
    loading: false,
    students: {},
    error: ''
}
const initialClassState = {
    loading: false,
    classes: {},
    error: ''
}

const enrolmentReducer = (state, action) => {
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
const studentReducer = (state, action) => {
    switch (action.type) {
        case 'success':
            return {
                loading: true,
                students: action.payload,
                error: ''
            }
        case 'error':
            return {
                loading: true,
                students: [],
                error: "Error when fetching data!"
            }
    }
}
const classReducer = (state, action) => {
    switch (action.type) {
        case 'success':
            return {
                loading: true,
                classes: action.payload,
                error: ''
            }
        case 'error':
            return {
                loading: true,
                classes: [],
                error: "Error when fetching data!"
            }
    }
}

function ListEnrolment(props) {
    const [ enrolmentState, enrolmentDispatch] = useReducer(enrolmentReducer, initialEnrolmentState)
    const [studentState, studentDispatch] = useReducer(studentReducer, initialStudentState)
    const [classState, classDispatch] = useReducer(classReducer, initialClassState)
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
                enrolmentDispatch({type: 'success', payload: response.data});
            }).catch(error => {
                enrolmentDispatch({type: 'error'});
                console.log(error);
            })

            axios.get('https://gradebookjs.herokuapp.com/api/student/', {
                headers: {
                    Authorization: "Token "+localStorage.getItem("token")
                }
            }).then(response => {
                studentDispatch({type: 'success', payload: response.data});
            }).catch(error => {
                studentDispatch({type: 'error'});
                console.log(error);
            })

            axios.get('https://gradebookjs.herokuapp.com/api/class/', {
                headers: {
                    Authorization: "Token "+localStorage.getItem("token")
                }
            }).then(response => {
                classDispatch({type: 'success', payload: response.data});
            }).catch(error => {
                classDispatch({type: 'error'});
                console.log(error);
            })
        } else {
            setToken('')
            navigate('/Login')
            alert('Please sign in to see enrolments!')
        }
    }, [token]);

    return (
        <div className={'container'}>
            <h1  style={{marginBottom: "30px"}}>Enrolments</h1>
            <table className={'table table-dark table-striped'}>
                <thead>
                <tr>
                    <th scope="col">Student Name</th>
                    <th scope="col">Class Number</th>
                    <th>
                        <Link to={'enrol'} state={{ studentList: studentState.students, classList: classState.classes }} className={'btn btn-primary'} style={{float: "right", width: "82px"}}>Enrol</Link>
                        <Link to={'/Student'} className={'btn btn-danger'} style={{float: "right", marginRight: "20px"}}>Back To Students</Link>
                    </th>
                </tr>
                </thead>
                <tbody>
                {
                    enrolmentState.loading ? enrolmentState.enrolments.map(enrolment => {
                        return(
                            <tr>
                                {
                                    studentState.loading ? studentState.students.map(student => {
                                        return (enrolment.student_id === student.id ? <td>{student.first_Name} {student.last_Name}</td> : '')
                                    }): 'Loading...'
                                }
                                {
                                    classState.loading ? classState.classes.map(class1 => {
                                        return (enrolment.class_id === class1.id ? <td>{class1.number}</td> : '')
                                    }): 'Loading...'
                                }
                                <td>
                                    <Link to={'remove'} state={{ enrolmentID: enrolment.id,  }} className={'btn btn-danger'} style={{float: "right"}}>Remove</Link>
                                </td>
                            </tr>
                        )
                    }): 'Loading...'
                }
                </tbody>
            </table>
        </div>
    );
}

export default ListEnrolment;