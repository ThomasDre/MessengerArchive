import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule, Routes} from '@angular/router';

import { OverviewComponent } from '../components/overview/overview.component';
import { SettingsComponent } from '../components/settings/settings.component';
import { AboutComponent } from '../components/about/about.component';
import { HelpComponent } from '../components/help/help.component';

const appRoutes: Routes = [
  {path: 'about', component: AboutComponent},
  {path: 'settings', component: SettingsComponent},
  {path: 'help', component: HelpComponent},
  {path: 'overview', component: OverviewComponent},
  { path: '', redirectTo: '/overview', pathMatch: 'full'}
];

@NgModule({
  imports: [
    RouterModule.forRoot(
      appRoutes
    ),
    CommonModule
  ],
  declarations: [],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule { }
