import { useRecoilValue } from 'recoil'
import { userIdState } from '../atom'

const useUserId = () =>{

  return useRecoilValue(userIdState)

}

export default useUserId
