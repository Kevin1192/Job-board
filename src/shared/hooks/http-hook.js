import {useState, useCallback, useRef, useEffect} from 'react'

export const useHTTPClient = () => {
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState()

    const activeRequests = useRef([])

    const sendRequest = useCallback(async (url, method = 'GET', body = null, headers = {}) => {
        setIsLoading(true)

        const httpAbortController = new AbortController()

        activeRequests.current.push(httpAbortController)

        try {
            const response = await fetch(url, {
                method,
                body,
                headers,
                signal: httpAbortController.signal
            })
    
            const data = await response.json()

            activeRequests.current = activeRequests.current.filter(
                requestController => requestController !== httpAbortController
            )
    
            if(!response.ok){
                throw new Error(data.message)
            }
            setIsLoading(false)
            return data

        } catch(err){
            setError(err.message)
            setIsLoading(false)
            throw err 
        }
    }, [])

    const clearError = () => {
        setError(null)
    }

    //clean up function
    useEffect(() => {
        return () => {
            activeRequests.current.forEach(abortController => abortController.abort())
        }
    }, [])

    return {isLoading, error, sendRequest, clearError}
}