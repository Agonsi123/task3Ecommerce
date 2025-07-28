import { useState, useEffect, useRef } from "react";
import { RecaptchaVerifier } from "firebase/auth";


const useRecaptcha = (auth, shouldRender) => {
    const recaptchaContainerRef = useRef(null);
    const recaptchaVerifierInstanceRef = useRef(null);
    const [recaptchaError, setRecaptchaError] = useState(null);

    useEffect(() => {
        if (shouldRender && recaptchaContainerRef.current && !recaptchaContainerRef.current) {
            // Ensure empty container to prevent duplicate, then clear previous errors
            recaptchaContainerRef.current.innerHTML = '';
            setRecaptchaError(null);

            recaptchaVerifierInstanceRef.current = new RecaptchaVerifier(auth, recaptchaContainerRef.current, {
                'size' : 'normal',
                'callback' : (response) => {
                    console.log("reCAPTCHA solved:", response);
                    setRecaptchaError(null);
                },
                'expired-callback' : () => {
                    console.log("reCAPTCHA expired. Please re-verify.");
                    //Reset reCAPTCHA if it expires
                    if (recaptchaVerifierInstanceRef.current) {
                        recaptchaVerifierInstanceRef.current.render().then(widgetId => {
                            window.grecaptcha.reset(widgetId);
                        });
                    }
                }
            });
            recaptchaVerifierInstanceRef.current.render().then((widgetId) => {
                console.log("reCAPTCHA rendered with widget ID:", widgetId);
            }).catch(err => {
                console.error("Failed to render reCAPTCHA:", err);
                setRecaptchaError("Failed to load reCAPTCHA. Please try again later.");
            });
        }

        return () => {
            if (recaptchaVerifierInstanceRef.current) {
                //Clear reCAPTCHA instance
                recaptchaVerifierInstanceRef.current.clear();
                recaptchaVerifierInstanceRef.current = null;
            }
            if (recaptchaContainerRef.current) {
                //Clear container content
                recaptchaContainerRef.current.innerHTML = ''
            }
            //clear error
            setRecaptchaError(null);
        };
    }, [auth, shouldRender]);

    const getRecaptchaVerifier = () => recaptchaVerifierInstanceRef.current;

    const resetRecaptcha = () => {
        if (recaptchaVerifierInstanceRef.current) {
            recaptchaVerifierInstanceRef.current.render().then(widgetId => {
                window.grecaptcha.reset(widgetId);
            });
        } else {
            console.warn("Attempted to reset reCAPTCHA, but instance was not found.");
            setRecaptchaError("reCAPTCHA not fully initialized. Please refresh the page if issues persist.");
        }
    };

    return {recaptchaContainerRef, getRecaptchaVerifier, recaptchaError, resetRecaptcha};
}

export default useRecaptcha;
