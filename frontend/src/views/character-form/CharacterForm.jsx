import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { characterSchema } from './characterSchema.js';
import AutoForm from './AutoForm.jsx';
import proxy from '../../proxy.js';

import './style.css';

const CharacterForm = (props) => {
    const { test } = props;

    const handleSubmit = (characterData) => {
        console.log(characterData);
        const body = new FormData();
        body.append('data', JSON.stringify(characterData))
        fetch(proxy + '/character/data', {
            method: 'POST',
            body,
            credentials: 'include'
        }).then((res) => res.text()).then((res) => {
            try { 
                console.log(JSON.parse(res));
            } catch (err) {
                console.log(err);
            }
        })
    }
    return (
        <AutoForm schema={characterSchema} onSubmit={handleSubmit} />
    )
}

export default CharacterForm;
