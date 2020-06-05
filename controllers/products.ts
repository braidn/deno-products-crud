import { v4 } from 'https://deno.land/std/uuid/mod.ts'
import { Product } from '../types.ts'

let products: Product[] = [
  { id: "d6a90b07-758a-470e-937e-6ef3dc7459d8"
  , name: "Product One" 
  , description: "Some of all products"
  , price: 29.99
  },
  { id: "b2444bbd-84ce-4e07-9fbb-a1df87b3f166"
  , name: "Product Two" 
  , description: "Some of all products"
  , price: 29.99
  },
  { id: "c860e271-2301-4d00-ae24-deab1089f2c1"
  , name: "Product Three" 
  , description: "Some of all products"
  , price: 29.99
  }
]

// @route GET /api/v1/products

const getProducts = ({ response }: { response: any }) => {
  response.body = {
    success: true
    , data: products
  }
}

// @route GET /api/v1/products/:id

const getProduct = ({ params, response }: { params: { id: string }, response: any }) => {
  const product: Product | undefined = products.find(p => p.id === params.id)

  if (product) {
    response.status = 200
    return response.body = {
      success: true
      , data: product
    }
  }

  response.status = 404
  return response.body = {
    success: false
    , msg: 'No Product Found'
  }
}

// @route POST /api/v1/products/

const addProduct = async ({ request, response }: { request: any, response: any }) => {
  const body = await request.body()

  if (!request.hasBody) {
    response.status = 400
    return response.body = {
      success: false
      , msg: 'No Data'
    }
  }

  const product: Product = body.value
  product.id = v4.generate()
  products.push(product)

  response.status = 201
  response.body = {
    success: true
    , data: product
  }

}

// @route PUT /api/v1/products/:id

const updateProduct = async ({ params, request, response }: { params: {id: string}, request: any, response: any }) => {
  const product: Product | undefined = products.find(p => p.id === params.id)

  if (product) {
    const body = await request.body

    const productUpsert: { name?: string, description?: string, price?: number } = body.value
    products = products.map(p => p.id === params.id ? { ...p, ...productUpsert } : p)

    response.status = 200
    return response.body = {
      success: true
      , data: products
    }
  }

  response.status = 400
  response.body = {
    success: false
    , msg: 'No product updated'
  }
}

// @route DELETE /api/v1/products/:id

const deleteProduct = ({ prams, response }: { params: { id: string }, response: any }) => {
  products = products.filter(p => p.id !== params.id)

  response.body = {
    success: true
    , msg: 'Product Removed'
  }
}

export { getProducts, getProduct, addProduct, updateProduct, deleteProduct }
