import React, {Component} from 'react';
import {isLoginLocalStorageKey} from '../../conf/keys';

export default function(ComposedComponent){

    class Authencation extends Component {

        componentWillMount() {

            if (!localStorage.getItem(isLoginLocalStorageKey)) {

                this.props.history.push('/fb_sign_up');
            }

        }

        render() {

            return (<ComposedComponent {...this.props}/>);
        }

    }


    return Authencation;

}