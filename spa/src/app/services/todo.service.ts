import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { catchError, map } from 'rxjs/operators';
import { environment } from '../../environments/environment';
import { Todo } from '../models/todo';

@Injectable()
export class TodoService {
    constructor(private readonly _httpClient: HttpClient) {}

    public getAll(): Observable<Array<Todo>> {
        const url = this._getUrl('tasks');
        return this._httpClient.get<Array<Todo>>(url);
    }

    public add(item: Todo): Observable<Todo> {
        const url = this._getUrl('tasks');
        return this._httpClient.post<Todo>(url, item);
    }

    public update(item: Todo): Observable<Todo> {
        const url = this._getUrl(`tasks/${item.id}`);
        return this._httpClient.put<Todo>(url, item);
    }

    public completeAll(): Observable<Array<Todo>> {
        const url = this._getUrl(`tasks/completeall`);
        return this._httpClient.post<Array<Todo>>(url, {});
    }

    public removeAllCompleted(): Observable<Array<Todo>> {
        const url = this._getUrl('tasks');
        return this._httpClient.delete<Array<Todo>>(url, {});
    }

    public delete(item: Todo): Observable<boolean> {
        const url = this._getUrl(`tasks/${item.id}`);
        return this._httpClient.delete(url).pipe(map(response => true), catchError(error => of(false)));
    }

    private _getUrl(path: string): string {
        return `${environment.apiRoot}/${path}`;
    }
}
