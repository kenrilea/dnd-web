import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

const CheckBox = (props) => {
    const { name, onChange, value: incomingValue } = props;
    const [ value, setValue ] = useState(incomingValue);
    useEffect(() => {
        setValue(incomingValue);
    }, [incomingValue])

    const handleChange = (e) => {
        setValue(!value);
        onChange(!value)
        console.log(e.target.checked);
    }
    return <input type='checkbox' name={name} onChange={handleChange} checked={value} />
}

CheckBox.propTypes = {
    name: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired,
    value: PropTypes.bool,
}

CheckBox.defaultProps = {
    value: false,
}

export default CheckBox;