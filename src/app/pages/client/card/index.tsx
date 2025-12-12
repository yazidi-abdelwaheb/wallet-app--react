import { Outlet } from "react-router-dom";

export default function CardsLayout(){
    return(
        <div className="p-5">
            <Outlet />
        </div>
    )
}