import { Component } from '@angular/core';
import { GifsService } from 'src/app/gifs/components/services/gifs.service';

@Component({
  selector: 'shared-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent {

  constructor(private gifsService: GifsService){}

  get tags():string[]{
    return this.gifsService.tagHistory;
  }

  searchTag(tag:string):void{
    console.log(tag);

    this.gifsService.searchTag(tag);
    //gifsService.searchTag(tag) ya estaa definido en el servicio, tiene el mismo nombre que este

    /* Lo habia comenzado a hacer con el output, asi como emitiendo un evento, pero me
    hacia ruido que el sidebar estaba a la misma altura que el supuesto padre, el home-component.
    Así que el sidebar no podia ser el hijo. Por eso no se usó el output */
  }

}
