import React from 'react';
import {
  MDBBtn,
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBCard,
  MDBCardBody,
  MDBInput,
  MDBIcon
}
from 'mdb-react-ui-kit';

function Register() {
  return (
    <MDBContainer fluid>

      <MDBRow className='d-flex justify-content-center align-items-center h-100'>
        <MDBCol col='12'>

          <MDBCard className='text-dark my-5 mx-auto' style={{borderRadius: '1rem', maxWidth: '400px' ,backgroundColor: "#ffffff"}}>
            <MDBCardBody className='p-5 d-flex flex-column align-items-center mx-auto w-100'>

              <h2 className="fw-bold mb-2 text-uppercase">Register</h2>
              <p className="text-black-50 mb-5">Welcome to MealHub!</p>              

              <MDBInput wrapperClass='mb-4 mx-5 w-100'  labelClass='text-black' label='First Name' id='formControlLg'  type='text' size="lg"/>
              <MDBInput wrapperClass='mb-4 mx-5 w-100'  labelClass='text-black' label='Last Name' id='formControlLg'  type='text' size="lg"/>  
              <MDBInput wrapperClass='mb-4 mx-5 w-100'  labelClass='text-black' label='Email address' id='formControlLg'  type='email' size="lg"/>
              <MDBInput wrapperClass=' mb-4 mx-5 w-100' labelClass='text-black' label='Password' id='formControlLg' type='password' size="lg"/>
              <MDBInput wrapperClass=' mb-4 mx-5 w-100' labelClass='text-black' label='Confirm Password' id='formControlLg' type='password' size="lg"/>

              <MDBBtn outline className='mx-2 px-5 fw-bold' color='white' size='lg' style={{backgroundColor: "#eb6f3e"}} >
                Sign Up
              </MDBBtn>
            
              <div className='d-flex flex-row mt-3 mb-5'>
                <MDBBtn tag='a' color='none' className='m-3' style={{ color: 'black' }}>
                  <MDBIcon fab icon='facebook-f' size="lg"/>
                </MDBBtn>


                <MDBBtn tag='a' color='none' className='m-3' style={{ color: 'black' }}>
                  <MDBIcon fab icon='google' size="lg"/>
                </MDBBtn>
              </div>

              <div>
                <p className="mb-0">Already have an account? <a href="front-end/src/Login.js" class="text-50 fw-bold"  style={{ color: '#eb6f3e' }}>Sign In</a></p>

              </div>
            </MDBCardBody>
          </MDBCard>

        </MDBCol>
      </MDBRow>

    </MDBContainer>
  );
}

export default Register;