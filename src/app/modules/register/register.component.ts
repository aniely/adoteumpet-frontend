import {
    Component,
    OnInit,
    Renderer2,
    OnDestroy,
    HostBinding
} from '@angular/core';
import {FormGroup, FormControl, Validators} from '@angular/forms';
import {AppService} from '@services/app.service';
import {ToastrService} from 'ngx-toastr';

@Component({
    selector: 'app-register',
    templateUrl: './register.component.html',
    styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit, OnDestroy {
    @HostBinding('class') class = 'register-box';

    public registerForm: FormGroup;
    public isAuthLoading = false;
    public isGoogleLoading = false;
    public isFacebookLoading = false;

    constructor(
        private renderer: Renderer2,
        private toastr: ToastrService,
        private appService: AppService
    ) {}

    ngOnInit() {
        this.renderer.addClass(
            document.querySelector('app-root'),
            'register-page'
        );
        this.registerForm = new FormGroup({
            nome: new FormControl(null, Validators.required),
            email: new FormControl(null, Validators.required),
            password: new FormControl(null, [Validators.required]),
            retypePassword: new FormControl(null, [Validators.required])
        });
    }

     registerByAuth() {      
         if (this.registerForm.valid) {
             let senha = this.registerForm.get('password').value;
             let senha2 = this.registerForm.get('retypePassword').value;
             if (senha != senha2) {
                 this.toastr.error('As senhas são diferentes!');
             } else {
                 this.isAuthLoading = true;
                 this.appService.registerByAuth(this.registerForm.value);
                 this.isAuthLoading = false;
             }
         } else {
             this.toastr.error('Verifique os dados digitados!');
         }
     }

   

    ngOnDestroy() {
        this.renderer.removeClass(
            document.querySelector('app-root'),
            'register-page'
        );
    }
}
