import React from 'react';
import {Link, useNavigate} from "react-router-dom";
import {useEffect, useReducer, useState} from "react";
import axios from "axios";

const initialClassState = {
    loading: false,
    courses: {},
    error: ''
}
const initialSemesterState = {
    loading: false,
    semesters: {},
    error: ''
}
const initialCourseState = {
    loading: false,
    courses: {},
    error: ''
}
const initialLecturerState = {
    loading: false,
    courses: {},
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
                error: "Error when fetching class data!"
            }
    }
}
const semesterReducer = (state, action) => {
    switch (action.type) {
        case 'success':
            return {
                loading: true,
                semesters: action.payload,
                error: ''
            }
        case 'error':
            return {
                loading: true,
                semesters: [],
                error: "Error when fetching semester data!"
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
                error: "Error when fetching course data!"
            }
    }
}
const lecturerReducer = (state, action) => {
    switch (action.type) {
        case 'success':
            return {
                loading: true,
                lecturers: action.payload,
                error: ''
            }
        case 'error':
            return {
                loading: true,
                lecturers: [],
                error: "Error when fetching lecturer data!"
            }
    }
}

function ListClasses(props) {
    const [classState, classDispatch] = useReducer(classReducer, initialClassState)
    const [semesterState, semesterDispatch] = useReducer(semesterReducer, initialSemesterState)
    const [courseState, courseDispatch] = useReducer(courseReducer, initialCourseState)
    const [lecturerState, lecturerDispatch] = useReducer(lecturerReducer, initialLecturerState)
    const [token, setToken] = useState('')
    const navigate = useNavigate()

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
            axios.get('https://gradebookjs.herokuapp.com/api/semester/', {
                headers: {
                    Authorization: "Token "+localStorage.getItem("token")
                }
            }).then(response => {
                semesterDispatch({type: 'success', payload: response.data});
            }).catch(error => {
                semesterDispatch({type: 'error'});
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
            axios.get('https://gradebookjs.herokuapp.com/api/lecturer/', {
                headers: {
                    Authorization: "Token "+localStorage.getItem("token")
                }
            }).then(response => {
                lecturerDispatch({type: 'success', payload: response.data});
            }).catch(error => {
                lecturerDispatch({type: 'error'});
                console.log(error);
            })
        } else {
            setToken('')
            navigate('/Login')
            alert('Please sign in to see classes!')
        }
    }, [token]);

    return (
        <div className={'container'}>
            <h1 style={{marginBottom: "30px"}}>Class List</h1>
            <table className={'table table-dark table-striped'}>
                <thead>
                    <tr>
                        <th scope={'col'}>Number</th>
                        <th scope={'col'}>Semester</th>
                        <th scope={'col'}>Course</th>
                        <th scope={'col'}>Lecturer</th>
                        <th><Link to={'create'} state={{ semesterList: semesterState.semesters, coursesList: courseState.courses }} className={'btn btn-primary'} style={{float: "right", width: "168px"}}>Create Class</Link></th>
                    </tr>
                </thead>
                <tbody>
                {
                    classState.loading ? classState.classes.map(class1 => {
                        return(
                            <tr>
                                <td key={class1.id}>{class1.number}</td>
                                {
                                    semesterState.loading ? semesterState.semesters.map(semester => {
                                        return (class1.semester === semester.id ? <td>{semester.year} {semester.semester}</td> : '')
                                    }): 'Loading...'
                                }
                                {
                                    courseState.loading ? courseState.courses.map(course => {
                                        return (class1.course === course.id ? <td>{course.name}</td> : '')
                                    }): 'Loading...'
                                }
                                {
                                    lecturerState.loading ? lecturerState.lecturers.map(lecturer => {
                                        return (class1.lecturer === lecturer.id ? <td>{lecturer.first_Name} {lecturer.last_Name} - <Link to={'assignlecturer'} state={{
                                                classID: class1.id,
                                                classNumber: class1.number,
                                                classSemester: class1.semester,
                                                classCourse: class1.course,
                                                classLecturer: class1.lecturer,
                                                lecturerList: lecturerState.lecturers
                                            }} className={'btn btn-success'}>Change Lecturer</Link></td> :

                                            <td><Link to={'assignlecturer'} state={{
                                                classID: class1.id,
                                                classNumber: class1.number,
                                                classSemester: class1.semester,
                                                classCourse: class1.course,
                                                classLecturer: class1.lecturer,
                                                lecturerList: lecturerState.lecturers
                                            }} className={'btn btn-primary'}>Assign Lecturer</Link></td>)
                                    }): 'Loading...'
                                }
                                <td>
                                    <Link to={'delete'} state={{ classID: class1.id }} className={'btn btn-danger'} style={{float: "right"}}>Delete</Link>
                                    <Link to={'update'} state={{ classID: class1.id,
                                        classNumber: class1.number,
                                        classSemester: class1.semester,
                                        classCourse: class1.course,
                                        semesterList: semesterState.semesters,
                                        coursesList: courseState.courses,
                                    }} className={'btn btn-success'} style={{float: "right", marginRight: "20px"}}>Update</Link>
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

export default ListClasses;