import { BrowserModule } from '@angular/platform-browser';
import { NgModule, NO_ERRORS_SCHEMA, APP_INITIALIZER } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppComponent } from './app.component';
import { IndexModule } from './index/index.module';
import { SharedModule } from './shared/shared.module';
import { RouterModule } from '@angular/router';
import { AppRoutes } from './app.routing';
import { TranslateService } from './shared/services/translate.service';
import { ProductModule } from './layouts/product/product.module';
import { UserModule } from './layouts/user/user.module';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment  } from '../environments/environment';
import { FireBaseConfig}from '../environments/firebaseConfig'
import { ContactComponent } from './contact/contact.component';
import { CheckoutComponent } from './checkout/checkout.component';
import { FooterComponent } from './index/footer/footer.component';
import { ChatComponent } from './chat/chat.component';
import { AngularFireFunctionsModule } from '@angular/fire/functions';
import { AngularFireModule } from "angularfire2";
import {LayoutModule} from '@angular/cdk/layout';
/* to load and set en.json as the default application language */
export function setupTranslateFactory(service: TranslateService): Function {
	return () => service.use('en');
}

@NgModule({
	declarations: [ AppComponent, ContactComponent, CheckoutComponent, FooterComponent, ChatComponent],
	imports: [
		BrowserModule,
		BrowserAnimationsModule,
		LayoutModule,
		IndexModule,
		ProductModule,
		UserModule,
		SharedModule,
		AngularFireFunctionsModule ,
		AngularFireModule.initializeApp(FireBaseConfig),
		RouterModule.forRoot(AppRoutes),
		ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production })
	],
	providers: [
		TranslateService,
		{
			provide: APP_INITIALIZER,
			useFactory: setupTranslateFactory,
			deps: [ TranslateService ],
			multi: true
		}
	],
	bootstrap: [ AppComponent ],
	schemas: [ NO_ERRORS_SCHEMA ]
})
export class AppModule {}
