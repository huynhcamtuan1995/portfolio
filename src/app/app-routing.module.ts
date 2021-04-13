import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ExperienceComponent } from './main-component/experience/experience.component';
 
const routes: Routes = [
  { path: '',         component: ExperienceComponent },
  // { path: 'contact',  component: ContactComponent },
  // { path: 'about',    component: AboutComponent },
  // { path: '**',       component: NotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
