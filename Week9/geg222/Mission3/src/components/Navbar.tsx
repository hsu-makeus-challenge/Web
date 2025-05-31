import { FaShoppingCart } from "react-icons/fa";
import { useEffect } from "react";
import { useCartActions, useCartInfo } from "../hooks/useCartStore";

const Navbar = () => {
  const { amount, cartItems } = useCartInfo();
  const { calculateTotals } = useCartActions();

  useEffect(() => {
    calculateTotals();
  }, [cartItems, calculateTotals]);

  return (
    <div className="flex justify-between items-center px-6 py-4 bg-white text-gray-900 border-b border-gray-200 shadow-sm">
      <h1
        onClick={() => {
          window.location.href = "/";
        }}
        className="text-xl font-semibold cursor-pointer"
      >
        JunYoung Won
      </h1>
      <div className="flex items-center space-x-2">
        <FaShoppingCart className="text-2xl cursor-pointer" />
        <span className="text-lg font-medium">{amount}</span>
      </div>
    </div>
  );
};

export default Navbar;
