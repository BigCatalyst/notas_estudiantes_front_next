import {
  navigationItemsDashboard,
  NavItem,
  Rols,
} from "@/data/NavigationItems";
import { State } from "@/redux/features/authSlice";
import { logout } from "@/redux/features/authSlice";
import ApiService from "@/services/ApiService";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";

export const useCheckPermission = () => {
  const redirectRoute = "/login";
  const state: State = useSelector((state: { auth: State }) => state.auth);
  const navigationItems: NavItem[] = navigationItemsDashboard;
  const pathname = usePathname();
  const router = useRouter();
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);

  const callApiLogout = async () => {
    try {
      await ApiService.logout();
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const checkPermissions = async () => {
      try {
        if (!state.isAuthenticated) {
          const errorMessage = "Necesitas autenticarte";
          const encodedMessage = encodeURIComponent(errorMessage);
          const redirectUrl = `${redirectRoute}?errorMessage=${encodedMessage}`;

          dispatch(logout());
          callApiLogout();
          router.push(redirectUrl);
          return;
        } else {
          const findNavItemByPath = (
            items: NavItem[],
            path: string
          ): NavItem | null => {
            const matches: NavItem[] = [];

            for (const item of items) {
              if (item.path) {
                const isPrefixMatch = path.startsWith(item.path);
                const isExactOrChildPath =
                  isPrefixMatch &&
                  (path === item.path ||
                    path[item.path.length] === "/" ||
                    path[item.path.length] === undefined);

                if (isExactOrChildPath) {
                  matches.push(item);
                }
              }

              if (item.children) {
                const lastRoles: Rols[] = item.rols ?? [];
                const childMatch = findNavItemByPath(item.children, path);
                if (childMatch) {
                  matches.push({
                    ...childMatch,
                    rols: lastRoles,
                  });
                }
              }
            }

            return (
              matches.sort(
                (a, b) => (b.path?.length || 0) - (a.path?.length || 0)
              )[0] || null
            );
          };

          const currentNavItem = findNavItemByPath(navigationItems, pathname);

          if (state.isAuthenticated && !state.loading && currentNavItem) {
            const userRoles = state.user?.roles || [];
            const requiredRoles = currentNavItem.rols || [];

            const hasPermission = requiredRoles.some((role) =>
              userRoles.includes(role)
            );

            if (!hasPermission) {
              const errorMessage =
                "No tienes permiso para acceder a esta página.";
              const encodedMessage = encodeURIComponent(errorMessage);
              const redirectUrl = `${redirectRoute}?errorMessage=${encodedMessage}`;

              dispatch(logout());
              callApiLogout();
              router.push(redirectUrl);
              return;
            }
          }
        }
        setLoading(false);
      } catch (error) {
        console.error("Error checking permissions:", error);
        // Maneja errores (ej: redirigir a página de error)
        setLoading(false);
      }
    };
    checkPermissions();
  }, [pathname]); //navigationItems, state, router, redirectRoute, dispatch
  return { loading };
};
