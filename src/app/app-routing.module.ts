import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { TrendTableComponent } from './trend-table/trend-table.component';

const routes: Routes = [
  {path:'', component:HomeComponent},
  {path: 'table-trend', component:TrendTableComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
