import React from 'react';
import {
    Card,
    CardImg,
    CardText,
    CardBody,
    CardTitle,
    CardSubtitle,
    Button
} from 'reactstrap';
import PropTypes from 'prop-types';

import { vendorImagePathOnNodeServer } from '@/static/url';

const VendorCard = props => {


    const seeMenu = () => {

        props.toggleMenu(props.indexIntheVendorArray);
    };


    const renderFirstVendorImg = (imgLink) => {

        if(imgLink){
            return (
                <CardImg
                    top={true}
                    width="100%"
                    alt={props.alt}
                    src={`${vendorImagePathOnNodeServer}/${imgLink}`}
                />

            );
        }

        return(
            <h3>暫無圖片</h3>
        );

    };

    return (
        <Card>
            {renderFirstVendorImg(props.imgSrcArr[0])}
            <CardBody>
                <CardTitle>{props.name}</CardTitle>
                <CardSubtitle>{props.subtitle}</CardSubtitle>
                <CardText>{props.text}</CardText>
                <Button onClick={seeMenu}>看菜單</Button>
            </CardBody>
        </Card>
    );
};

VendorCard.propTypes = {
    alt: PropTypes.string,
    imgSrcArr: PropTypes.array,
    name: PropTypes.string,
    subtitle: PropTypes.string,
    text: PropTypes.string,
    toggleMenu: PropTypes.func.isRequired,
    indexIntheVendorArray:PropTypes.number.isRequired
};

export default VendorCard;
