import logo from '../../assets/images/logo.png'
const NavBar = () => {
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
        <div className="flex-1 mx-4">
          <input
            type="text"
            placeholder="Search products..."
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
          />
        </div>
        <ul className="hidden md:flex gap-8 text-gray-700 font-medium">
          <li className="cursor-pointer hover:text-emerald-600">Home</li>
          <li className="cursor-pointer hover:text-emerald-600">Products</li>
          <li className="cursor-pointer hover:text-emerald-600">Cart</li>
        </ul>

        {/* Cart */}
        <div className="relative cursor-pointer">
          <span className="text-xl">🛒</span>
          <span className="absolute -top-2 -right-2 bg-emerald-500 text-white text-xs px-2 rounded-full">
            0
          </span>
        </div>

      </div>
    </nav>

    );
}
export default NavBar;