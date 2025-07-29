import React, {useContext, useState, useEffect} from 'react';
// import { NavContext } from '../../../context/Index';
import './loginForm.scss';
import { useForm } from 'react-hook-form';
import { auth } from '../../../firebase/firebase';
import { signInWithEmailAndPassword, signInWithPhoneNumber, GoogleAuthProvider, signInWithPopup,} from 'firebase/auth';
import { isEmail, isPhoneNumber } from '../../../utils/authHelpers';
import useRecaptcha from '../../../hooks/useRecaptcha';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import {login} from '../../../store/authSlice';



const LoginForm = () => {
  // const { setIsLoggedIn } = useContext(NavContext);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    reset,
    formState: { errors },
  } = useForm();

  const identifier = watch("identifier");
  const [step, setStep] = useState(1); //1: Identifier/Password, 2: OTP
  const [confirmationResult, setConfirmationResult] = useState(null);
  const [firebaseError, setFirebaseError] = useState(null);
  const [loading, setLoading] = useState(false);
  // inputType state could be either 'email', 'phone', or 'unknown'
  const [inputType, setInputType] = useState("unknown");

  useEffect(() => {
    if (isEmail(identifier)) {
      setInputType("email");
    } else if (isPhoneNumber(identifier)) {
      setInputType("phone");
    } else {
      setInputType("unknown");
    }
    //Reset to step 1 and clear OTP If input type changes after step 1
    if (step === 2 && inputType !== "phone") {
      setStep(1);
      setValue("otp", "");
    }
  }, [identifier, step, inputType, setValue]);

  // Use the reCAPTCHA hook
  const { recaptchaContainerRef, getRecaptchaVerifier, recaptchaError, resetRecaptcha } =
    useRecaptcha(
      auth,
      inputType === "phone" && step === 1 //only render reCAPTCHA for phone auth step 1
    );

    const currentError = firebaseError || recaptchaError;

  const onSubmit =async (data) => {
    setLoading(true);
    setFirebaseError(null);

    if(step === 1) {
      if (inputType === "email") {
        try {
          await signInWithEmailAndPassword(auth, data.identifier, data.password);
          const user = auth.currentUser;
          dispatch(login({name: user.displayName || '', identifier: user.email}));
          console.log("Signed in successfully with email:", data.identifier);
          alert(`Welcome back, ${data.name}!`);

          navigate("/account");
          //after successful sign in reset entire form
          reset();
          setStep(1);
          setInputType("unknown");
        } catch (error) {
          console.error("Email sign-in error:", error.code, error.message);
          setFirebaseError(error.message);
        }
      } else if (inputType === "phone") {
        try {
          const recaptchaVerifier = getRecaptchaVerifier();
          if (!recaptchaVerifier) {
            setFirebaseError("reCAPTCHA not ready. Please wait or refresh.");
            return;
          }
          // Verify reCAPTCHA
          await recaptchaVerifier.verify();

          //signInWithPhoneNumber creates the user if the number doesn't exist
          const result = await signInWithPhoneNumber(auth, data.identifier, recaptchaVerifier);
          setConfirmationResult(result);
          setStep(2);
          alert(`Verification code sent to ${data.identifier}`);
        } catch (error) {
          console.error("Phone sign-in error:", error.code, error.message);
          setFirebaseError(error.message);
          resetRecaptcha(); //Reset reCAPTCHA on phone auth failure
        }
      } else {
        setFirebaseError("Please enter a valid email or phone number.");
      }
      //Step 2; Verify OTP
    }
    else if(step === 2) {
      if (!confirmationResult) {
        setFirebaseError("No verification process initiated. Please go back and try again.");
        setStep(1);
        return;
      }
      try {
        await confirmationResult.confirm(data.otp);
        const user = auth.currentUser;
        dispatch(login({name: user.displayName || '', identifier: user.phoneNumber}));
        
        navigate("/account");
        console.log("Phone number verified and user signed in!");
        alert(`Successfully logged in with ${data.identifier}!`);
    
        // Reset form state after successful sign-in
        reset();
        setStep(1);
        setValue('identifier', '');
        setValue('password', '');
        setConfirmationResult(null);
        setInputType('unknown');
    
      }catch (error) {
        console.error("OTP verification error:", error.code, error.message);
        setFirebaseError(error.message);
        setValue('otp', '');
      }
    }
    setLoading(false);
    
  };

  const handleGoogleSignIn = async () => {
    setLoading(true);
    setFirebaseError(null);
    const provider = new GoogleAuthProvider();
    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;
      dispatch(login({name: user.displayName || '', identifier: user.email}));
      
      console.log('Signed in with Google:', result.user);

      navigate("/account");
      alert("Welcome, " + (result.user.name || result.user.identifier));
      // Reset form
      reset();
      setStep(1);
      setInputType('unknown');
  
    }catch (error) {
      console.error("Error signing in with Google:", error.code, error.message);
      setFirebaseError(error.message);
    }finally {
      setLoading(false);
    }
  };

  return (
    <div className="loginFormContainer">
      <div className="signupContent">
        <h3>Log in to Exclusive</h3>
        <p>Enter your details below</p>
      </div>
      <form onSubmit={handleSubmit(onSubmit)} className="formWrapper">
        {step === 1 && (
          <>
            <div className="formField">
              <input
                type="text"
                id="identifier"
                placeholder="Email or Phone Number"
                {...register("identifier", {
                  required: "Email or phone number is Required.",
                  validate: {
                    validIdentifier: (value) =>
                      isEmail(value) ||
                      isPhoneNumber(value) ||
                      "Please enter a valid email or phone number.",
                  },
                })}
              />
              {errors.identifier && (
                <p style={{ color: "red", fontSize: "12px" }}>{errors.identifier.message}</p>
              )}
            </div>

            {inputType === "email" && (
              <div className="formField">
                <input
                  type="password"
                  id="password"
                  placeholder="Password"
                  {...register("password", {
                    required: inputType === "email" ? "Password is required." : false,
                  })}
                />
                {errors.password && (
                  <p style={{ color: "red", fontSize: "12px" }}>{errors.password.message}</p>
                )}
              </div>
            )}
            {inputType === "phone" && (
              <div
                ref={recaptchaContainerRef}
                style={{ marginTop: "15px", marginBottom: "15px" }}
              ></div>
            )}

            <div className="forgetPContainer">
              <button type="submit" disabled={loading} style={{ marginTop: "-5px" }}>
                {loading ? "Processing..." : inputType === "phone" ? "Send Code" : "Login"}
              </button>
              <p>Forget Password?</p>
            </div>
          </>
        )}

        {step === 2 && inputType === "phone" && (
          <>
            <p>
              A verification code has been sent to <strong>{identifier}</strong>
            </p>
            <div>
              <input
                type="text"
                id="otp"
                {...register("otp", {
                  required: "Verification code is required.",
                  minLength: { value: 6, message: "Code must be 6 digits." },
                  maxLength: { value: 6, message: "Code must be 6 digits." },
                })}
              />
              {errors.otp && <p style={{ color: "red", fontSize: "12px" }}>{errors.otp.message}</p>}
            </div>

            <button
              type="submit"
              disabled={loading}
              style={{ marginTop: "20px", backgroundColor: "#28a745" }}
            >
              {loading ? "Verifying..." : "Verify Code"}
            </button>
            <button
              type="button"
              onClick={() => {
                setStep(1);
                setValue("otp", "");
                setConfirmationResult(null);
                resetRecaptcha();
              }}
              disabled={loading}
              style={{ marginLeft: "10px", marginTop: "20px", backgroundColor: "#6c757d" }}
            >
              Change Number
            </button>
          </>
        )}
        {currentError && <p style={{ color: "red", fontSize: "12px" }}>{currentError}</p>}
      </form>
    </div>
  );
}

export default LoginForm