import { useState } from "react"
import { ProductTy } from "../../../types/product.type"
import BackendServices from "../../../services/BackendServices"
import useToast from "../../../hooks/use-toast"

export default function useProduct() {
  const [products, setProducts] = useState<ProductTy[] | undefined>([])

  const toast = useToast()

  async function onGetProducts() {
    try {
      const res = await BackendServices.products()
      setProducts(res.data.data)
    } catch (error) {
      console.log(error)
    }
  }

  return { onGetProducts, products }
}
