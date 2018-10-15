import React from 'react';
import Styled from 'styled-components';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import axios from 'axios';

import { fbSignUpOrLogInBackendRoute } from '../static/url';


const MiddleDiv = Styled.div`

  text-align:center;
  width:40%;
  background-color:#3b5998;
  font-size:18px;
  margin:30px auto;
  padding:5px 30px 5px 30px;
`;


const FB_a_Tag = Styled.a`
  color:#FFFFFF;
  font-size:18px;

  &:hover{
    color:#FFFFFF;
    text-decoration:none;
  }
`;


/* 這邊一定要用<a href="..."> 不能用ajax，會有CORS問題 */
const FBSignUp = props => (
    <MiddleDiv><FB_a_Tag href={fbSignUpOrLogInBackendRoute}>登入FB以註冊帳號或登入</FB_a_Tag></MiddleDiv>

);


FBSignUp.propTypes = {


  }


function mapStateToProps(state){
  return {}
}




function mapDispatchToProps(dispatch){
return bindActionCreators({
},
dispatch)
}


export default connect(null, mapDispatchToProps)(FBSignUp)