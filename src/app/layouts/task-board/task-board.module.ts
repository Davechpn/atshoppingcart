import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { TaskBoardComponent } from "./task-board.component";
import { SharedModule } from "src/app/shared/shared.module";
import { UsersComponent } from './../../users/users.component';
import { OrdersComponent } from './../../orders/orders.component';
import { WorkboardComponent } from './../../workboard/workboard.component';
import { NewproductComponent } from './../../newproduct/newproduct.component'
import { ImageCropperModule } from 'ngx-image-cropper';
import { TaskRoutes } from "./task.routing";


@NgModule({
  imports: [
    CommonModule, SharedModule, TaskRoutes ,ImageCropperModule],
  declarations: [TaskBoardComponent,UsersComponent , OrdersComponent, WorkboardComponent, NewproductComponent ]
})
export class TaskBoardModule { }
