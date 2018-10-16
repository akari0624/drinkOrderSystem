import React, {Component} from 'react';
import {isLoginLocalStorageKey} from '../../conf/keys';
import {currRouteBeforeSignInKey} from '../../conf/keys';

export default function (ComposedComponent) {

    class Authencation extends Component {


        constructor(props){
            super(props);

            this.checkIsAuthed();

        }

        checkIsAuthed = () => {

            if (!localStorage.getItem(isLoginLocalStorageKey)) {

                this.saveCurrentURLToLocalStorage();
                this
                    .props
                    .history
                    .push('/fb_sign_up');
            }

        }

        saveCurrentURLToLocalStorage = () => {

            const currURL = this.props.location.pathname;

            window
                .localStorage
                .setItem(currRouteBeforeSignInKey, currURL);
        };

 

        render() {

            return (<ComposedComponent {...this.props}/>);
        }

    }

    return Authencation;

}