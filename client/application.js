
Deps.autorun(function(){

  Meteor.subscribe('users');
  Meteor.subscribe('locations');
  Meteor.subscribe('groups');
  Meteor.subscribe('userPresence');

});



// R O U T I N G
//
// https://github.com/EventedMind/iron-router
// https://github.com/XpressiveCode/iron-router-auth

// filters: https://github.com/alanning/meteor-roles/blob/master/examples/iron-router/client/routing.js
//
//Router.configure({
//  layoutTemplate: 'layout',
//  loadingTemplate: 'loading',
//  notFoundTemplate: 'notFound'
//});
//
//
//Router.map(function () {
//
//  this.route('index', {
//    path: '/',
//    template: 'index',
//    loginRequired: 'login'
//  });
//
//  this.route('login', {
//    path: '/login',
//    template: 'authRequired',
//    redirectOnLogin: true
//  });
//
//  this.route('minimal', {
//    path: '/mini',
//    template: 'minimal',
//    loginRequired: 'login'
//  });
//
//  /*this.route('test', {
//    path: '/tests/:_id',
//
//    load: function () {
//      // called on first load
//    },
//
//    // before hooks are run before your action
//    before: [
//      function () {
//        this.subscribe('test', this.params._id).wait();
//        this.subscribe('tests'); // don't wait
//      },
//
//      function () {
//        // we're done waiting on all subs
//        if (this.ready()) {
//          NProgress.done();
//        } else {
//          NProgress.start();
//          this.stop(); // stop downstream funcs from running
//        }
//      }
//    ],
//
//    action: function () {
//      var params = this.params; // including query params
//      var hash = this.hash;
//      var isFirstRun = this.isFirstRun;
//
//      this.render(); // render all
//      this.render('specificTemplate', {to: 'namedYield'});
//    },
//
//    unload: function () {
//      // before a new route is run
//    }
//  });*/
//});