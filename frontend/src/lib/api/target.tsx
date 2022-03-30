import client from "lib/api/client";
import Cookies from "js-cookie";

import { TargetCreateParams } from "interfaces/index";

//create
export const targetCreate = (params: TargetCreateParams, id: number) => {
  console.log(params);
  return client.post(`fields/${id}/targets`, params, {
    headers: {
      "access-token": Cookies.get("_access_token")!,
      client: Cookies.get("_client")!,
      uid: Cookies.get("_uid")!,
    },
  });
};

//index
export const targetIndex = () => {
  return client.get("targets/", {
    headers: {
      "access-token": Cookies.get("_access_token")!,
      client: Cookies.get("_client")!,
      uid: Cookies.get("_uid")!,
    },
  });
};

//update
export const targetUpdate = (
  params: TargetCreateParams,
  fieldId: number,
  targetId: number
) => {
  console.log(params);
  return client.put(`fields/${fieldId}/targets/${targetId}`, params, {
    headers: {
      "access-token": Cookies.get("_access_token")!,
      client: Cookies.get("_client")!,
      uid: Cookies.get("_uid")!,
    },
  });
};

//delete
export const targetDelete = (id: number) => {
  return client.delete(`targets/${id}`, {
    headers: {
      "access-token": Cookies.get("_access_token")!,
      client: Cookies.get("_client")!,
      uid: Cookies.get("_uid")!,
    },
  });
};
