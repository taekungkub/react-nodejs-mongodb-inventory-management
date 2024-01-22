import { useParams } from "react-router-dom"
import useOrder from "../../hooks/use-order"
import "./index.css"
import { Button, Flex, Title } from "@mantine/core"
export default function OrderDetailPage() {
  let params = useParams()

  const { useOrderQuery } = useOrder()
  const { data } = useOrderQuery(String(params.id))

  return (
    <div>
      <Flex justify={"flex-end"}>
        <Button className="hide-on-print" onClick={() => window.print()}>
          Print
        </Button>
      </Flex>
      <Title order={4}>Bill: {data?._id}</Title>

      <Title order={4}>ผู้สั่ง: {data?.userId.username}</Title>
      <div className="table-responsive">
        <table className="table">
          <thead>
            <tr>
              <th className="text-left">No.</th>
              <th className="text-left">Item</th>
              <th className="text-left"> Qty</th>
              <th className="text-right">Price</th>
            </tr>
          </thead>
          <tbody>
            {data?.items.map((v, i) => (
              <tr key={i}>
                <td>{i + 1}</td>
                <td>{v.productId.title}</td>
                <td>{v.qty}</td>
                <td className="text-right">${v.productId.price * v.qty}</td>
              </tr>
            ))}
            <tr>
              <td colSpan={3} className="text-right">
                <strong>Sub Total</strong>
              </td>
              <td className="text-right">$1397.00</td>
            </tr>
            <tr className="border-0">
              <td colSpan={3} className="text-right">
                <strong>Shipping</strong>
              </td>
              <td className="text-right">$13.00</td>
            </tr>
            <tr className="border-0">
              <td colSpan={3} className="text-right">
                <strong>Total</strong>
              </td>
              <td className="text-right">
                <h4 className="m-0">$1410.00</h4>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  )
}
