import React from 'react';
import {Link, useLocation, useNavigate} from "react-router-dom";
import axios from "axios";

function DeleteSemester(props) {
    const location = useLocation()
    const navigate = useNavigate()
    const { semesterID } = location.state

    const deleteSemester = () => {
        if(localStorage.getItem('token')) {
            axios.delete('https://gradebookjs.herokuapp.com/api/semester/'+semesterID+'/', {
                headers: {
                Authorization: "Token "+localStorage.getItem("token")
                }
            }).then((response) => {
                console.log(response)
                navigate('/Semester')
            }).catch((err) => {
                console.log(err)
                alert('Semester could not be deleted!')
            })
        } else {
            navigate('/login')
            alert('Please sign in to delete semester!')
        }
    }

    return (
        <div className={'container'}>
            <h1>Delete Semester</h1>
            <br></br>
            <h2>Are you Sure you want to Delete this Semester?</h2>
            <br></br>
            <Link to={'/Semester'} className={'btn btn-primary'}>Cancel</Link>
            <br></br>
            <br></br>
            <button onClick={deleteSemester} className={'btn btn-danger'} type="submit">Delete</button>
        </div>
    );
}

export default DeleteSemester;