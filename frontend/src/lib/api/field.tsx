import client from "lib/api/client";
import Cookies from "js-cookie";

import { FieldCreateParams } from "interfaces/index";

//create
export const fieldCreate = (params: FieldCreateParams) => {
  return client.post("fields/", params, {
    headers: {
      "access-token": Cookies.get("_access_token")!,
      client: Cookies.get("_client")!,
      uid: Cookies.get("_uid")!,
    },
  });
};

//index
export const fieldIndex = () => {
  return client.get("fields/", {
    headers: {
      "access-token": Cookies.get("_access_token")!,
      client: Cookies.get("_client")!,
      uid: Cookies.get("_uid")!,
    },
  });
};

//show
export const fieldShow = (id: number) => {
  return client.get(`fields/${id}`, {
    headers: {
      "access-token": Cookies.get("_access_token")!,
      client: Cookies.get("_client")!,
      uid: Cookies.get("_uid")!,
    },
  });
};

//update
export const fieldUpdate = (params: FieldCreateParams, id: number) => {
  return client.put(`fields/${id}`, params, {
    headers: {
      "access-token": Cookies.get("_access_token")!,
      client: Cookies.get("_client")!,
      uid: Cookies.get("_uid")!,
    },
  });
};

//delete
export const fieldDelete = (id: number) => {
  return client.delete(`fields/${id}`, {
    headers: {
      "access-token": Cookies.get("_access_token")!,
      client: Cookies.get("_client")!,
      uid: Cookies.get("_uid")!,
    },
  });
};
