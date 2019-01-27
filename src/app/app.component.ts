import { Component, ViewChild } from '@angular/core';
import { Nav, Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { HomePage } from '../pages/home/home';
import { ChatPage } from '../pages/chat/chat';
import { CreateClaimPage } from '../pages/create-claim/create-claim';
import { DashboardPage } from '../pages/dashboard/dashboard';
import { ForgetPasswordPage } from '../pages/forget-password/forget-password';
import { LoginPage } from '../pages/login/login';
import { MyClaimPage } from '../pages/my-claim/my-claim';
import { MyPolicyPage } from '../pages/my-policy/my-policy';
import { SignupPage } from '../pages/signup/signup';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  rootPage: any = HomePage;

  pages: Array<{title: string, component: any, icon_name: string}>;


  constructor(public platform: Platform, public statusBar: StatusBar, public splashScreen: SplashScreen) {
    this.initializeApp();

    // used for an example of ngFor and navigation
    this.pages = [
      { title: 'New Policies', component: DashboardPage, icon_name:'person-add' },
      { title: 'My Policy', component: MyPolicyPage, icon_name:'umbrella' },
      { title: 'My Claim', component: MyClaimPage, icon_name:'medkit' },
      { title: 'Help Desk', component: ChatPage, icon_name:'chatboxes' },
      { title: 'Logout', component: HomePage, icon_name:'exit' }
    ];
  }

  initializeApp() {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }

  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    this.nav.setRoot(page.component);
  }
}
