import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Gif, SearchResponse } from '../../interfaces/gifs.interfaces';


/* Cuando ustedes trabajan con el provider in root
hacen que este servicio esté totalmente disponible a lo largo
de toda la aplicación y todos los módulos que inyecten este servicio. */
@Injectable({
  providedIn: 'root'
})

export class GifsService {

  public gifList: Gif[] = [];
  private _tagsHistory: string[] = [];
  private apiKey: string = 'QkG22uL99DFb5TFbvp81W0X2AKGGvIoj';
  private serviceUrl: string = 'https://api.giphy.com/v1/gifs';

  constructor(private http:HttpClient) {
    this.loadLocalStorage();

    /* ESTO FUE TAREA Y LA HICE ASÍ. FUNCIONÓ, PERO PARA SEGUIR COMO EL CURSO LO COMENTO.
    EL CÓDIGO SIGUE EN EL loadLocalStorage
    const firstItem:string = JSON.parse(localStorage.getItem('history')!)[0]
    console.log(firstItem);
    this.searchTag(firstItem)*/

   }

  get tagHistory(){
    return [...this._tagsHistory]
  }

  private organizeHistory(tag:string){
    tag = tag.toLowerCase();
    if (this._tagsHistory.includes(tag)){
      //deja pasar a los tags que son diferentes
      this._tagsHistory = this._tagsHistory.filter((oldTag=>oldTag !== tag))
    }

    this._tagsHistory.unshift(tag);
    this._tagsHistory = this._tagsHistory.splice(0,10);
    this.saveLocalStorage();
  }

  private saveLocalStorage():void{
    localStorage.setItem('history', JSON.stringify(this._tagsHistory));
  }

  private loadLocalStorage():void{
    if (!localStorage.getItem('history')) return;
    this._tagsHistory = JSON.parse(localStorage.getItem('history')!);
    if (this._tagsHistory.length === 0) return;
    this.searchTag(this._tagsHistory[0]);
  }


  searchTag(tag: string):void{
    if (tag.length === 0) return;
    this.organizeHistory(tag);

    const params = new HttpParams()
      .set('api_key', this.apiKey)
      .set('limit' , '10')
      .set('q', tag)

    //Con esto se trabaja con observable, no promesas como el fetch
    //this.http.get('https://api.giphy.com/v1/gifs/search?api_key=QkG22uL99DFb5TFbvp81W0X2AKGGvIoj&q=bocajuniors&limit=10')
    this.http.get<SearchResponse>(`${this.serviceUrl}/search`, {params})
    .subscribe(resp =>{
      this.gifList = resp.data;
      console.log(resp.data);
      console.log({gifs: this.gifList});
    })

  }
}
