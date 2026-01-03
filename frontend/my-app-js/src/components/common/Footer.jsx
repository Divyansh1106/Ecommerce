const Footer = () => {
  return (
    <footer className="w-full border-t border-gray-500 bg-black text-white  text-center">
              <button className="w-full border-b border-gray-700 text-center py-4 text-l text-gray-400 hover:cursor-pointer" onClick={()=>{
        window.scrollTo({top:0, left:0, behavior:'smooth'});
              }}>
        Go to top ↑
      </button>
           <div className="max-w-7xl mx-auto px-6 py-10 grid grid-cols-1 md:grid-cols-4 gap-8">

        {/* Brand */}
        <div>
          <h2 className="text-xl font-bold text-white">ShopEase</h2>
          <p className="text-sm mt-3">
            Your one-stop shop for quality products at the best prices.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-white font-semibold mb-3">Quick Links</h3>
          <ul className="space-y-2 text-sm">
            <li className="hover: cursor-pointer">Home</li>
            <li className="hover:text-white cursor-pointer">Products</li>
            <li className="hover:text-white cursor-pointer">Cart</li>
            <li className="hover:text-white cursor-pointer">About</li>
          </ul>
        </div>

        {/* Support */}
        <div>
          <h3 className="text-white font-semibold mb-3">Support</h3>
          <ul className="space-y-2 text-sm">
            <li className="hover:text-white cursor-pointer">FAQs</li>
            <li className="hover:text-white cursor-pointer">Returns</li>
            <li className="hover:text-white cursor-pointer">Shipping</li>
            <li className="hover:text-white cursor-pointer">Privacy Policy</li>
          </ul>
        </div>

        {/* Contact */}
        <div>
          <h3 className="text-white font-semibold mb-3">Contact</h3>
          <p className="text-sm">Email: support@shopease.com</p>
          <p className="text-sm">Phone: +91 98765 43210</p>
          <p className="text-sm">India</p>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-gray-700 text-center py-4 text-sm text-gray-400">
        © {new Date().getFullYear()} ShopEase. All rights reserved.
      </div>
    </footer>
  )
}
export default Footer