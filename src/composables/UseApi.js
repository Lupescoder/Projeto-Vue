import { api } from "boot/axios";

export default function useApi(url) {
  const list = async (client_token, auth) => {
    try {
      const { data } = await api.get(url, {
        headers: {
          client_token: client_token,
          Authorization: "Bearer " + auth,
        },
      });
      return data;
    } catch (error) {
      throw new Error(error);
    }
  };

  const post = async (dados, client_token, auth) => {
    try {
      const { data } = await api.post(url, dados, {
        headers: {
          client_token: client_token,
          Authorization: "Bearer " + auth,
        },
      });
      return data;
    } catch (error) {
      throw new Error(error);
    }
  };

  const update = async (dados, client_token, auth) => {
    try {
      const { data } = await api.put(`${url}/${dados.id}`, dados, {
        headers: {
          client_token: client_token,
          Authorization: "Bearer " + auth,
        },
      });
      return data;
    } catch (error) {
      throw new Error(error);
    }
  };

  const remove = async (dados, client_token, auth) => {
    try {
      const { data } = await api.delete(`${url}/${dados.id}`, {
        headers: {
          client_token: client_token,
          Authorization: "Bearer " + auth,
        },
      });
      return data;
    } catch (error) {
      throw new Error(error);
    }
  };

  return { list, post, update, remove };
}
