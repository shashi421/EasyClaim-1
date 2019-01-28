import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { ForgetPasswordPage } from '../pages/forget-password/forget-password';
import { LoginPage } from '../pages/login/login';
import { SignupPage } from '../pages/signup/signup';
import { DashboardPage } from '../pages/dashboard/dashboard';
import { PolicyProvider } from '../providers/providers-policy/providers-policy';
import { CreateClaimPage } from '../pages/create-claim/create-claim';
import { MyClaimPage } from '../pages/my-claim/my-claim';
import { ClaimProvider } from '../providers/claim/claim';
import { ChatProvider } from '../providers/chat/chat';
import { ChatPage } from '../pages/chat/chat';
import { MyPolicyPage } from '../pages/my-policy/my-policy';
import { AdminHomePage } from '../pages/admin-home/admin-home';
import { PolicyAdminPage } from '../pages/policy-admin/policy-admin';
import { ApproveClaimAdminPage } from '../pages/approve-claim-admin/approve-claim-admin';
import { CreatePolicyAdminPage } from '../pages/create-policy-admin/create-policy-admin';
import { UpdateClaimPage } from '../pages/update-claim/update-claim';

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    ForgetPasswordPage,
    LoginPage,
    SignupPage,
    DashboardPage,
    CreateClaimPage,
    MyClaimPage,
    ChatPage,
    MyPolicyPage,
    AdminHomePage,
    PolicyAdminPage,
    ApproveClaimAdminPage,
    CreatePolicyAdminPage,
    UpdateClaimPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    HttpClientModule,
    FormsModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    ForgetPasswordPage,
    LoginPage,
    SignupPage,
    DashboardPage,
    CreateClaimPage,
    MyClaimPage,
    ChatPage,
    MyPolicyPage,
    AdminHomePage,
    PolicyAdminPage,
    ApproveClaimAdminPage,
    CreatePolicyAdminPage,
    UpdateClaimPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    PolicyProvider,
    ClaimProvider,
    ChatProvider
  ]
})
export class AppModule {}
