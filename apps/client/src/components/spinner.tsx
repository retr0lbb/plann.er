import { Spinner as NextSpinner, SpinnerProps } from "@nextui-org/react";



export function Spinner({...rest}: SpinnerProps){
    return(
        <NextSpinner {...rest}/>
    )
}