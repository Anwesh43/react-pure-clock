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
        h: new Date(t).getHours() % 12,
        m: new Date(t).getMinutes(),
        s: new Date(t).getSeconds()
    }
}


export const useAngles = () => {
    const {s, h, m} = useContinuousTime()
    const secondAngle = Math.floor(360 * (s / 60))
    const minuteAngle = Math.floor(360 * (m * 60 + s) / 3600)
    const hourAngle = Math.floor(360 * (h * 3600 + m * 60 + s) / (3600 * 12))
    return {
        secondAngle,
        minuteAngle, 
        hourAngle
    }
}
