import React ,{useEffect,useState}from "react";
import { useFirebase } from "../context/firebase";
import { CardGroup } from "react-bootstrap";
import BookCard from "../components/card";

const Homepage=()=>{

    const firebase=useFirebase();
    const [books,setbooks]=useState([]);

    useEffect(()=>{
        firebase.listAllBooks().then((books)=>setbooks(books.docs));
    })
    return(
         <div className="cotainer">
            <CardGroup>
           {books.map((book)=>(<BookCard  link={`/book/view/${book.id}`}key={book.id} id={book.id} {...book.data()}/>))}
</CardGroup>
        </div>
    )
}

export default Homepage;