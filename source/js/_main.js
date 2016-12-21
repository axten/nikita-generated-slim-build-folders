import app from 'app.js';

console.log('boot');
import modules from './modules/**/*.js';

//simple babel test
var myarray = [1,2,3].map(n => n + 1);