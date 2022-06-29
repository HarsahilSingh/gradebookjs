import {Link, useLocation, useNavigate} from "react-router-dom";
import {useState} from "react";
import axios from "axios";
import React from "react";

function UpdateCourse(props) {
    const location = useLocation()
    const { courseID, courseName, courseCode } = location.state

    const navigate = useNavigate()
    const [name, setName] = useState(courseName.toString());
    const [code, setCode] = useState(courseCode.toString());

    const nameHandler = e => {
        setName(e.target.value)
    }
    const codeHandler = e => {
        setCode(e.target.value)
    }

    const updateCourse = () => {
        if(localStorage.getItem('token')) {
            const data = {
                'name': name,
                'code': code,
            }
            axios.put('https://gradebookjs.herokuapp.com/api/course/'+courseID+'/', data, {
                headers: {
                    Authorization: "Token "+localStorage.getItem("token")
                }
            }).then((response) => {
                navigate('/Course')
            }).catch((err) => {
                console.log(err)
                alert('Course could not be updated!')
            })
        } else {
            navigate('/Login')
            alert('Please sign in to create course!')
        }
    }

    return (
        <div className={'container'}>
            <h1>Update Course</h1>
            <br></br>
            <div>
                <label htmlFor="code" className="form-label">Code</label>
                <input id={'code'} onChange={codeHandler} type={'text'} className={'form-control'} defaultValue={courseCode}/>
            </div>
            <br></br>
            <div>
                <label htmlFor="name" className="form-label">Name</label>
                <input id={'name'} onChange={nameHandler} type={'text'} className={'form-control'} defaultValue={courseName} />
            </div>
            <br></br>
            <button onClick={updateCourse} className={'btn btn-success'} type={'submit'}>Update</button>
            <br></br>
            <br></br>
            <Link to={'/Course'} className={'btn btn-danger'}>Back</Link>
        </div>
    );
}

export default UpdateCourse;