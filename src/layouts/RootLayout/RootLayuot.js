import './../../index.css'
import {Header} from "../../components/Header/Header";
import {Outlet} from "react-router";

export const RootLayout = () => {
    return (
        <div className='wrapper'>
            <Header />
            <Outlet />
        </div>
    )
}
