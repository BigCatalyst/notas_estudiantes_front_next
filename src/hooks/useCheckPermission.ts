import { navigationItemsDashboard, NavItem } from "@/data/NavigationItems";
import { State } from "@/redux/features/authSlice";
import { logout } from "@/redux/features/authSlice";
import { usePathname, redirect, useRouter } from "next/navigation";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

export const useCheckPermission = () => {
  const redirectRoute = "/login";
  const state: State = useSelector((state: { auth: State }) => state.auth);
  const navigationItems: NavItem[] = navigationItemsDashboard;
  const pathname = usePathname();
  const router = useRouter();
  const dispatch = useDispatch();

  useEffect(() => {
    if (!state.isAuthenticated) {
      redirect("/logout");
    } else {
      const findNavItemByPath = (
        items: NavItem[],
        path: string
      ): NavItem | null => {
        let matches: NavItem[] = [];

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
            const childMatch = findNavItemByPath(item.children, path);
            if (childMatch) {
              matches.push(childMatch);
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
          const errorMessage = "No tienes permiso para acceder a esta página.";
          const encodedMessage = encodeURIComponent(errorMessage);
          const redirectUrl = `${redirectRoute}?errorMessage=${encodedMessage}`;

          dispatch(logout());
          router.push(redirectUrl);
        }
      }
    }
  }, [pathname, navigationItems, state, router, redirectRoute, dispatch]);
};
