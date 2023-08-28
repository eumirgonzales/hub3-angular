import rg4js from 'raygun4js';
import { ErrorHandler } from '@angular/core';

rg4js('apiKey', 'xwFBhlzpBt0CgGDs7nVwvQ');
rg4js('enableCrashReporting', true);
rg4js('enablePulse', true);
rg4js('setUser', {
  identifier: 'hello@raygun.com', // A unique ID, email address, or another ID such as a UUID
  isAnonymous: false, // Indicates whether the user is anonymous or not
  email: 'hello@raygun.com', // Optional 
  firstName: 'Ronald', // Optional
  fullName: 'Ronald Raygun', // Optional
});

// Create a new ErrorHandler and report an issue straight to Raygun
export class RaygunErrorHandler implements ErrorHandler {
  handleError(e: any) {
    rg4js('send', {
      error: e,
    });
  }
}