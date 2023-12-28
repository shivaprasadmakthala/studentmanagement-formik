import React, { useState } from 'react';
import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import AllStudents from './components/AllStudents';
import AddStudents from './components/AddStudents';
import Dashboard from './components/Dashboard';
import EditStudent from './components/EditStudent';
import Sidebar from './components/Sidebar';

export const StudentContext = React.createContext();

function App() {
  let data = {
    earning: " 50,000",
    annual: "4,00,000",
    task: 50,
    pending:26,
  };

  let [students, setStudents] = useState([]);
  return (
    <>
      <BrowserRouter>
      <div style={{ display: "grid", gridTemplateColumns: "17% 80%"}}>
        <div>
          <Sidebar />
        </div>
      </div>
      <StudentContext.Provider value={{ students, setStudents }}>
      <Routes>
        <Route path="/dashboard" element={<Dashboard data={data} />} />
        <Route path="/all-students" element={<AllStudents />} />
        <Route path="/add-student" element={<AddStudents />} />
        <Route path="/edit-student/:id" element={<EditStudent />} />
      </Routes>
      </StudentContext.Provider>
      </BrowserRouter>

    </>
  );
}

export default App;
