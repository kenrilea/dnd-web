import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import proxy from '../../proxy';

const CharacterList = (props) => {
    const [characters, setCharacters] = useState(null);
    const getCharacterList = (e) => {
        e.preventDefault();
        fetch(`${proxy}/character/list`, { credentials: 'include' })
            .then(res => res.text())
            .then((res) => {
                const { success, data } = JSON.parse(res);
                if (success !== true) return;
                if (Array.isArray(data.characterList)) {
                    setCharacters(data.characterList)
                }
            });
    }
    const handleAddCharacter = (e) => {
        e.preventDefault();
    }
    return (
        <>
            <h1>character list</h1>
            <button onClick={getCharacterList}>Load</button>
            <Link to='/basic/add'>Add character</Link>
            {Array.isArray(characters) && characters.map(({ name, _id }) => (
                <div>
                    <Link
                        to={`/basic/character/${_id}`}
                    >
                        {name}
                    </Link>
                </div>
            ))}
        </>
    )
};

CharacterList.PropTypes = {
}

export default CharacterList;