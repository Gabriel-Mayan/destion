import { getServerSession as getSrvSession } from "next-auth";

import { authOptions } from "@/app/api/auth/[...nextauth]/route";

export const getServerSession = async () => {
  const session = await getSrvSession(authOptions);

  return session;
};
