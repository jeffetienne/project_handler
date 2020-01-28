import { NotAuthGuardService } from './not-auth-guard.service';
import { SharedFormulaireService } from './shared-formulaire.service';
import { AdminAuthGuardService } from './admin-auth-guard.service';
import { AuthGuardService } from './auth-guard.service';
import { AngularFireAuth } from 'angularfire2/auth';
import { environment } from './../environments/environment';
import { DomaineService } from './domaine.service';
import { FormTypeService } from './form-type.service';
import { FormulaireService } from './formulaire.service';
import { RouterModule } from '@angular/router';
import { ProjectService } from './project.service';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ProjectListComponent } from './project-list/project-list.component';
import { HttpModule } from '@angular/http';
import { ProjectFormComponent } from './project-form/project-form.component';
import { NavbarComponent } from './navbar/navbar.component';
import { FormsModule } from '@angular/forms';
import { CustomFormsModule } from 'ng2-validation';
import { FormulaireListComponent } from './formulaire-list/formulaire-list.component';
import { FormulaireComponent } from './formulaire/formulaire.component';
import { QuestionComponent } from './question/question.component';
import { QuestionsFormComponent } from './questions-form/questions-form.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { CollapseModule } from 'ngx-bootstrap/collapse';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { QuestionOptionsComponent } from './question-options/question-options.component';
import { MatCheckboxModule, MatNativeDateModule, MatIconModule, MatTableModule, MatTable } from '@angular/material';
import { MatRadioModule } from '@angular/material';
import { MatInputModule } from '@angular/material';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDatepickerModule } from '@angular/material';
import { ReponseComponent } from './reponse/reponse.component';
import { ReponseFormComponent } from './reponse-form/reponse-form.component';
import { ReponseListComponent } from './reponse-list/reponse-list.component';
import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { from } from 'rxjs';
import { LoginComponent } from './login/login.component';
import { SignUpComponent } from './sign-up/sign-up.component';
import { ShareFormulaireComponent } from './share-formulaire/share-formulaire.component';

@NgModule({
  declarations: [
    AppComponent,
    ProjectListComponent,
    ProjectFormComponent,
    NavbarComponent,
    FormulaireListComponent,
    FormulaireComponent,
    QuestionComponent,
    QuestionsFormComponent,
    QuestionOptionsComponent,
    ReponseComponent,
    ReponseFormComponent,
    ReponseListComponent,
    LoginComponent,
    SignUpComponent,
    ShareFormulaireComponent,
  ],
  imports: [
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireDatabaseModule,
    MatCheckboxModule,
    MatRadioModule,
    MatFormFieldModule,
    MatInputModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatIconModule,
    MatTableModule,
    BrowserAnimationsModule,
    CollapseModule.forRoot(),
    NgbModule,
    FormsModule,
    CustomFormsModule,
    BrowserModule,
    HttpModule,
    AppRoutingModule,
    RouterModule.forRoot([
      { 
        path: '', 
        component: LoginComponent,
        canActivate: [NotAuthGuardService] 
      },
      { 
        path: 'projet', 
        component: ProjectListComponent, 
        canActivate: [AuthGuardService, AdminAuthGuardService] 
      },
      { 
        path: 'new-project', 
        component: ProjectFormComponent, 
        canActivate: [AuthGuardService, AdminAuthGuardService] 
      },
      { 
        path: 'edit-project/:id', 
        component: ProjectFormComponent, 
        canActivate: [AuthGuardService, AdminAuthGuardService] 
      },
      { 
        path: 'formulaires', 
        component: FormulaireListComponent, 
        canActivate: [AuthGuardService] 
      },
      { 
        path: 'new-formulaire', 
        component: FormulaireComponent, 
        canActivate: [AuthGuardService, AdminAuthGuardService] 
      },
      { 
        path: 'edit-formulaire/:id', 
        component: FormulaireComponent, 
        canActivate: [AuthGuardService, AdminAuthGuardService] 
      },
      { 
        path: 'share-formulaire/:id', 
        component: ShareFormulaireComponent, 
        canActivate: [AuthGuardService, AdminAuthGuardService] 
      },
      { 
        path: 'fill-formulaire/:id', 
        component: ReponseFormComponent, 
        canActivate: [AuthGuardService] 
      },
      { 
        path: 'formulaire-entries/:id', 
        component: ReponseListComponent, 
        canActivate: [AuthGuardService] 
      },
      { 
        path: 'view-formulaire/:id', 
        component: QuestionsFormComponent, 
        canActivate: [AuthGuardService, AdminAuthGuardService] 
      },
      { 
        path: 'signUp', 
        component: SignUpComponent,
        canActivate: [NotAuthGuardService] 
      },
      { 
        path: 'login', 
        component: LoginComponent,
        canActivate: [NotAuthGuardService]
      } 
    ]),
    CollapseModule.forRoot(),
    BrowserAnimationsModule
  ],
  providers: [
    ProjectService,
    FormulaireService,
    FormTypeService,
    DomaineService,
    AngularFireAuth,
    AuthGuardService,
    AdminAuthGuardService,
    SharedFormulaireService,
    NotAuthGuardService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
