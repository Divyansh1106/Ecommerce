import { use } from 'react';
import logo from '../../assets/images/logo.png'
import useCounterStore from '../../store/cartStore.js';
import { useNavigate } from "react-router-dom";
import { useLocation } from 'react-router-dom';
import { toast } from "react-toastify";
import { Link } from "react-router-dom";



const NavBar = ({ setQuery }) => {
     
    const navigate=useNavigate();
    const {count} = useCounterStore();
     const location = useLocation();
     const handleCart=()=>{
      count>0? navigate('/cart'):toast.info("Your cart is empty");
     }
    return (
            <nav className="w-full border-b bg-white">
      <div className=" h-16 px-6 flex items-center justify-between mx-auto">
        
        {/* Logo */}
        <div className='cursor-pointer flex items-center h-16  '>
        <img src={logo} alt="Logo" className="h-15 " />

        <h1 className="text-2xl font-bold text-emerald-600">
          ShopEase
        </h1>
        </div >

        {/* Menu */}
        {/*SearchBar*/}
        {location.pathname === '/'?
       ( <div className="flex-1 mx-4">
          <input
            type="text"
            placeholder="Search products..."
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
            onChange={(e) => setQuery(e.target.value)}
           
           
          />
        </div>): null}
        <ul className="hidden md:flex gap-8 text-gray-700 font-medium">
          <li className="cursor-pointer hover:text-emerald-600"><Link to="/">Home</Link></li>
          <li className="cursor-pointer hover:text-emerald-600">Products</li>
         
          <button className="relative cursor-pointer hover:text-emerald-600" onClick={() => handleCart()}> 

          <span className="">Cart🛒</span> 
          <span className="absolute -top-2 -right-2 bg-emerald-500 text-white text-xs px-2 rounded-full">
            {count==0 ? "" : count}
          </span>
        </button>
        </ul>

        {/* Cart */}
        

      </div>
    </nav>

    );
}
export default NavBar;