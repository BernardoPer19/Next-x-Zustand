"use client"

import React from "react";
import { FaShoppingCart } from "react-icons/fa";

const AddToCartButton = () => {
  return (
    <div>
      <button className="flex items-center gap-2 bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700 transition">
        <FaShoppingCart />
        Añadir
      </button>
    </div>
  );
};

export default AddToCartButton;
