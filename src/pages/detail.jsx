import React ,{useEffect,useState}from "react";
import { useParams } from "react-router-dom";
import { useFirebase } from "../context/firebase";
import { Button } from "react-bootstrap";
import Form from 'react-bootstrap/Form';

const BookDetailpage=()=>{
    const params=useParams();
    const firebase=useFirebase();
   const [data,setData]=useState(null);
//    const [url,setURL]=useState(null);

const [qty,setQty]=useState(1);

    useEffect(()=>{
   firebase.getBooksById(params.bookId).then((value)=>setData(value.data()));
    },[])

    // useEffect(()=>{
    //     if(data){
    //         const imageURL=data.imageURl;
    //         firebase.getimageURL(imageURL).then((url)=>setURL(url));

    //     }
    // },[data]);

    if(data==null){
        return <h1>loading....</h1>
    }

    const placeOrder=async()=>{
        const result=await firebase.placeOrder(params.bookId,qty);
    }
    return (
        <div className="container">
            <h1>{data.name}</h1>
            {/* <img src={url} width="50%" style{{borderradius:"10px"}}/> */}/
            <h1>Details</h1>
            <p>Price: Rs. {data.price}</p>
             <p>ISBN Number: {data.isbn}</p>
            <h1>owner detail</h1>
            <p>Name: {data.displayName}</p>
            <p>Email: {data.userEmail}</p>

            <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label>Password</Form.Label>
        <Form.Control onChange={e=>setQty(e.target.value)} value={qty}  type="Number" placeholder="Enter quatity" />
      </Form.Group>
      
            <Button  onClick={placeOrder} variant="success">Order Now</Button>
            
        </div>
    )
}

export default BookDetailpage;