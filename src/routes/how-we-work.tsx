import { createFileRoute, Outlet } from "@tanstack/react-router";

// Layout route for the operating manual. The index leaf lives in
// how-we-work.index.tsx and individual documents in how-we-work.$.tsx.
export const Route = createFileRoute("/how-we-work")({
  component: () => <Outlet />,
});
