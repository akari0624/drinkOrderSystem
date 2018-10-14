import React from 'react';
import Styled from 'styled-components';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import axios from 'axios';

import { fbSignUpOrLogInBackendRoute } from '../static/url';


/* 這邊一定要用<a href="..."> 不能用ajax，會有CORS問題 */
const FBSignUp = props => (
    <h3><a href={fbSignUpOrLogInBackendRoute}>登入FB以註冊帳號或登入</a></h3>

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