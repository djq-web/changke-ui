import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChangkeComponent } from './changke.component';
import { CommonGridComponent } from './common-grid/common-grid.component';

// service
import { ChangkeService } from './changke.service';

@NgModule({
  imports: [CommonModule, ChangkeComponent, CommonGridComponent],
  exports: [ChangkeComponent, CommonGridComponent],
  providers: [ChangkeService],
})
export class ChangeKeModule {}
