import React from "react";
import { fetchProducts } from "@/lib/api/getItoms";
import ProductCard from '../../components/ProductCard';

const ProductsPage = async () => {
  const products = await fetchProducts();

  return (
    <div className="p-8 w-[1200px] m-auto">
      <h1 className="text-3xl font-bold mb-6">🛍 Catálogo de Productos</h1>

        <ProductCard products={products}/>

    </div>
  );
};

export default ProductsPage;
