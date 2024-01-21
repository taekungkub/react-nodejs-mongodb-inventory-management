import { Outlet, Navigate } from "react-router-dom"
import useAuth from "../context/AuthContext"
import { Center, Loader } from "@mantine/core"

interface Props {
  allowedRoles?: string[]
}

export default function PrivateRoutes({ allowedRoles }: Props) {
  const { user, loadingInitial, isAuthenticated } = useAuth()

  if (loadingInitial && !user) {
    return (
      <Center h={"70vh"}>
        <Loader />
      </Center>
    )
  }

  if (!loadingInitial && !isAuthenticated) {
    return <Navigate to="/login" replace />
  }



  if (allowedRoles && user && isAuthenticated) {
    return  allowedRoles.includes(user.role) ? <Outlet /> : <Navigate to={"/404"} replace />
  }


  return <Outlet />
}
