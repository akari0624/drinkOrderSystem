import React from 'react';
import { ListGroupItem } from 'reactstrap';

import { PropTypes } from 'prop-types';


const ListGroupItemWrapper = props => {

    const {data} = props;

    const onItemClick = () => {
        props.onItemClick(data);
    };

    return (
        <ListGroupItem  onClick={onItemClick}>
            {data.name} {data.price}
        </ListGroupItem>
    );
};

ListGroupItemWrapper.propTypes = {
    data:PropTypes.object,
    onItemClick:PropTypes.func

};

export default ListGroupItemWrapper;
