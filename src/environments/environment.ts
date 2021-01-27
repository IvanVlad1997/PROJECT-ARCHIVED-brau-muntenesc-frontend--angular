// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  firebaseConfig: {
    apiKey: "AIzaSyAlGbNZ2JL5yhL4P-ctyS5LSpaPdyBcTik",
    authDomain: "brau-muntenesc.firebaseapp.com",
    databaseURL: "https://brau-muntenesc.firebaseio.com",
    projectId: "brau-muntenesc",
    storageBucket: "brau-muntenesc.appspot.com",
    messagingSenderId: "414757078348",
    appId: "1:414757078348:web:cfb8ceec8f9de9eec2bbe9",
    measurementId: "G-CYWFDKTZ0J"
  },
  passwordRedirectUrl: 'http://localhost:4200/auth/login',
  appApi: 'http://localhost:8000/api',
  // appApi: 'https://calm-anchorage-09606.herokuapp.com/api',
  stripeKey: 'pk_test_51I8hg4IMtClZ7xMeg5PrlOxJEkdkFZJq6QfyxwfSNEb0UjihKYNNQ7vGB9om0T2N5tsS0sxWcy3zDptQfO6jlCO4000lmF02lp',
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
