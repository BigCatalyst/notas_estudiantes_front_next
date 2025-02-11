/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { FC, useEffect, useState } from "react";
import "./style.css";
import { redirect, usePathname } from "next/navigation";
import Link from "next/link";
import { useSelector } from "react-redux";
import { State } from "@/redux/features/authSlice";
import { IoIosArrowDown } from "react-icons/io";
import { navigationItemsDashboard } from "@/data/NavigationItems";

interface NavigationDashboardProps {
  children: React.ReactNode;
}

const NavigationDashboard: FC<NavigationDashboardProps> = ({ children }) => {
  const [openUserMenu, setOpenUserMenu] = useState(false);
  const [userMernuInitial, setUserMernuInitial] = useState(0);
  const [openMenu, setOpenMenu] = useState(false);
  const [openMenuInit, setOpenMenuInit] = useState(0);

  const pathname = usePathname();

  const userAuth: State = useSelector((state: any) => state.auth);

  useEffect(() => {
    if (!userAuth.isAuthenticated) redirect("/logout");
  }, []);

  useEffect(() => {
    if (window.innerWidth <= 640) {
      setOpenMenu(false);
    } else {
      setOpenMenu(true);
    }
  }, []);

  const handdleClickMenu = () => {
    setOpenMenu(!openMenu);
    setOpenMenuInit(1);
  };

  const handdleClickUserMenu = () => {
    setOpenUserMenu(!openUserMenu);
    setUserMernuInitial(1);
  };

  return (
    <>
      {userAuth.isAuthenticated ? (
        <>
          <nav className="fixed top-0 z-50 w-full border-b border-gray-200 bg-gray-800 dark:border-gray-700">
            <div className="px-3 py-3 lg:px-5 lg:pl-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-1 justify-start rtl:justify-end">
                  <button
                    type="button"
                    className="inline-flex items-center p-2 ml-3 text-gray-400 rounded-full  transition-all duration-300 hover:bg-gray-600 hover:text-slate-300
                hover:shadow-gray-600 hover:shadow-md active:bg-gray-500 active:shadow-2xl active:shadow-gray-300
                active:text-slate-100 active:scale-[0.95]"
                    onClick={handdleClickMenu}
                  >
                    <svg
                      className="w-[20px] h-[20px] *:transition-all"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <rect x="0" y="3" width="24" height="2" />
                      <rect
                        x={!openMenu ? 0 : 3}
                        y="10"
                        width="24"
                        height="2"
                      />
                      <rect
                        x={!openMenu ? 0 : 7}
                        y="17"
                        width="24"
                        height="2"
                      />
                    </svg>
                  </button>

                  <div className="text-[24px] font-bold text-slate-200 cursor-default">
                    <div className="hidden md:block">
                      Gestión
                      <span className="text-orange-500 text-shadow text-shadow-gray-400 text-shadow-blur-1">
                        Estudiantes
                      </span>
                    </div>

                    <div className="block md:hidden">
                      Gest
                      <span className="text-orange-500 text-shadow text-shadow-gray-400 text-shadow-blur-1">
                        Estd
                      </span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center">
                  <div className="flex items-center ms-3 relative">
                    <div className="inline-flex items-center gap-2 mx-3">
                      <p className="hidden md:block text-[15px] text-gray-200 w-[120px]">
                        Bienvenido {userAuth.user?.username}
                      </p>

                      <button
                        type="button"
                        className="inline-flex items-center p-2 ml-3 text-gray-300 rounded-full bg-gray-700 gap-1 relative
                    border-2 transition-all hover:bg-slate-600 active:scale-[.97]"
                        onClick={handdleClickUserMenu}
                      >
                        <span className="absolute top-0 -right-[3px] flex h-[14px] w-[14px]">
                          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                          <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500 border-2"></span>
                        </span>
                        <span className="w-[24px] h-[24px] font-bold">
                          {userAuth.user &&
                            userAuth.user?.username &&
                            userAuth.user?.username.charAt(0).toUpperCase()}
                        </span>
                      </button>
                      <IoIosArrowDown
                        className={`text-gray-300 transition-all ${
                          openUserMenu && "-rotate-90"
                        }`}
                      />
                    </div>

                    <div
                      className={`z-50 my-4 text-base list-none divide-y  rounded shadow-md bg-gray-700 divide-gray-600 absolute top-12 right-0 ${
                        openUserMenu
                          ? "open-menu"
                          : !openUserMenu && userMernuInitial !== 0
                          ? "close-menu"
                          : "hidden"
                      }`}
                    >
                      <div className="px-4 py-3">
                        <p className="text-sm text-gray-900 dark:text-white">
                          {userAuth.user?.username}
                        </p>
                        <p
                          className="text-sm font-medium text-gray-900 truncate dark:text-gray-300"
                          role="none"
                        >
                          {userAuth?.user?.email}
                        </p>
                      </div>
                      <ul className="py-1" role="none">
                        <li>
                          <Link
                            href="/dashboard/profile"
                            className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-600 dark:hover:text-white"
                            role="menuitem"
                          >
                            Profile
                          </Link>
                        </li>
                        <li>
                          <Link
                            href="/logout"
                            className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-600 dark:hover:text-white"
                            role="menuitem"
                          >
                            Logout
                          </Link>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </nav>

          <aside
            className={
              openMenuInit === 0
                ? `fixed top-0 left-0 z-40 w-64 h-screen pt-20 border-r bg-gray-800 border-gray-700 
           transition-transform [transition-duration:300ms] -translate-x-full sm:translate-x-0`
                : `fixed top-0 left-0 z-40 w-64 h-screen pt-20 border-r bg-gray-800 border-gray-700 
           transition-transform [transition-duration:300ms] ${
             openMenu ? "translate-x-0" : "-translate-x-full"
           }`
            }
          >
            <div className="h-full px-3 pb-4 overflow-y-auto bg-white dark:bg-gray-800">
              <ul className="space-y-2 font-medium">
                {navigationItemsDashboard.map(
                  ({ name, path, Icon, rols }, index) =>
                    rols &&
                    rols.findIndex(
                      (rol: string) =>
                        userAuth.user?.roles &&
                        userAuth.user?.roles.length > 0 &&
                        userAuth?.user?.roles.findIndex(
                          (item) => rol === item
                        ) > -1
                    ) !== -1 && (
                      <li key={index}>
                        <Link
                          href={path}
                          className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white 
                  transition-all duration-150 hover:bg-gray-100 overflow-hidden dark:hover:bg-gray-700 group relative"
                        >
                          {pathname === path && (
                            <span className="absolute bg-gradient-to-tr from-gray-700 to-gray-500 right-0 z-10 blur-lg w-full h-full"></span>
                          )}

                          {Icon && (
                            <Icon className="w-6 h-6 text-gray-500 transition duration-150 dark:text-gray-400 group-hover:text-white z-20" />
                          )}

                          <span className="flex-1 ms-3 whitespace-nowrap z-20">
                            {name}
                          </span>
                          {name === "Notifications" && (
                            <span className="w-3 h-3 p-3 inline-flex items-center justify-center bg-blue-900 text-blue-300 rounded-full relative z-20">
                              <span className="absolute z-50">4</span>
                              <span className="absolute z-40 w-3 h-3 p-3 rounded-full bg-blue-900 animate-ping"></span>
                            </span>
                          )}
                        </Link>
                      </li>
                    )
                )}
              </ul>
            </div>
          </aside>

          <div
            className={
              openMenuInit === 0
                ? "p-4 transition-all duration-300 ml-0 lg:ml-64"
                : `p-4 transition-all duration-300 ${
                    openMenu ? "lg:ml-64" : "ml-0"
                  }`
            }
          >
            <div className="p-4 rounded-lg border-gray-700 mt-14 min-h-[70vh]">
              {children}
            </div>
          </div>
        </>
      ) : (
        <div></div>
      )}
    </>
  );
};

export default NavigationDashboard;
