import React, {useEffect} from 'react';
import './signUp.scss';
import RegForm from '../../components/forms/regForm/RegForm';
import signInimage from '../../assets/images/signInimage.svg';
import LoginForm from '../../components/forms/loginForm/LoginForm';
import { useSelector, useDispatch } from 'react-redux';
import { setActiveForm } from '../../store/formSlice';


const SignUp = () => {
  const dispatch = useDispatch();
  const activeForm = useSelector((state) => state.form.activeForm);

  useEffect(() => {
    // Reset to regForm whenever this component loads
    dispatch(setActiveForm('regForm'));
  }, [dispatch]);

  return (
    <div className="signupContainer">
      <div className="signupImg">
        <img src={signInimage} alt="signup image" />
      </div>
      <div className="formContent">
      {activeForm === 'regForm' ? <RegForm/> : <LoginForm/>}
      </div>
    </div>
  );
}

export default SignUp