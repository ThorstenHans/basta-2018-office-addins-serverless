import {NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {BrowserModule} from '@angular/platform-browser';


import {AppComponent} from './app.component';
import {ALL_SERVICES} from './services/index';
import {HttpClientModule} from '@angular/common/http';


@NgModule({
    declarations: [
        AppComponent,
    ],
    imports: [
        BrowserModule,
        FormsModule,
        HttpClientModule
    ],
    providers: [ALL_SERVICES],
    bootstrap: [AppComponent]
})
export class AppModule {
}
