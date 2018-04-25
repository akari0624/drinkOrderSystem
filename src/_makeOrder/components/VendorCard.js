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

const VendorCard = props => (
    <Card>
        <CardImg top width="100%" alt={props.alt} src={props.imgSrc} />
        <CardBody>
            <CardTitle>{props.name}</CardTitle>
            <CardSubtitle>{props.subtitle}</CardSubtitle>
            <CardText>{props.text}</CardText>
            <Button />
        </CardBody>
    </Card>
);

VendorCard.propTypes = {
    alt: PropTypes.string,
    imgSrc: PropTypes.string,
    name: PropTypes.string,
    subtitle: PropTypes.string,
    text: PropTypes.string
};

export default VendorCard;
