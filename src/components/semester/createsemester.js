import React, {useState} from 'react';
import {Link, useLocation, useNavigate} from "react-router-dom";
import axios from "axios";

function CreateSemester(props) {
    const navigate = useNavigate()
    const [year, setYear] = useState('');
    const [semester, setSemester] = useState('S1');
    const [courses, setCourses] = useState('');

    const location = useLocation()
    const { coursesList } = location.state

    const yearHandler = e => {
        setYear(e.target.value)
    }
    const semesterHandler = e => {
        setSemester(e.target.value)
    }
    const coursesHandler = e => {
        let values = Array.from(e.target.selectedOptions, option => option.value)
        setCourses(values)
    }

    const createSemester = () => {
        if(localStorage.getItem('token')) {
            const data = {
                'year': year,
                'semester': semester,
                'courses': courses
            }
            axios.post('https://gradebookjs.herokuapp.com/api/semester/', data, {
                headers: {
                    Authorization: "Token "+localStorage.getItem("token")
                }
            }).then((response) => {
                navigate('/Semester')
            }).catch((err) => {
                console.log(err)
                alert('Semester could not be created!')
            })
        } else {
            navigate('/Login')
            alert('Please sign in to create semester!')
        }
    }

    return (
        <div className={'container'}>
            <h1>Create Semester</h1>
            <br></br>
            <div>
                <label htmlFor="year" className={'form-label'}>Year</label>
                <input id={'year'} onChange={yearHandler} type={'number'} className={'form-control'} min={2022} max={2100}/>
            </div>
            <br></br>
            <div>
                <label htmlFor="semester" className={'form-label'}>Semester</label>
                <select className={'form-select'} name={'semester'} onChange={semesterHandler}>
                    <option value={'S1'} selected>S1</option>
                    <option value={'S2'}>S2</option>
                </select>
            </div>
            <br></br>
            <div>
                <label htmlFor="courses" className={'form-label'}>Courses</label>
                <select className={'form-select'} name={'courses'} multiple onChange={coursesHandler}>
                    {
                        coursesList.map(course => {
                            return(<option value={course.id}>{course.name}</option>)
                        })
                    }
                </select>
            </div>
            <br></br>
            <button onClick={createSemester} className={'btn btn-success'} type={'submit'}>Create Semester</button>
            <br></br>
            <br></br>
            <Link to={'/Semester'} className={'btn btn-danger'}>Cancel</Link>
        </div>
    );
}

export default CreateSemester;