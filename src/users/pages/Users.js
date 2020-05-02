import React, { useEffect, useState } from 'react'

import UsersList from '../components/UsersList'
import ErrorModal from '../../shared/components/UIElements/ErrorModal'
import Loader from '../../shared/components/UIElements/Loader'
import { useHTTPClient } from '../../shared/hooks/http-hook'

const Users = () => {

    const {isLoading, error, sendRequest, clearError} = useHTTPClient()
  
    const [loadedUsers, setLoadedUsers] = useState()

    useEffect(() => {
        const fetchUsers = async () => {
    
            try {
                const data = await sendRequest(`${process.env.REACT_APP_BACKEND_URL}/users`)
                
                setLoadedUsers(data.users)
            } catch(err) {}

        }
        fetchUsers()
    }, [sendRequest])

    return (
        <React.Fragment>
            <ErrorModal error={error} onClear={clearError}/>
            {isLoading && <div className='center'><Loader /></div>}
            {!isLoading && loadedUsers && <UsersList items ={loadedUsers}/>}
        </React.Fragment>
    )
    
}

export default Users