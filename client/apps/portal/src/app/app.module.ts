import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { UsersComponent } from './users/users.component';
import { UsersListComponent } from './users/users-list/users-list.component';
import { UsersDetailComponent } from './users/users-detail/users-detail.component';
import { MaterialModule } from '@client/material';
import { CoreDataModule } from '@client/core-data';
import { UiToolbarModule } from '@client/ui-toolbar';
import { RoutingModule } from './routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
    UsersComponent,
    UsersListComponent,
    UsersDetailComponent
  ],
  imports: [
    BrowserModule,
    MaterialModule,
    CoreDataModule,
    UiToolbarModule,
    RoutingModule,
    FormsModule,
    ReactiveFormsModule

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
