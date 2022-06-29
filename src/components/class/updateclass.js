import React from 'react';
import {Link, useLocation, useNavigate} from "react-router-dom";
import {useState} from "react";
import axios from "axios";

function UpdateClass(props) {
    const location = useLocation()
    const { classID, classSemester, classNumber, classCourse, semesterList, coursesList } = location.state

    const navigate = useNavigate()
    const [number, setNumber] = useState(classNumber);
    const [semester, setSemester] = useState(classSemester);
    const [course, setCourse] = useState(classCourse);

    const numberHandler = e => {
        setNumber(e.target.value)
    }
    const semesterHandler = e => {
        setSemester(e.target.value)
    }
    const courseHandler = e => {
        setCourse(e.target.value)
    }

    const updateClass = () => {
        if(localStorage.getItem('token')) {
            const data = {
                'number': number,
                'semester': semester,
                'course': course
            }
            axios.put('https://gradebookjs.herokuapp.com/api/class/'+classID+'/', data, {
                headers: {
                    Authorization: "Token "+localStorage.getItem("token")
                }
            }).then((response) => {
                navigate('/Class')
            }).catch((err) => {
                console.log(err)
                alert('Class could not be updated!')
            })
        } else {
            navigate('/Login')
            alert('Please sign in to update class!')
        }
    }

    return (
        <div className={'container'}>
            <h1 style={{marginBottom: "30px"}}>Update Class</h1>
            <br></br>
            <div>
                <label htmlFor="number" className={'form-label'}>Number</label>
                <input id={'number'} onChange={numberHandler} type={'number'} className={'form-control'} defaultValue={classNumber} />
            </div>
            <br></br>
            <div>
                <label htmlFor="semester" className={'form-label'}>Semester</label>
                <select className={'form-select'} name={'semester'} onChange={semesterHandler} defaultValue={classSemester}>
                    {
                        semesterList.map(semester => {
                            return(<option value={semester.id}>{semester.year} {semester.semester}</option>)
                        })
                    }
                </select>
            </div>
            <br></br>
            <div >
                <label htmlFor="course" className={'form-label'}>Course</label>
                <select className={'form-select'} name={'course'} onChange={courseHandler} defaultValue={classCourse}>
                    {
                        coursesList.map(course => {
                            return(<option value={course.id}>{course.name}</option>)
                        })
                    }
                </select>
            </div>
            <br></br>
            <button onClick={updateClass} className={'btn btn-success'} type={'submit'}>Update Class</button>
            <br></br>
            <br></br>
            <Link to={'/Class'} className={'btn btn-danger'}>Cancel</Link>
        </div>
    );
}

export default UpdateClass;