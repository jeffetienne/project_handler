import { DomaineService } from './domaine.service';
import { FormTypeService } from './form-type.service';
import { FormulaireService } from './formulaire.service';
import { RouterModule } from '@angular/router';
import { ProjectService } from './project.service';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { DataTableModule } from 'angular5-data-table';
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
import { MatCheckboxModule } from '@angular/material';
import { MatRadioModule } from '@angular/material';
import { MatInputModule } from '@angular/material';
import { MatFormFieldModule } from '@angular/material/form-field';
import { ReponseComponent } from './reponse/reponse.component';
import { ReponseFormComponent } from './reponse-form/reponse-form.component';
import { ReponseListComponent } from './reponse-list/reponse-list.component';

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
  ],
  imports: [
    MatCheckboxModule,
    MatRadioModule,
    MatFormFieldModule,
    MatInputModule,
    BrowserAnimationsModule,
    CollapseModule.forRoot(),
    NgbModule,
    FormsModule,
    CustomFormsModule,
    BrowserModule,
    DataTableModule,
    HttpModule,
    AppRoutingModule,
    RouterModule.forRoot([
      { 
        path: '', 
        component: ProjectListComponent 
      },
      { 
        path: 'new-project', 
        component: ProjectFormComponent 
      },
      { 
        path: 'edit-project/:id', 
        component: ProjectFormComponent 
      },
      { 
        path: 'formulaires', 
        component: FormulaireListComponent 
      },
      { 
        path: 'new-formulaire', 
        component: FormulaireComponent 
      },
      { 
        path: 'edit-formulaire/:id', 
        component: FormulaireComponent 
      },
      { 
        path: 'fill-formulaire/:id', 
        component: ReponseFormComponent 
      },
      { 
        path: 'formulaire-entries/:id', 
        component: ReponseListComponent 
      },
      { 
        path: 'view-formulaire/:id', 
        component: QuestionsFormComponent 
      } 
    ]),
    CollapseModule.forRoot(),
    BrowserAnimationsModule
  ],
  providers: [
    ProjectService,
    FormulaireService,
    FormTypeService,
    DomaineService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
