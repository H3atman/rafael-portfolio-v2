import type { LoaderFunctionArgs } from "react-router";

// /project -> /projects, permanent (308). Static output cannot redirect, so
// this is a server-side loader; vercel.json covers the static deployments.
export async function loader({ request }: LoaderFunctionArgs) {
  const url = new URL(request.url);
  const search = url.search || "";
  throw new Response(null, {
    status: 308,
    headers: { Location: `/projects${search}` },
  });
}
