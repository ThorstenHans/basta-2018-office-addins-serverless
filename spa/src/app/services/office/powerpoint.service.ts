import {NgZone} from '@angular/core';
import {OfficeService} from './office.service';
import {Observable} from 'rxjs/Observable';

export class PowerPointService extends OfficeService {

    constructor(zone: NgZone) {
        super(zone);
    }

    public getTaskTitle(): Observable<string> {
        return this.getSelection();
    }

    public setTaskTitle(title: string): Observable<boolean> {
        return this.setSelection(title);
    }
}
