"use client"
import { createContext, useContext, useState } from "react"

const UserContext = createContext()

export const UserProvider = ({ children }) => {
  const [nuevosUsuarios, setNuevosUsuarios] = useState([])

  const agregarUsuario = (usuario) => {
    setNuevosUsuarios((prevUsuarios) => [...prevUsuarios, usuario])
  }

  return (
    <UserContext.Provider value={{ nuevosUsuarios, agregarUsuario }}>
      {children}
    </UserContext.Provider>
  )
}

export const useUser = () => useContext(UserContext)

