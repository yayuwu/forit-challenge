export const getUsers = async () => {
    try {
        const res = await fetch("https://jsonplaceholder.typicode.com/users")
        if(!res.ok) {
            throw new Error("Ocurrió un error al obtener los usuarios")
        }
        const data = await res.json()
        return data
    } catch (error) {
        console.log("Ocurrió un error al obtener los datos ", error)        
    }
}