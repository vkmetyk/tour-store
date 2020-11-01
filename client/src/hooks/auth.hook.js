import {useState, useCallback, useEffect} from "react"
import { userStorageName } from '../constants';

export const useAuth = () => {
  const [token, setToken] = useState(null)
  const [ready, setReady] = useState(false)
  const [userId, setUserId] = useState(null)
  const [userRole, setUserRole] = useState(null)

  const login = useCallback((data) => {
    setToken(data.token);
    setUserId(data.id);
    setUserRole(data.role);
    localStorage.setItem(userStorageName, JSON.stringify(data));
  }, [])

  const logout = useCallback(() => {
    setToken(null)
    setUserId(null)
    setUserRole(null)
    localStorage.removeItem(userStorageName)
  }, [])

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem(userStorageName))

    if (data && data.token) {
      login(data)
    }
    setReady(true)
  }, [login])

  return { login, logout, token, userId, userRole, ready }
}