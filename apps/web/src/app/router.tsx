import { createBrowserRouter, type RouteObject } from "react-router";

const devRoutes: RouteObject[] = import.meta.env.DEV
  ? [{ path: "/dev/ui", lazy: async () => ({ Component: (await import("./dev/DevUiPage")).DevUiPage }) }]
  : [];

// Blank shell until feature routes land (FE-04 onward).
export const router = createBrowserRouter([{ path: "/", element: <main id="main" /> }, ...devRoutes]);
