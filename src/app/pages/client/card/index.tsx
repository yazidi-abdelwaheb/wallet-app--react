import { Outlet } from "react-router-dom";
import "./style.css"

export default function CardsLayout(){
    return(
        <div>
            <Outlet />
        </div>
    )
}