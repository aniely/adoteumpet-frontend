import {Injectable} from '@angular/core';
import {Router} from '@angular/router';
import {ToastrService} from 'ngx-toastr';
import {Gatekeeper} from 'gatekeeper-client-sdk';
import { AuthService } from './auth.service';


@Injectable({
    providedIn: 'root'
})
export class AppService {
    public user: any = null;

    constructor(private router: Router, private toastr: ToastrService, private authService: AuthService) {}

    async loginByAuth({email, password}) {
        try {
            this.authService.login(email, password).subscribe(token => {
                localStorage.setItem('token', token);
                this.router.navigate(['/']);     
            });          
        } catch (error) {
            this.toastr.error(error.message);
        }
    }

    /*async registerByAuth({email, password}) {
        try {
            const token = await Gatekeeper.registerByAuth(email, password);
            localStorage.setItem('token', token);
            await this.getProfile();
            this.router.navigate(['/']);
        } catch (error) {
            this.toastr.error(error.message);
        }
    } */

    
    logout() {
        localStorage.removeItem('token');
        localStorage.removeItem('gatekeeper_token');
        this.user = null;
        this.router.navigate(['/login']);
    }
}
