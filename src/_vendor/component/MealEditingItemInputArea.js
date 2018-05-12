import React from 'react';
import {Input, InputGroup} from 'reactstrap';
import PropTypes from 'prop-types';

const MealEditingItemInputArea = props => {

    const {tIndex, size, price, onSizeChange, onPriceChange} = props;

    const handleSizeChange = (e) => {
        const v = e.target.value;
        onSizeChange(v, tIndex);
    };

    const handlePriceChange = (e) => {
        const v = e.target.value;
        onPriceChange(v, tIndex);
    };

    return (
        <div>
        <InputGroup>
            <Input value={size} onChange={handleSizeChange}/>
        </InputGroup>    
        <InputGroup>
            <Input value={price} onChange={handlePriceChange}/>
        </InputGroup>
        </div>
        
    );

};

MealEditingItemInputArea.propTypes = {
    tIndex: PropTypes.number.isRequired,
    size: PropTypes.string.isRequired,
    price: PropTypes.string.isRequired,
    onSizeChange: PropTypes.func.isRequired,
    onPriceChange: PropTypes.func.isRequired
};

export default MealEditingItemInputArea;