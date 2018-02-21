import { NgZone } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import AsyncResultStatus = Office.AsyncResultStatus;
import CoercionType = Office.CoercionType;

export abstract class OfficeService {
    constructor(protected readonly zone: NgZone) {}

    public abstract getTaskTitle(): Observable<string>;

    public abstract setTaskTitle(title: string): Observable<boolean>;

    public getOfficeContextInformation(): any {
        return {
            app: Office.context.host,
            platform: Office.context.platform,
            officeLanguage: Office.context.displayLanguage,
            theme: Office.context.officeTheme,
        };
    }
    protected getSelection(): Observable<string> {
        return Observable.create(observer => {
            this.zone.runOutsideAngular(() => {
                Office.context.document.getSelectedDataAsync(Office.CoercionType.Text, {}, (result: Office.AsyncResult) => {
                    this.zone.run(() => {
                        if (result.status === AsyncResultStatus.Failed) {
                            observer.error(result.error);
                        } else {
                            observer.next(result.value);
                        }
                        observer.complete();
                    });
                });
            });
        });
    }

    protected setSelection(text: string): Observable<boolean> {
        return Observable.create(observer => {
            this.zone.runOutsideAngular(() => {
                Office.context.document.setSelectedDataAsync(
                    text,
                    {
                        coercionType: CoercionType.Text,
                    },
                    (result: Office.AsyncResult) => {
                        this.zone.run(() => {
                            observer.next(result.status === AsyncResultStatus.Succeeded);
                            observer.complete();
                        });
                    }
                );
            });
        });
    }
}
