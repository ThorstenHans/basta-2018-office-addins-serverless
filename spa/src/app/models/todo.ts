export interface ITodo {
    id: string | undefined;
    title: string;
    completed: boolean;
}

export class Todo implements ITodo {
    public id: string | undefined;
    public title: string;
    public completed: boolean;
    public editing: boolean;

    constructor(title: string) {
        this.title = !!title ? title.trim() : '';

    }

}
