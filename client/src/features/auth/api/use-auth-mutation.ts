import { useMutation } from "@tanstack/react-query";
import type {
  ReqLoginDTO,
  ReqRegisterDTO,
  ResLoginDTO,
  ResRegisterDTO,
} from "../auth.types";
import api from "../../../api/axios";

export const UseMutationLogin = () => {
  return useMutation({
    mutationFn: async (payload: ReqLoginDTO): Promise<ResLoginDTO> => {
      const res = await api.post("/auth/login", payload);
      return res.data;
    },
  });
};

export const UseMutationRegister = () => {
  return useMutation({
    mutationFn: async (payload: ReqRegisterDTO): Promise<ResRegisterDTO> => {
      const res = await api.post("/auth/register", payload);
      return res.data;
    },
  });
};
