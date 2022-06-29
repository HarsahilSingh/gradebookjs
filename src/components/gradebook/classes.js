import React from 'react';
import {Link, useLocation, useNavigate} from "react-router-dom";
import {useEffect, useReducer, useState} from "react";
import axios from "axios";

const initialClassState = {
    loading: false,
    classes: {},
    error: ''
}
const initialStudentState = {
    loading: false,
    students: {},
    error: ''
}
const initialCourseState = {
    loading: false,
    courses: {},
    error: ''
}
const initialEnrolmentState = {
    loading: false,
    enrolments: {},
    error: ''
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
const courseReducer = (state, action) => {
    switch (action.type) {
        case 'success':
            return {
                loading: true,
                courses: action.payload,
                error: ''
            }
        case 'error':
            return {
                loading: true,
                courses: [],
                error: "Error when fetching data!"
            }
    }
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

function Classes(props) {
    const [classState, classDispatch] = useReducer(classReducer, initialClassState)
    const [studentState, studentDispatch] = useReducer(studentReducer, initialStudentState)
    const [courseState, courseDispatch] = useReducer(courseReducer, initialCourseState)
    const [enrolmentState, enrolmentDispatch] = useReducer(enrolmentReducer, initialEnrolmentState)
    const [token, setToken] = useState('')
    const navigate = useNavigate()

    const location = useLocation()
    const { semesterID } = location.state

    useEffect(() => {
        if (localStorage.getItem("token")){
            setToken(localStorage.getItem("token"))
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

            setToken(localStorage.getItem("token"))
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

            axios.get('https://gradebookjs.herokuapp.com/api/course/', {
                headers: {
                    Authorization: "Token "+localStorage.getItem("token")
                }
            }).then(response => {
                courseDispatch({type: 'success', payload: response.data});
            }).catch(error => {
                courseDispatch({type: 'error'});
                console.log(error);
            })

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
        } else {
            setToken('')
            navigate('/Login')
            alert('Please sign in to see gradebook!')
        }
    }, [token]);

    return (
        <div className={'container'}>
            <h1 style={{marginBottom: "30px"}}>GradeBook</h1>
            <h2>Classes</h2>
            <table className={"table table-dark table-striped"}>
                <thead>
                <tr>
                    <th scope={'col'}>Class Number</th>
                    <th scope={'col'}>Course Name</th>
                    {localStorage.getItem("userGroup") === 'student' ? <th scope={'col'}>Grade</th> : ''}
                    {localStorage.getItem("userGroup") === 'student' ? <th scope={'col'}>GradeTime</th> : ''}
                    <th><Link to={-1} className={'btn btn-primary'} style={{float: "right"}}>Back</Link></th>
                </tr>
                </thead>
                <tbody>
                {
                    classState.loading ? classState.classes.map(class1 => {
                        const navigateToStudentList = () => {
                            navigate('/gradebook/students', { state: {classID: class1.id, studentList: studentState.students }})
                        }
                        if (class1.semester === semesterID) {
                            return(
                                localStorage.getItem("userGroup") === 'student'?
                                <tr>
                                    <td>{class1.number}</td>
                                    {
                                        courseState.loading ? courseState.courses.map(course => {
                                            return (class1.course === course.id ? <td>{course.name}</td> : '')
                                        }): 'Loading...'
                                    }
                                    {
                                        enrolmentState.loading ? enrolmentState.enrolments.map(enrolment => {
                                            return (class1.id === enrolment.class_id ? <td>{enrolment.grade}</td> : '')
                                        }): 'Loading...'
                                    }
                                    {
                                        enrolmentState.loading ? enrolmentState.enrolments.map(enrolment => {
                                            return (class1.id === enrolment.class_id ? <td>{enrolment.gradeTime}</td> : '')
                                        }): 'Loading...'
                                    }
                                </tr> : <tr className={'clickable'} onClick={navigateToStudentList} style={{cursor: "pointer"}}>
                                <td>{class1.number}</td>
                                {
                                    courseState.loading ? courseState.courses.map(course => {
                                        return (class1.course === course.id ? <td>{course.name}</td> : '')
                                    }): 'Loading...'
                                }
                                <td></td>
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

export default Classes;