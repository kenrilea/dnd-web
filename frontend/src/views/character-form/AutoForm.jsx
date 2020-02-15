import React, { useState } from 'react';
import PropTypes from 'prop-types';
import CheckBox from './CheckBox.jsx';
// import ArrayField from './ArrayField.jsx';
import AutoField from './AutoField.jsx';
import { test } from 'ramda';

const AutoForm = (props) => {
    const { schema, onSubmit } = props;

    const [formData, setFormData] = useState({
        baseInfo: { name: 'jim' },
    });

    const setFieldValue = (path, value) => {
        // -----declare-----
        const setObjectValue = (data, path, key) => {
            const stepModel = typeof data === 'object' ? data : {};
            switch (true) {
            case path.length === 1:
                stepModel[key] = value;
                return { ...stepModel, [key]: value };
            default:
                return { ...stepModel, [key]: pathRecursion(stepModel[key], path.slice(1))}
            }
        };
        const setArrayValue = (data, path, keyString) => {
            const key = parseInt(keyString);
            const stepModel = Array.isArray(data) ? data : [];
            const before = stepModel.slice(0, key) || [];
            const after = stepModel.slice(key + 1) || [];
            console.log(path)
            console.log(value)
            switch (true) {
            case path.length === 1 && stepModel.length < key:
                return [ ...stepModel, value ]; // adding an element
            case path.length === 1 && value === null: 
                return [ ...before, ...after] // removing an element
            case path.length === 1:
                return [ ...before, value, ...after] // editing an element
            case path.length > 1:
                //  editing an element that is an object or an array
                return [ ...before, pathRecursion(stepModel[key], path.slice(1)), ...after] 
            }
        };
        // -----execute------
        let formUpdate = JSON.parse(JSON.stringify(formData));
        const pathRecursion = (data, path) => {
            const key = path[0];
            if (/^[0-9]+$/.test(key)) {
                return setArrayValue(data, path, key);
            }
            return setObjectValue(data, path, key)
            // const stepModel = typeof data === 'object' ? data : {};
            // switch (true) {
            // case path.length === 1:
            //     stepModel[key] = value;
            //     return { ...stepModel, [key]: value };
            // default:
            //     return { ...stepModel, [key]: pathRecursion(stepModel[key], path.slice(1))}
            // }
        }
        return pathRecursion(formUpdate, path);
    }

    const getFieldValue = (path) => {
        let currentValue = formData;
        try {
            path.forEach((field) => {
                currentValue = currentValue[field];
            })
            return currentValue;
        } catch (err) {
            return undefined;
        }
    }

    const handleChange = (path, value) => {
        const update = setFieldValue(path, value)
        setFormData(update);
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit(formData);
    };
    console.log(formData)
    return (
        <form onSubmit={handleSubmit}>
            {/* {translateModel(schema, [])} */}
            <AutoField onChange={handleChange} schema={schema} getValue={getFieldValue} />
            <input type='submit' />
        </form>
    )
}

AutoForm.propTypes = {
    schema: PropTypes.object.isRequired,
    onSubmit: PropTypes.func.isRequired,
}

export default AutoForm;