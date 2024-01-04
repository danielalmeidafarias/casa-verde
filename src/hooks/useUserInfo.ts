import { userInfoState } from "../state/atom";
import { useRecoilValue } from "recoil";

export const useUserInfo = () => {

  return useRecoilValue(userInfoState);
  
}