const ProductCard = ({pro, cartItems, addCart}) => {
  
  return (
    <div className="border rounded-lg p-4 shadow hover:shadow-lg transition-shadow duration-300">
      <img
        src={pro.image}
        alt={pro.name}


        className="w-full h-48 object-cover mb-4 rounded"
      />
      {pro.discount ? <div className=" text-xs text-red-800 font-bold mb-2"><span className="bg-red-800 text-white px-2 py-1 rounded font-bold text-center">{pro.discount }% off</span> limited time deal</div> : null}
      <h2 className="text-lg font-semibold mb-2">{pro.name}</h2>
      <p className="text-gray-700 mb-2 text-2xl">
        ${(pro.price / 100).toFixed(2)}
        <span>{pro.MRP ? <span className="text-sm text-gray-600 ml-2 line-through">M R P: ${(pro.MRP / 100).toFixed(2)}</span> : null}</span>
        
      </p>
      <div className="flex items-center">
        <span className="text-yellow-500 mr-2">⭐ {(pro.stars)}</span>
      
        
      </div>
      <button className="w-full mt-4 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition-colors duration-300" onClick={() => addCart(cartItems + 1)}>
          Add to Cart
        </button>
        </div>
   
  );
};

export default ProductCard;

