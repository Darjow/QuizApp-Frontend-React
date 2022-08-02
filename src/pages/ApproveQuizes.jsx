import QuizList from "../components/component/QuizList";
import Loader from "../components/component/Loader";
import { useSession } from "../contexts/AuthProvider";

export default function ApproveQuizes(){
  const {user, loading, ready} = useSession();
  
  
  const needLoadingScreen = (!user || loading || !ready /*|| !notApprovedQuizes*/);

    if(needLoadingScreen){
      return (<Loader/>)
    }else{
      return (<QuizList/>)
    }
  }
