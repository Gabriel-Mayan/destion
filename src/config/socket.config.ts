const baseUrl = process.env.NEXT_PUBLIC_SOCKET_URL;
const appIsSecure = process.env.NEXT_PUBLIC_IS_SECURE_CONNECTION === "true";

export const socketEndpoint = appIsSecure ? `wss://${baseUrl}` : `ws://${baseUrl}`;
