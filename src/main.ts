import { ErrorHandler, enableProdMode, importProvidersFrom, isDevMode } from '@angular/core';
import { bootstrapApplication } from '@angular/platform-browser';
import { RouteReuseStrategy, provideRouter } from '@angular/router';
import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { routes } from './app/app.routes';
import { AppComponent } from './app/app.component';
import { environment } from './environments/environment';
import { provideServiceWorker } from '@angular/service-worker';
import { provideFirebaseApp, initializeApp, FirebaseAppModule } from '@angular/fire/app';
import { provideAuth, getAuth } from '@angular/fire/auth';
import { RaygunErrorHandler } from './app/services/app.raygun.setup';
// import { defineCustomElements } from '@ionic/pwa-elements/loader';

if (environment.production) {
  enableProdMode();
}

bootstrapApplication(AppComponent, {
  providers: [
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    importProvidersFrom(IonicModule.forRoot({})),
    provideRouter(routes),
    provideServiceWorker('ngsw-worker.js', {
        enabled: !isDevMode(),
        registrationStrategy: 'registerWhenStable:30000',
        // ...importProvidersFrom(provideFirebaseApp(() => initializeApp(firebaseConfig))),
        // ...importProvidersFrom(provideAuth(() => getAuth())),
        // provideFirebaseApp(() => initializeApp()), 


        
    }),
    
    importProvidersFrom(provideFirebaseApp(() => initializeApp(firebaseConfig))),
    importProvidersFrom(provideAuth(() => getAuth())),
    {
      provide: ErrorHandler,
      useClass: RaygunErrorHandler
    }
],
});



// // Import the functions you need from the SDKs you need
// import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
// // TODO: Add SDKs for Firebase products that you want to use
// // https://firebase.google.com/docs/web/setup#available-libraries

// // Your web app's Firebase configuration
// // For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDh6UZs4aWx_YJTv2VurCHafeLWcxqD09I",
  authDomain: "hub3-angular.firebaseapp.com",
  projectId: "hub3-angular",
  storageBucket: "hub3-angular.appspot.com",
  messagingSenderId: "122269265485",
  appId: "1:122269265485:web:41deaea86f967fbc4cb604",
  measurementId: "G-TVW98MVP6L"
};

// // Initialize Firebase
// const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);

// defineCustomElements(window);
