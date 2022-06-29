import React from 'react';
import {Link, useLocation, useNavigate} from "react-router-dom";
import axios from "axios";

function DeleteLecturer(props) {
    const location = useLocation()
    const navigate = useNavigate()
    const { ID } = location.state

    const deleteLecturer = () => {
        if(localStorage.getItem('token')) {
            axios.delete('https://gradebookjs.herokuapp.com/api/lecturer/'+ID+'/', {
                headers: {
                Authorization: "Token "+localStorage.getItem("token")
                }
            }).then((response) => {
                navigate('/Lecturer')
            }).catch((err) => {
                console.log(err)
                alert('Lecturer could not be deleted!')
            })
        } else {
            navigate('/Login')
            alert('Please sign in to delete lecturer!')
        }
    }

    return (
        <div className={'container'}>
            <h1>Delete Lecturer</h1>
            <br></br>
            <h2>Are you Sure you want to Delete this Lecturer?</h2>
            <br></br>
            <Link to={'/Lecturer'} className={'btn btn-primary'}>Cancel</Link>
            <br></br>
            <br></br>
            <button onClick={deleteLecturer} className={'btn btn-danger'} type="submit">Delete</button>
        </div>
    );
}

export default DeleteLecturer;