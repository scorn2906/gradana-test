import { useQuery } from "@tanstack/react-query";
import api from "../../../api/axios";

export const useWallet = () => {
  return useQuery({
    queryKey: ["wallet"],
    queryFn: async () => {
      const res = await api.get("/wallet");
      return res.data;
    },
  });
};
