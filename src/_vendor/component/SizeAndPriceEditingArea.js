import React, { Component } from 'react';
import { PropTypes } from 'prop-types';

class SizeAndPriceEditingArea extends Component {
    constructor(props) {
        super(props);
        this.renderEditingArea = this.renderEditingArea.bind(this);
        this.renderEditCompleteItems = this.renderEditCompleteItems.bind(this);
    }

    renderEditingArea(cb) {
        return cb();
    }

  

    renderEditCompleteItems(items, cb){
        return items.map(cb);
    }

    render() {
        return (
            <div>
                {this.renderEditingArea(this.props.renderEditingAreaFunc)}
                {this.renderEditCompleteItems(this.props.editingCompleteItems.unitPrice, this.props.renderEditCompleteAreaFunc)}
            </div>);
    }
}

SizeAndPriceEditingArea.propTypes = {
    currEditingData: PropTypes.array.isRequired,
    whenNewItemAdd:PropTypes.func.isRequired,
    emptyInitEditingItemType:PropTypes.object.isRequired,
    renderEditingAreaFunc:PropTypes.func.isRequired,
    editingCompleteItems:PropTypes.object,
    renderEditCompleteAreaFunc:PropTypes.func,
};

export default SizeAndPriceEditingArea;
