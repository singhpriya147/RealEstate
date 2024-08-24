import { Navigate } from 'react-router-dom';
import { AppContext } from './context';
import { useContext } from 'react';
import { getAuth } from 'firebase/auth';

const ProtectedRoute = ({ element }) => {
  const auth = getAuth();

  const { state } = useContext(AppContext);
  const { userLoggedIn } = state;

  console.log(userLoggedIn , 'protected route')

  return localStorage.getItem('accessToken') || userLoggedIn? element : <Navigate to='/login' />;
};

export default ProtectedRoute;

// eyJhbGciOiJSUzI1NiIsImtpZCI6ImQ0MjY5YTE3MzBlNTA3MTllNmIxNjA2ZTQyYzNhYjMyYjEyODA0NDkiLCJ0eXAiOiJKV1QifQ.eyJpc3MiOiJodHRwczovL3NlY3VyZXRva2VuLmdvb2dsZS5jb20vcmVhbGVzdGF0ZS02OWJiYSIsImF1ZCI6InJlYWxlc3RhdGUtNjliYmEiLCJhdXRoX3RpbWUiOjE3MjQ1MTMwNTMsInVzZXJfaWQiOiI1QWFUbkVDMWNnV1NMa1V6bm1LamVRcEJvbEgzIiwic3ViIjoiNUFhVG5FQzFjZ1dTTGtVem5tS2plUXBCb2xIMyIsImlhdCI6MTcyNDUxMzA1MywiZXhwIjoxNzI0NTE2NjUzLCJlbWFpbCI6InNhbTEyM0BnbWFpbC5jb20iLCJlbWFpbF92ZXJpZmllZCI6ZmFsc2UsImZpcmViYXNlIjp7ImlkZW50aXRpZXMiOnsiZW1haWwiOlsic2FtMTIzQGdtYWlsLmNvbSJdfSwic2lnbl9pbl9wcm92aWRlciI6InBhc3N3b3JkIn19.HUQZ8kiv_CgMJ7-74gDuK4jOdAOYLe68vTYNnIhvwX571z71bnUclxKIkb7YLUXPI95aRZIBKQoNNQzbq1Nrjf8Y6sI_HGTA5-p-kRJ6qqrD-pxN2IrfCsMSyaDdIFQfbW15wpwKqPU6cfn1jzuAqUq1xrbt61Hgdo7-vr8CNt5BMdBl5vrWSQ5hJp4wpDn_nYF0KY7ZKMwtTb13gGz2o9R5KMcaKsSLkaJLF_i-GRIuaksgd3bkkg1IsAiB6_z4vK3yGAnqW5-45BXhp-XH0JDmHcTkffjwATdOQZ1T_Cjj7L_ruZrYM66N-PXUXS3mpru9Y0yhaRKlpW_eqVYZ4g
