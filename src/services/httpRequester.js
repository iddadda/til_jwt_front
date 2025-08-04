import axios from "axios";

import { reissue } from "./accountService";
import { useAccountStore } from "@/stores/account";
import { useGlobalErrorStore } from "@/stores/global-error";

axios.defaults.baseURL = `${import.meta.env.VITE_BASE_URL}/api/v1`;
axios.defaults.withCredentials = true;

axios.interceptors.response.use(
  (res) => res,
  async (err) => {
    console.log("err:", err);
    console.log("err.response: ", err.response);
    if (err.response) {
      // 로그인 상태를 확인
      const accountStore = useAccountStore();
      if (err.response.status === 401 && accountStore.state.isSigned) {
        // 401에러인데 로그인이 되어 있는 상태라면
        try {
          await reissue();
          return await axios.request(err.config); // 이전에 시도했던 요청으로 다시 요청
        } catch (e) {
          accountStore.logout();
        }
      } else {
        const message = err.response.data?.message
          ? err.response.data?.message
          : err.response.data;
        const globalErrorStore = useGlobalErrorStore();
        globalErrorStore.setErrorMessage(message);
      }
    }
    return Promise.reject(err);
  }
);

export default axios;
