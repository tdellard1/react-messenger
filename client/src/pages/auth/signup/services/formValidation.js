import {useState, useEffect} from "react";
import submitSignUp from "./submitSignUp";

function FormValidation(initialState, validation, successCallback) {
    const [values, setValues] = useState(initialState);
    const [errors, setErrors] = useState({});
    const [isSubmitting, setSubmitting] = useState(false);

    useEffect(() => {
        if (isSubmitting) {
            const noErrors = Object.keys(errors).length === 0;
            if (noErrors) {
                submitSignUp(values, successCallback);
                setSubmitting(false);
            } else {
                setSubmitting(false);
            }
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [errors])

    function handleChange({target}) {
        const {name, value} = target;
        setValues({
            ...values,
            [name]: value
        });
    }

    function handleBlur() {
        const validationErrors = validation(values);
        setErrors(validationErrors);
    }

    function handleSubmit(event) {
        event.preventDefault();

        const validationErrors = validation(values);
        setErrors(validationErrors);
        setSubmitting(true);
    }

    return {handleChange, handleSubmit, handleBlur, values, errors, isSubmitting};
}

export default FormValidation;
