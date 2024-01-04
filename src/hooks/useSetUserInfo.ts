import { userInfoState } from "../state/atom"
import { useSetRecoilState } from "recoil"

export const useSetUserInfo = () => {
  return useSetRecoilState(userInfoState)
}