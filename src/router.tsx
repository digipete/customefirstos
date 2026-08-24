import { QueryClient } from "@tanstack/react-query";
import { createRouter } from "@tanstack/react-router";
import { routeTree } from "./routeTree.gen";

// Matches the Vite `base` used for the GitHub Pages static build (/customefirstos/).
// On the Lovable preview this resolves to "/" so routing is unchanged there.
const BASE_URL = import.meta.env.BASE_URL ?? "/";
const basepath = BASE_URL.endsWith("/")
  ? BASE_URL.slice(0, -1) || "/"
  : BASE_URL;

export const getRouter = () => {
  const queryClient = new QueryClient();

  const router = createRouter({
    routeTree,
    context: { queryClient },
    scrollRestoration: true,
    defaultPreloadStaleTime: 0,
    basepath,
  });

  return router;
};
