import React, { useState, useEffect } from 'react'
import proxy from '../../proxy';

import AutoForm from './AutoForm.jsx'
import { characterSchema } from './characterSchema';

const characterViewer = (props) => {
    const [characterData, setCharacterData] = useState(null);
    console.log(characterData);
    const fetchData = () => {
        console.log('fetching')
        fetch(`${proxy}/character/data?characterId=${props.match.params._id}`, {
            credentials: 'include',
        }).then(res => res.text()).then((resultString) => {
            console.log('test');
            const result = JSON.parse(resultString);
            if (!result || !result.success) return;
            console.log(result.data);
            const { character: newData } = result.data;
            setCharacterData(newData);
        });
    }

    const saveCharacter = (characterData) => {
        console.log('saving')
        const data = new FormData()
        data.append('data', JSON.stringify({ ...characterData, characterId: props.match.params._id }))
        fetch(`${proxy}/character/data/save`, {
            method: 'POST',
            body: data,
            credentials: 'include',
        }).then(res => res.text()).then((resultString) => {
            console.log('response recieved')
            const result = JSON.parse(resultString)
            console.log(result)
        })
    }
    if (!characterData) fetchData();
    console.log(characterData)
    return (
        <div>
            <AutoForm
                schema={characterSchema}
                onSubmit={saveCharacter}
                initialData={characterData}
            />
        </div>
    )
}

export default characterViewer;