import { useParams } from "react-router-dom"


export function TestRoute(){
    const params = useParams()
    return(
        <h1>Headind {params.testId}</h1>
    )
}