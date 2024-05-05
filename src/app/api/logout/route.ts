import { cookies } from "next/headers";

export const GET = async (request: Request) => {
  cookies().delete("token");

  // redirect to home
  return new Response(null, {
    status: 302,
    headers: {
      Location: "/",
    },
  });
};
