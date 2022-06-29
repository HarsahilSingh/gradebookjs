import logo from './logo.svg';
import './App.css';
import {
    BrowserRouter as Router,
    Routes,
    Route,
    Link,
    NavLink,
    useNavigate
} from 'react-router-dom';

import React, {Component, useState} from "react";

import Home from "./components/home";
import Semesterlist from "./components/semester/semesterlist";
import Createsemester from "./components/semester/createsemester";
import Courselist from "./components/course/courselist";
import Createcourse from "./components/course/createcourse";
import Updatecourse from "./components/course/updatecourse";
import Login from "./components/login";
import Deletecourse from "./components/course/deletecourse";
import UpdateSemester from "./components/semester/updateSemester";
import DeleteSemester from "./components/semester/deletesemester";
import Lecturerlist from "./components/lecturer/lecturerlist";
import CreateLecturer from "./components/lecturer/createlecturer";
import UpdateLecturer from "./components/lecturer/updatelecturer";
import DeleteLecturer from "./components/lecturer/deletelecturer";
import Classlist from "./components/class/classlist";
import Createclass from "./components/class/createclass";
import Updateclass from "./components/class/updateclass";
import Deleteclass from "./components/class/deleteclass";
import Assignlecturer from "./components/class/assignlecturer";
import Studentlist from "./components/student/studentlist";
import Createstudent from "./components/student/createstudent";
import Updatestudent from "./components/student/updatestudent";
import Deletestudent from "./components/student/deletestudent";
import DeleteStudent from "./components/student/deletestudent";
import ListEnrolment from "./components/student/enrollment/listenrollment";
import EnrolStudent from "./components/student/enrollment/enrolstudent";
import RemoveStudent from "./components/student/enrollment/removestudent";
import Semesters from "./components/gradebook/semesters";
import Classes from "./components/gradebook/classes";
import Students from "./components/gradebook/students";
import Grades from "./components/gradebook/grades";

// export  const MyContext = React.createContext()

function App() {
    const username = localStorage.getItem("username")
    const navigate = useNavigate()
    const [isLoggedIn, setIsLoggedIn] = useState(false)

    const logout = () => {
        localStorage.removeItem("token")
        localStorage.removeItem("username")
        localStorage.removeItem("userGroup")
        setIsLoggedIn(false)
        navigate('Home')
    }

  return (
    <div className="App">
      <nav className="navbar navbar-expand-lg navbar-dark bg-danger" >
        <div className={'container-fluid'}>
          <NavLink to={"Home"} className={'navbar-brand'}>Home</NavLink>
          <button className={'navbar-toggler'} type="button" data-bs-toggle="collapse"
                  data-bs-target="#navbarSupportedContent"
                  aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span className={'navbar-toggler-icon'}></span>
          </button>
          <div className={'collapse navbar-collapse'} id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            {
              (() => {
                if(localStorage.getItem("token") && username === 'admin') {
                  return(<div style={{display: "flex"}}>
                      <li className={'nav-item'}>
                        <NavLink to={'Gradebook'} className={'nav-link '} aria-current={'page'}>GradeBook</NavLink>
                      </li>
                      <li className={'nav-item'}>
                        <NavLink to={'Course'} className={'nav-link'} aria-current={'page'}>Courses</NavLink>
                      </li>
                       <li className={'nav-item'}>
                        <NavLink to={'Semester'} className={'nav-link'} aria-current={'page'}>Semesters</NavLink>
                      </li>
                      <li className={'nav-item'}>
                        <NavLink to={'Class'} className={'nav-link'} aria-current={'page'}>Classes</NavLink>
                      </li>
                          <li className={'nav-item'}>
                        <NavLink to={'Lecturer'} className={'nav-link'} aria-current={'page'}>Lecturers</NavLink>
                      </li>
                      <li className={'nav-item'}>
                        <NavLink to={'Student'} className={'nav-link'} aria-current={'page'}>Students</NavLink>
                      </li>
                      </div>
                  )
                } else if (localStorage.getItem("token") && username !== 'admin') {
                  return (
                      <li className={'nav-item'}>
                        <NavLink to={'Gradebook'} className={'nav-link'} aria-current={'page'}>GradeBook</NavLink>
                      </li>
                  )
                } else if (!localStorage.getItem("token")) {

                }
              })()
            }
            </ul>
            <ul className={'navbar-nav ml-auto'}>
              {
                localStorage.getItem("token") ? <div style={{display: "flex"}}><li className="nav-item">
                      <div className={'nav-link'}>{username} -</div>
                    </li>
                    <li className={'nav-item'}>
                      <button className={'nav-link btn btn-danger'} style={{color: "white"}} aria-current={"page"} onClick={logout}>Logout</button>
                    </li></div> : <li className={'nav-item'}>
                <NavLink to={'Login'} className={'nav-link btn btn-success'} style={{color: "white"}} aria-current={'page'}>Login</NavLink>
              </li>
              }
            </ul>
          </div>
        </div>
      </nav>
          <Routes>
              <Route path={'Login'} element={<Login isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />}></Route>

              <Route path="Home"element={<Home />}></Route>

              <Route path="Semester"element={<Semesterlist />}></Route>
              <Route path="Semester/create"element={<Createsemester />}></Route>
              <Route path="Semester/update"element={<UpdateSemester />}></Route>
              <Route path="Semester/delete"element={<DeleteSemester />}></Route>

              <Route path="Course"element={<Courselist />}></Route>
              <Route path="Course/create"element={<Createcourse />}></Route>
              <Route path="Course/update"element={<Updatecourse />}></Route>
              <Route path="Course/delete"element={<Deletecourse />}></Route>

              <Route path="Class"element={<Classlist />}></Route>
              <Route path="Class/create"element={<Createclass />}></Route>
              <Route path="Class/update"element={<Updateclass />}></Route>
              <Route path="Class/delete"element={<Deleteclass />}></Route>
              <Route path="Class/assignlecturer"element={<Assignlecturer />}></Route>



              <Route path="Lecturer"element={<Lecturerlist />}></Route>
              <Route path="Lecturer/create"element={<CreateLecturer />}></Route>
              <Route path="Lecturer/update"element={<UpdateLecturer />}></Route>
              <Route path="Lecturer/delete"element={<DeleteLecturer />}></Route>

              <Route path="Student"element={<Studentlist />}></Route>
              <Route path="Student/create"element={<Createstudent />}></Route>
              <Route path="Student/update"element={<Updatestudent />}></Route>
              <Route path="Student/delete"element={<DeleteStudent />}></Route>
              <Route path="Class/assignlecturer"element={<Assignlecturer />}></Route>


              <Route path={'Student/enrolments'} element={<ListEnrolment />}></Route>
              <Route path={'Student/enrolments/enrol'} element={<EnrolStudent />}></Route>
              <Route path={'Student/enrolments/remove'} element={<RemoveStudent />}></Route>


              <Route path={'Gradebook'} element={<Semesters />}></Route>
              <Route path={'Gradebook/classes'} element={<Classes />}></Route>
              <Route path={'Gradebook/students'} element={<Students />}></Route>
              <Route path={'Gradebook/grades'} element={<Grades />}></Route>










          </Routes>

      </div>



  );
}


export default App;
