import { createContext, ReactNode, useContext, useEffect, useMemo, useState } from "react"
import { jwtDecode } from "jwt-decode"
import { UserTy } from "../types/user.type"
import BackendServices from "../services/BackendServices"
import useToast from "../hooks/use-toast"
import { Outlet, useNavigate } from "react-router-dom"

interface AuthContextType {
  token: string
  user?: UserTy
  loadingSubmit: boolean
  logout: () => void
  loadingInitial: boolean
  isAuthenticated: boolean
  login: (username: string, password: string) => void
}

const AuthContext = createContext<AuthContextType>({} as AuthContextType)

export function AuthProvider(): JSX.Element {
  const [token, setToken] = useState("")
  const [user, setUser] = useState<UserTy>()
  const [loadingSubmit, setLoadingSubmit] = useState(false)
  const [loadingInitial, setLoadingInitial] = useState(true)
  const navigate = useNavigate()
  const toast = useToast()

  const [isAuthenticated, setIsAuthenticated] = useState(false)

  useEffect(() => {
    handleToken()
  }, [])

  useEffect(() => {
    if (token) {
      getUserInfo()
    }
  }, [token])

  function handleToken() {
    try {
      let token = localStorage.getItem("token")

      if (token) {
        const { access_token } = JSON.parse(token)
        if (access_token) {
          setToken(access_token)
          setIsAuthenticated(true)
        }
      } else {
        setLoadingInitial(false)
      }
    } catch (error) {
      setLoadingInitial(false)
      logout()
    }
  }

  async function getUserInfo() {
    try {
      await checkExpired()
      const res = await BackendServices.profile()
      setUser({
        ...res.data.data,
      })
    } catch (error) {
      setIsAuthenticated(false)
      logout()
    } finally {
      setLoadingInitial(false)
    }
  }

  async function checkExpired() {
    try {
      if (!token) {
        return Promise.reject("no token")
      }
      let decodedToken = jwtDecode(token)
      const { exp } = decodedToken as any
      if (Date.now() > exp * 1000) {
        return Promise.reject("token exp")
      }
      return Promise.resolve("done")
    } catch (error) {
      return Promise.reject(error)
    }
  }

  async function login(username: string, password: string) {
    try {
      setLoadingSubmit(true)
      const res = await BackendServices.login(username, password)
      toast.success({ msg: "Login successfully" })
      localStorage.setItem("token", JSON.stringify(res.data.data))
      setToken(res.data.data.access_token)
      setIsAuthenticated(true)
      navigate("/dashboard")
    } catch (error: any) {
      toast.error({ msg: error.description ? error.description : "Something went wrong" })
    } finally {
      setLoadingSubmit(false)
    }
  }

  function logout() {
    localStorage.removeItem("token")
    setUser(undefined)
    setToken("")
    setIsAuthenticated(false)
    navigate("/login")
  }

  const memoedValue = useMemo(
    () => ({
      token,
      user,
      loadingSubmit,
      login,
      logout,
      loadingInitial,
      isAuthenticated,
    }),
    [token, user, loadingInitial, isAuthenticated]
  )

  return (
    <AuthContext.Provider value={memoedValue}>
      <Outlet />
    </AuthContext.Provider>
  )
}

export default function useAuth() {
  return useContext(AuthContext)
}
