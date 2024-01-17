import React, { useState } from "react"
import CardProduct from "../../components/CardProduct"
import useProduct from "../../hooks/use-product"
import { Box, Button, Card, Flex, ScrollArea, Title } from "@mantine/core"
import CardCartItem from "../../components/CardCartItem"
import { CartItemTy, ProductTy } from "../../types/product.type"
import useOrder from "../../hooks/use-order"

export default function ShopPage() {
  const { useProductQuery } = useProduct()
  const { products } = useProductQuery()
  const [carts, setCarts] = useState<CartItemTy[]>([])

  async function onAddToCart(item: ProductTy) {
    const isItemInCart = carts.find((cartItem) => cartItem._id === item._id)
    if (isItemInCart) {
      setCarts(carts.map((cartItem) => (cartItem._id === item._id ? { ...cartItem, qty: cartItem.qty + 1 } : cartItem)))
    } else {
      setCarts([...carts, { ...item, qty: 1 }])
    }
  }

  async function onRemoveItemToCart(id: string) {
    setCarts(carts.filter((v) => v._id !== id))
  }

  const getCartTotal = () => {
    return carts.reduce((total, item) => total + item.price * item.qty, 0)
  }

  const { useAddOrder } = useOrder()
  const createOrderMutation = useAddOrder()

  const items = products?.map((v) => (
    <div key={v._id}>
      <CardProduct item={v} onAddToCart={() => onAddToCart(v)} />
    </div>
  ))
  const ItemsCarts = carts.map((v) => (
    <div key={v._id}>
      <CardCartItem item={v} onDelete={(id) => onRemoveItemToCart(id)} />
    </div>
  ))

  function handleBuy() {
    const newMap = carts.map((v) => {
      return {
        productId: v._id,
        qty: Number(v.qty),
      }
    })

    createOrderMutation.mutate({
      items: newMap,
      totalAmount: getCartTotal().toString(),
    })
  }

  return (
    <div className="grid  grid-cols-2 md:grid-cols-4 gap-4">
      <div className="md:col-span-3">
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4">{items}</div>
      </div>
      <div>
        <Card shadow="sm" p="md" radius="md" withBorder>
          <Flex pb={"sm"} justify={"space-between"}>
            <Title order={3}>Cart</Title>
            <Title order={3}>Total: ${getCartTotal()}</Title>
          </Flex>
          <ScrollArea.Autosize mah={"60vh"}>{ItemsCarts}</ScrollArea.Autosize>

          <Button fullWidth onClick={() => handleBuy()} loading={createOrderMutation.isPending}>
            Buy
          </Button>
        </Card>
      </div>
    </div>
  )
}
