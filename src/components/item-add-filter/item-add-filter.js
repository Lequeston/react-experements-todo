import React from 'react';

const ItemAddFilter = ({ onClear }) => {
    return (
        <div>
            <button 
                className='btn btn-outline-secondary'>
                Add
            </button>
            <button 
                type='button'
                className='btn btn-outline-secondary'
                onClick={onClear}>
                Clear
            </button>
        </div>
    );
};

export default ItemAddFilter;