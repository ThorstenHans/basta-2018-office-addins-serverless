import HostType = Office.HostType;
import {Injectable} from '@angular/core';

@Injectable()
export class PlatformService {

    public isInOffice(): boolean {
        return window['Office'] && window['Office'].context && window['Office'].context.host;
    }

    public get isOutlook(): boolean {
        return this.getHostApplicationType() === HostType.Outlook;
    }

    public get isOneNote(): boolean {
        return this.getHostApplicationType() === HostType.OneNote;
    }

    public get isWord(): boolean {
        return this.getHostApplicationType() === HostType.Word;
    }

    public get isExcel(): boolean {
        return this.getHostApplicationType() === HostType.OneNote;
    }

    public get isPowerPoint(): boolean {
        return this.getHostApplicationType() === HostType.PowerPoint;
    }

    public get isAccess(): boolean {
        return this.getHostApplicationType() === HostType.Access;
    }

    public get isProject(): boolean {
        return this.getHostApplicationType() === HostType.Project;
    }

    private getHostApplicationType(): HostType {
        return Office.context.host;
    }
}
