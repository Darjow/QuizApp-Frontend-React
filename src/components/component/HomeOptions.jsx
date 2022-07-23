import { MDBCardGroup } from "mdb-react-ui-kit";
import Card from "./Card";


export default function Options({id}){

  return(
    <MDBCardGroup>
      <Card to="/play" btn_text="Play" title="Test your brainmuscles." text="The Social Quiz Master is a website based on users their interaction. All quizes you'ill be answering are all uploaded by the users, for the users."></Card>
      <Card to="/create" btn_text="Create" title="You reckon you can create a tough quiz?" text="Do you think you can make more fun or challenging quizes than you're currently solving? You can now upload your own quizes! Once they are verified by an admin these will be playable by any user. "></Card>
      <Card to= {"/profile/" + id} btn_text="Profile" title="Check out your statistics." text="Would you like to see how many quizes you have correctly solved or how good you are compared to others? Check out your profile to see your overall stats."></Card>
    </MDBCardGroup>
    
  )

  }