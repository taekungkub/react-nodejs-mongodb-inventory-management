import { Container } from "@mantine/core"
import React from "react"

const AuthLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div>
      <Container size={420} h={"100vh"} style={{ display: "grid", alignItems: "center" }}>
        {children}
      </Container>
    </div>
  )
}

export default AuthLayout
