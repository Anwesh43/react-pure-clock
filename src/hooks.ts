import React, {useState, useEffect, CSSProperties} from 'react'

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

export interface ContainerStyle {
    parentStyle : CSSProperties, 
    elementStyle : CSSProperties
}
export interface UseStyleProp {
    parentStyle() : CSSProperties
    hourTextStyle(i : number) : ContainerStyle
    hourLineStyle() : ContainerStyle
    minuteLineStyle() : ContainerStyle 
    secondLineStyle() : ContainerStyle
    clockCircleStyle() : CSSProperties
}

export const useStyles = (color : string) : UseStyleProp => {
    const position = 'absolute'
    const w : number = window.innerWidth
    const h : number = window.innerHeight 
    const size : number = Math.min(w, h) / 4 
    const rotate = (deg : number) : CSSProperties => ({
        position, 
        transform: `rotate(${deg}deg)`
    })
    const hourThickness = 15
    const minuteThickness = 50
    const secondThickness = 90
    
    const hourLengthFactor = 5.6
    const minuteLengthFactor = 3.4
    const secondLengthFactor = 2.6

    const background = color 
  
    const hourTextLengthFactor = 2.3
    const {hourAngle, secondAngle, minuteAngle} = useAngles()
    
    return {
        parentStyle() : CSSProperties {
            return {
                position: 'absolute',
                left: `${w / 2}px`,
                top: `${h / 2}px`,
            }
        },

        hourTextStyle(i : number) : ContainerStyle {
            return {
                parentStyle: {...rotate(360 * (i / 12))},
                elementStyle: {
                    fontSize: '16px',
                    color: 'black',
                    position, 
                    left: `0px`,
                    top: `${-size / hourTextLengthFactor}px`
                }
            }
        },

        hourLineStyle() : ContainerStyle {
            const wHour = size / hourThickness
            const hHour = size / hourLengthFactor 
            const top = `${-hHour}px`
            const left = `${-wHour / 2}px`
            const width = `${wHour}px`
            const height = `${hHour}px`
            return {
                parentStyle: {...rotate(hourAngle)},
                elementStyle: {
                    position,
                    left,
                    top,
                    width, 
                    height, 
                    background,
                    borderRadius: '15%' 
                }
            }
        },
        minuteLineStyle() : ContainerStyle {
            const wMin = size / minuteThickness
            const hMin = size / minuteLengthFactor 
            const top = `${-hMin}px`
            const left = `${-wMin / 2}px`
            const width = `${wMin}px`
            const height = `${hMin}px`
            return {
                parentStyle: {...rotate(minuteAngle)},
                elementStyle: {
                    position,
                    left,
                    top,
                    width, 
                    height, 
                    background,
                    borderRadius: '10%'
                }
            }
        },

        secondLineStyle() : ContainerStyle {
            const wSec = size / secondThickness
            const hSec = size / secondLengthFactor 
            const top = `${-hSec}px`
            const left = `${-wSec / 2}px`
            const width = `${wSec}px`
            const height = `${hSec}px`
            return {
                parentStyle: {...rotate(secondAngle)},
                elementStyle: {
                    position,
                    left,
                    top,
                    width, 
                    height, 
                    background 
                }
            }
        },
        clockCircleStyle() : CSSProperties {
            return {
                position: 'absolute',
                top: `${-size / 2}px`,
                left: `${-size / 2}px`,
                width: `${size}px`,
                height: `${size}px`,
                border: `2px solid ${color}`,
                borderRadius: '50%'
            }
        }
    }
}