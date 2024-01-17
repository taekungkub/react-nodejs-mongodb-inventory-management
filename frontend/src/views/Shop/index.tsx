import React, { useState } from "react"
import CardProduct from "../../components/CardProduct"
import useProduct from "../../features/Product/hooks/use-product"
import { Box, Button, Card, Flex, ScrollArea, Title } from "@mantine/core"
import CardCartItem from "../../components/CardCartItem"
import { CartItemTy, ProductTy } from "../../types/product.type"

export default function ShopPage() {
  const { useProductQuery } = useProduct()
  const { products } = useProductQuery()
  const [carts, setCarts] = useState<CartItemTy[]>([])

  async function addToCart(item: ProductTy) {
    console.log(item)
    const isItemInCart = carts.find((cartItem) => cartItem._id === item._id) // check if the item is already in the cart

    if (isItemInCart) {
      setCarts(
        carts.map(
          (
            cartItem // if the item is already in the cart, increase the quantity of the item
          ) => (cartItem._id === item._id ? { ...cartItem, qty: cartItem.qty + 1 } : cartItem) // otherwise, return the cart item
        )
      )
    } else {
      setCarts([...carts, { ...item, qty: 1 }]) // if the item is not in the cart, add the item to the cart
    }
  }

  const getCartTotal = () => {
    return carts.reduce((total, item) => total + item.price * item.qty, 0) // calculate the total price of the items in the cart
  }

  const items = products?.map((v) => (
    <div key={v._id} onClick={() => addToCart(v)}>
      <CardProduct item={v} />
    </div>
  ))
  const ItemsCarts = carts.map((v) => (
    <div key={v._id}>
      <CardCartItem item={v} />
    </div>
  ))

  return (
    <div className="grid grid-cols-4 gap-4">
      <div className="col-span-3	">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">{items}</div>
      </div>
      <div>
        <Card shadow="sm" p="md" radius="md" withBorder>
          <Flex pb={"sm"} justify={"space-between"}>
            <Title order={3}>Cart</Title>
            <Title order={3}>Total: ${getCartTotal()}</Title>
          </Flex>
          <ScrollArea.Autosize mah={"60vh"}>{ItemsCarts}</ScrollArea.Autosize>

          <Button fullWidth>Buy</Button>
        </Card>
      </div>
    </div>
  )
}
