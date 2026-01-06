import useCounterStore from "../../store/cartStore";
import { Trash2 } from "lucide-react";

const CartCard = ({ product }) => {
  const { addProduct, removeProduct, removeItem, products } =
    useCounterStore();

  const qty = products[product.id] || 0;

  const handleAdd = () => addProduct(product);
  const handleRemove = () => removeProduct(product);
  const handleDelete = () => removeItem(product);

  return (
    <div className="border rounded-lg p-4 shadow hover:shadow-lg transition-all duration-300">
      <div className="flex items-center">
        {/* Product Image */}
        <img
          src={product.image}
          alt={product.name}
          className="w-16 h-16 object-cover rounded-md"
        />

        {/* Product Info */}
        <div className="ml-4 flex-grow">
          <h3 className="font-semibold text-lg">{product.name}</h3>
          <p className="text-gray-600">${(product.price / 100).toFixed(2)}</p>
        </div>

        {/* Quantity Controls */}
        <div className="flex items-center space-x-3">
          {/* Minus / Delete */}
          <button
            onClick={qty > 1 ? handleRemove : null}
            className="w-8 h-8 flex items-center justify-center rounded
              
               
                   bg-gray-200 hover:bg-gray-300"
                 
              
          >
            { "-"}
          </button>

          {/* Quantity */}
          <span className="w-6 text-center font-semibold">{qty}</span>

          {/* Plus */}
          <button
            onClick={handleAdd}
            className="w-8 h-8 bg-green-500 text-white rounded hover:bg-green-600"
          >
            +
          </button>
          <button
            onClick={handleDelete}
            className="w-8 h-8 bg-red-500 text-white rounded hover:bg-red-600 p-2"
          >
            <Trash2 size={16} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default CartCard;
