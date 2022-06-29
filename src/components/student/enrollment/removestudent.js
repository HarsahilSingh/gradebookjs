import React from 'react';
import {Link, useLocation, useNavigate} from "react-router-dom";
import axios from "axios";

function RemoveStudent(props) {
    const location = useLocation()
    const navigate = useNavigate()
    const { enrolmentID } = location.state

    const deleteCourse = () => {
        if(localStorage.getItem('token')) {
            axios.delete('https://gradebookjs.herokuapp.com/api/studentEnollment/'+enrolmentID+'/', {
                headers: {
                    Authorization: "Token "+localStorage.getItem("token")
                }
            }).then((response) => {
                navigate('/Student/enrolments')
            }).catch((err) => {
                console.log(err)
                alert('Enrolment could not be removed!')
            })
        } else {
            navigate('/Login')
            alert('Please sign in to remove enrolment!')
        }
    }

    return (
        <div className={'container'}>
            <h1 style={{marginBottom: "30px"}}>Remove Enrolment</h1>
            <h2>Are you Sure you want to remove this enrolment?</h2>
            <br></br>
            <Link to={'/Student/enrolments'} className={'btn btn-primary'}>Cancel</Link>
            <br></br>
            <br></br>
            <button onClick={deleteCourse} className={'btn btn-danger'} type="submit">Remove</button>
        </div>
    );
}

export default RemoveStudent;