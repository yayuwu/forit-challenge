"use client";

import { useEffect, useState } from "react";
import { getUsers } from "@/utils/getUsers";
import { useUser } from "@/context/UserContext";
import Modal from "./ui/modalAgregar";

export default function Home() {
  const { nuevosUsuarios } = useUser()
  const [usuarios, setUsuarios] = useState([])
  const [buscador, setBuscador] = useState("")
  const [openModal, setOpenModal] = useState(false)

  const handleOpenModal = () => setOpenModal(true)
  const handleCloseModal = () => setOpenModal(false)

  useEffect(() => {
    const fetchUsuarios = async () => {
      try {
        const data = await getUsers()
        setUsuarios(data)
        // console.log(data)
      } catch (error) {
        console.error("Error fetching de datos:", error)
      }
    }
    fetchUsuarios()
  }, [])

  const usuariosFiltrados = [...usuarios, ...nuevosUsuarios].filter((usuario) =>
    [usuario.name, usuario.email, usuario.address?.city || usuario.city].some((field) => field?.toLowerCase().includes(buscador.toLowerCase()))
  )
  

  return (
    <div className="font-sans bg-gray-100">
      <div className="flex justify-center flex-wrap pt-6 gap-3">
        <input
          type="text"
          placeholder="Buscar usuario..."
          value={buscador}
          onChange={(e) => setBuscador(e.target.value)}
          className="p-2 border border-gray-300 rounded-md w-64 focus:outline-indigo-600"
        />
        <button className="flex bg-white p-2 border border-gray-300 rounded-md w-64 focus:outline-indigo-600" onClick={handleOpenModal}>
          <img src="./plus.svg" alt="Plus Icon" className="w-[20px] me-3" />
          Agregar usuario
        </button>
      </div>

      <Modal openModal={openModal} handleCloseModal={handleCloseModal} />

      <div className="py-6 flex justify-center flex-wrap gap-6">
        {/* Mostrar los usuarios */}
        {usuariosFiltrados.length > 0 ? (
          usuariosFiltrados.map((usuario, index) => (
            <div key={index} className="bg-white rounded-lg p-8 w-[300px]">
              <section>
                <p className="font-medium text-indigo-600">{usuario.name}</p>
                <p className="text-gray-400">@{usuario.username}</p>
              </section>
              <section>
                <p>Empresa: {usuario.company?.name || usuario.company}</p>
                <p>Ciudad: {usuario.address?.city || usuario.city}</p>
                <p>Email: {usuario.email}</p>
                <p>Cel: {usuario.phone}</p>
              </section>
            </div>
          ))
        ) : (
          <p className="text-gray-500 text-lg">No se encontraron usuarios.</p>
        )}
      </div>
    </div>
  )
}
