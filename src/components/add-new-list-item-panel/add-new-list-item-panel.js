import React from 'react';

import './add-new-list-item-panel.css';

const AddNewListItemPanel = ({ onLabelChange, text }) => {
    return <input 
            type='text' 
            placeholder='input new task'
            className='form-control add-input'
            onChange={onLabelChange}
            value={text}/>
};

export default AddNewListItemPanel;