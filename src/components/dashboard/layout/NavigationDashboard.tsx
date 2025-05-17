/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { FC, useEffect, useState } from "react";
import "./style.css";
import { redirect, usePathname, useRouter } from "next/navigation";
import Link from "next/link";
import { useSelector } from "react-redux";
import { State } from "@/redux/features/authSlice";
import { IoIosArrowDown } from "react-icons/io";
import { navigationItemsDashboard, Rols } from "@/data/NavigationItems";
import { PiWarning } from "react-icons/pi";
import { GiCancel, GiConfirmed } from "react-icons/gi";
import Buttom from "@/components/ui/buttom/Buttom";
import ApiService from "@/services/ApiService";
import { BiEdit } from "react-icons/bi";

interface NavigationDashboardProps {
  children: React.ReactNode;
}

const NavigationDashboard: FC<NavigationDashboardProps> = ({ children }) => {
  const [openUserMenu, setOpenUserMenu] = useState(false);
  const [userMernuInitial, setUserMernuInitial] = useState(0);
  const [openMenu, setOpenMenu] = useState(false);
  const [openMenuInit, setOpenMenuInit] = useState(0);
  const [openSubMenus, setOpenSubMenus] = useState<number[]>([]);

  const [schoolYear, setSchoolYear] = useState<string | null>(null);

  const [grado, setGrado] = useState("1");

  const toggleSubMenu = (index: number) => {
    setOpenSubMenus((prev) =>
      prev.includes(index) ? prev.filter((i) => i !== index) : [...prev, index]
    );
  };

  useEffect(() => {
    (async () => {
      try {
        const res = await ApiService.schoolYearsAll("");

        if (res) {
          const value = res[res.length - 1];
          setSchoolYear(value.name);
        }
      } catch (error) {
        console.log(error);
      }
    })();
  }, []);

  useEffect(() => {
    console.log(schoolYear);
  }, [schoolYear]);

  const pathname = usePathname();

  const router = useRouter();

  const userAuth: State = useSelector((state: any) => state.auth);

  const [showModal, setShowModal] = useState(false);

  const handleNo = () => {
    redirect("/logout");
  };

  const handleSi = () => {
    setShowModal(false);
    redirect("dashboard/school_year/add");
  };

  useEffect(() => {
    const verifySchoolYear = async () => {
      try {
        const res = await ApiService.schoolYears("");

        if (
          res?.results &&
          res?.results.length > 0 &&
          userAuth.user?.roles.find(
            (rol) =>
              rol === Rols.admin ||
              rol === Rols.secretary ||
              rol === Rols.profesor ||
              rol === Rols.student
          )
        ) {
          setShowModal(false);
          //router.push("/dashboard/");
        } else {
          setShowModal(true);
          router.push("/dashboard");
        }
      } catch (error) {
        console.log(error);
      }
    };

    verifySchoolYear();
  }, []);

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

  useEffect(() => {
    (async () => {
      if (
        userAuth.user &&
        userAuth.user?.id &&
        userAuth.user.roles.findIndex((rol) => rol === Rols.student) > -1
      ) {
        const res = await ApiService.students(
          `user__username=${userAuth.user?.username}`
        );

        console.log(res);

        if (res && res.results.length > 0) {
          console.log("estudianteeeeeeeeeeeeeeeeeeeee");
          const g = res.results[0].grade && Number(res.results[0].grade);
          if (
            res &&
            g === 9 &&
            userAuth.user.roles.findIndex((val) => val === Rols.student) > -1 &&
            res.results[0].can_edit_bullet
          ) {
            setGrado("9");
          }
        }
      }
    })();
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
        <div>
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
                      ESBU.
                      <span className="text-orange-500 text-shadow text-shadow-gray-400 text-shadow-blur-1">
                        Mártires-9-4
                      </span>
                      <span
                        id="id-school-year"
                        className="ml-3 text-[17px]"
                      >{`Año Escolar ${schoolYear}`}</span>
                    </div>

                    <div className="block md:hidden">
                      ESBU.
                      <span className="text-orange-500 text-shadow text-shadow-gray-400 text-shadow-blur-1">
                        M-9-4
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
                        className={`text-gray-300 transition-all ${openUserMenu && "-rotate-90"
                          }`}
                      />
                    </div>

                    <div
                      className={`z-50 my-4 text-base list-none divide-y  rounded shadow-md bg-gray-700 divide-gray-600 absolute top-12 right-0 ${openUserMenu
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
                            Perfil
                          </Link>
                        </li>
                        <li>
                          <Link
                            href="/logout"
                            className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-600 dark:hover:text-white"
                            role="menuitem"
                          >
                            Cerrar Sesión
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
           transition-transform [transition-duration:300ms] ${openMenu ? "translate-x-0" : "-translate-x-full"
                }`
            }
          >
            <div className="h-full px-3 pb-4 overflow-y-auto bg-white dark:bg-gray-800">
              <ul className="space-y-2 font-medium">
                {navigationItemsDashboard.map(({ name, path, Icon, rols, children }, index) => {
                  const userRoles = userAuth.user?.roles || [];
                  const hasPermission = rols?.some((rol: string) => userRoles.includes(rol));

                  const isEditarBoleta = name === "Editar Boleta";
                  const canSeeEditarBoleta = userRoles.includes("estudiante") && grado === "9";

                  if ((hasPermission && !isEditarBoleta) || (isEditarBoleta && canSeeEditarBoleta)) {
                    const isOpen = openSubMenus.includes(index);
                    return (
                      <li key={index}>
                        {children && children.length > 0 ? (
                          <>
                            <button
                              onClick={() => toggleSubMenu(index)}
                              className="flex items-center w-full p-2 text-left rounded-lg hover:bg-gray-700 group"
                            >
                              {Icon && (
                                <Icon className="w-6 h-6 mr-2 text-gray-400 group-hover:text-white" />
                              )}
                              <span className="flex-1 text-gray-300 group-hover:text-white">
                                {name}
                              </span>
                              <IoIosArrowDown
                                className={`ml-auto transition-transform text-gray-400 group-hover:text-white ${isOpen ? "rotate-180" : ""
                                  }`}
                              />
                            </button>

                            <ul
                              className={`pl-6 mt-1 space-y-1 overflow-hidden transition-all duration-300 ${isOpen ? "max-h-[500px]" : "max-h-0"
                                }`}
                            >
                              {children.map((child, idx) =>
                                child.path ? (
                                  <li key={idx}>
                                    <Link
                                      href={child.path}
                                      className="flex items-center p-2 rounded-lg hover:bg-gray-700 group"
                                    >
                                      {child.Icon && (
                                        <child.Icon className="w-4 h-4 mr-2 text-gray-400 group-hover:text-white" />
                                      )}
                                      <span className="text-gray-300 group-hover:text-white">
                                        {child.name}
                                      </span>
                                    </Link>
                                  </li>
                                ) : null
                              )}
                            </ul>
                          </>
                        ) : (
                          path && (
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
                            </Link>
                          )
                        )}
                      </li>
                    );
                  }

                  return null;
                })}

              </ul>
            </div>
          </aside>


          <div
            className={
              openMenuInit === 0
                ? "p-4 transition-all duration-300 ml-0 lg:ml-64"
                : `p-4 transition-all duration-300 ${openMenu ? "lg:ml-64" : "ml-0"
                }`
            }
          >
            <div className="p-4 rounded-lg border-gray-700 mt-14 min-h-[70vh]">
              {children}
            </div>
          </div>

          {/* Modal */}
          {showModal && (
            <div className="fixed z-50 top-0 left-0 w-full h-full bg-gray-400/30 flex items-center justify-center">
              <div className="bg-red-50 w-70 sm:w-100 py-7 px-3 shadow-lg rounded-md border-t-4 border-t-red-700 flex items-center justify-center flex-col gap-7">
                <span className="inline-flex items-center gap-2 border-b-1 pb-1 border-b-red-200 w-full">
                  <PiWarning className="text-red-700 w-12 h-12 animate-pulse" />
                  <span className="text-red-900">
                    {userAuth.user?.roles.find(
                      (rol) => rol === Rols.admin || rol === Rols.secretary
                    )
                      ? "Debe crear un año escolar"
                      : "No existe un Año Escolar"}
                  </span>
                </span>

                <span className="inline-flex justify-center gap-7">
                  {userAuth.user?.roles.find(
                    (rol) => rol === Rols.admin || rol === Rols.secretary
                  ) ? (
                    <>
                      <Buttom
                        title="Si"
                        className="btn1"
                        icon={GiConfirmed}
                        onClick={handleSi}
                      />
                      <Buttom
                        title="No"
                        className="btn1"
                        icon={GiCancel}
                        onClick={handleNo}
                      />
                    </>
                  ) : (
                    <>
                      <Buttom
                        title="ok"
                        className="btn1"
                        icon={GiCancel}
                        onClick={handleNo}
                      />
                    </>
                  )}
                </span>
              </div>
            </div>
          )}
        </div>
      ) : (
        <div></div>
      )}
    </>
  );
};

export default NavigationDashboard;
