
import React,{useState,useE, useEffect} from "react";
import { useNavigate } from "react-router-dom";
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

import { useFirebase } from "../context/firebase";

const LoginPage=()=>{

    const Firebase=useFirebase();
    const navigate=useNavigate();

    const [email,setEmail]=useState('');
    const [password,setPassword]=useState('');

    const handlesubmit=async(e)=>{
       e.preventDefault();
       await Firebase.signInUserWithEmailAndPassword(email,password);
    }

    useEffect(()=>{
        if(Firebase.isLoggedIn){
            //navigate to home
            navigate("/");
        }
    },[Firebase,navigate]);

    return(
        <div className="container mt-5">
          <Form onSubmit={handlesubmit}>
      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Email address</Form.Label>
        <Form.Control  onChange={e=>setEmail(e.target.value)} value={email} type="email" placeholder="Enter email" />
        
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label>Password</Form.Label>
        <Form.Control onChange={e=>setPassword(e.target.value)} value={password}  type="password" placeholder="Password" />
      </Form.Group>
      <Form.Group className="mb-3" controlId="formBasicCheckbox">
        <Form.Check type="checkbox" label="Check me out" />
      </Form.Group>
      <Button variant="primary" type="submit">
        Login
      </Button>
    </Form>
    <h1 className="mt-5 mb-5">OR</h1>
    <Button onClick={Firebase.signinWithGoogle} variant="danger">SignIn with Google</Button>
        </div>
    )
}

export default LoginPage;