
import NavBar from './components/common/NavBar'
import Footer from './components/common/Footer'
import ProductCard from './components/product/ProductCard'
import headphone from './assets/images/headphone.png'
import keyboard from './assets/images/keyboard.png'
import mouse from './assets/images/Mouse.png'
import speaker from './assets/images/speaker.png'
import backpack from './assets/images/LaptopBagpack.png'
import smartwatch from './assets/images/smartwatch.png'
import usbc from './assets/images/USBC.png'
import { useEffect, useRef, useState } from "react";
import { Routes, Route } from "react-router-dom";
import Cart from "./pages/Cart.jsx";
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from "react-toastify";
import useUserStore from './store/userStore.js'
import Signup from './pages/Signup.jsx'
import CheckoutPage from './pages/Checkout.jsx'



function App() {
  const products = [
  {
    id: 1,
    name: "Wireless Headphones",
    price: 2999,
    stars: 4.5,
    image: headphone
  },
  {
    id: 2,
    discount:5,
    name: "Smart Watch",
    price: 4999,
    stars: 4.2,
    image: smartwatch,
    MRP:5200,
    count:0
  },
  {
    id: 3,
    name: "Gaming Mouse",
    price: 1499,
    stars: 4.6,
    image: mouse,
    
  },
  {
    id: 4,
    name: "Mechanical Keyboard",
    price: 3499,
    stars: 4.7,
    image: keyboard
  },
  {
    id: 5,
    name: "Bluetooth Speaker",
    price: 2599,
    stars: 4.3,
    image: speaker
  },
  {
    id: 6,
    name: "Laptop Backpack",
    price: 1999,
    stars: 4.4,
    image: backpack
  },
  {
    id: 7,
    name: "USB-C Hub",
    price: 1299,
    stars: 4.1,
    image: usbc
  }
];
const [query, setQuery] = useState("");

const normalizedQuery = query.trim().toLowerCase();

const filteredProducts =
  normalizedQuery.length === 0
    ? products
    : products.filter((product) =>
        product.name.toLowerCase().includes(normalizedQuery)
      );





  
  
 

  return (
    <>
    <Routes>
    <Route path="/" element=
     {
   <div className="min-h-screen flex flex-col">
    <main className="flex-grow">
    <NavBar setQuery={setQuery} />
    <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 p-6'>
      {filteredProducts.map(product => (
        <ProductCard key={product.id} pro={product}  />
      ))}
    </div>
    </main>
    <Footer /> 
  
  </div>
}/>
<Route path="/cart" element={<Cart allProducts={products} />} />
<Route path="/signup" element={<Signup/>}></Route>
<Route path="/checkout" element={<CheckoutPage/>}></Route>
  </Routes>
   <ToastContainer
        position="top-right"
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        pauseOnHover
        theme="light"
      />
    </>
  
  

  )
}

export default App
