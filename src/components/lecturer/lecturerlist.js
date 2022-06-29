import React from 'react';
import {useEffect, useReducer, useState} from "react";
import axios from "axios";
import {Link, useNavigate} from "react-router-dom";

const initialState = {
    loading: false,
    lecturers: {},
    error: ''
}

const reducer = (state, action) => {
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
                error: "Error when fetching data!"
            }
    }
}

function Lecturerlist(props) {
    const [state, dispatch] = useReducer(reducer, initialState)
    const [token, setToken] = useState('')
    const navigate = useNavigate()

    useEffect(() => {
        if (localStorage.getItem("token")){
            setToken(localStorage.getItem("token"))
            axios.get('https://gradebookjs.herokuapp.com/api/lecturer/', {
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
            alert('Please sign in to see lecturer!')
        }
    }, [token]);

    return (
        <div className={'container'}>
            <h1 style={{marginBottom: "30px"}}>Lecturers List</h1>
            <table className={'table table-dark table-striped'}>
                <thead>
                    <tr>
                        <th scope={'col'}>Staff ID</th>
                        <th scope={'col'}>First Name</th>
                        <th scope={'col'}>Last Name</th>
                        <th scope={'col'}>Email</th>
                        {/*<th scope={'col'}>Course</th>*/}
                        <th scope={'col'}>Date of Birth</th>
                        <th><Link to={'create'} className={'btn btn-primary'} style={{float: "right", width: "168px"}}>Create Lecturer</Link></th>
                    </tr>
                </thead>
                <tbody>
                {
                    state.loading ? state.lecturers.map(lecturer => {
                        return(
                        <tr>
                            <th scope={'row'}>{lecturer.staffID}</th>
                            <td>{lecturer.first_Name}</td>
                            <td>{lecturer.last_Name}</td>
                            <td>{lecturer.email}</td>
                            {/*<td>{lecturer.course}</td>*/}
                            <td>{lecturer.dateOfBirth}</td>
                            <td>
                                <Link to={'delete'} state={{ ID: lecturer.id }} className={'btn btn-danger'} style={{float: "right"}}>Delete</Link>
                                <Link to={'update'} state={{
                                    ID: lecturer.id,
                                    staffId: lecturer.staffID,
                                    lecturerFirstName: lecturer.first_Name,
                                    lecturerLastName: lecturer.last_Name,
                                    lecturerEmail: lecturer.email,
                                    lecturerDOB: lecturer.dateOfBirth
                                }} className={'btn btn-success'} style={{float: "right", marginRight: "20px"}}>Update</Link>
                            </td>
                        </tr>
                        )
                    }) : 'Loading...'
                }
                </tbody>
            </table>
        </div>
    );
}

export default Lecturerlist;