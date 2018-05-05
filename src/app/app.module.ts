import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';


import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { FormComponent } from './form/form.component';
import { ListComponent } from './list/list.component';
import { ListItemComponent } from './list-item/list-item.component';
import { JsonplaceholderService } from './services/jsonplaceholder.service';


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    FormComponent,
    ListComponent,
    ListItemComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [JsonplaceholderService],
  bootstrap: [AppComponent]
})
export class AppModule { }
