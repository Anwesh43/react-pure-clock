import React from "react";

interface PureClockProps {
    color : string 
}

export const PureClock : React.FC<PureClockProps> = (props : PureClockProps) => {
    return (
        <div style = {{color : props.color}}>
            Pure Clock 
        </div>
    )
}

export default PureClock 