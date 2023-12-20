import { useSetRecoilState } from "recoil";
import { userIdState } from "../state/atom";

const useSetUserId = () => {
  return useSetRecoilState(userIdState);
};

export default useSetUserId;
