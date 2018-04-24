import React, { Component } from "react";
import {connect} from 'react-redux';

import {bindActionCreators} from 'redux';
import {Container, InputGroup, InputGroupAddon, Input, Button } from "reactstrap";
import MealAdd from "../container/MealAdd";
import  cloneDeep  from 'lodash.clonedeep';

import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import MealList from "../component/MealList";
import MealEditingWindow from '../component/MealEditingWindow';
import PicUploadDropZoneWindow from '../component/PicUploadDropZoneWindow';
import GenericAlert from '../../_utilComponent/genericAlert';

import {uploadDataToServer} from '../action/index';


const getListStyle = (isDraggingOver) => ({
  background: isDraggingOver ? 'lightblue' : 'lightgrey',
  padding: 8,
  width: '100%'
});

// a little function to help us with reordering the result
const reorder =  (list, startIndex, endIndex) => {
  const result = Array.from(list);
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);

  return result;
};


class VendorAddMain extends Component {

   
  state = {
    addingMeals: [{mealName:'綠茶',unitPrice:'25'},{mealName:'烏龍茶',unitPrice:'30'},{mealName:'紅茶',unitPrice:'35'}], 
    modal:false,
    editingMeal:{},
    editingItemIndex:null,
    fileUploadDropZoneModal:false,
    shouldAlertOpen:false
  };

  onEditingMealNameChange = (newName)=>{

     const copiedMeal = Object.assign({},this.state.editingMeal);
     copiedMeal.mealName = newName;
     this.setState({
        editingMeal:copiedMeal
     });


  }


  onEditingMealUnitPriceChange = (newPrice)=>{

     const copiedMeal = Object.assign({},this.state.editingMeal);
     copiedMeal.unitPrice = newPrice;
     this.setState({
        editingMeal:copiedMeal
     });


  }

  addMeals = mealObj => {
    const copied = cloneDeep(this.state.addingMeals);
    copied.push(mealObj);
    this.setState({ addingMeals: copied });
  };

  onDeleteClickCallback = index => {
    const copied = cloneDeep(this.state.addingMeals);
    copied.splice(index, 1);
    this.setState({ addingMeals: copied });
  };



  onDragEnd = (result) =>{
    // dropped outside the list
    if(!result.destination) {
       return; 
    }
    
    const reorderMeals = reorder(
      this.state.addingMeals, 
      result.source.index, 
      result.destination.index
    );
    
    this.setState({
        addingMeals:reorderMeals
    });
  }



  toggleMealEditingWindow = ()=>{

    this.setState({

        modal:!this.state.modal
    });
  }

  togglePicUploadWindow =()=>{

    this.setState({

        fileUploadDropZoneModal:!this.state.fileUploadDropZoneModal
    });


  }

  toggleAlertOpen = () =>{

this.setState({
  alertOpen:!this.state.alertOpen
   
})

  }
  
  openMealEditingWindowWhenBTMealEditClick = (itemIndex, editingMealObj)=>{
   console.log('log in openMealEditingWindow callback',itemIndex,editingMealObj);
   this.setState({

    modal:true,
    editingItemIndex:itemIndex,
    editingMeal:editingMealObj
   

   });

  }


  onEditingMealConfirmClick = () =>{
    const copiedMealArr = cloneDeep(this.state.addingMeals);
    const copiedEditingMeal = cloneDeep(this.state.editingMeal);
    copiedMealArr[this.state.editingItemIndex] = copiedEditingMeal;
    this.setState({ addingMeals: copiedMealArr });
  

  }

  openPicDropUploadCallback = () =>{

    this.setState({

        fileUploadDropZoneModal:true
    });
  }

  uploadDataToServer = () =>{

   this.props.uploadDataToServer(this.state.addingMeals, this.props.fileArr);    

  }


// component lifeCycle
  componentWillReceiveProps(nextProps){
    
    
        if(this.props !== nextProps){   // 這邊可以做這樣的事，但是你用 connect 的話  就算 reducer裡 return default的state , 這個if每次一定都會是 true
                                          // 因為mapStateToProps每次都在造出一個新的物件
         
           if(nextProps.mealListInsertResult.errorMsg){
           
            this.setState({shouldAlertOpen:true}); 
    
           
        }else if(nextProps.mealListInsertResult.successMsg){

     // 成功的話  導回首頁,並在那邊show 成功insert幾筆的 alert 
     //  導回去之前,清掉一些之前存在 browserObjectURL裡的那些東西   很重要
         this.props.history.push('/');
         // 這裡跳轉去landingPage的話  這次的render自然就不會觸發
        }
       }
    
      }


 closeAlertCB = ()=>{
 
         this.setState({shouldAlertOpen:false});

      }


  checkMealListInsertResult = ()=>{

  
  const result = this.props.mealListInsertResult;

// 失敗的話  就繼續停留在 新增店家的視窗
  if(result.errorMsg){

      return <GenericAlert visible={this.state.shouldAlertOpen} color='danger' message={result.errorMsg} closeAlertCB={this.closeAlertCB}/> ;

        // 第一次mount render
  }else{

return <GenericAlert visible={this.state.shouldAlertOpen} color='danger' message="" closeAlertCB={this.closeAlertCB}/>

  }



  }

  



  render() {

   
    return (
      <Container>

  {this.checkMealListInsertResult()}

  <MealEditingWindow
      modal={this.state.modal} 
      editingMeal = {this.state.editingMeal}
      toggleMealEditingWindow={this.toggleMealEditingWindow}
      onNameChange ={this.onEditingMealNameChange}
      onUnitPriceChange ={this.onEditingMealUnitPriceChange}
      onEditingMealConfirmClick ={this.onEditingMealConfirmClick}
      />

      <PicUploadDropZoneWindow
      fileUploadDropZoneModal={this.state.fileUploadDropZoneModal}
      togglePicUploadWindow ={this.togglePicUploadWindow}
          />

        <InputGroup>
          <InputGroupAddon>店名</InputGroupAddon>
          <Input placeholder="輸入店名" />

          <InputGroupAddon>地址</InputGroupAddon>
          <Input placeholder="輸入地址" />

          <InputGroupAddon>電話</InputGroupAddon>
          <Input placeholder="輸入電話" />
        </InputGroup>

        <MealAdd 
        addCallBack={this.addMeals} 
        openPicDropUploadCallback={this.openPicDropUploadCallback}
        />
        <div
          style={{
            marginTop: "20px"
          }}
        >
          <DragDropContext onDragEnd={this.onDragEnd}>
            <Droppable droppableId="mealListDropable">
            {(provided, snapshot) => (
            <div 
              ref={provided.innerRef} 
              style={getListStyle(snapshot.isDraggingOver)}
            >
              <MealList
                mealListData={this.state.addingMeals}
                onDeleteClickCallback={this.onDeleteClickCallback}
                openMealEditingWindowWhenBTMealEditClick={this.openMealEditingWindowWhenBTMealEditClick}
              />
              </div>)}
            </Droppable>
          </DragDropContext>
          <Button type="button" color="primary" onClick={this.uploadDataToServer}>確定上傳</Button>
        </div>

      

      </Container>
    );
  }


// component lifeCycle
//   componentDidUpdate(){

//   const result = this.props.mealListInsertResult;
//   console.log('will update',result);
//   // 成功的話  導回首頁,並在那邊show 成功insert幾筆的 alert 
// //  導回去之前,清掉一些之前存在 browserObjectURL裡的那些東西   很重要
//   if(result.successMsg){

//        this.props.history.push('/');

//   }

// }


}


  

function mapStateToProps(state){

    return {mealListInsertResult:state.mealListInsertResult,
      fileArr:state.imgPreviewSrcAndImgFile.fileArr
    };

}


function mapDispatchToProps(dispatch){

    return bindActionCreators({uploadDataToServer:uploadDataToServer}, dispatch);

}

export default  connect(mapStateToProps,mapDispatchToProps)(VendorAddMain);
