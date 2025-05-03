import { Outlet } from "react-router-dom";
import Header from "./Header";

function Layout() {
  return (
    <div className="max-w-screen min-h-screen overflow-x-hidden backdrop-blur-[3px]">
      <img
        src="https://i.imgur.com/JLVnSNX.gif"
        className="absolute left-2 sm-custom:bottom-10 z-10"
        alt=""
      />
      <Header />
      <main className="z-20 h-fit w-full overflow-y-hidden flex justify-center items-center p-4">
        <Outlet />
      </main>
    </div>
  );
}

export default Layout;
