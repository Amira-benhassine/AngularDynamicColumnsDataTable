import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {VoyageSearchPanelComponent} from './voyage-search-panel.component';
import {MaterialModule} from '../material.module';
import {ReactiveFormsModule, } from '@angular/forms';

import { HttpClientModule } from '@angular/common/http';
import {MatPaginatorModule } from '@angular/material/paginator';
@NgModule({
  declarations: [
    VoyageSearchPanelComponent,
  ],
  exports: [
    VoyageSearchPanelComponent
  ],
  imports: [
    CommonModule,
    MaterialModule,
    ReactiveFormsModule,
    HttpClientModule,
    MatPaginatorModule
    
  ]
})
export class VoyageSearchPanelModule {
}
