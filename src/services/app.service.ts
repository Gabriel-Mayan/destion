import { showToast } from "../utils/notify.util";

type TFetch = {
  url: string;
  data?: any;
  method?: string;
  timeout?: number;
  headers?: Record<string, string>;
  params?: Record<string, string>;
};

const isServer = typeof window === "undefined";

export const app = async ({ url = "", method = "POST", headers = {}, data, params }: TFetch) => {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
  const urlRequest = new URL(baseUrl + url);

  if (params) {
    Object.entries(params).forEach(([key, value]) => {
      urlRequest.searchParams.append(key, value);
    });
  }

  const isFormData = data instanceof FormData;
  const body = isFormData ? data : JSON.stringify(data);

  const response = await fetch(urlRequest.toString(), {
    method,
    headers: {
      Accept: isFormData ? "multipart/form-data" : "application/json",
      "Content-Type": isFormData ? "multipart/form-data" : "application/json",
      "Accept-Language": "pt-br, pt_br, pt_BR",
      ...headers,
    },
    body: data ? body : undefined,
  });

  const responseData = await response.json();

  if (response.ok) {
    return { data: responseData };
  }

  const { title, message, status } = responseData;

  // 🔒 Mensagens de erro apenas no client
  if (!isServer) {
    if (status === 422) {
      responseData.invalid_params.forEach((param: { name: string; reason: string }) => {
        showToast({ type: "error", message: param.reason });
      });

      throw new Error("Invalid parameters");
    }

    if ([400, 401, 409].includes(status)) {
      showToast({ type: "error", message: message });

      throw new Error(message);
    }

    showToast({ type: "error", message: "Erro desconhecido... Tente novamente em alguns instantes." });

    throw new Error(`${title}: ${message}`);
  }

  return { data: responseData };
};
