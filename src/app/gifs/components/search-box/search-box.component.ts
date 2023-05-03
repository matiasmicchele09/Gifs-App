import { Component, ElementRef, ViewChild } from '@angular/core';
import { GifsService } from '../services/gifs.service';

@Component({
  selector: 'gifs-search-box',
  //templateUrl: 'gifs-search-box.component.html'
  template:`
  <h5>Buscar:</h5>
  <input type="text" class="form-control"
  placeholder="Buscar gifs..."
  (keyup.enter)="searchTag()"
  #txtTagInput>`
})

//#txtTagInput es la referencia local
//el ViewChildren es para si tomas todos los inputs (mas de uno) que regresa un arreglo de todos los elementos HTML
export class SearchBoxComponent {
//ElementRef hace referencia a un elemento HTML
  @ViewChild('txtTagInput')
  public tagInput!:ElementRef<HTMLInputElement>;

  constructor(private gifsService: GifsService){}

  //searchTag(newTag: string){
    searchTag(){
      const newTag = this.tagInput.nativeElement.value;
      console.log({newTag});

      this.gifsService.searchTag(newTag);

      this.tagInput.nativeElement.value = ''; //asigno vacío para que se limpie la caja de texto

    }
}
