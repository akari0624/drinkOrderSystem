import React, {Component} from 'react';
import {Alert} from 'reactstrap';

export default class GenericAlert extends Component{


constructor(props){

super(props);

console.log('initSetState',this.props);
this.state = {

 visible:false

}


this.onDismiss = this.onDismiss.bind(this);

}


onDismiss(){

    this.setState({visible:false});

    this.props.closeAlertCB();
}


 // lifeCycle
 // React doesn’t call componentWillReceiveProps() with initial props during mounting.
componentWillReceiveProps(nextProps){
// nextProps 是 在這次快要做的render 的新props , this.props 在這裡是上一次render時 收到的舊props

console.log('componentWillReceiveProps');

 // if(this.props !== nextProps){
// console.log('not the same props');
    this.setState({visible:nextProps.visible});
//  }

}



render(){
console.log('componentRender',this.props);


     return(



   <Alert isOpen={this.state.visible} color={this.props.color}  toggle={this.onDismiss}>
           {this.props.message}
   </Alert>

     );

}


}


