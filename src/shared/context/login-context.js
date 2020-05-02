import { createContext } from 'react'

export const LoginContext = createContext({
    name: null,
    isLoggedIn: false,
    userId: null,
    token: null,
    login: () => {},
    logout: () => {}
})