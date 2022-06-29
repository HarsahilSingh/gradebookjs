import React from 'react';
import {Link, useLocation, useNavigate} from "react-router-dom";
import axios from "axios";

function DeleteCourse(props) {
    const location = useLocation()
    const navigate = useNavigate()
    const { courseID } = location.state

    const deleteCourse = () => {
        if(localStorage.getItem('token')) {
            axios.delete('https://gradebookjs.herokuapp.com/api/course/'+courseID+'/', {
                headers: {
                Authorization: "Token "+localStorage.getItem("token")
                }
            }).then((response) => {
                navigate('/Course')
            }).catch((err) => {
                console.log(err)
                alert('Course could not be deleted!')
            })
        } else {
            navigate('/Login')
            alert('Please sign in to delete this course!')
        }
    }

    return (
        <div className={'container'}>
            <h1 >Delete Course</h1>
            <br></br>
            <h2>Are you Sure you want to Delete this course?</h2>
            <br></br>
            <Link to={'/Course'} className={'btn btn-primary'}>Cancel</Link>
            <br></br>
            <br></br>
            <button onClick={deleteCourse} className={'btn btn-danger'} type="submit">Delete</button>
        </div>
    );
}

export default DeleteCourse;