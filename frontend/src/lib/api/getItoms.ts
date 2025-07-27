import { ProductsType } from "@/types/interfaces.ProductsType";



export async function fetchProducts(): Promise<ProductsType[]> {
    const res = await fetch("https://dummyjson.com/products", {
        next:{
            revalidate:60
        }
    })
    if (!res.ok) {
        throw new Error("Failed to fetch products")
    }
    const data = await res.json()

    if (!Array.isArray(data.products)) throw new Error("Invalid API response");

    return data.products as ProductsType[]
}


export async function loadProdID(id: number): Promise<ProductsType> {
    const res = await fetch(`https://dummyjson.com/products/${id}`, {
        cache: "no-store",
    });
    if (!res.ok) {
        throw new Error("Error fetching product data");
    }
    const data = await res.json();
    return data as ProductsType;

}
