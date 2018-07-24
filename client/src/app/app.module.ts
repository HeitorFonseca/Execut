import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms'
import { NgbModule, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JwtModule } from '@auth0/angular-jwt';
import { NgxPermissionsModule, NgxPermissionsService, NgxRolesService } from 'ngx-permissions';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

/* Components */
import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { HomeComponent } from './components/home/home.component';
import { NavbarComponent } from './components/navbar/navbar.component';

import { RegisterProjectComponent } from './components/home/register/register-project/register-project.component';
import { ProjectComponent } from './components/home/project/project.component';


/* Services */
import { AuthService } from './services/auth.service';

import { SharedProject } from './providers/sharedProject';
import { RegisterEmployeeComponent } from './components/home/register/register-employee/register-employee.component';
import { RegisterMaterialComponent } from './components/home/register/register-material/register-material.component';
import { RegisterServiceComponent } from './components/home/register/register-service/register-service.component';
import { RegisterEquipmentComponent } from './components/home/register/register-equipment/register-equipment.component';
import { TaskComponent } from './components/home/task/task.component';
import { ForgeViewerComponent } from './components/forge-viewer/forge-viewer.component';

import { TokenInterceptor } from './services/token-interceptor';
import { ProfileComponent } from './components/home/profile/profile.component'
import { Profile } from 'selenium-webdriver/firefox';


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
    TaskComponent,
    ForgeViewerComponent,
    ProfileComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,    
    BrowserAnimationsModule,
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
        path: "profile",
        component: ProfileComponent
      }, 
      {
        path: "home",
        component: HomeComponent
      },
      {
        path: "view",
        component: ForgeViewerComponent
      },
      {
        path: "",
         redirectTo: '/home', 
         pathMatch: 'full' ,
      }
    ]),
    NgbModule.forRoot(),
    NgxPermissionsModule.forRoot(),
  ],
  providers: [
    AuthService,
    NgbActiveModal,
    SharedProject,
    {
      provide: HTTP_INTERCEPTORS, 
      useClass: TokenInterceptor, 
      multi: true 
    },
    
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
