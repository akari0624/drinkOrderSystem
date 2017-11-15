import React, { Component } from "react";
import { connect } from "react-redux";
import {Container, Alert} from 'reactstrap';



class LandingPageMain extends Component {
  constructor(props) {
    super(props);

this.state = {

  shouldAlertOpen:false
};

    this.shouldShowGlobalAppMessage = this.shouldShowGlobalAppMessage.bind(
      this
    );

    this.closeAlertCB = this.closeAlertCB.bind(this);
  }
  

  closeAlertCB = ()=>{

    this.setState({shouldAlertOpen:false});
  }

  componentWillMount(){

    const result = this.props.globalAppMessage;
    // 在第一次 mount render前 改變 state
        if (result.successMsg) {
    this.setState({
      shouldAlertOpen:true
    });
      }
  }

  shouldShowGlobalAppMessage() {
    const result = this.props.globalAppMessage;

    if (result.successMsg) {


      return (
        <Alert
          isOpen={this.state.shouldAlertOpen}
          color={"success"}
          toggle ={this.closeAlertCB}
        >
        {result.successMsg}
        </Alert>
      );
    }
  }

  render() {
     

    return (
      <Container>

{this.shouldShowGlobalAppMessage()}
        <div>mainLanding Page</div>
      </Container>
    );
  }
}

function mapStateToProps(state) {
  return { globalAppMessage: state.mealListInsertResult };
}

export default connect(mapStateToProps, null)(LandingPageMain);
