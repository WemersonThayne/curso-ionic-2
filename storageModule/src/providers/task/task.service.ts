import { Task } from './../../models/task.model';
import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';

/*
  Generated class for the TaskProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class TaskService {

  constructor(public storage: Storage) {
    console.log('Hello TaskProvider Provider');
  }

  getAll(): Promise<Task[]> {
      return this.storage.ready().then((localForage: LocalForage) => {
        let tasks: Task[] = [];

        return this.storage.forEach((task: Task, key: string, iterationNumber: number) =>{
          if(key.indexOf('tasks.') > -1 ){
            tasks.push(task);
          }
        }).then(() => tasks.reverse());

      });
  
  }

  getByID(id: number): Promise<Task> {
    return this.storage.get(`tasks.${id}`);
  }

  create(task : Task): Promise<Task>{
    return this.storage.set(`tasks.${task.id}`,task);
  }

  update(task : Task): Promise<Task>{
    return this.storage.set(`tasks.${task.id}`,task);
  }

  delete(id : number): Promise<boolean>{
    return this.storage.remove(`tasks.${id}`).then(() => true);
  }

}
