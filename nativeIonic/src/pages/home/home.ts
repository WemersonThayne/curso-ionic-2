import { MovieService } from './../../providers/movie/movie.service';
import { Component } from '@angular/core';
import { NavController, AlertController, ItemSliding, Loading, LoadingController, AlertOptions } from 'ionic-angular';

import { Movie } from '../../models/movie.model';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  public movies: Movie[] = [];
  
  constructor(public navCtrl: NavController,
              public alertCrtl: AlertController,
              public loadingCrtl: LoadingController,
              public moviesServive: MovieService
             ) {

  }


  ionViewDidLoad() {
     this.moviesServive.getAll()
                       .then((movies: Movie[]) => {
                          this.movies = movies;
                       });
  }

  onSave(type: string, itemSliding?: ItemSliding, movie?: Movie): void {
    let title: string = type.charAt(0).toUpperCase() + type.substr(1);
    let options = {
      itemSliding: itemSliding,
      title: `${title} Movie`,
      type: type,
      movie: movie
    }

    this.showAlert(options);
  }

  onDelete(movie: Movie): void{
    this.alertCrtl.create({
      title:`Do you want to delete ${movie.title} movie?`,
      buttons: [
        {
          text: 'Yes',
          handler: () =>{
              let loading: Loading = this.showLoading(`Deleting ${movie.title}...`);
              this.moviesServive.delete(movie.id).then((deleted: boolean) =>{
                  this.movies.splice(this.movies.indexOf(movie),1);
                  loading.dismiss();
              });
          }
        },{
          text: 'No'
        }
      ]
    }).present();
  }

  private showAlert(options:{itemSliding?: ItemSliding, title: string, type: string, movie?: Movie}): void {
    let alertOptions: AlertOptions = {
      title: options.title,
      inputs: [
        {
          name: 'title',
          placeholder: 'Movie title'
        }
      ],
      buttons: [
        'Cancel',
        {
          text: 'Save',
          handler: (data) =>{
              let loading: Loading = this.showLoading(`Saving ${data.title} movie...`);
              let contextMovie: Movie;

              switch(options.type){
                    case 'create':
                                contextMovie = new Movie(data.title);
                                break;
                    case 'update':
                                options.movie.title = data.title;
                                contextMovie = options.movie;
                                break;
              }

              this.moviesServive[options.type](contextMovie).then((result: any) => {
                  if(options.type === 'create'){
                    this.movies.unshift(result);
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
      alertOptions.inputs[0].value = options.movie.title;
    }
    this.alertCrtl.create(alertOptions).present();
  }

  private showLoading(message?: string): Loading {
    let loading: Loading = this.loadingCrtl.create({
      content: message || 'Please Waiting...'
    });
    loading.present();
    return loading;
  }

}
