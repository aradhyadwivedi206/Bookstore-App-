import { Routes,Route } from "react-router-dom";

//css*************************************************
import"bootstrap/dist/css/bootstrap.min.css";
import Button from 'react-bootstrap/Button';

//pages************************************************
import RegisterPage from "./pages/register";
import LoginPage from "./pages/login";
import ListingPage from "./pages/List";
import Homepage from "./pages/home";
import BookDetailpage from "./pages/detail";
import OrderPage from "./pages/orders";
import ViewOrderDetails from "./pages/vieworder";


//componenets********************************************
import NavBar from "./components/navbar";

import './App.css';


function App() {
  return (
    <div className="container">
      <NavBar/>
   <Routes>
    <Route path="/" element={<Homepage/>}/>
     <Route path="/Login" element={<LoginPage/>}/>
     <Route path="/Register" element={<RegisterPage/>}/>
     <Route path="/book/list" element={<ListingPage/>}/>
      <Route path="/book/view/:bookId" element={<BookDetailpage/>}/>
      <Route path="/book/orders" element={<OrderPage/>}/>
       <Route path="/books/orders/:bookId" element={<ViewOrderDetails/>}/>
   </Routes>
   
    </div>
  );
}

export default App;
