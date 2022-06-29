import React from 'react';
import {Link, useLocation, useNavigate} from "react-router-dom";
import {useState} from "react";
import axios from "axios";

function AssignLecturer(props) {
    const location = useLocation()
    const { classID, classLecturer, lecturerList, classNumber, classSemester, classCourse } = location.state

    const navigate = useNavigate()
    const [lecturer, setLecturer] = useState(classLecturer);

    const lecturerHandler = e => {
        setLecturer(e.target.value)
    }

    const assignLecturer = () => {
        if(localStorage.getItem('token')) {
            const data = {
                'number': classNumber,
                'semester': classSemester,
                'course': classCourse,
                'lecturer': lecturer,
            }
            axios.put('https://gradebookjs.herokuapp.com/api/class/'+classID+'/', data, {
                headers: {
                    Authorization: "Token "+localStorage.getItem("token")
                }
            }).then((response) => {
                navigate('/Class')
            }).catch((err) => {
                console.log(err)
                alert('Lecturer could not be assigned!!')
            })
        } else {
            navigate('/Login')
            alert('Please sign in to assign lecturer to the class!')
        }
    }

    return (
        <div className={'container'}>
            <h1 style={{marginBottom: "30px"}}>Assign Lecturer</h1>
            <br></br>
            <div>
                <label htmlFor="semester" className={'form-label'}>Lecturer</label>
                <select className={'form-select'} name={'semester'} onChange={lecturerHandler} defaultValue={classLecturer}>
                    <option disabled={true} selected={true}></option>
                    {
                        lecturerList.map(lecturer => {
                            return(<option value={lecturer.id}>{lecturer.first_Name} {lecturer.last_Name}</option>)
                        })
                    }
                </select>
            </div>
            <br></br>
            <button onClick={assignLecturer} className={'btn btn-success'} type={'submit'}>Assign Lecturer</button>
            <br></br>
            <br></br>
            <Link to={'/Class'} className={'btn btn-danger'}>Back</Link>
        </div>
    );
}

export default AssignLecturer;