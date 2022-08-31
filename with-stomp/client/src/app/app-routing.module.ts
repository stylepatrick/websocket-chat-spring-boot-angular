import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {DashboardComponent} from './components/dashboard/dashboard.component';

const routes: Routes = [
  { path: '', component: DashboardComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes,
    { useHash: true, relativeLinkResolution: 'legacy' } )],
  exports: [RouterModule]
})
export class AppRoutingModule { }
