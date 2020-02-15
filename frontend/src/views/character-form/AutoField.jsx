import React, { useState } from 'react';
import PropTypes from 'prop-types';
import CheckBox from './CheckBox.jsx';
import ArrayField from './ArrayField.jsx';

const AutoField = (props) => {
    const { schema, onChange, startingPath, getValue, deleteField } = props;

    const handleDelete = (e) => {
        e.preventDefault();
        onChange([...startingPath], null)
    }

    const translateModel = (model, path) => {
        const formFields = []
        Object.keys(model).forEach((key) => {
            const currentPath = [...path, key];
            const field = model[key];
            switch (field.type) {
                case 'object':
                    formFields.push(<div><label className='nested-field-label'>{field.label || key}</label><div className='nested-field'>{translateModel(field.fields, currentPath)}</div></div>);
                    break;
                case 'string':
                    formFields.push(
                        <>
                            <label className='autoform-label'>{field.label || key}</label>
                            <input name={key} type={'text'} onChange={(e) => onChange(currentPath, e.target.value)} value={getValue(currentPath)} />
                        </>
                    )
                    break;
                case 'int':
                    formFields.push(
                        <>
                            <label className='autoform-label'>{field.label || key}</label>
                            <input name={key} type={'number'} onChange={(e) => onChange(currentPath, e.target.value)} value={getValue(currentPath)} />
                        </>
                    )
                    break;
                case 'bool':
                    formFields.push(
                        <>
                            <label className='autoform-label'>{field.label || key}</label>
                            <CheckBox name={key} onChange={(checked) => onChange(currentPath, checked)} value={getValue(currentPath)} />
                        </>
                    )
                    break;
                case 'array':
                    formFields.push(
                        <>
                            <label className='nested-field-label'>{field.label || key}</label>
                            <ArrayField elementSchema={field.elementSchema} onChange={onChange} getValue={getValue} startingPath={currentPath} />
                        </>
                    )
            }
        })
    return <div>{formFields}</div>
    }

    return (
        <>
            {deleteField && <button onClick={handleDelete}>X</button>}
            {translateModel(schema, startingPath)}
        </>
    )
}

AutoField.propTypes = {
    schema: PropTypes.object.isRequired,
    onChange: PropTypes.func.isRequired,
    startingPath: PropTypes.array,
    getValue: PropTypes.func.isRequired,
    deleteField: PropTypes.bool,
}

AutoField.defaultProps = {
    startingPath: [],
    deleteField: false,
}

export default AutoField;