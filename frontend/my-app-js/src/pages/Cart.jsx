import useCounterStore from "../store/cartStore.js";
import CartCard from "../components/product/cartCard.jsx";
import { Link } from "react-router-dom";
import NavBar from "../components/common/NavBar.jsx";
import Footer from "../components/common/Footer.jsx";
import Confetti from "react-confetti";
import { useEffect, useRef, useState } from "react";


const FreeDeliveryAmount=10;

const CartPage = ({ allProducts }) => {
  const [showConfetti, setShowConfetti] = useState(false);
const hasCelebrated = useRef(false);
  const { products, count, clearCart } = useCounterStore();

  const cartItems = allProducts.filter(
    (product) => products[product.id]
  );

  const isCartEmpty = count === 0;
  const totalPrice=cartItems.reduce((acc, item) => {
   return acc+((item.price / 100).toFixed(2))*products[item.id];
  },0);
   const remaining = Math.max(
    FreeDeliveryAmount - totalPrice,
    0
  );
   const progress = Math.min(
    (totalPrice / FreeDeliveryAmount ) * 100,
    100
  );
  useEffect(() => {
  if (totalPrice >= FreeDeliveryAmount && !hasCelebrated.current) {
    setShowConfetti(true);
    hasCelebrated.current = true;

    // Stop confetti after 3 seconds
    setTimeout(() => {
      setShowConfetti(false);
    }, 3000);
  }
}, [totalPrice]);

  return (
    <div>
      {showConfetti && (
  <Confetti
    numberOfPieces={250}
    gravity={0.3}
    recycle={false}
   
  />
)}

      <NavBar />

      <div className="max-w-6xl mx-auto p-6">
        <h1 className="text-2xl font-bold mb-6">Your Cart</h1>

        {isCartEmpty ? (
          /* EMPTY CART */
          <div className="flex flex-col items-center justify-center h-[60vh] text-center">
            <p className="text-xl text-gray-600 mb-4">
              No items to display 🛒
            </p>
            <Link
              to="/"
              className="bg-emerald-500 text-white px-6 py-2 rounded hover:bg-emerald-600 transition"
            >
              Go to Home
            </Link>
          </div>
        ) : (
          /* CART + SUMMARY GRID */
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
            
            {/* 🟢 LEFT: CART ITEMS (75%) */}
            <div className="lg:col-span-3 space-y-4">
              {cartItems.map((product) => (
                <CartCard key={product.id} product={product} />
              ))}
            </div>

            {/* 🟢 RIGHT: SUMMARY + PROCEED (25%) */}
            <div className="lg:col-span-1">

              <div className="border rounded-lg p-4 shadow
                              lg:sticky lg:top-24">
                
                <h2 className="text-lg font-semibold mb-4">
                  Order Summary
                </h2>
                <div className="border rounded-lg p-4 bg-emerald-50 mb-6">
      
      {/* TEXT */}
      {remaining > 0 ? (
        <p className="text-sm text-emerald-700 mb-2">
          Add <span className="font-bold">$npm install react-confetti{remaining.toFixed(2)}</span> more
          to get <span className="font-bold">FREE delivery</span> 🚚
        </p>
      ) : (
        <p className="text-sm font-semibold text-emerald-700 mb-2">
          🎉 You’ve unlocked FREE delivery!
        </p>
      )}

      {/* PROGRESS BAR */}
      <div className="w-full h-2 bg-emerald-200 rounded-full overflow-hidden">
        <div
          className="h-full bg-emerald-500 transition-all duration-500"
          style={{ width: `${progress}%` }}
        />
      </div>
    </div>
  

                <p className="text-gray-700 mb-4">
                  Total Items: <span className="font-bold">{count}</span>
                </p>
                 <p className="text-gray-700 mb-4">
                  Total Cost: <span className=" text-2xl">${totalPrice.toFixed(2)}</span>
                </p>

                <button
                  className="w-full bg-yellow-400 text-black font-semibold
                             py-3 rounded-lg hover:bg-yellow-500 transition
                             shadow-md"
                >
                  Proceed to Buy
                </button>

                <button
                  onClick={clearCart}
                  className="w-full mt-3 bg-red-500 text-white
                             py-2 rounded hover:bg-red-600 transition"
                >
                  Clear Cart
                </button>
              </div>
            </div>
          </div>
        )}
      </div>

      <Footer />
    </div>
  );
};

export default CartPage;
