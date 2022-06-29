import React, {useEffect, useReducer, useState} from 'react';
import {Link, Route, Routes, useNavigate} from "react-router-dom";
import axios from "axios";


const initialState = {
    loading: false,
    semesters: {},
    error: ''
}

const reducer = (state, action) => {
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
                error: "Error when fetch data"
            }
    }
}
function Courselist(props) {
    const [state, dispatch] = useReducer(reducer, initialState);
    const [token, setToken] = useState('')
    const navigate = useNavigate()

    useEffect(() => {
        if (localStorage.getItem("token")){
            setToken(localStorage.getItem("token"))
            axios.get('https://gradebookjs.herokuapp.com/api/course/', {
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
            alert('Please sign in to see courses!')
        }
    }, [token]);

    return (
        <div className={'container'}>
            <h1  style={{marginBottom: "30px"}}>Course List</h1>
            <table className={'table table-dark table-striped'}>
                <thead>
                <tr>
                    <th scope="col">Code</th>
                    <th scope="col">Name</th>

                    <th><Link to={'create'} className={'btn btn-primary'} style={{float: "right"}}>Create Course</Link></th>
                </tr>
                </thead>
                <tbody>
                {
                    state.loading ? state.courses.map(course => {
                        return(
                            <tr>
                                <td key={course.id}>{course.code}</td>
                                <td>{course.name}</td>
                                <td>
                                    <Link to={'delete'} state={{ courseID: course.id }} className={'btn btn-danger'} style={{float: "right"}}>Delete</Link>
                                <Link to={'update'} state={{ courseID: course.id, courseName: course.name, courseCode: course.code }} className={'btn btn-success'} style={{float: "right", marginRight: "20px"}}>Update</Link>
                                </td>
                            </tr>

                        )
                    }):"Loading"
                }

                </tbody>
            </table>

        </div>
    );
}

export default Courselist;