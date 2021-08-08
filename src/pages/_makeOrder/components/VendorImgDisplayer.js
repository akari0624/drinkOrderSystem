import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Styled from 'styled-components';

import { vendorImagePathOnNodeServer } from '@/static/url';
import PicEnlargeWindow from '@/_utilComponent/PicEnlargeWindow';

const Img = Styled.img`
width:40px;
`;

class VendorImageDisplayerWhenMakeOrder extends Component {
    constructor(props) {
        super(props);

        this.state = {
            isOpen: false,
            currEnlargeImgSrc:''
        };

        this.togglePicEnlargeModal = this.togglePicEnlargeModal.bind(this);
        this.renderSmallImgs = this.renderSmallImgs.bind(this);
        this.openPicEnlargeModal = this.openPicEnlargeModal.bind(this);
    }

    togglePicEnlargeModal() {
        const isOpen = this.state.isOpen ? false : true;
        this.setState({
            isOpen
        });
    }

    openPicEnlargeModal(currEnlargeImgSrc){
        return () => {

            this.setState({
                isOpen:true,
                currEnlargeImgSrc
            });
        };

    }

    renderSmallImgs(imgSrcArr) {
        return imgSrcArr.map((s, i) => (
            <Img
                key={i}
                src={`${vendorImagePathOnNodeServer}/${s}`}
                onClick={this.openPicEnlargeModal(`${vendorImagePathOnNodeServer}/${s}`)}
            />
        ));
    }

    render() {
        return (
            <div>
                <PicEnlargeWindow
                    isOpen={this.state.isOpen}
                    toggle={this.togglePicEnlargeModal}
                    isForDelete={false}
                    imageSrc={this.state.currEnlargeImgSrc}
                />
                {this.renderSmallImgs(this.props.imageSrcArr)}
            </div>
        );
    }
}

VendorImageDisplayerWhenMakeOrder.propTypes = {
    imageSrcArr: PropTypes.array.isRequired
};

export default VendorImageDisplayerWhenMakeOrder;
