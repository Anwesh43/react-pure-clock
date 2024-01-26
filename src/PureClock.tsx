import React, { Children } from "react";
import { ContainerStyle, useAngles, useContinuousTime, useStyles } from "./hooks";

interface PureClockProps {
    color : string 
}

interface ContainerElementProps {
    style : ContainerStyle,
    children?: React.JSX.Element
}
export const ContainerElement : React.FC<ContainerElementProps> = (props : ContainerElementProps) => {
    return (
        <div style = {props.style.parentStyle}>
            <div style = {props.style.elementStyle}>
                {props.children}
            </div>
        </div>
    )
}
export const PureClock : React.FC<PureClockProps> = (props : PureClockProps) => {
    //const {h, m, s} = useContinuousTime()
    const {parentStyle, hourTextStyle, hourLineStyle, minuteLineStyle, secondLineStyle, clockCircleStyle} = useStyles(props.color)
    // console.log("H, M, S", hourAngle, minuteAngle, secondAngle)
    
    return (
        <div style = {parentStyle()}>
           <div style = {clockCircleStyle()}>
           </div>
           {new Array(12).fill(0).map((num : number, i : number) => (<ContainerElement key = {`hour_text_${i}`} style={hourTextStyle(i)}><span>{i == 0 ? 12 : i}</span></ContainerElement>))}
           <ContainerElement key = 'hourline' style={hourLineStyle()}/>
           <ContainerElement key = 'minuteline' style={minuteLineStyle()}/>
           <ContainerElement key = 'secondline' style={secondLineStyle()}/>
        </div>
    )
}

export default PureClock 