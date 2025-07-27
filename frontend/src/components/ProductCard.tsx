import {
  FaStar,
  FaCheckCircle,
  FaTimesCircle,
  FaTags,
  FaEye,
  FaShoppingCart,
} from "react-icons/fa";
import Image from "next/image";
import React from "react";
import FavoriteWrapper from "@/components/wrappers/FavoriteWrapper";
import { ProductsType } from "@/types/interfaces.ProductsType";

interface Props {
  products: ProductsType[];
}

function ProductCard({ products }: Props) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
      {products.map((prod) => (
        <div
          key={prod.id}
          className="bg-white shadow-md rounded-lg overflow-hidden hover:shadow-lg transition duration-300"
        >
          <div className="relative h-48 w-full">
            <Image
              priority={false}
              src={prod.thumbnail}
              alt={prod.title}
              fill
              className="object-cover"
            />
          </div>

          <div className="p-4">
            <h2 className="text-xl font-semibold truncate text-black">
              {prod.title}
            </h2>
            <p className="text-sm text-gray-500">{prod.brand}</p>

            <div className="flex items-center gap-2 my-2 text-yellow-500">
              <FaStar />
              <span className="text-gray-800 font-medium">
                {prod.rating.toFixed(1)}
              </span>
              <span className="text-sm text-gray-500">
                ({prod.reviews.length} opiniones)
              </span>
            </div>

            <div className="flex items-center gap-2 my-2">
              <span className="text-lg font-bold text-green-600">
                ${prod.price}
              </span>
              {prod.discountPercentage > 0 && (
                <span className="text-sm text-red-500 line-through">
                  $
                  {Math.round(prod.price / (1 - prod.discountPercentage / 100))}
                </span>
              )}
              {prod.discountPercentage > 0 && (
                <span className="ml-auto text-xs bg-red-100 text-red-600 px-2 py-1 rounded">
                  -{prod.discountPercentage}%
                </span>
              )}
            </div>

            <div className="flex items-center gap-2 text-sm mt-2">
              {prod.availabilityStatus === "in_stock" ? (
                <span className="flex items-center text-green-600">
                  <FaCheckCircle /> Disponible
                </span>
              ) : (
                <span className="flex items-center text-red-500">
                  <FaTimesCircle /> Agotado
                </span>
              )}
            </div>

            {prod.tags.length > 0 && (
              <div className="flex flex-wrap gap-2 mt-3">
                {prod.tags.slice(0, 3).map((tag, index) => (
                  <span
                    key={index}
                    className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full flex items-center"
                  >
                    <FaTags /> {tag}
                  </span>
                ))}
              </div>
            )}
          </div>
          <div className="flex justify-center items-center gap-2 mt-4 p-3">
            <button className="flex items-center gap-2 bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700 transition">
              <FaShoppingCart />
              Añadir
            </button>

            <button className="flex items-center gap-2 bg-gray-200 text-gray-800 px-4 py-2 rounded-md hover:bg-gray-300 transition">
              <FaEye />
              Ver
            </button>

            <FavoriteWrapper product={prod} />
          </div>
        </div>
      ))}
    </div>
  );
}

export default ProductCard;
