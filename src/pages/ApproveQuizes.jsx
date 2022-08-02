import QuizList from "../components/component/QuizList";
import Loader from "../components/component/Loader";
import { useSession } from "../contexts/AuthProvider";
import { useHistory } from "react-router";

export default function ApproveQuizes(){
  const {user, loading, ready, hasRole} = useSession();
  
  const history = useHistory();
  
  const needLoadingScreen = (! user || loading || !ready /*|| !notApprovedQuizes*/);

  if(!hasRole("admin")){
    history.replace("/");
  }else{
    if(needLoadingScreen){
      return (<Loader/>)
    }else{
      return (<QuizList/>)
    }
  }
}