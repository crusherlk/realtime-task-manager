import { Button } from "@chakra-ui/react";
import { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { logOut } from "../services/authService";
import { FaBell } from "react-icons/fa6";

function Layout() {
  const navigate = useNavigate();

  useEffect(() => {
    const userInfo = JSON.parse(localStorage.getItem("userInfo"));

    // console.log('layout', userInfo);

    if (!userInfo) {
      navigate("/login");
    }
  }, [navigate]);

  return (
    <>
      <header className="py-5 border-b border-[#e6e6e6]">
        <div className="container mx-auto flex items-center justify-between">
          <div className="logo">
            <h1 className="text-lg font-semibold">Task Manager</h1>
          </div>
          <div className="flex items-center gap-2">
            <div className="relative p-4">
              <FaBell size={20} />
              <div className="absolute inline-flex items-center justify-center w-6 h-6 text-xs font-bold text-white bg-red-500 rounded-full top-1 right-1">
                3
              </div>
            </div>
            <Button
              className="btn-outline-sm"
              onClick={() => {
                logOut();
                navigate("/login");
              }}
            >
              Logout
            </Button>
          </div>
        </div>
      </header>
      <main className="my-4 min-h-screen">
        <Outlet />
      </main>
      <footer className="text-sm font-semibold text-center py-5 border-t">
        Developed by Crusherlk ✌
      </footer>
    </>
  );
}
export default Layout;
