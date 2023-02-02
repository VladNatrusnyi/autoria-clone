import './../../index.css'
import {Header} from "../../components/Header/Header";
import {Outlet} from "react-router";
import {MainPage} from "../../pages/MainPage";

export const RootLayout = () => {
    return (
        <div className='wrapper'>
            <Header />
            <Outlet />
            {/*<MainPage />*/}
        </div>
    )
}
