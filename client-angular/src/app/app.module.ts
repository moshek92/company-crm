import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { AuthModule } from './auth/auth.module';
import { CoreModule } from './core/core.module';
import { CustomersModule } from './customers/customers.module';
import { HomeModule } from './home/home.module';

import { SharedModule } from './shared/shared.module';

@NgModule({
    declarations: [
        AppComponent,
    ],
    imports: [
        BrowserModule,
        FormsModule,
        SharedModule,
        AppRoutingModule,
        AuthModule,
        CoreModule,
        CustomersModule,
        HomeModule,
       
    ],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule { }
