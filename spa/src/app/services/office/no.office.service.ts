import {Injectable, NgZone} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {of} from 'rxjs/observable/of';
import {OfficeService} from './office.service';

@Injectable()
export class NoOfficeService extends OfficeService {

    constructor(zone: NgZone) {
        super(zone);
    }

    public getTaskTitle(): Observable<string> {
        return of('');
    }

    public setTaskTitle(title: string): Observable<boolean> {
        return of(false);
    }
}
