
import { Injectable } from '@angular/core';
import { map } from 'rxjs';
import { BaseHttp } from 'src/app/core/services/baseHttp.service';

@Injectable({
  providedIn: 'root'
})
export class MenuServices extends BaseHttp {
 MenuListUrl: string = 'Menuread';
 MenuCreateUrl : string = 'Menucreate';
 MenuEditUrl :string = 'MenuEdit';
 MenuDeleteUrl : string = 'Menudelete';

 GetMenus(){
    return this.get<any>(this.MenuListUrl);
 }
 AddMenu(obj:any){
  return this.post<any>(this.MenuCreateUrl,obj)
 }
 EditMenu(obj:any){
  return this.post<any>(this.MenuEditUrl, obj)
 }
 DeleteMenu(obj:any){
  return this.post<any>(this.MenuDeleteUrl, obj)
 }
}