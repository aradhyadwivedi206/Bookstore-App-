import React, { useEffect, useState,useeffect} from "react";
import { useFirebase } from "../context/firebase";
import { useNavigate } from "react-router-dom";
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';

const BookCard=(props)=>{

    const firebase=useFirebase();
    // const [url,setURL]=useState(null);

    // useEffect(()=>{
    //     firebase.getImgURL(props.ImgURL).then(url=>setURL(url));
    // },[]);
    const navigate=useNavigate();
        return (
    <Card style={{ width: '18rem', margin:"25px" }}>
      <Card.Img variant="top" src="holder.js/100px180"/>
      <Card.Body>
        <Card.Title>{props.name}</Card.Title>
        <Card.Text>
          this book has a title {props.name} and this book is sold by {props.displayName} and this book cost rupee {props.price}.
        </Card.Text>
        <Button onClick={e=>navigate(props.link)}  variant="primary">view</Button>
      </Card.Body>
    </Card>
  );
}

export default BookCard;