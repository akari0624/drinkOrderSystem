import React, { Component } from "react";
import {Container, InputGroup, InputGroupAddon, Input } from "reactstrap";
import MealAdd from "../container/MealAdd";
import { cloneDeep } from "lodash";

import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import MealList from "../component/MealList";
import MealEditingWindow from '../component/MealEditingWindow';
import PicUploadDropZoneWindow from '../component/PicUploadDropZoneWindow';


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


export default class VendorAddMain extends Component {
  state = {
    addingMeals: [{mealName:'綠茶',unitPrice:'25'},{mealName:'烏龍茶',unitPrice:'30'},{mealName:'紅茶',unitPrice:'35'}],
  
    modal:false,
    editingMeal:{},
    editingItemIndex:null,
    fileUploadDropZoneModal:false

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
    const copied = _.cloneDeep(this.state.addingMeals);
    copied.push(mealObj);
    this.setState({ addingMeals: copied });
  };

  onDeleteClickCallback = index => {
    const copied = _.cloneDeep(this.state.addingMeals);
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
  
  openMealEditingWindowWhenBTMealEditClick = (itemIndex, editingMealObj)=>{
   console.log('log in openMealEditingWindow callback',itemIndex,editingMealObj);
   this.setState({

    modal:true,
    editingItemIndex:itemIndex,
    editingMeal:editingMealObj
   

   });

  }


  onEditingMealConfirmClick = () =>{
    const copiedMealArr = _.cloneDeep(this.state.addingMeals);
    const copiedEditingMeal = _.cloneDeep(this.state.editingMeal);
    copiedMealArr[this.state.editingItemIndex] = copiedEditingMeal;
    this.setState({ addingMeals: copiedMealArr });
  

  }

  openPicDropUploadCallback = () =>{

    this.setState({

        fileUploadDropZoneModal:true
    });
  }


  render() {
    return (
      <Container>
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
        </div>

      

      </Container>
    );
  }



}
