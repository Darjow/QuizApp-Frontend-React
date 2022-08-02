import React from 'react';
import { MDBCard, MDBCardBody, MDBCardTitle, MDBCardText} from 'mdb-react-ui-kit';





export default function Card({title, text, btn_text}){

  return (
      <MDBCard>
        <MDBCardBody>
          <MDBCardTitle>{title}</MDBCardTitle>
          <MDBCardText>
            {text}
          </MDBCardText>
        </MDBCardBody>
      </MDBCard>
  );

}