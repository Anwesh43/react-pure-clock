import {useState, useEffect} from 'react'

export const useInterval = (cb : () => void, delay : number) => {
    useEffect(() => {
        const interval = setInterval(cb, delay)
        return () => {
            clearInterval(interval)
        }
    }, [])
}

export const useContinuousTime = () => {
    const [t, setT] = useState(new Date().getTime())
    useInterval(() => {
        setT(new Date().getTime())
    }, 1000)

    return {
        h: new Date(t).getHours(),
        m: new Date(t).getMinutes(),
        s: new Date(t).getSeconds()
    }
}

