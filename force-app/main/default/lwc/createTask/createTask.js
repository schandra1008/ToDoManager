import { LightningElement, api } from 'lwc';
import saveToDo from "@salesforce/apex/ToDoController.saveToDo";
import {ShowToastEvent} from 'lightning/platformShowToastEvent'

export default class CreateTask extends LightningElement {
    @api targetParent;
    taskTitle;
    dueDate;
    showDueDate = false;
    showSave = false;

    connectedCallback() {
        console.log('target Parent value is '+this.targetParent);
    }

    handleOnChange(event){
        const fieldName = event.target.name;
        if(fieldName ==='taskTitle'){
            this.taskTitle = event.target.value;
            if(this.taskTitle != ""){
                this.showDueDate = true;
            }
            else{
                this.showDueDate = fasle;
            }
            //console.log('task title is :'+this.taskTitle);
        }
        else if(fieldName === 'dueDate'){
            this.dueDate = event.target.value;
            this.showDueDate != "" && this.targetParent != true ? (this.showSave = true) : (this.showSave = false); 
            //console.log('due date is :'+ this.dueDate);
        }
    }

    handleClick(){
        console.log('child button clicked');
        saveToDo({title:this.taskTitle, dueDate:this.dueDate})
        .then((result)=>{
            if(result === "Success"){
                this.taskTitle = '';
                this.dueDate = '';

                const evt = new ShowToastEvent({
                    title:"Success",
                    message : "Task added to ToDo list",
                    variant : "success"
                });
                this.dispatchEvent(evt);
            }
        })
        .catch((error)=>{
            console.log('error is '+error);

            const evt = new ShowToastEvent({
                    title:"Error",
                    message : error.body.message,
                    variant : "error"
                });
                this.dispatchEvent(evt);
        })
    }

    @api handleParentClick(){
        this.handleClick();
    }
}