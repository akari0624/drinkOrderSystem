import React from 'react';
import { Link } from 'react-router-dom';
import { Container } from 'reactstrap';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Styled from 'styled-components';

import { JOIN_ORDER_BASE_URL, JOIN_ORDER_BASE_URL_RELATIVE } from '@/static/url';

const DivErrorMsg = Styled.div`
color:red;
`;

const DivSuccessMsg = Styled.div`
color:blue;
`;

const Making_Order_Result_Report_Page = props => {
    if (props.insertOrderResult.errorMsg !== '') {
        return (
            <Container>
                <div> this is report page</div>
                <DivErrorMsg> {props.insertOrderResult.errorMsg}</DivErrorMsg>
                <Link to="make_order_confirming/0"> go back</Link>
            </Container>
        );
    } else if (props.insertOrderResult.orderId !== '') {

        const join_order_page_absolute_url = `${JOIN_ORDER_BASE_URL}/${
            props.insertOrderResult.orderId
        }`;

        const join_order_relative_url = `${JOIN_ORDER_BASE_URL_RELATIVE}/${
            props.insertOrderResult.orderId
        }`;
        return (
            <Container>
                <div> this is report page</div>
                <DivSuccessMsg>
                    {' '}
                    登記成功！ 加入訂購的網址是：<Link to={join_order_relative_url}>{join_order_page_absolute_url}</Link>
                    <div>將這個網址複製起來傳給要一起訂購的人即可讓他們加入訂購</div>
                </DivSuccessMsg>
                <Link to="make_order_confirming/0"> go back</Link>
            </Container>
        );
    } else {
        return (
            <Container>
                <div> this is report page</div>
                <div>Loading....</div>
            </Container>
        );
    }
};

function mapStateToProps({ insertOrderResult }) {
    return {
        insertOrderResult
    };
}

Making_Order_Result_Report_Page.propTypes = {
    insertOrderResult: PropTypes.object
};

export default connect(mapStateToProps, null)(Making_Order_Result_Report_Page);
