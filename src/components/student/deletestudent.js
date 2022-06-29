import React from 'react';
import {Link, useLocation, useNavigate} from "react-router-dom";
import axios from "axios";

function DeleteStudent(props) {
    const location = useLocation()
    const navigate = useNavigate()
    const { ID } = location.state

    const deleteStudent = () => {
        if(localStorage.getItem('token')) {
            axios.delete('https://gradebookjs.herokuapp.com/api/student/'+ID+'/', {
                headers: {
                Authorization: "Token "+localStorage.getItem("token")
                }
            }).then((response) => {
                navigate('/Student')
            }).catch((err) => {
                console.log(err)
                alert('Student could not be deleted!')
            })
        } else {
            navigate('/Login')
            alert('Please sign in to delete student!')
        }
    }

    return (
        <div className={'container'}>
            <h1 style={{marginBottom: "30px"}}>Delete Student</h1>
            <br></br>
            <h2>Are you Sure you want to Delete this Student?</h2>
            <br></br>
            <Link to={'/Student'} className={'btn btn-primary'}>Cancel</Link>
            <br></br>
            <br></br>
            <button onClick={deleteStudent} className={'btn btn-danger'} type="submit">Delete</button>
        </div>
    );
}

export default DeleteStudent;