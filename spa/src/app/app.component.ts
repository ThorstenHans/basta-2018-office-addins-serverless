import { Component, OnDestroy, OnInit } from '@angular/core';
import { filter } from 'rxjs/operators';
import { Subscription } from 'rxjs/Subscription';
import { Todo } from './models/todo';
import { OfficeService } from './services/office/office.service';
import { PlatformService } from './services/office/platform.service';
import { TodoService } from './services/todo.service';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
})
export class AppComponent implements OnInit, OnDestroy {
    public todoItems: Array<Todo> = [];

    private _subscription = Subscription.EMPTY;
    public newTodoText = '';
    public officeContextInformation: any = {};

    constructor(
        private readonly _todoService: TodoService,
        private readonly _officeService: OfficeService,
        private readonly _platformService: PlatformService
    ) {}

    public get isInOffice(): boolean {
        return this._platformService.isInOffice();
    }

    public getTaskTitleFromOffice(): void {
        this._officeService.getTaskTitle().subscribe(title => (this.newTodoText = title));
    }

    public writeTitleToOffice(): void {
        const current = this.todoItems.find(t => t.editing);
        if (current) {
            this._officeService.setTaskTitle(current.title).subscribe(() => void 0);
        }
    }

    public getOfficeContextInformation(): void {
        this.officeContextInformation = this._officeService.getOfficeContextInformation();
    }

    public get openTodoCount(): number {
        return this.todoItems.filter(item => !item.completed).length;
    }

    public ngOnInit(): void {
        this._subscription = this._todoService.getAll().subscribe(t => (this.todoItems = t));
    }

    public ngOnDestroy(): void {
        this._subscription.unsubscribe();
    }

    public get completedTodoCount(): number {
        return this.todoItems.length - this.openTodoCount;
    }

    public toggle(item: Todo): void {
        item.completed = !item.completed;
        this._todoService.update(item).subscribe(updatedItem => (item = updatedItem));
    }

    public completeAll() {
        this._todoService.completeAll().subscribe(items => (this.todoItems = items));
    }

    public add() {
        if (this.newTodoText.trim().length) {
            this._todoService.add(new Todo(this.newTodoText)).subscribe(item => {
                this.todoItems.push(item);
                this.newTodoText = '';
            });
        }
    }

    public removeCompleted() {
        this._todoService.removeAllCompleted().subscribe(items => (this.todoItems = items));
    }

    public stopEditing(todo: Todo, editedTitle: string) {
        todo.title = editedTitle;
        this._todoService.update(todo).subscribe(updated => (todo = updated));
    }

    public cancelEditingTodo(todo: Todo) {
        todo.editing = false;
    }

    public remove(item: Todo) {
        const idx = this.todoItems.indexOf(item);
        if (idx > -1) {
            this._todoService
                .delete(item)
                .pipe(filter(success => success))
                .subscribe(success => {
                    this.todoItems.splice(idx, 1);
                });
        }
    }

    public updateEditingTodo(todo: Todo, editedTitle: string) {
        editedTitle = editedTitle.trim();
        todo.editing = false;

        if (editedTitle.length === 0) {
            this.remove(todo);
        }

        todo.title = editedTitle;
    }

    public editTodo(todo: Todo) {
        todo.editing = true;
    }
}
