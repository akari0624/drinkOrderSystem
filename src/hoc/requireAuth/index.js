import React, {Component} from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import {isLoginLocalStorageKey} from '@/conf/keys';
import {currRouteBeforeSignInKey} from '@/conf/keys';
import { getUserDataFromServerByUserOAuthIDAndSaveToReducer } from '@/pages/_main_landing_page/actions';
import { getSubFromJWT } from '@/util_func/util_func';

export default function (ComposedComponent) {

    class Authencation extends Component {


        constructor(props){
            super(props);

            this.state = {
                isFetchUserDataComplete:false,
            };


        }

        checkIsAuthed = () => {

            const jwtTOken = localStorage.getItem(isLoginLocalStorageKey);
            if (!jwtTOken) {

                this.saveCurrentURLToLocalStorage();
                this
                    .props
                    .history
                    .push('/fb_sign_up');
            }else{


                const subInJWT = getSubFromJWT(jwtTOken); //目前就是會員Facebook在這個app上的ID

                console.log('already have jwt, subInJWT', subInJWT);
                this.props.getUserDataFromServerByUserOAuthIDAndSaveToReducer(subInJWT);
    


            }

        }

        saveCurrentURLToLocalStorage = () => {

            const currURL = this.props.location.pathname;

            window
                .localStorage
                .setItem(currRouteBeforeSignInKey, currURL);
        };

 

        render() {

            if(!this.state.isFetchUserDataComplete){

                return(

                    <h3>讀取中</h3>
                );
            }else{
                return (<ComposedComponent {...this.props}/>);
            }
        }


        componentDidMount(){

            this.checkIsAuthed();
        }


        static getDerivedStateFromProps(nextProps,prevState){

            if(nextProps.userData.userID !== ''){

                return {
                    isFetchUserDataComplete:true,
                };
            }

            return null;
        }

    }


    function mapStateToProps({userData}) {
       
        return {userData};
    }


    function mapDispatchToProps(dispatch) {
        return bindActionCreators(
            {
                getUserDataFromServerByUserOAuthIDAndSaveToReducer
            },
            dispatch
        );
    }



    return connect(mapStateToProps, mapDispatchToProps)(Authencation);

}