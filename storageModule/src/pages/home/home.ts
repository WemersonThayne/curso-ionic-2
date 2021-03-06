import { Task } from './../../models/task.model';
import { Component } from '@angular/core';
import { NavController, Loading, LoadingController, ItemSliding, AlertOptions, AlertController } from 'ionic-angular';
import { TaskService } from '../../providers/task/task.service';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  tasks: Task[];
  constructor(public navCtrl: NavController, public taskService:TaskService, public loadingCrtl: LoadingController, public alertCtrl: AlertController) {

  }

  ionViewDidLoad() {
    this.taskService.getAll().then((tasks: Task[]) =>{
      this.tasks = tasks;
      console.log(tasks);
    });
  }

  onSave(type: string, itemSliding?: ItemSliding, task?: Task){
    let title: string = type.charAt(0).toUpperCase() + type.substr(1);
    let options = {
      title: `${title} Task`,
      itemSliding: itemSliding,
      type: type
    }

    this.showAlert(options,task);
    
  }

  onUpdate(task: Task){
    this.taskService.update(task);
  }

  onDelete(task: Task){
    this.alertCtrl.create({
      title:`Do you want to delete ${task.title} task?`,
      buttons: [
        {
          text: 'Yes',
          handler: () =>{
              let loading: Loading = this.showLoading(`Deleting ${task.title}...`);
              this.taskService.delete(task.id).then((deleted: boolean) =>{
                  this.tasks.splice(this.tasks.indexOf(task),1);
                  loading.dismiss();
              });
          }
        },{
          text: 'No'
        }
      ]
    }).present();
  }

  private showLoading(message?: string): Loading {
    let loading: Loading = this.loadingCrtl.create({
      content: message || 'Please Wait...'
    });
    loading.present();
    return loading;
  }


  private showAlert(options: {itemSliding: ItemSliding, title: string, type: string}, task?: Task): void {
      console.log(options);
    let alertOptions: AlertOptions = {
      title: options.title,
      inputs:[
        {
          name: 'title',
          placeholder:'Task Title'
        }
      ],
      buttons:[
          {
            text:'Cancel',
            role:'cancel'
          },
          {
            text: 'Save',
            handler:(data)=>{
              let loading: Loading = this.showLoading(`Saving ${data.title} task...`);
              let contextTask: Task;
              switch(options.type){ 
                case 'create':
                              contextTask = new Task(data.title);  
                              break;
                case 'update':
                              task.title = data.title;
                              contextTask = task;
                              break;
              }
              
              this.taskService[options.type](contextTask).then((newTask: Task) => {
                
                if(options.type === 'create'){
                  this.tasks.unshift(newTask);
                  loading.dismiss();
                }

                if(options.itemSliding){
                  options.itemSliding.close();
                }
              });

            }
          }
      ]
    };

    if(options.type === 'update'){
      alertOptions.inputs[0].value = task.title;
    }

  this.alertCtrl.create(alertOptions).present();

  }


  
  

}
