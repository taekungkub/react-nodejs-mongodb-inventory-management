import { createTheme, MantineProvider } from "@mantine/core"
import { Notifications } from "@mantine/notifications"
import React from "react"
import "@mantine/notifications/styles.css"
// mantine table
import "@mantine/core/styles.layer.css"
import "mantine-datatable/styles.layer.css"
import "../assets/css/mantine.css"

type Props = {
  children: React.ReactNode
}

const theme = createTheme({
  /** Put your mantine theme override here */
})

export default function MantineProviders({ children }: Props) {
  return (
    <MantineProvider theme={theme}>
      <Notifications position={"top-center"} />
      {children}
    </MantineProvider>
  )
}
