import React, { useEffect, useState} from "react";
import { Link } from 'react-router-dom';
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import axios from 'axios';

const url = "https://62736209a6522e24ac46aea5.mockapi.io/stud/";

function AllStudents() {
    let [students, setStudents] = useState([]);

    useEffect(() => {
        getData();
    }, []);

    let getData = async () => {
        try{
            let response = await axios.get(url);
            setStudents(response.data);
        } catch(error){
            console.log(error);
        }
    }

    let handleDelete = async (i) => {
        try{
           let response = await axios.delete(url+i);
           if(response.status===200)
           getData(); 
        } catch(error){
            console.log(error);
        }
    }

    return(
        <>
        <h1 className="mt-5">Student List</h1>
        <Table striped bordered hover>
            <thead>
                <tr>
                    <th>#</th>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Mobile</th>
                    <th>Batch</th>
                </tr>
            </thead>
            <tbody>
                {students.map((e) => {
                    return(
                        <tr key={e.id}>
                            <td>{e.id}</td>
                            <td>{e.name}</td>
                            <td>{e.email}</td>
                            <td>{e.mobile}</td>
                            <td>{e.batch}</td>
                            <td>
                                <Button variant="danger" onClick={() => handleDelete(e.id)}>
                                    Delete
                                </Button>
                                <span>&nbsp; &nbsp;</span>
                                <Link to={`/edit-student/${e.id}`}>
                                <Button variant="primary">Edit</Button>
                                </Link>
                            </td>
                        </tr>
                    );
                })}
            </tbody>
        </Table>
        </>
    );
}

export default AllStudents;