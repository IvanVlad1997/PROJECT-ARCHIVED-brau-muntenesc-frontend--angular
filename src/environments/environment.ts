// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  firebaseConfig: {
    apiKey: "AIzaSyCEI4gm8ayRLooJtFoNPes3I8Qc21KDF7U",
    authDomain: "angular-1f468.firebaseapp.com",
    projectId: "angular-1f468",
    storageBucket: "angular-1f468.appspot.com",
    messagingSenderId: "462777700678",
    appId: "1:462777700678:web:611a87b80a0af21b399547",
    measurementId: "G-Y2HW8NEX49"
  },
  passwordRedirectUrl: 'http://localhost:4200/auth/login',
  appApi: 'http://localhost:8000/api',
  // appApi: 'https://evening-dawn-58977.herokuapp.com/api',
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
