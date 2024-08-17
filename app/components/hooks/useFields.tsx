import {useState} from "react";

interface FieldValues {
    [key: string]: string | number | boolean | null;
}

export default function useFields(values: FieldValues = {}) {
    const [fields, setFields] = useState(values)
    const [hasChange, setHasChange] = useState(false)

    function handleFields(input: {name: string, value: string | number | boolean}) {
        setFields(fields => ({
            ...fields,
            [input.name]: input.value,
        }))

        setHasChange(true)
    }

    function updateFields(updatedValues: FieldValues) {
        setFields((prevFields) => ({
            ...prevFields,
            ...updatedValues,
        }));

        setHasChange(true)
    }

    return {fields, hasChange, setHasChange, handleFields, updateFields, setFields}
}
