"use client"
import { createContext, useContext, useState } from "react";

// Crear el contexto
const UserContext = createContext()

// Componente proveedor de contexto
export const UserProvider = ({ children }) => {
  const [nuevosUsuarios, setNuevosUsuarios] = useState([]);

  const agregarUsuario = (usuario) => {
    setNuevosUsuarios((prevUsuarios) => [...prevUsuarios, usuario])
  }

  return (
    <UserContext.Provider value={{ nuevosUsuarios, agregarUsuario }}>
      {children}
    </UserContext.Provider>
  )
}

// Hook para usar el contexto
export const useUser = () => useContext(UserContext);

