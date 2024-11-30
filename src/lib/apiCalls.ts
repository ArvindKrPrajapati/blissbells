let url =
  process.env.NODE_ENV == "production"
    ? "https://blissbells-api.onrender.com"
    : "http://localhost:3030";

// url = "https://ratefor-backend.onrender.com";
export const baseUrl = url;

export const getAuthCookie = () => {
  if (typeof document === "undefined") return null;
  const cookieName = "auth";
  var cookies = document.cookie.split(";");
  for (var i = 0; i < cookies.length; i++) {
    var cookie = cookies[i].trim();

    // Check if the cookie starts with the desired name
    if (cookie.indexOf(cookieName + "=") === 0) {
      // Return the value of the cookie
      return JSON.parse(cookie.substring(cookieName.length + 1));
    }
  }
  return null;
};

export const apiPost = async (url: string, data: any, isAuth = true) => {
  let options: any = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  };

  if (isAuth) {
    const auth = getAuthCookie();
    if (auth) {
      options.headers["Authorization"] = `Bearer ${auth.accessToken}`;
    }
  }
  const res = await fetch(baseUrl + url, options);
  if (res.ok) return res.json();
  const er = await res.json();
  throw er;
};

export const apiGet = async (url: string, auth = getAuthCookie()) => {
  let options: any = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
    cache: "no-store",
  };
  if (auth) {
    options.headers["Authorization"] = `Bearer ${auth.accessToken}`;
  }
  const res = await fetch(baseUrl + url, options);
  if (res.ok) return res.json();
  const er = await res.json();
  throw er;
};

export const apiPatch = async (url: string, data: any) => {
  const auth = getAuthCookie();

  let options: any = {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  };
  if (auth) {
    options.headers["Authorization"] = `Bearer ${auth.accessToken}`;
  }
  const res = await fetch(baseUrl + url, options);
  if (res.ok) return res.json();
  const er = await res.json();
  throw er;
};
export const apiDelete = async (url: string) => {
  const auth = getAuthCookie();

  let options: any = {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
  };
  if (auth) {
    options.headers["Authorization"] = `Bearer ${auth.accessToken}`;
  }
  const res = await fetch(baseUrl + url, options);
  if (res.ok) return res.json();
  const er = await res.json();
  throw er;
};

export const apiPatchFromSession = async (url: string, data: any) => {
  let auth: any = sessionStorage.getItem("signerAuth");
  if (!auth) {
    return null;
  }
  auth = JSON.parse(auth);

  let options: any = {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${auth.accessToken}`,
    },
    body: JSON.stringify(data),
  };
  const res = await fetch(baseUrl + url, options);
  if (res.ok) return res.json();
  const er = await res.json();
  throw er;
};
export const apiDownload = async (item: any) => {
  const res: any = await fetch(item.signed_file);
  if (!res.ok) {
    const er = await res.json();
    throw er;
  }

  const contentDisposition = res.headers.get("Content-Disposition");
  const matches =
    contentDisposition && contentDisposition.match(/filename="(.+)"/);

  let filename = item.file_name || "download.pdf";

  if (matches && matches[1]) {
    filename = matches[1];
  }

  const arrayBuffer = await res.arrayBuffer();

  const blob = new Blob([arrayBuffer], { type: "application/pdf" });
  const link = document.createElement("a");
  link.href = window.URL.createObjectURL(blob);
  link.download = filename;
  link.click();
};

export const uploadFile = async (blob: Blob, filename: string) => {
  const formData = new FormData();
  formData.append("file", blob, filename);

  const auth = getAuthCookie();
  let options: any = {
    method: "POST",
    headers: {
      Authorization: `Bearer ${auth.accessToken}`,
    },
    body: formData,
  };

  const response = await fetch(baseUrl + "/file-upload", options);

  if (!response.ok) {
    throw new Error(response.statusText);
  }

  const data = await response.json();
  return data;
};

export const uploadFileWithData = async (
  url: string,
  file: any,
  data: any,
  method = "POST"
) => {
  const formData = new FormData();
  if (file) {
    formData.append("file", file, file.name);
  }
  formData.append("data", JSON.stringify(data));

  const auth = getAuthCookie();
  let options: any = {
    method,
    headers: {
      Authorization: `Bearer ${auth.accessToken}`,
    },
    body: formData,
  };

  const response = await fetch(baseUrl + url, options);
  if (response.ok) return response.json();
  const er = await response.json();
  throw er;
};
