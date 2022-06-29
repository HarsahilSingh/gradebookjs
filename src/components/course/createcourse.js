import React, { Component } from "react";
import axios from "axios";



import {Link, useNavigate} from "react-router-dom";

import {useState} from "react";

function CreateCourse(props) {
    const navigate = useNavigate()
    const [name, setName] = useState('');
    const [code, setCode] = useState('');

    const nameHandler = e => {
        setName(e.target.value)
    }
    const codeHandler = e => {
        setCode(e.target.value)
    }

    const createCourse = () => {
        if(localStorage.getItem('token')) {
            const data = {
                'name': name,
                'code': code,
            }
            axios.post('https://gradebookjs.herokuapp.com/api/course/', data, {
                headers: {
                    Authorization: "Token "+localStorage.getItem("token")
                }
            }).then((response) => {
                navigate('/Course')
            }).catch((err) => {
                console.log(err)
                alert('Course could not be created!')
            })
        } else {
            alert('Please sign in to create course!')
            navigate('/Login')
        }
    }

    return (
      <div className={'container'}>
            <h1>Create Course</h1>
        <br></br>

            <div>
                <label htmlFor="code" className="form-label">Code</label>
                <input id={'code'} onChange={codeHandler} type={'text'} className={'form-control'} />
            </div>
        <br></br>
            <div>
                <label htmlFor="name" className="form-label">Name</label>
                <input id={'name'} onChange={nameHandler} type={'text'} className={'form-control'} />
            </div>
        <br></br>
            <button onClick={createCourse} className={'btn btn-success'} type={'submit'}>Create Course</button>
        <br></br>
        <br></br>
            <Link to={'/Course'} className={'btn btn-danger'}>Cancel</Link>
        </div>
    );
}

export default CreateCourse;

