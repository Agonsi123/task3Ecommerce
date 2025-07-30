import React, {useState, useEffect} from 'react';
import './regForm.scss';
import { useForm } from 'react-hook-form';
import { auth } from '../../../firebase/firebase';
import { isEmail, isPhoneNumber } from '../../../utils/authHelpers';
import useRecaptcha from '../../../hooks/useRecaptcha';
import { createUserWithEmailAndPassword, signInWithPhoneNumber, updateProfile, GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { Navigate } from 'react-router-dom';
import Google from "../../../assets/images/Google.svg";
import { useDispatch } from 'react-redux';
import { signup } from '../../../store/authSlice';
import { setActiveForm } from '../../../store/formSlice';


const RegForm = () => {
  const dispatch = useDispatch();
  
    const {
        register,
        handleSubmit,
        watch,
        reset,
        setValue,
        formState: { errors },
    } = useForm();

    const identifier = watch('identifier');
    const name = watch('name');
    const [step, setStep] = useState(1);
    const [confirmationResult, setConfirmationResult] = useState(null);
    const [firebaseError, setFirebaseError] = useState(null);
    const [loading, setLoading] = useState(false);

    // inputType state could be either 'email', 'phone', or 'unknown'
    const [inputType, setInputType] = useState('unknown');

    useEffect(() => {
      if (isEmail(identifier)) {
        setInputType('email');
      }else if (isPhoneNumber(identifier)) {
        setInputType('phone');
      }else {
        setInputType('unknown');
      }
      //Reset to step 1 and clear OTP If input type changes after step 1
      if (step === 2 && inputType !== 'phone') {
        setStep(1);
        setValue('otp', '');
      }
    }, [identifier, step, inputType, setValue]);

    // Use the reCAPTCHA hook
    const { recaptchaContainerRef, getRecaptchaVerifier, recaptchaError, resetRecaptcha } = useRecaptcha(
      auth, 
      inputType === 'phone' && step === 1 //only render reCAPTCHA for phone auth step 1
    );

    const currentError = firebaseError || recaptchaError;

    const onSubmit = async (data) => {
        setLoading(true);
        setFirebaseError(null);

        //Step 1: Identifier & Password/Send Code
        if (step === 1) {
          if (inputType === 'email') {
            try{
              const userCredential = await createUserWithEmailAndPassword(auth, data.identifier, data.password);
              const user = userCredential.user;

              if (data.name) {
                await updateProfile(user, {
                  name: data.name
                });
                console.log("User name updated:", data.name);
              }

              console.log('Signed up successfully with email:', data.identifier);
              alert(`Welcome, ${data.name}! Your account is created`);

              dispatch(signup({
                uid: user.uid,
                name: data.name,
                email: user.email,
                method: "email"
              }));

              reset();
              setStep(1);
              setInputType('unknown');

              // Switch to login form
              dispatch(setActiveForm('login'));

            } catch (error) {
              console.error('Email sign-up error:', error.code, error.message);
              setFirebaseError(error.message);
            }
          }else if (inputType === 'phone') {
            try{
              const recaptchaVerifier = getRecaptchaVerifier();
              if (!recaptchaVerifier) {
                setFirebaseError('reCAPTCHA not ready. Please wait or refresh.');
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
              console.error("Phone sign-up error:", error.code, error.message);
              setFirebaseError(error.message);
              resetRecaptcha(); //Reset reCAPTCHA on phone auth failure
            }
          } else {
            setFirebaseError("Please enter a valid email or phone number.");
          }
          //Step 2; Verify OTP
        } else if(step === 2) {
          if (!confirmationResult) {
            setFirebaseError("No verification process initiated. Please go back and try again.");
            setStep(1);
            return;
          }
          try {
            const userCredential = await confirmationResult.confirm(data.otp);
            const user = userCredential.user;
            if (data.name) {
              await updateProfile(user, {
                name: data.name,
              });
              console.log("User name updated for phone user:", data.name);
            }

            console.log("Phone number verified and user signed up!");

            dispatch(signup({
              uid: user.uid,
              name: data.name,
              phone: user.phone,
              method: "phone"
            }));

            alert(`Successfully signed up with ${data.name} || ${data.identifier}!`);

            // Reset form state after successful signup
            reset();
            setStep(1);
            setValue("identifier", "");
            setValue("password", "");
            // setValue('otp', '');
            setValue("name", "");
            setConfirmationResult(null);
            setInputType("unknown");

            // Switch to login form
            dispatch(setActiveForm("login"));

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
        console.log("Signed up with Google:", result.user);
        alert("Welcome, " + result.user.name);

        dispatch(signup({
          uid: result.user.uid,
          name: result.user.name,
          phone: result.user.email,
          method: "google"
        }));
        // Reset form
        reset();
        setStep(1);
        setInputType("unknown");
        // Switch to login form
        dispatch(setActiveForm("login"));
      }catch (error) {
        console.error("Error signing up with Google:", error.code, error.message);
        setFirebaseError(error.message);
      }finally {
        setLoading(false);
      }
    };


  return (
    <div className="regFormContainer">
      <div className="signupContent">
        <h3>Create an account</h3>
        <p>Enter your details below</p>
      </div>
      <form onSubmit={handleSubmit(onSubmit)} className="formWrapper">
        {step === 1 && (
          <>
            <div className="formField">
              <input
                type="text"
                id="name"
                placeholder="Name"
                {...register("name", {
                  required: "Name is Required.",
                  minLength: { value: 3, message: "Name must be at least 3 characters." },
                })}
              />
              {errors.name && (
                <p style={{ color: "red", fontSize: "12px" }}>{errors.name.message}</p>
              )}
            </div>

            <div className="formField">
              <input
                type="text"
                id="identifier"
                placeholder="Email or Phone Number"
                {...register("identifier", {
                  required: "Email or Phone number is Required.",
                  validate: {
                    validIdentifier: (value) =>
                      isEmail(value) ||
                      isPhoneNumber(value) ||
                      "Please enter a valid email or phone number(+1234567890).",
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
                    minLength: { value: 8, message: "8+ Characters." },
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
            <button type="submit" disabled={loading} style={{ marginTop: "20px" }}>
              {loading ? "Processing..." : inputType === "phone" ? "Send Code" : "Create Account"}
            </button>
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

        <div className="formContainer">
          <div className="googleSignup" onClick={handleGoogleSignIn}>
            <img src={Google} alt="" />
            <span>Sign up with Google</span>
          </div>
        </div>
      </form>
      {/* <div className="formContainer">
        <button type="submit">Create Account</button>
        <div className="googleSignup">
          <img src={Google} alt="" />
          <span>Sign up with Google</span>
        </div>
      </div> */}
      <div className="login">
        <p>Already have account</p>
        <button onClick={() => dispatch(setActiveForm("login")
        )}>Log in</button>
      </div>
    </div>
  );
}

export default RegForm