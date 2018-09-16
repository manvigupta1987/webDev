import EmberRouter from '@ember/routing/router';
import config from './config/environment';

const Router = EmberRouter.extend({
  location: config.locationType,
  rootURL: config.rootURL
});

//added by the ember cli command --> ember g route menu. So, this menu route loads the menu routes file
//present in the routes folder and then loads the menu template file.
Router.map(function() {
  this.route('menu');
  //if you want to have different route for the menu, for example : legos, you define like this.
  //this.route('menu', { path: '/legos' });
  // this will use the url as /legos and template as menu.hbs
});

export default Router;
