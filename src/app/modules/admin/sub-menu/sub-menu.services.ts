
import { Injectable } from '@angular/core';
import { map, retry } from 'rxjs';
import { BaseHttp } from 'src/app/core/services/baseHttp.service';

@Injectable({
  providedIn: 'root'
})
export class SubMenuServices extends BaseHttp {
  submenuListUrl: string = 'Submenuread';
  menuListUrl: string = 'Menuread';
  addSubMenuUrl: string = 'Submenucreate';
  editSubMenuUrl: string = 'Submenuedit';
  deleteSubMenuUrl: string = 'Submenudelete';
  FilterSubMenuUrl: string = 'Submenufilter';
  

 getSubMenuList(){
    return this.get<any>(this.submenuListUrl);
 }

 getMenuList(){
    return this.get<any>(this.menuListUrl);
 }

 addSubMenuList(Obj:any){
    return this.post<any>(this.addSubMenuUrl,Obj);
 }

 editSubMenuList(Obj:any){
   return this.post<any>(this.editSubMenuUrl,Obj);
 }

 deleteSubMenuList(Obj:any){
   return this.post<any>(this.deleteSubMenuUrl,Obj);
 }

 filterSubMenuList(Obj:any){
  return this.post<any>(this.FilterSubMenuUrl,Obj);
 }

 
}