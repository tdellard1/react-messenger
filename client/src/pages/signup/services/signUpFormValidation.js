import { useState } from "react";

function useFormValidation(initialState) {
    const [values, setValues] = useState(initialState);

    function handleChange({target}) {
        const {name, value} = target;
        setValues({
            ...values,
            [name]: value
        });
    }
}

export default useFormValidation;
