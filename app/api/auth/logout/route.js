import { cookies } from "next/headers";

export const GET = async () => {
  cookies().delete("token");

  return new Response("Logged out successfully!", {
    status: 200,
  });
};

// just in case
// export const clearUser = async () => {
//   cookies().delete("token");
//   cookies().delete("username");
//   cookies().delete("password");
// };
