import { useParams } from "react-router-dom"
import useOrder from "../../hooks/use-order"
import "./index.css"
import { Button, Flex } from "@mantine/core"
export default function OrderDetailPage() {
  let params = useParams()

  const { useOrderQuery } = useOrder()
  const { data } = useOrderQuery(String(params.id))

  return (
    <div>
      <Flex justify={"flex-end"}>
        <Button>Print</Button>
      </Flex>
      <div className="table-responsive">
        <table className="table">
          <thead>
            <tr>
              <th className="text-left" style={{ width: "70px" }}>
                No.
              </th>
              <th className="text-left">Item</th>
              <th className="text-right">Price</th>
            </tr>
          </thead>
          <tbody>
            {data?.items.map((v, i) => (
              <tr key={i}>
                <td>{i + 1}</td>
                <td>
                  {v.productId.title} x {v.qty}
                </td>
                <td className="text-right">${v.productId.price}</td>
              </tr>
            ))}

            <tr>
              <td colSpan={2} className="text-right">
                <strong>Sub Total</strong>
              </td>
              <td className="text-right">$1397.00</td>
            </tr>
            <tr className="border-0">
              <td colSpan={2} className="text-right">
                <strong>Shipping</strong>
              </td>
              <td className="text-right">$13.00</td>
            </tr>
            <tr className="border-0">
              <td colSpan={2} className="text-right">
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
