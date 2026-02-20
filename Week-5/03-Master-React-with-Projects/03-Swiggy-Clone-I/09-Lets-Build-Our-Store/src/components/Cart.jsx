import { useDispatch, useSelector } from "react-redux";
import { CDN_URL } from "../utils/constants";
import { clearCart, removeItem } from "../utils/cartSlice";

const CartItem = ({ item, onRemove }) => {
  const info = item?.card?.info;

  return (
    <div className="flex gap-4 p-4 border-b last:border-b-0">
      {/* IMAGE */}
      {info?.imageId && (
        <img
          src={CDN_URL + info.imageId}
          alt={info.name}
          className="w-24 h-24 object-cover rounded-xl"
        />
      )}

      {/* DETAILS */}
      <div className="flex-1">
        <h3 className="font-semibold text-gray-900">{info?.name}</h3>

        <p className="text-green-600 font-semibold mt-1">
          ₹{(info?.price || info?.defaultPrice) / 100}
        </p>

        {info?.description && (
          <p className="text-sm text-gray-500 mt-2 line-clamp-2">
            {info.description}
          </p>
        )}
      </div>

      {/* REMOVE */}
      <button
        onClick={() => onRemove(item)}
        className="px-3 py-1 text-sm rounded-lg bg-red-50 text-red-600 hover:bg-red-100"
      >
        Remove
      </button>
    </div>
  );
};

const Cart = () => {
  /* Fetching cartItems */ 
  const cartItems = useSelector((store) => store.cart.items);
  const dispatch = useDispatch();

  const handleClearCart = () => dispatch(clearCart());
  const handleRemoveItem = (item) => dispatch(removeItem(item));

  const totalPrice = cartItems.reduce((total, item) => {
    const price =
      item?.card?.info?.price || item?.card?.info?.defaultPrice || 0;
    return total + price / 100;
  }, 0);

  /* EMPTY CART */
  if (cartItems.length === 0) {
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center text-center">
        <h1 className="text-3xl font-bold text-gray-800 mb-2">
          Your cart is empty 🛒
        </h1>
        <p className="text-gray-500">Add some delicious food to see it here.</p>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-4 py-10 grid grid-cols-1 lg:grid-cols-3 gap-8">
      {/* LEFT – ITEMS */}
      <div className="lg:col-span-2 bg-white rounded-2xl shadow-sm border">
        <div className="flex justify-between items-center p-6 border-b">
          <h2 className="text-xl font-bold text-gray-800">
            Cart Items ({cartItems.length})
          </h2>

          <button
            onClick={handleClearCart}
            className="text-sm text-red-600 hover:underline"
          >
            Clear Cart
          </button>
        </div>

        <div>
          {cartItems.map((item, index) => (
            <CartItem
              key={item?.card?.info?.id || index}
              item={item}
              onRemove={handleRemoveItem}
            />
          ))}
        </div>
      </div>

      {/* RIGHT – SUMMARY */}
      <div className="bg-white rounded-2xl shadow-sm border p-6 h-fit sticky top-24">
        <h3 className="text-lg font-bold text-gray-800 mb-4">Order Summary</h3>

        <div className="flex justify-between text-gray-600 mb-2">
          <span>Items Total</span>
          <span>₹{totalPrice.toFixed(2)}</span>
        </div>

        <div className="flex justify-between text-gray-600 mb-4">
          <span>Delivery Fee</span>
          <span className="text-green-600">FREE</span>
        </div>

        <div className="border-t pt-4 flex justify-between items-center">
          <span className="text-lg font-bold">Total</span>
          <span className="text-2xl font-bold text-green-600">
            ₹{totalPrice.toFixed(2)}
          </span>
        </div>

        <button className="w-full mt-6 py-3 rounded-xl bg-green-600 hover:bg-green-700 text-white font-semibold text-lg">
          Proceed to Checkout
        </button>
      </div>
    </div>
  );
};

export default Cart;
