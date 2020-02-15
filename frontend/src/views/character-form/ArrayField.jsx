import React from 'react';
import PropTypes from 'prop-types';
import AutoField from './AutoField.jsx';

const ArrayField = (props) => {
    const { elementSchema, getValue, onChange, startingPath } = props;

    const handleAddElement = (e) => {
        e.preventDefault();
        const currentValue = getValue(startingPath);
        if (!Array.isArray(currentValue)) onChange(startingPath, [{}])
        onChange([...startingPath, `${currentValue.length}`], {})
    }

    const renderElements = () => {
        const value = getValue(startingPath);
        console.log(value);
        if (!Array.isArray(value)) return (<></>)
        return value.map((_, index) => {
            const currentPath = [...startingPath, index];
            return (
                <AutoField
                    deleteField
                    key={`${startingPath[startingPath.length -1]}-${index}`}
                    schema={elementSchema}
                    onChange={onChange}
                    getValue={getValue}
                    startingPath={currentPath}
                />
            )
        })
    }
    return (
        <div>
            <div>
                <button onClick={handleAddElement}>add element</button>
            </div>
            <div className='nested-field'>
                {renderElements()}
            </div>
        </div>
    )
};

ArrayField.propTypes = {
    elementSchema: PropTypes.object.isRequired,
    onChange: PropTypes.func.isRequired,
    startingPath: PropTypes.array.isRequired,
}


export default ArrayField;