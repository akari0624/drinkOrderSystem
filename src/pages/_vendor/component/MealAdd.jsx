import React, { Component } from 'react';
import {
    Label,
    Input,
    InputGroup,
    Button,
    Modal,
    ModalHeader,
    ModalBody,
    Container
} from 'reactstrap';
import PropTypes from 'prop-types';
import SizeAndPriceEditingArea from './SizeAndPriceEditingArea';
import _cloneDeep from 'lodash/cloneDeep';

export default class MealAdd extends Component {
    constructor(props) {
        super(props);

        this.state = {
            mealInfo: {
                mealName: '',
                unitPrice: [] // should be [{size:... ,price:... }]
            },
            isInfoWindowOpen: false,
            infoWindowMsg: '',
            isSizeMatter: false,
            editingSize: '',
            editingPrice: ''
        };

        this.whenNewItemAddType = { size: '', price: '' };
    }

    addMeal = () => {


        const makeStateBackToInit = () => {
         
            this.setState({
                mealInfo: {
                    mealName: '',
                    unitPrice: []
                },
                editingSize: '',
                editingPrice: ''
            });
        };
      
        const whenMealNotHaveSize = (mealInfo, editingPrice) =>{
            const verifyAddMeal = (mealName, price) => {
                if (mealName === '' || price === '') {
                    return false;
                }
                return true;
            };
    
            
    
            if (!verifyAddMeal(mealInfo.mealName, editingPrice)) {
                this.openErrorMsgWindow('餐點名稱與價格必須填寫！');
                return;
            }


            const enteredMealInfo = {
                mealName: mealInfo.mealName,
                unitPrice: [{size:'', price: editingPrice}] 
            };
    
            makeStateBackToInit();
    
            this.props.addCallBack(enteredMealInfo);
        };


        const whenMealHaveSize = (mealInfo) =>{
            const verifyMealData = (mealName, priceArr) => {
                if (mealName === '') {
                    return false;
                }

                if(priceArr.length === 0){
                    return false;
                }

                const notCompletePriceArr = priceArr.filter(p => {
                    if(!p.size || !p.price){return p;}
                });

                if(notCompletePriceArr.length >0){
                    return false;
                }

                return true;
            };
    
            
    
            if (!verifyMealData(mealInfo.mealName, mealInfo.unitPrice)) {
                this.openErrorMsgWindow('餐點名稱與各種尺寸的價格必須填寫！');
                return;
            }


            const enteredMealInfo = {
                mealName: mealInfo.mealName,
                unitPrice: [...mealInfo.unitPrice] 
            };
    
            makeStateBackToInit();
    
            this.props.addCallBack(enteredMealInfo);
        };

        if(!this.state.isSizeMatter){
            whenMealNotHaveSize(this.state.mealInfo, this.state.editingPrice);
        }else{

            whenMealHaveSize(this.state.mealInfo);

        }


    };

    closeInfoWindow = () => {
        this.setState({
            isInfoWindowOpen: false,
            infoWindowMsg: ''
        });
    };

    mealNameOnChange = e => {
        const mealInfo =  _cloneDeep(this.state.mealInfo);
        mealInfo.mealName = e.target.value;
        this.setState({ mealInfo });
    };

    unitPriceOnChange = e => {
        const price = e.target.value;

        const setNewUnitPrice = p => {
            
            this.setState({ editingPrice: p });
        };

        if (price === '') {
            setNewUnitPrice(price);
            return;
        }
        const parsedValue = parseInt(price, 10);

        if (isNaN(parsedValue)) {
            return;
        }

        setNewUnitPrice(parsedValue);
    };

    onIsSizeMatterChange = e => {
        const reverseCondition =
            this.state.isSizeMatter === true ? false : true;
        this.setState({
            isSizeMatter: reverseCondition
        });
    };

    whenNewItemAddCB = newItem => {
        const copiedMealInfo = _cloneDeep(this.state.mealInfo);
        copiedMealInfo.unitPrice.push(newItem);
        this.setState({
            mealInfo: copiedMealInfo
        });
    };

    editingSizeOnChange = (e) => {

        const v = e.target.value;
        this.setState({
            editingSize:v
        });
    }

    clearEditingSizeAndPrice = () => {

        this.setState({
            editingSize:'',
            editingPrice:'',
        });
    };

    openErrorMsgWindow = (errorMag) => {
        this.setState({
            isInfoWindowOpen: true,
            infoWindowMsg: errorMag
        });

    }

    confirmEditingSizeAndPrice = () => {

        const verifySizeAndPrice = (size, price) => {
            if (size === '' || price === '') {
                return false;
            }
            return true;
        };

        const addUnitPriceDataToThisMeal = (size, price) => {

            const newSizeAndPrice = {size, price};
            let nMealInfo = _cloneDeep(this.state.mealInfo);

            nMealInfo.unitPrice.push(newSizeAndPrice);

            this.setState({
                mealInfo:nMealInfo
            });

        };

        const currSize = this.state.editingSize;
        const currPrice = this.state.editingPrice;

        if(!verifySizeAndPrice(currSize, currPrice)){
            this.openErrorMsgWindow('尺寸與價格必須填寫！');
            return;
        }

        addUnitPriceDataToThisMeal(currSize, currPrice);

    }

    renderSizeAndPriceEditCompleteArea = (d, i) => (
        <div key={i}>{d.size} {d.price}元</div>
    )

    renderEditingAreaFunc = () => (
        <div>
            <div>
                <Label for="inputPrice">尺寸</Label>
                <Input
                    type="text"
                    id="size_editing"
                    placeholder="大中小或M,L..."
                    value={this.state.editingSize}
                    onChange={this.editingSizeOnChange}
                />
            </div>
            <div>
                <Label for="inputPrice">價格</Label>
                <Input
                    type="text"
                    id="inputPrice"
                    placeholder="元"
                    value={this.state.editingPrice}
                    onChange={this.unitPriceOnChange}
                />

                <Button color="primary" onClick={this.confirmEditingSizeAndPrice}>確定</Button>
                <Button color="danger" onClick={this.clearEditingSizeAndPrice}>取消</Button>

            </div>
        </div>
    );

    renderUniPriceInputArea = () => {
        if (!this.state.isSizeMatter) {
            return (
                <div>
                    <Label for="inputPrice">單價</Label>
                    <Input
                        type="text"
                        id="inputPrice"
                        placeholder="元"
                        value={this.state.editingPrice}
                        onChange={this.unitPriceOnChange}
                    />
                </div>
            );
        } else {
            return (
                <SizeAndPriceEditingArea
                    currEditingData={this.state.mealInfo.unitPrice}
                    whenNewItemAdd={this.whenNewItemAddCB}
                    emptyInitEditingItemType={this.whenNewItemAddType}
                    renderEditingAreaFunc={this.renderEditingAreaFunc}
                    editingCompleteItems={this.state.mealInfo}
                    renderEditCompleteAreaFunc={this.renderSizeAndPriceEditCompleteArea}
                />
            );
        }
    };

    render() {
        return (
            <Container>
                <Modal
                    isOpen={this.state.isInfoWindowOpen}
                    toggle={this.closeInfoWindow}
                >
                    <ModalHeader toggle={this.closeInfoWindow}>
                        訊息：
                    </ModalHeader>
                    <ModalBody>
                        <div>{this.state.infoWindowMsg}</div>
                    </ModalBody>
                </Modal>
                <div>
                    <span>
                        <Label for="inputMeal">餐名</Label>
                        <Input
                            type="text"
                            id="inputMeal"
                            value={this.state.mealInfo.mealName}
                            onChange={this.mealNameOnChange}
                        />
                        <InputGroup>
                            <Label for="isSizeMatter">區分大小？</Label>
                            <Input
                                type="checkbox"
                                id="isSizeMatter"
                                onChange={this.onIsSizeMatterChange}
                            />
                        </InputGroup>
                        {this.renderUniPriceInputArea()}
                    </span>
                    <div style={{ marginTop: '20px' }}>
                        <Button
                            type="button"
                            color="primary"
                            onClick={this.addMeal}
                        >
                            加入
                        </Button>
                        <Button
                            type="button"
                            color="secondary"
                            onClick={this.props.openPicDropUploadCallback}
                        >
                            上傳菜單圖片
                        </Button>
                    </div>
                </div>
            </Container>
        );
    }
}

MealAdd.propTypes = {
    openPicDropUploadCallback: PropTypes.func,
    addCallBack: PropTypes.func
};
