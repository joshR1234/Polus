import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CreateSurveyComponent } from './create-survey/create-survey.component';
import { CreateUserComponent } from './create-user/create-user.component';
import { UpdateUserComponent } from './update-user/update-user.component';
import { UserDetailsComponent } from './user-details/user-details.component';
import { UserListComponent } from './user-list/user-list.component';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { ProfileComponent } from './profile/profile.component';
import { BoardUserComponent } from './board-user/board-user.component';
import { BoardModeratorComponent } from './board-moderator/board-moderator.component';
import { BoardAdminComponent } from './board-admin/board-admin.component';
import { TakeSurveyComponent } from './take-survey/take-survey.component';
import { SurveyEndComponent } from './survey-end/survey-end.component';
import { SurveyDetailsComponent } from './survey-details/survey-details.component';

const routes: Routes = [
  {path: 'users', component: UserListComponent},
  {path: 'create-user', component: CreateUserComponent},
  {path: 'update-user/:id', component: UpdateUserComponent},
  {path: 'user-details/:id', component: UserDetailsComponent},
  {path: 'take-survey/:id', component: TakeSurveyComponent},
  {path: 'create-survey', component: CreateSurveyComponent},
  //{path: '', redirectTo: 'users', pathMatch: 'full'}
  { path: 'home', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'profile', component: ProfileComponent },
  { path: 'survey-list', component: BoardUserComponent },
  { path: 'survey-end/:id/:score', component: SurveyEndComponent },
  { path: 'mod', component: BoardModeratorComponent },
  { path: 'admin', component: BoardAdminComponent },
  { path: 'survey-details/:id', component: SurveyDetailsComponent },
  { path: '', redirectTo: 'home', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
