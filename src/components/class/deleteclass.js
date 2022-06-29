import React from 'react';
import {Link, useLocation, useNavigate} from "react-router-dom";
import axios from "axios";

function DeleteClass(props) {
    const location = useLocation()
    const navigate = useNavigate()
    const { classID } = location.state

    const deleteClass = () => {
        if(localStorage.getItem('token')) {
            axios.delete('https://gradebookjs.herokuapp.com/api/class/'+classID+'/', {
                headers: {
                Authorization: "Token "+localStorage.getItem("token")
                }
            }).then((response) => {
                navigate('/Class')
            }).catch((err) => {
                console.log(err)
                alert('Class could not be deleted!')
            })
        } else {
            navigate('/Login')
            alert('Please sign in to create class!')
        }
    }

    return (
        <div className={'container'}>
            <h1 style={{marginBottom: "30px"}}>Delete Class</h1>
            <br></br>
            <h2>Are you Sure you want to Delete this class?</h2>
            <br></br>
            <Link to={'/Class'} className={'btn btn-primary'}>Cancel</Link>
            <br></br>
            <br></br>
            <button onClick={deleteClass} className={'btn btn-danger'} type="submit">Delete</button>
        </div>
    );
}

export default DeleteClass;