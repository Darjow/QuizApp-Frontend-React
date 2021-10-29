import React from "react";
import {Button} from "./Button";

export const WelkomContainer = () =>  {
  return (
    <div className="welkom-container">
      <video src="/videos/welkom.mp4" autoPlay loop muted />
        <h1>ARE YOU THE NEW <span className="quiz-master">QUIZ MASTER</span>?</h1>
          <p>FIND OUT YOURSELF...</p>
          <div className="welkom-btns">
            <Button
              className="btn"
              buttonStyle="btn-info"
              buttonSize="btn-lg"
              linkTo="/login"
              text="LOG IN">
            </Button>
            <Button
                className="btn"
                buttonStyle="btn-info"
                buttonSize="btn-lg"
                linkTo="/register"
                text="REGISTER">
            </Button>
          </div>
        </div>
  )
}


