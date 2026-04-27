import { useCart } from "../context/CartContext";

const Cart = () => {
  const {
    cart,
    increaseQty,
    decreaseQty,
    removeItem,
    clearCart,
    totalPrice
  } = useCart();

  return (
    <div className="p-6">
      <h1 className="text-xl font-bold mb-4">Cart</h1>

      {cart.length === 0 ? (
        <p className="text-gray-500">Cart is empty</p>
      ) : (
        <>
          {cart.map((item) => (
            <div
              key={item._id}
              className="bg-white p-3 mb-2 rounded shadow flex justify-between items-center"
            >
              <div>
                <p className="font-medium">{item.name}</p>
                <p className="text-yellow-600">${item.price}</p>
              </div>

              {/* QUANTITY CONTROLS */}
              <div className="flex items-center gap-2">
                <button
                  onClick={() => decreaseQty(item._id)}
                  className="px-2 bg-gray-200"
                >
                  -
                </button>

                <span>{item.qty}</span>

                <button
                  onClick={() => increaseQty(item._id)}
                  className="px-2 bg-gray-200"
                >
                  +
                </button>
              </div>

              {/* REMOVE */}
              <button
                onClick={() => removeItem(item._id)}
                className="text-red-500"
              >
                ✖
              </button>
            </div>
          ))}

          {/* FOOTER */}
          <div className="mt-6 p-4 bg-white shadow rounded">
            <p className="font-bold mb-2">
              Total: ${totalPrice}
            </p>

            <button
              onClick={clearCart}
              className="bg-red-500 text-white px-4 py-2 rounded"
            >
              Clear Cart
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default Cart;