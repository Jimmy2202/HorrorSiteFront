import { Outlet } from "react-router-dom";
import Header from "./Header";

function Layout() {
  return (
    <div className="max-w-screen h-fit overflow-x-hidden">
      <img
        src="https://i.imgur.com/JLVnSNX.gif"
        className="absolute left-2 sm-custom:bottom-10 z-10"
        alt=""
      />
      <Header />
      <main className="z-20 h-fit w-full overflow-auto flex justify-center items-center overflow-x-hidden">
        <Outlet />
      </main>
    </div>
  );
}

export default Layout;
