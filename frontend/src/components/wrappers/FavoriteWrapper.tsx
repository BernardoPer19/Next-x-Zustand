// components/FavoriteWrapper.tsx
'use client';

import { ProductsType } from "@/types/interfaces.ProductsType";
import FavoriteButton from "../FavoriteButton";


export default function FavoriteWrapper({ product }: { product: ProductsType }) {
  return <FavoriteButton product={product} />;
}
