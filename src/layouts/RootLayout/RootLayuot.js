import './../../index.css'
import {Header} from "../../components/Header/Header";
import {Outlet} from "react-router";
import {MainPage} from "../../pages/MainPage";
import {Button, Drawer} from "antd";
import {useState} from "react";
import {Sidebar} from "../../components/Sidebar/Sidebar";
import {useWindowDimensions} from "../../customHooks/useWindowDimensions";

export const RootLayout = () => {

  const { width, height } = useWindowDimensions();

  const [open, setOpen] = useState(false);
  const showDrawer = () => {
    setOpen(true);
  };
  const onCloseDrawer = () => {
    setOpen(false);
  };


    return (
      <>
        <div className='wrapper'>
          <Header showDrawer={showDrawer} onCloseDrawer={onCloseDrawer} isOpenDrawer={open} />
          <div style={{ height: open ? height + 56 : 'auto'}}>
            <Outlet />
          </div>

          <Drawer
            title="Фільтри"
            placement="left"
            closable
            onClose={onCloseDrawer}
            open={open}
            getContainer={false}
            width={270}
            height={height}
          >
            <Sidebar />
          </Drawer>
        </div>
      </>

    )
}
