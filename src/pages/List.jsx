import React,{useState} from "react";
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useFirebase } from "../context/firebase";

const ListingPage=()=>{
    const firebase=useFirebase();

    const[name,setName]=useState('');
    const[isbnNumber,setIsbnNumber]=useState('');
    const [price,setPrice]=useState('');
    const [coverPic,setCoverPic]=useState('');

    const handlesubmit=async(e)=>{
      e.preventDefault();
      await firebase.handelCreateNewListing(name,isbnNumber,price,coverPic);
    }

    return(
       <div className="container mt-5">
          <Form onSubmit={handlesubmit}>
      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Enter Book Name</Form.Label>
        <Form.Control  onChange={e=>setName(e.target.value)} value={name} type="text" placeholder=" Enter Book Name" />
        
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label>ISBN No</Form.Label>
        <Form.Control onChange={e=>setIsbnNumber(e.target.value)} value={isbnNumber}  type="text" placeholder="Enter ISBN Number" />
      </Form.Group>
      <Form.Group className="mb-3" controlId="formBasicCheckbox">
        <Form.Check type="checkbox" label="Check me out" />
      </Form.Group>

       <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label>Price</Form.Label>
        <Form.Control onChange={e=>setPrice(e.target.value)} value={price}  type="text" placeholder="Enter price" />
      </Form.Group>
      <Form.Group className="mb-3" controlId="formBasicCheckbox">
        <Form.Check type="checkbox" label="Check me out" />
      </Form.Group>

       <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label>File</Form.Label>
        <Form.Control onChange={e=>setCoverPic(e.target.files[0])}   type="file" />
      </Form.Group>
      <Form.Group className="mb-3" controlId="formBasicCheckbox">
        <Form.Check type="checkbox" label="Check me out" />
      </Form.Group>

      <Button variant="primary" type="submit">
        Login
      </Button>
    </Form>
    
        </div>
    )
}

export default ListingPage;