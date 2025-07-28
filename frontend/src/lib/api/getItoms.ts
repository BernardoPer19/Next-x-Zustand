import { ProductsType } from "@/types/interfaces.ProductsType";



export async function fetchProducts(): Promise<ProductsType[]> {
    const res = await fetch("https://dummyjson.com/products", {
        next: {
            revalidate: 60
        }, cache: 'force-cache'
    })
    if (!res.ok) {
        throw new Error("Failed to fetch products")
    }
    const data = await res.json()

    if (!Array.isArray(data.products)) throw new Error("Invalid API response");

    return data.products as ProductsType[]
}


export async function loadProdID(id: number): Promise<ProductsType> {
    if (!id || isNaN(id)) {
        throw new Error(`ID inválido recibido en loadProdID: ${id}`);
    }

    const res = await fetch(`https://dummyjson.com/products/${Number(id)}`, {
        next: { revalidate: 60 },
        cache: 'force-cache'
    });

    if (!res.ok) {
        const errorText = await res.text();
        throw new Error(`Error al obtener el producto: ${res.status} - ${errorText}`);
    }

    const data = await res.json();
    console.log(data);

    return data as ProductsType;
}
