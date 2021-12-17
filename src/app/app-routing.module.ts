import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddCategoryComponent } from './pages/admin/add-category/add-category.component';
import { AddQuestionComponent } from './pages/admin/add-question/add-question.component';
import { AddQuizComponent } from './pages/admin/add-quiz/add-quiz.component';
import { AdminDashboardComponent } from './pages/admin/admin-dashboard/admin-dashboard.component';
import { AdminHomeComponent } from './pages/admin/admin-home/admin-home.component';
import { UpdateQuizComponent } from './pages/admin/update-quiz/update-quiz.component';
import { ViewCategoriesComponent } from './pages/admin/view-categories/view-categories.component';
import { ViewQuizQuestionsComponent } from './pages/admin/view-quiz-questions/view-quiz-questions.component';
import { ViewQuizzesComponent } from './pages/admin/view-quizzes/view-quizzes.component';
import { HomeComponent } from './pages/home/home.component';
import { LoginComponent } from './pages/login/login.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { SignupComponent } from './pages/signup/signup.component';
import { LoadQuizComponent } from './pages/user/load-quiz/load-quiz.component';
import { PrequizComponent } from './pages/user/prequiz/prequiz.component';
import { StartComponent } from './pages/user/start/start.component';
import { UserDashboardComponent } from './pages/user/user-dashboard/user-dashboard.component';
import { UserHomeComponent } from './pages/user/user-home/user-home.component';
import { AdminGuard } from './services/admin.guard';
import { NormalGuard } from './services/normal.guard';

const routes: Routes = [
  { 
    path: '',
    component: HomeComponent, 
    pathMatch: 'full'
  },
  { 
    path: 'signup', 
    component: SignupComponent, 
    pathMatch: 'full'
  },
  { 
    path: 'login', 
    component: LoginComponent, 
    pathMatch: 'full' 
  },
  { 
    path: 'admin', 
    component: AdminDashboardComponent, 
    canActivate: [AdminGuard],
    children:[
       {
         path:'home',
         component: AdminHomeComponent
       },
       { 
         path:'profile', 
         component: ProfileComponent
       },
       {
         path: 'categories',
         component: ViewCategoriesComponent
       },
       {
         path:'add-category',
         component: AddCategoryComponent
       },
       {
         path: 'quizzes',
         component: ViewQuizzesComponent
       },
       {
         path:'add-quiz',
         component: AddQuizComponent
       },
       {
         path:'update-quiz/:qid',
         component: UpdateQuizComponent
       },
       {
         path:'view-questions/:qid/:title',
         component: ViewQuizQuestionsComponent
       },
       {
         path: 'add-question/:qid/:title',
         component: AddQuestionComponent
       }
    ]
  },
  { 
    path: 'user-dashboard', 
    component: UserDashboardComponent, 
    canActivate:[NormalGuard],
    children:[
      {
        path:'user-home',
        component: UserHomeComponent
      },
      {
        path: 'quiz/:catId',
        component: LoadQuizComponent
      },
      {
        path: 'prequiz/:qid',
        component: PrequizComponent
      },
      { 
        path:'profile', 
        component: ProfileComponent
      },
    ]
  },
  {
    path: 'start/:qid',
    component: StartComponent,
    canActivate: [NormalGuard]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
