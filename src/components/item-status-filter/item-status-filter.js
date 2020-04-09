import React from 'react';

import './item-status-filter.css'

const ItemStatusFilter = ({onChangeSearchTag, searchTag}) => {

    const nameButton = ['All', 'Active', 'Done'];
    const buttons = nameButton.map((label) => {
        const style = (searchTag === label) ? 'btn btn-info' : 'btn btn-outline-secondary';
        return <button 
            type='button'
            key={label}
            className={style}
            onClick={() => onChangeSearchTag(label)}>
                {label}
            </button>
        });
    return (
        <div>
            {buttons}
        </div>
    );
}

export default ItemStatusFilter;