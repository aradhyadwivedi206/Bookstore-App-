
import React, { useEffect, useState } from "react";
import { useFirebase } from "../context/firebase";
import BookCard from "../components/card";

const OrderPage = () => {
  const firebase = useFirebase();
  const [books, setBooks] = useState([]);

  useEffect(() => {
    if (firebase.isLoggedIn) {
      firebase.fetchMyBooks().then((snapshot) => {
        setBooks(snapshot.docs);
      });
    }
  }, [firebase]);

  if (!firebase.isLoggedIn) return <h1>Please login</h1>;

  return (
    <div className="container">
      {books.map((book) => {
        const data = book.data();
        return (
          <BookCard
            link={`/books/orders/${book.id}`}
            key={book.id}
            id={book.id}
            name={data.name}
            price={data.price}
            isbn={data.isbn}
            displayName={data.displayName}
            ImgURL={data.imageURL}
          />
        );
      })}
    </div>
  );
};

export default OrderPage;
