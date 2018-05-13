import React, {Component} from 'react';
import {
    Modal,
    ModalHeader,
    ModalBody,
    ModalFooter,
    Button,
    Form,
    FormGroup,
    Label,
    Input,
    UncontrolledDropdown,
    DropdownToggle,
    DropdownMenu,
    DropdownItem
} from 'reactstrap';
import { PropTypes } from 'prop-types';

class EditingOrderWindow extends Component {
    constructor(props) {
        super(props);

        this.onDropdownItemClick = this.onDropdownItemClick.bind(this);
        this.onThisEditingWindowClose = this.onThisEditingWindowClose.bind(this);
        this.renderDropItemByHowManySizeThisMealHave = this.renderDropItemByHowManySizeThisMealHave.bind(this);
        this.state = {
            size_selected:'',
        };
    }

    onDropdownItemClick(e){

        const size_selected = e.currentTarget.textContent;
        console.log('size_selected',size_selected);
        this.setState({
            size_selected:size_selected
        });
    }

    onThisEditingWindowClose(){

        this.setState({
            size_selected:''
        });

        this.props.closeMealEditingWindow();

    }

    handleIfMealHasNoSize_transString(unitPriceObj){

        if(!unitPriceObj.size){
            return `${unitPriceObj.price}元`;
        }else{
            return `${unitPriceObj.size}:${unitPriceObj.price}元`;
        }
    }

    renderDropItemByHowManySizeThisMealHave(unitPriceArr){
        if(unitPriceArr){
            return    unitPriceArr.map((p, i) => <DropdownItem key={i} onClick={this.onDropdownItemClick}>{this.handleIfMealHasNoSize_transString(p)}</DropdownItem>);
        }
    } 

    render() {
        return (
            <Modal
                isOpen={this.props.isEditingWindowOpen}
                toggle={this.onThisEditingWindowClose}
            >
                <ModalHeader toggle={this.onThisEditingWindowClose}>
                    {this.props.data.name}
                </ModalHeader>
                <ModalBody>
                    <Form>
                        <FormGroup>
                            <UncontrolledDropdown>
                                <DropdownToggle caret>{this.state.size_selected === '' ? '請選擇尺寸/價格' : this.state.size_selected}</DropdownToggle>
                                <DropdownMenu>
                                    {this.renderDropItemByHowManySizeThisMealHave(this.props.data.unitPrice)}   
                                </DropdownMenu>
                            </UncontrolledDropdown>
                        </FormGroup>
                    </Form>
                </ModalBody>
                <ModalFooter />
            </Modal>
        );
    }
}

EditingOrderWindow.propTypes = {
    data: PropTypes.object,
    isEditingWindowOpen: PropTypes.bool,
    closeMealEditingWindow: PropTypes.func
};

export default EditingOrderWindow;
