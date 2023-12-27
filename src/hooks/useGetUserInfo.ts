import { IUser } from "@/interfaces/IUser"
import axios from "axios"

interface Parameters {
  userId: string
  setUserInfo: (value: React.SetStateAction<IUser | null | undefined>) => void
}

const useGetUserInfo = () => {

  return async ({ userId, setUserInfo }: Parameters ) => {
    if (userId) {
      await axios.get(`http://localhost:3000/api/userinfo/${userId}`)
        .then(response => {
          setUserInfo(response.data)
        })
        .catch(err => {
          console.error(err)
        })
    } else {
      setUserInfo(null)
    }

  }

}

export default useGetUserInfo