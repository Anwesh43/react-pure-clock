import React from "react";
import { useAngles, useContinuousTime } from "./hooks";

interface PureClockProps {
    color : string 
}

export const PureClock : React.FC<PureClockProps> = (props : PureClockProps) => {
    //const {h, m, s} = useContinuousTime()
    const {minuteAngle, hourAngle, secondAngle} = useAngles()
    console.log("H, M, S", hourAngle, minuteAngle, secondAngle)
    
    return (
        <div style = {{color : props.color}}>
            Pure Clock 
        </div>
    )
}

export default PureClock 