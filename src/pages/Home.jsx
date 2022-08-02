import Options from "../components/component/HomeOptions"
import Greeting from "../components/component/Greeting"
import { useSession } from "../contexts/AuthProvider"
import Loader from "../components/component/Loader";

export default function Home(){

  const {user, loading, ready} = useSession();
  
  const needLoadingScreen = (! user || loading || !ready);

  return needLoadingScreen? (
    <Loader/>
  ):(
  <>
  <Greeting/>
  <Options/>
  </>
  )
}