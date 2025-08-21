import { getServerSession as getSrvSession } from "next-auth";

import { authOptions } from "@config/auth.config";

export const getServerSession = async () => {
  const session = await getSrvSession(authOptions);

  return session;
};
