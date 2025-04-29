import { useEffect, useState } from "react"
import { apiURL } from "../services/api"
import { Link } from "react-router-dom"

function UserList() {

    const [users, setUsers] = useState([])
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState(null)

    const handleListUser = async () => {
        try {
            setIsLoading(true)
           const response = await fetch(`${apiURL}users`, {
            method: 'GET'
           })

           if (!response.ok) {
            throw new Error (`Erro ao listar os usuarios: ${response.statusText}`)
           }

           const data = await response.json()
           setUsers(data)
           setIsLoading(false)
        } catch (error) {
            setError("Falha ao carregar os usuários: ", error)
        } finally {
            setIsLoading(false)
        }
    }

    const handleDeleteUser = async(userID) => {
        const confirm = window.confirm("Tem certeza?")

        if (confirm) {
            try {
                const response = await fetch(`${apiURL}users/${userID}`, {
                    method: 'DELETE'
                })

                if (!response.ok) {
                    throw new Error (`Erro ao deletar usuário: ${response.statusText}`)
                }

                setUsers(users.filter(user => user.id !== userID))
            }   catch (error) {
                setError("Falha ao deletar o usuário: ", error)
            }
        }
            
    }

    useEffect(() => {
        handleListUser()
    }, [])

    

    return (
        <>
            {isLoading && <p style={{color: 'orange'}}>Loading</p>}
            {error && <p style={{color: 'red'}}>{error}</p>}
            {users.length === 0 && !error && !isLoading && <p>Nenhum usuário encontrato</p>}
            {users.map((user) => (
                <ul>
                    <li key={user.id}>
                        <strong>Nome:</strong> {user.name} <br />
                        <strong>Email:</strong> {user.email} <br />
                        <strong>Telefone:</strong> {user.phone} 
                    </li>
                    <Link to={`/EditUser/${user.id}`}>
                        <button style={{backgroundColor: 'orange', color: 'white'}}>Edit</button>
                    </Link>
                    <button onClick={() => handleDeleteUser(user.id)} style={{backgroundColor: 'red', color: 'white'}}>Delete</button>
                </ul>
            )) }
            <Link to='/CreateUser'>Criar usuario</Link> <br />
            <Link to='/'>Home</Link>
        </>
    )
}

export default UserList