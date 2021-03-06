import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {
    HttpClientModule,
    HttpClientXsrfModule,
    HTTP_INTERCEPTORS
} from '@angular/common/http';
import { RouterModule, Routes } from '@angular/router';

import { AgmCoreModule } from '@agm/core';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { NavbarComponent } from './navbar/navbar.component';
import { TileColumnComponent } from './tile-column/tile-column.component';
import { LoginComponent } from './login/login.component';
import { AuthenticationService } from './services/authentication.service';
import { AuthGuard } from './services/auth-guard.service';
import { GeoPageComponent } from './geo-page/geo-page.component';
import { DualInputComponent } from './dual-input/dual-input.component';
import { SingleInputComponent } from './single-input/single-input.component';
import { EndpointService } from './services/endpoint.service';
import { SectionTileComponent } from './section-tile/section-tile.component';
import { RateLimitDisplayComponent } from './rate-limit-display/rate-limit-display.component';
import { CanvasComponent } from './canvas/canvas.component';

import { HashToHashPageComponent } from './hash-to-hash-page/hash-to-hash-page.component';
import { UserToUserPageComponent } from './user-to-user-page/user-to-user-page.component';
import { WordCloudPageComponent } from './word-cloud-page/word-cloud-page.component';
import { HttpXsrfInterceptorService } from './services/http-xsrfinterceptor.service';
import { RegisterComponent } from './register/register.component';
import { ExternalLoginComponent } from './external-login/external-login.component';
import { AccountComponent } from './account/account.component';
import { CloudBottleComponent } from './cloud-bottle/cloud-bottle.component';
import { CloudDataService } from './services/cloud-data.service';
import { GraphDataService } from './services/graph-data.service';
import { GraphVisualizerComponent } from './graph-visualizer/graph-visualizer.component';
import { HashVisualizerComponent } from './hash-visualizer/hash-visualizer.component';
import { InputCacheService } from './services/input-cache.service';
import { AlertComponent } from './alert/alert.component';
import { AlertService } from './services/alert.service';
import { LoaderComponent } from './loader/loader.component';
import { LoaderService } from './services/loader.service';
import { GraphCardComponent } from './graph-card/graph-card.component';
const appRoutes: Routes = [
    { path: '', component: LoginComponent, pathMatch: 'full' },
    {
        path: 'login',
        component: LoginComponent,
        pathMatch: 'full',
        canActivate: [AuthGuard]
    },
    {
        path: 'externallogin',
        component: ExternalLoginComponent,
        pathMatch: 'full',
        canActivate: [AuthGuard]
    },
    {
        path: 'register',
        component: RegisterComponent,
        pathMatch: 'full',
        canActivate: [AuthGuard]
    },
    {
        path: 'account',
        component: AccountComponent,
        pathMatch: 'full',
        canActivate: [AuthGuard]
    },
    { path: 'home', component: HomeComponent, canActivate: [AuthGuard] },
    {
        path: 'hash-to-hash',
        component: HashToHashPageComponent,
        canActivate: [AuthGuard]
    },
    { path: 'geo', component: GeoPageComponent, canActivate: [AuthGuard] },
    {
        path: 'user-to-user',
        component: UserToUserPageComponent,
        canActivate: [AuthGuard]
    },
    {
        path: 'word-cloud',
        component: WordCloudPageComponent,
        canActivate: [AuthGuard]
    }
];
@NgModule({
    declarations: [
        AppComponent,
        HomeComponent,
        NavbarComponent,
        TileColumnComponent,
        LoginComponent,
        GeoPageComponent,
        DualInputComponent,
        SingleInputComponent,
        SectionTileComponent,
        RateLimitDisplayComponent,
        CanvasComponent,
        HashToHashPageComponent,
        UserToUserPageComponent,
        WordCloudPageComponent,
        RegisterComponent,
        ExternalLoginComponent,
        AccountComponent,
        CloudBottleComponent,
        GraphVisualizerComponent,
        HashVisualizerComponent,
        AlertComponent,
        LoaderComponent,
        GraphCardComponent
    ],
    imports: [
        BrowserModule.withServerTransition({ appId: 'ng-cli-universal' }),
        HttpClientModule,
        HttpClientXsrfModule.withOptions({
            cookieName: 'XSRF-TOKEN',
            headerName: 'X-XSRF-TOKEN'
        }),
        FormsModule,
        ReactiveFormsModule,
        AgmCoreModule.forRoot({
            apiKey: 'AIzaSyAhpnBNbe8Ydy584Fvf0VXf-lucco-gLAk'
        }),
        RouterModule.forRoot(appRoutes) // , { enableTracing: true })
    ],
    providers: [
        AuthenticationService,
        AuthGuard,
        EndpointService,
        {
            provide: HTTP_INTERCEPTORS,
            useClass: HttpXsrfInterceptorService,
            multi: true
        },
        CloudDataService,
        GraphDataService,
        InputCacheService,
        AlertService,
        LoaderService
    ],
    bootstrap: [AppComponent]
})
export class AppModule {}
