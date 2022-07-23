import React from 'react';
import { MDBCard, MDBCardBody, MDBCardTitle, MDBCardText} from 'mdb-react-ui-kit';
import { Button } from './Button';





export default function Card({title, text, btn_text, to}){

  return (
      <MDBCard>
        <MDBCardBody>
          <MDBCardTitle>{title}</MDBCardTitle>
          <MDBCardText>
            {text}
          </MDBCardText>
        </MDBCardBody>
       { /*<a href={to} className="button home_button">{btn_text}</a>*/}
      </MDBCard>
  );

}