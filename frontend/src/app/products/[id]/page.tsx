import React from "react";
import { ProductsType } from "../../../types/interfaces.ProductsType";
import { fetchProducts, loadProdID } from "@/lib/api/getItoms";
import { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";

// React Icons
import {
  FaStar,
  FaTag,
  FaBox,
  FaBarcode,
  FaRuler,
  FaTruck,
  FaUndo,
  FaCheckCircle,
} from "react-icons/fa";
import FavoriteButton from "@/components/FavoriteButton";

export async function generateStaticParams() {
  const data: ProductsType[] = await fetchProducts();

  return data.map((prod) => ({
    id: String(prod.id),
  }));
}

export async function generateMetadata({
  params,
}: {
  params: { id: string };
}): Promise<Metadata> {
  try {
    const { id, title } = await loadProdID(Number(params.id));
    return {
      title: `#${id} - ${title}`,
      description: `Información detallada del producto ${title}`,
    };
  } catch {
    return {
      title: "Producto no encontrado",
      description: "No se encontró información del producto",
    };
  }
}

const ProductPageById = async ({ params }: { params: { id: string } }) => {
  const id = Number(params.id);
  if (isNaN(id)) return notFound();

  const product = await loadProdID(id);
  if (!product) return notFound();


  return (
    <div className="max-w-7xl mx-auto p-6 grid grid-cols-1 lg:grid-cols-2 gap-10">
      {/* Imágenes */}
      <div className="flex flex-col gap-4 bg-white  rounded-lg p-4 border dark:border-gray-700">
        <Image
          src={product.thumbnail}
          alt={product.title}
          width={600}
          height={400}
          className="rounded-lg w-full object-cover"
        />
        <div className="flex gap-3 overflow-x-auto scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-gray-200 dark:scrollbar-thumb-gray-600 dark:scrollbar-track-gray-700">
          {product.images.map((img, idx) => (
            <Image
              key={idx}
              src={img}
              alt={`Imagen ${idx + 1}`}
              width={100}
              height={100}
              className="w-24 h-24 object-cover rounded-md border border-gray-300 dark:border-gray-600"
            />
          ))}
        </div>
      </div>

      {/* Información */}
      <div className="flex flex-col gap-4">
        <h1 className="text-3xl font-bold">{product.title}</h1>
        <p className="text-gray-700">{product.description}</p>

        <div className="flex items-center gap-2 text-xl font-semibold text-green-600">
          <FaTag /> ${product.price.toFixed(2)}
        </div>

        <div className="text-sm text-gray-500">
          Descuento: {product.discountPercentage}%
        </div>

        <div className="flex items-center gap-1 text-yellow-500">
          <FaStar /> {product.rating} / 5
        </div>

        <div className="grid grid-cols-2 gap-3 text-sm">
          <div>
            <FaBox className="inline mr-1" />
            <strong>Categoría:</strong> {product.category}
          </div>
          <div>
            <FaCheckCircle className="inline mr-1" />
            <strong>Marca:</strong> {product.brand}
          </div>
          <div>
            <strong>Stock:</strong> {product.stock} unidades
          </div>
          <div>
            <FaBarcode className="inline mr-1" />
            <strong>SKU:</strong> {product.sku}
          </div>
          <div>
            <strong>Peso:</strong> {product.weight} kg
          </div>
          <div>
            <FaRuler className="inline mr-1" />
            <strong>Dimensiones:</strong> {product.dimensions.width} x{" "}
            {product.dimensions.height} x {product.dimensions.depth} cm
          </div>
          <div>
            <FaTruck className="inline mr-1" />
            <strong>Envío:</strong> {product.shippingInformation}
          </div>
          <div>
            <strong>Garantía:</strong> {product.warrantyInformation}
          </div>
          <div>
            <strong>Estado:</strong> {product.availabilityStatus}
          </div>
          <div>
            <strong>Mínimo pedido:</strong> {product.minimumOrderQuantity}
          </div>
        </div>

        {/* Tags */}
        <div className="mt-4 flex flex-wrap gap-2">
          {product.tags.map((tag, idx) => (
            <span
              key={idx}
              className="bg-gray-900 text-sm px-3 py-1 rounded-full"
            >
              <span className="text-white">#{tag}</span>
            </span>
          ))}
          <FavoriteButton product={product} /> 
        </div>
        {/* Política de devolución */}
        <div className="mt-4 text-sm text-gray-600">
          <FaUndo className="inline mr-1" />
          <strong>Política de devolución:</strong> {product.returnPolicy}
        </div>

        {/* Información Meta */}
        <div className="mt-4 text-xs text-gray-500 space-y-1">
          <div>
            <strong>Creado:</strong>{" "}
            {new Date(product.meta.createdAt).toLocaleDateString()}
          </div>
          <div>
            <strong>Actualizado:</strong>{" "}
            {new Date(product.meta.updatedAt).toLocaleDateString()}
          </div>
          <div>
            <strong>Barcode:</strong> {product.meta.barcode}
          </div>
          <div>
            <strong>QR Code:</strong> {product.meta.qrCode}
          </div>
        </div>

        {/* Reseñas */}
        <div className="mt-8">
          <h2 className="text-2xl font-semibold mb-3">
            Reseñas ({product.reviews.length})
          </h2>
          <div className="space-y-4">
            {product.reviews.map((review, idx) => (
              <div key={idx} className="p-4 border rounded-md">
                <div className="flex justify-between items-center">
                  <div className="font-bold">{review.reviewerName}</div>
                  <div className="text-yellow-500">
                    <FaStar className="inline mr-1" /> {review.rating}/5
                  </div>
                </div>
                <p className="text-sm text-gray-600">{review.comment}</p>
                <div className="text-xs text-gray-400">
                  {new Date(review.date).toLocaleDateString()}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductPageById;
