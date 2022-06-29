import {Link, useLocation, useNavigate} from "react-router-dom";
import {useState} from "react";
import axios from "axios";

function UpdateSemester(props) {
    const location = useLocation()
    const { semesterID, semesterYear, semesterSemester, semesterCoursesIDs, coursesList } = location.state

    const navigate = useNavigate()
    const [year, setYear] = useState(semesterYear);
    const [semester, setSemester] = useState(semesterSemester.toString());
    const [courses, setCourses] = useState(semesterCoursesIDs);

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

    const updateSemester = () => {
        if(localStorage.getItem('token')) {
            const data = {
                'year': year,
                'semester': semester,
                'courses': courses
            }
            axios.put('https://gradebookjs.herokuapp.com/api/semester/'+semesterID+'/', data, {
                headers: {
                    Authorization: "Token "+localStorage.getItem("token")
                }
            }).then((response) => {
                console.log(response)
                navigate('/Semester')
            }).catch((err) => {
                console.log(err)
                alert('Semester could not be updated!')
            })
        } else {
            navigate('/login')
            alert('Please sign in to update semester!')
        }
    }

    return (
        <div className={'container'}>
            <h1>Update Semester</h1>
            <br></br>
            <div>
                <label htmlFor="year" className={'form-label'}>Year</label>
                <input id={'year'} onChange={yearHandler} type={'number'} className={'form-control'} min={2022} max={2100} defaultValue={semesterYear}/>
            </div>
            <br></br>
            <div>
                <label htmlFor="semester" className={'form-label'}>Semester</label>
                <select className={'form-select'} id={'semester'} onChange={semesterHandler} defaultValue={semesterSemester}>
                    <option value={'S1'}>S1</option>
                    <option value={'S2'}>S2</option>
                </select>
            </div>
            <br></br>
            <div>
                <label htmlFor="courses" className={'form-label'}>Courses</label>
                <select className={'form-select'} id={'courses'} multiple={true} onChange={coursesHandler}>{
                    coursesList.map(course => {
                        return(<option value={course.id}>{course.name}</option>)
                    })
                }</select>
            </div>
            <br></br>
            <button onClick={updateSemester} className={'btn btn-success'} type="submit">Update Semester</button>
            <br></br>
            <br></br>
            <Link to={'/Semester'} className={'btn btn-danger'}>Cancel</Link>
        </div>
    );
}

export default UpdateSemester;