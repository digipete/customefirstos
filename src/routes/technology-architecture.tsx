import { createFileRoute, Outlet } from "@tanstack/react-router";

export const Route = createFileRoute("/technology-architecture")({
  component: () => <Outlet />,
});