import client from "lib/api/client";
import Cookies from "js-cookie";

import { FieldCreateParams } from "interfaces/index";

//create
export const fieldCreate = (params: FieldCreateParams) => {
  console.log(params);
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
