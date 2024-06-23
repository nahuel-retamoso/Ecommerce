import { createClient } from '@sanity/client'

export const client = createClient({
    projectId: process.env.REACT_APP_projectId,
    dataset: process.env.REACT_APP_dataset,
    useCdn: true, // set to `false` to bypass the edge cache
    apiVersion: '2024-06-20', // use current date (YYYY-MM-DD) to target the latest API version
})

export async function getHome() {
    try {
        const content = await client.fetch('*[_type == "content"]{slider, title, description, "image": image.asset->url}')
        return content
    } catch (error) {
        console.error('Error fetching home content:', error)
        return []
    }
}

export async function getFeatured() {
    try {
        const query = `
            *[_type == "content"]{
                "featured": featured[]->{
                    _id,
                    title,
                    description,
                    "images": images[].asset->url,
                    price,

                }
            }
        `;

        const featured = await client.fetch(query);
        return featured;
    } catch (error) {
        console.error('Error fetching featured:', error);
        return [];
    }
}


export async function getCategories() {
    try {
        const categories = await client.fetch('*[_type == "categories"]')
        return categories
    } catch (error) {
        console.error('Error fetching categories:', error)
        return []
    }
}

export async function getSpecificProduct(id) {
    try {
        const products = await client.fetch(`*[_type == "product" && _id == ${id}] {
            title,
            description,
            price,
            sizes,
            sku,
            slug,
            "images": images[].asset->url,
            category->{
                _id,
                title
            },
            subcategory->{
                _id,
                title
            }
        }`)
        return products
    } catch (error) {
        console.error('Error fetching specific product:', error)
        return null
    }
}

export async function getFilterProducts(subcategory) {
    try {
        const filterProducts = await client.fetch(`*[_type == "product" && subcategory._ref == ${subcategory}] {
            _id,
            title,
            description,
            price,
            sizes,
            sku,
            slug,
            "images": images[].asset->url,
            category->{
                _id,
                title
            },
            subcategory->{
                _id,
                title
            }
        }`)
        return filterProducts
    } catch (error) {
        console.error('Error fetching filtered products:', error)
        return []
    }
}