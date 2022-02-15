import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ContactComponent } from './contact/contact.component';
import { ItemdetailComponent } from './itemdetail/itemdetail.component';
import { ListComponent } from './list/list.component';
import { LoginComponent } from './login/login.component';
import { MycartComponent } from './mycart/mycart.component';
import { AuthGuardService } from './_service/auth-guard.service';

const routes: Routes = [
  {path:'',component:LoginComponent},
  {path:'login',component:LoginComponent},
  {path:"items",
  component:ListComponent,
  canActivate:[AuthGuardService],
},
{path:'contact',component:ContactComponent,canActivate:[AuthGuardService],},
{path:'itemdetail',component:ItemdetailComponent,canActivate:[AuthGuardService],},
{path:'cart',component:MycartComponent,canActivate:[AuthGuardService],},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
