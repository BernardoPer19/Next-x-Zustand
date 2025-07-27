"use client";

import Link from "next/link";
import { useState } from "react";
import { FaShoppingCart, FaTimes } from "react-icons/fa";

export default function Navbar() {
  const [isCartOpen, setIsCartOpen] = useState(false);

  return (
    <>
      {/* Navbar */}
      <nav className="fixed top-0 left-0 w-full flex items-center justify-between px-6 py-4 bg-white shadow-md z-40">
        <div className="text-xl font-bold text-indigo-600">MiTienda</div>

        <ul className="hidden md:flex gap-6 text-gray-700 font-medium">
          <Link
            href={"/products"}
            className="hover:text-indigo-600 cursor-pointer"
          >
            Inicio
          </Link>{" "}
          <Link
            href={"/favorites"}
            className="hover:text-indigo-600 cursor-pointer"
          >
            Favorites
          </Link>{" "}
          <Link href={"/cart"} className="hover:text-indigo-600 cursor-pointer">
            Cart
          </Link>
        </ul>

        <button
          onClick={() => setIsCartOpen(true)}
          className="relative text-gray-700 hover:text-indigo-600 transition"
        >
          <FaShoppingCart size={22} />
          <span className="absolute -top-2 -right-2 text-xs bg-red-500 text-white rounded-full px-1">
            3
          </span>
        </button>
      </nav>

      {/* Espaciador para que el contenido no quede debajo del navbar */}
      <div className="h-20" />

      {/* Carrito Flotante */}
      {isCartOpen && (
        <>
          <div className="fixed top-0 right-0 w-80 h-full bg-white shadow-lg z-50 p-4 transition-all duration-300">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-semibold">Tu carrito</h2>
              <button
                onClick={() => setIsCartOpen(false)}
                className="text-gray-500 hover:text-red-500 transition"
              >
                <FaTimes size={18} />
              </button>
            </div>

            <div className="text-gray-600">
              <p>3 productos en el carrito</p>
            </div>
          </div>

          {/* Fondo oscuro detrás del carrito */}
          <div
            className="fixed bg-black bg-opacity-30 z-40"
            onClick={() => setIsCartOpen(false)}
          />
        </>
      )}
    </>
  );
}
