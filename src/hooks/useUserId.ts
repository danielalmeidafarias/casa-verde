import { useRecoilValue } from 'recoil'
import { userIdState } from '../state/atom'

const useUserId = () =>{

  return useRecoilValue(userIdState)

}

export default useUserId
