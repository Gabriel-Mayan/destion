type TFetch = {
  url: string;
  data?: any;
  token?: string;
  method?: string;
  timeout?: number;
  headers?: Record<string, string>;
  params?: Record<string, string>;
};

export const app = async ({ url = "", token = "", method = "POST", headers = {}, data, params }: TFetch) => {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
  const urlRequest = new URL(baseUrl + url);
  const accessToken = token ? `Bearer ${token}` : "";

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
      Authorization: accessToken,
      ...headers,
    },
    body: data ? body : undefined,
  });

  const responseData = await response.json();

  if (!response.ok) {
    throw new Error(responseData.message);
  }

  return { data: responseData };
};
