import React, { Component } from 'react';
import { connect } from 'react-redux';

import { bindActionCreators } from 'redux';
import {
    Container,
    InputGroup,
    InputGroupAddon,
    Input,
    Button
} from 'reactstrap';
import MealAdd from '../component/MealAdd';
import _cloneDeep from 'lodash.clonedeep';

import { DragDropContext, Droppable} from 'react-beautiful-dnd';
import PropTypes from 'prop-types';
import MealList from '../component/MealList';
import MealEditingWindow from '../component/MealEditingWindow';
import PicUploadDropZoneWindow from '../component/PicUploadDropZoneWindow';
import GenericAlert from '../../_utilComponent/genericAlert';

import { uploadDataToServer } from '../action/index';

import validateDataBeforeSendToServer from './viewModal';

const getListStyle = isDraggingOver => ({
    background: isDraggingOver ? 'lightblue' : 'lightgrey',
    padding: 8,
    width: '100%'
});

// a little function to help us with reordering the result
const reorder = (list, startIndex, endIndex) => {
    const result = Array.from(list);
    const [removed] = result.splice(startIndex, 1);
    result.splice(endIndex, 0, removed);

    return result;
};

class VendorAddMain extends Component {
    state = {
        addingMeals: [],
        modal: false,
        editingMeal: {mealName:'',unitPrice:[]},
        editingItemIndex: null,
        fileUploadDropZoneModal: false,
        shouldAlertOpen: false,
        vendorName:'',
        vendorAddr:'',
        vendorTel:'',
    };

    onEditingMealNameChange = newName => {
        const copiedMeal = _cloneDeep(this.state.editingMeal);
        copiedMeal.mealName = newName;
        this.setState({
            editingMeal: copiedMeal
        });
    };

    onEditingMealUnitPriceChange_mealHasNoSizeDiff = newPrice => {
        const copiedMeal = _cloneDeep(this.state.editingMeal);
        copiedMeal.unitPrice[0].price = newPrice;
        this.setState({
            editingMeal: copiedMeal
        });
    };

    onEditingMealUnitPriceChange_mealHasSizeDiff = (newPrice, index) => {
        const copiedMeal = _cloneDeep(this.state.editingMeal);
        copiedMeal.unitPrice[index].price = newPrice;
        this.setState({
            editingMeal: copiedMeal
        });
    };

    onEditingMealSizeChange = (newSize, index) => {
        const copiedMeal = _cloneDeep(this.state.editingMeal);
        copiedMeal.unitPrice[index].size = newSize;
        this.setState({
            editingMeal: copiedMeal
        });
    };

    addMeals = mealObj => {
        const copied = _cloneDeep(this.state.addingMeals);
        copied.push(mealObj);
        this.setState({ addingMeals: copied });
    };

    onDeleteClickCallback = index => {
        console.log('delete clicked!!');
        const clonedMeals = _cloneDeep(this.state.addingMeals);
        clonedMeals.splice(index, 1);
        console.log(clonedMeals);
        this.setState({addingMeals:clonedMeals});
    };

    onDragEnd = result => {
        // dropped outside the list
        if (!result.destination) {
            return;
        }

        const reorderMeals = reorder(
            this.state.addingMeals,
            result.source.index,
            result.destination.index
        );

        this.setState({
            addingMeals: reorderMeals
        });
    };

    toggleMealEditingWindow = () => {
        this.setState({
            modal: !this.state.modal
        });
    };

    togglePicUploadWindow = () => {
        this.setState({
            fileUploadDropZoneModal: !this.state.fileUploadDropZoneModal
        });
    };

    toggleAlertOpen = () => {
        this.setState({
            alertOpen: !this.state.alertOpen
        });
    };

    openMealEditingWindowWhenBTMealEditClick = (itemIndex, editingMealObj) => {
        console.log(
            'log in openMealEditingWindow callback',
            itemIndex,
            editingMealObj
        );
        this.setState({
            modal: true,
            editingItemIndex: itemIndex,
            editingMeal: editingMealObj
        });
    };

    onEditingMealConfirmClick = () => {
        const copiedMealArr = _cloneDeep(this.state.addingMeals);
        const copiedEditingMeal = _cloneDeep(this.state.editingMeal);
        copiedMealArr[this.state.editingItemIndex] = copiedEditingMeal;
        this.setState({ addingMeals: copiedMealArr });
    };

    openPicDropUploadCallback = () => {
        this.setState({
            fileUploadDropZoneModal: true
        });
    };

    uploadDataToServer = () => {

        const vendorName = this.state.vendorName;
        const vendorAddr = this.state.vendorAddr;
        const vendorTel = this.state.vendorTel;
        const addingMeals = this.state.addingMeals;

        const validateResultMsg = validateDataBeforeSendToServer({
            vendorName,
            vendorAddr,
            vendorTel,
            addingMeals,
        });
     
        if(validateResultMsg !== ''){

            this.setState({
                shouldAlertOpen: true,
                submitErrorMsg: validateResultMsg,
            });

            return;
        }

        this.props.uploadDataToServer(
            {
                vendorName,
                vendorAddr,
                vendorTel,
            },
            this.state.addingMeals,
            this.props.fileArr
        );
    };

    onVendorNameChange = (e) => {

        this.setState({vendorName:e.target.value});

    }

    onVendorAddrChange = (e) => {

        this.setState({
            vendorAddr:e.target.value
        });
    }

    onVendorTelChange = (e) => {

        this.setState({
            vendorTel:e.terget.value
        });
    }


    componentWillReceiveProps(nextProps) {
        // 這邊可以做這樣的事，但是你用 connect 的話  就算 reducer裡 return default的state , 這個if每次一定都會是 true
        // 因為mapStateToProps每次都在造出一個新的物件
        if (this.props !== nextProps) {
            if (nextProps.mealListInsertResult.errorMsg) {
                this.setState({ shouldAlertOpen: true });
            } else if (nextProps.mealListInsertResult.successMsg) {
                // 成功的話  導回首頁,並在那邊show 成功insert幾筆的 alert
                //  導回去之前,清掉一些之前存在 browserObjectURL裡的那些東西   很重要
                this.props.history.push('/');
                // 這裡跳轉去landingPage的話  這次的render自然就不會觸發
            }
        }
    }

    closeAlertCB = () => {
        this.setState({ shouldAlertOpen: false });
    };

    checkMealListInsertResult = () => {
        const result = this.props.mealListInsertResult;

        // 失敗的話  就繼續停留在 新增店家的視窗
        if (result.errorMsg) {
            return (
                <GenericAlert
                    visible={this.state.shouldAlertOpen}
                    color="danger"
                    message={result.errorMsg}
                    closeAlertCB={this.closeAlertCB}
                />
            );

            // 第一次mount render
        } else {
            return (
                <GenericAlert
                    visible={this.state.shouldAlertOpen}
                    color="danger"
                    message=""
                    closeAlertCB={this.closeAlertCB}
                />
            );
        }
    };

    droppableChildrenFunction_that_GenerateDragableMealListWrapper = (currMeals) => (provided, snapshot) => (
        <div
            ref={provided.innerRef}
            style={getListStyle(
                snapshot.isDraggingOver
            )}
        >
            <MealList
                mealListData={currMeals}
                onDeleteClickCallback={
                    this.onDeleteClickCallback
                }
                openMealEditingWindowWhenBTMealEditClick={
                    this
                        .openMealEditingWindowWhenBTMealEditClick
                }
            />
        </div>
    );

    checkIsOKToSubmit = () => {

        if(this.state.shouldAlertOpen && this.state.submitErrorMsg){
            return (
                <GenericAlert
                    visible={this.state.shouldAlertOpen}
                    color="danger"
                    message={this.state.submitErrorMsg}
                    closeAlertCB={this.closeAlertCB}
                />
            );

        }

    }

    render() {
        return (
            <Container>
                {this.checkMealListInsertResult()}
                {this.checkIsOKToSubmit()}
                <MealEditingWindow
                    modal={this.state.modal}
                    editingMeal={this.state.editingMeal}
                    toggleMealEditingWindow={this.toggleMealEditingWindow}
                    onNameChange={this.onEditingMealNameChange}
                    onUnitPriceChange_noSizeDiff={this.onEditingMealUnitPriceChange_mealHasNoSizeDiff}
                    onEditingMealUnitPriceChange_mealHasSizeDiff={this.onEditingMealUnitPriceChange_mealHasSizeDiff}
                    onEditingMealSizeChange={this.onEditingMealSizeChange}
                    onEditingMealConfirmClick={this.onEditingMealConfirmClick}
                />

                <PicUploadDropZoneWindow
                    fileUploadDropZoneModal={this.state.fileUploadDropZoneModal}
                    togglePicUploadWindow={this.togglePicUploadWindow}
                />

                <InputGroup>
                    <InputGroupAddon addonType="prepend">店名</InputGroupAddon>
                    <Input placeholder="輸入店名" onChange={this.onVendorNameChange}/>

                    <InputGroupAddon addonType="prepend">地址</InputGroupAddon>
                    <Input placeholder="輸入地址" onChange={this.onVendorAddrChange} />

                    <InputGroupAddon addonType="prepend">電話</InputGroupAddon>
                    <Input placeholder="輸入電話"  onChange={this.onVendorTelChange} />
                </InputGroup>

                <MealAdd
                    addCallBack={this.addMeals}
                    openPicDropUploadCallback={this.openPicDropUploadCallback}
                />
                <div
                    style={{
                        marginTop: '20px'
                    }}
                >
                    <DragDropContext onDragEnd={this.onDragEnd}>
                        <Droppable droppableId="mealListDropable">

                            {this.droppableChildrenFunction_that_GenerateDragableMealListWrapper(this.state.addingMeals)}

                        </Droppable>
                    </DragDropContext>
                    <Button
                        type="button"
                        color="primary"
                        onClick={this.uploadDataToServer}
                    >
                        確定上傳
                    </Button>
                </div>
            </Container>
        );
    }

}

VendorAddMain.propTypes = {
    fileArr: PropTypes.array,
    mealListInsertResult: PropTypes.object,
    uploadDataToServer: PropTypes.func,
    history: PropTypes.object
};


function mapStateToProps(state) {
    return {
        mealListInsertResult: state.mealListInsertResult,
        fileArr: state.imgPreviewSrcAndImgFile.fileArr
    };
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators(
        { uploadDataToServer: uploadDataToServer },
        dispatch
    );
}

export default connect(mapStateToProps, mapDispatchToProps)(VendorAddMain);
