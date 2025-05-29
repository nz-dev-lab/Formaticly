import { Routes } from '@angular/router';
import { SubmitFormsComponent } from './submit-forms/submit-forms.component';
import { ViewSubmissionsComponent } from './view-submissions/view-submissions.component';

export const routes: Routes = [
    { path: 'submit-form', component: SubmitFormsComponent },
    { path: 'view-submissions', component: ViewSubmissionsComponent }
];
