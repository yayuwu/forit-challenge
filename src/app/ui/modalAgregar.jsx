import { useState } from "react";
import { useUser } from "@/context/UserContext";

export default function Modal({ openModal, handleCloseModal }) {
  const { agregarUsuario } = useUser();
  const [formData, setFormData] = useState({
    name: "",
    username: "",
    email: "",
    phone: "",
    company: "",
    city: "",
  })

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    agregarUsuario(formData)
    handleCloseModal()
    setFormData({
      name: "",
      username: "",
      email: "",
      phone: "",
      company: "",
      city: "",
    });
  };

  return (
    <div className={`fixed top-0 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-50 ${openModal ? "block" : "hidden"}`}>
      <div className="relative bg-white border border-gray-400 rounded-md w-[90%] sm:w-[80%] md:w-[500px] p-6 shadow-lg max-h-screen overflow-y-auto">
        <button className="absolute right-6 top-6" onClick={handleCloseModal}>
          <img src="./close.svg" alt="Close icon" className="w-[20px]" />
        </button>
        <p className="text-xl pb-2 font-semibold mt-6">Agregar usuario</p>

        <form className="space-y-6" onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {Object.keys(formData).map((key) => (
              <div key={key}>
                <label htmlFor={key} className="block text-sm font-medium text-gray-900">
                  {key === "name" && "Nombre"}
                  {key === "username" && "Nombre de usuario"}
                  {key === "email" && "Correo electrónico"}
                  {key === "phone" && "Teléfono"}
                  {key === "company" && "Empresa"}
                  {key === "city" && "Ciudad"}
                </label>
                <input
                  id={key}
                  name={key}
                  type={key === "email" ? "email" : key === "phone" ? "tel" : "text"}
                  required
                  value={formData[key]}
                  onChange={handleChange}
                  className="block w-full rounded-md border border-gray-300 bg-white px-3 py-1.5 text-base text-gray-900 focus:outline-indigo-600"
                />
              </div>
            ))}
          </div>

          <button type="submit" className="w-full rounded-md bg-indigo-600 px-3 py-1.5 text-white hover:bg-indigo-500">
            Agregar usuario
          </button>
        </form>
      </div>
    </div>
  )
}
