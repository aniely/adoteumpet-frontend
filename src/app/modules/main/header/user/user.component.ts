import {Component, OnInit} from '@angular/core';
import {AppService} from '@services/app.service';
import {DateTime} from 'luxon';

@Component({
    selector: 'app-user',
    templateUrl: './user.component.html',
    styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {
    public usuarioLogado;

    constructor(private appService: AppService) {}

    ngOnInit(): void {
       this.usuarioLogado = localStorage.getItem('token') ? true : false;
          
    }

    logout() {
        this.appService.logout();
        this.usuarioLogado = localStorage.getItem('token') ? true : false;
    }

    formatDate(date) {
        return DateTime.fromISO(date).toFormat('dd LLL yyyy');
    }
}
