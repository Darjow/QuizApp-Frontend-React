import React from "react";
import {Button} from "../components/component/Button";

export const Welcome = () =>  {
  return (
    <div className="welkom-container">
      <video src="/videos/welkom.mp4" autoPlay loop muted />
        <h1>ARE YOU THE NEW <span className="quiz-master">QUIZ MASTER</span>?</h1>
          <p>FIND OUT YOURSELF...</p>
          <div className="welkom-btns">
            <Button
              className="btn btn-info btn-lg"
              linkTo="/login"
              text="LOG IN">
            </Button>
            <Button
                className="btn btn-info btn-lg"
                linkTo="/register"
                text="REGISTER">
            </Button>
          </div>
        </div>
  )
}


export default Welcome;