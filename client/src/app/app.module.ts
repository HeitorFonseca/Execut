import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms'
import { NgbModule, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JwtModule } from '@auth0/angular-jwt';

/* Components */
import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { HomeComponent } from './components/home/home.component';
import { NavbarComponent } from './components/navbar/navbar.component';

import { RegisterProjectComponent } from './components/home/register-project/register-project.component';
import { ProjectComponent } from './components/home/project/project.component';


/* Services */
import { AuthService } from './services/auth.service';

import { SharedProject } from './providers/sharedProject';
import { RegisterEmployeeComponent } from './components/home/register-employee/register-employee.component';
import { RegisterMaterialComponent } from './components/home/register-material/register-material.component';
import { RegisterServiceComponent } from './components/home/register-service/register-service.component';
import { RegisterEquipmentComponent } from './components/home/register-equipment/register-equipment.component';
import { TaskComponent } from './components/home/task/task.component';


export function tokenGetter() {
  return localStorage.getItem('access_token');
}


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomeComponent,
    NavbarComponent,
    RegisterProjectComponent,
    ProjectComponent,
    RegisterEmployeeComponent,
    RegisterMaterialComponent,
    RegisterServiceComponent,
    RegisterEquipmentComponent,
    TaskComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
    JwtModule.forRoot({
      config: {
        tokenGetter: tokenGetter,
        whitelistedDomains: ['localhost:3001'],
        blacklistedRoutes: ['localhost:3001/auth/']
      }
    }),
    RouterModule.forRoot([
      { 
        path: "login",
        component: LoginComponent
      },
      {
        path: "registerProject",
        component: RegisterProjectComponent
      },   
      {
        path: "project/:id",
        component: ProjectComponent
      },    
      {
        path: "home",
        component: HomeComponent
      },
      {
        path: "",
         redirectTo: '/home', 
         pathMatch: 'full' ,
      }
    ]),
    NgbModule.forRoot(),

  ],
  providers: [
    AuthService,
    NgbActiveModal,
    SharedProject
    //NgbActiveModal
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
