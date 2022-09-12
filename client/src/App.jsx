import './App.css';
import Header from './componenets/header/header';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Homepage from './screens/homepage';
import CollegeList from './screens/collegeList';
import College from './componenets/college/College';
import StudentList from './screens/studentList';
import Student from './componenets/student/student';

function App() {
  return (
    <div className="App">
      <Router>
        <Header />
        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route path="colleges" element={<CollegeList />} />
          <Route path="colleges/:collegeId" element={<College />} />
          <Route path="students" element={<StudentList />} />
          <Route path=":studentId" element={<Student />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
