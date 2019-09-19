import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MsgService } from './services/msg.service';
import { AngularMaterialModule } from './angular-material/angular-material.module';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    AngularMaterialModule,
  ],
  exports: [
    AngularMaterialModule,

  ],
  providers: [MsgService]
})
export class SharedModule { }
