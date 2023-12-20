import { useSetRecoilState } from "recoil";
import { userIdState } from "../atom";

const useSetUserId = () => {
  return useSetRecoilState(userIdState);
};

export default useSetUserId;
