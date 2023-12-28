import React, { useState, useEffect } from 'react';
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { useParams, useNavigate } from "react-router-dom";
import axios from 'axios';

function EditStudent() {
    let params = useParams();
    let navigate = useNavigate();
    let [name, setName] = useState("");
    let [email, setEmail] = useState("");
    let [mobile, setMobile] = useState("");
    let [batch, setBatch] = useState("");

    const url = "https://62736209a6522e24ac46aea5.mockapi.io/stud/";

    let getData  = async () => {
        try{
            let response = await axios.get(url + params.id);
            setName(response.data.name);
            setEmail(response.data.email);
            setMobile(response.data.mobile);
            setBatch(response.data.batch);
        } catch (error) {
            console.log(error);
        }
    };

    let handleSubmit = async () => {
        try{
            let response = await axios.put(url + params.id, {
                name,
                email,
                mobile,
                batch: batch,
            });
            if(response.status === 200){
                navigate("/all-students");
            }
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        getData();
        // eslint-disable-next-line
    }, []);

    return(
        <Form>
            <h1 className='mt-5'>Edit Student</h1>
            <Form.Group className='mb-3'>
                <Form.Label>Name</Form.Label>
                <Form.Control 
                value={name}
                type="text"
                placeholder='Name'
                onChange={(e) => setName(e.target.value)}
                />
            </Form.Group>

            <Form.Group className='mb-3'>
                <Form.Label>Email Address</Form.Label>
                <Form.Control 
                value={email}
                type="email"
                placeholder='Enter email'
                onChange={(e) => setEmail(e.target.value)}
                />
                <Form.Text className='text-muted'>
                    We'll never share your email with anyone.
                </Form.Text>
            </Form.Group>

            <Form.Group className='mb-3'>
                <Form.Label>Mobile</Form.Label>
                <Form.Control 
                value={mobile}
                type="text"
                placeholder='Mobile'
                onChange={(e) => setMobile(e.target.value)}
                />
            </Form.Group>

            <Form.Group className='mb-3'>
                <Form.Label>Class</Form.Label>
                <Form.Control 
                value={batch}
                type="text"
                placeholder='Class'
                onChange={(e) => setMobile(e.target.value)}
                />
            </Form.Group>

            <Button variant="primary" onClick={handleSubmit}>
                Update
            </Button>
        </Form>
    );
}

export default EditStudent;