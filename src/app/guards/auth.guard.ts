import {Injectable} from '@angular/core';
import {
    CanActivate,
    ActivatedRouteSnapshot,
    RouterStateSnapshot,
    UrlTree,
    Router
} from '@angular/router';
import {Observable} from 'rxjs';
import {AppService} from '@services/app.service';

@Injectable({
    providedIn: 'root'
})
export class AuthGuard implements CanActivate {
    constructor(private router: Router, private appService: AppService) {}

    // canActivate(
    //     next: ActivatedRouteSnapshot,
    //     state: RouterStateSnapshot
    // ):
    //     | Observable<boolean | UrlTree>
    //     | Promise<boolean | UrlTree>
    //     | boolean
    //     | UrlTree {
    //     return null;
    // }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        if (localStorage.getItem('token')) {
            // logged in so return true
            return true;
        }

        // not logged in so redirect to login page with the return url
        this.router.navigate(['/login'], { queryParams: { returnUrl: state.url }});
        return false;
    }

    // canActivateChild(
    //     next: ActivatedRouteSnapshot,
    //     state: RouterStateSnapshot
    // ):
    //     | Observable<boolean | UrlTree>
    //     | Promise<boolean | UrlTree>
    //     | boolean
    //     | UrlTree {
    //     return this.canActivate(next, state);
    // }

 /*   async getProfile() {
        if (this.appService.user) {
            return true;
        }

        try {
            await this.appService.getProfile();
            return true;
        } catch (error) {
            return false;
        }
    } */
}
