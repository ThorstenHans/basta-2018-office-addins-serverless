import {NgZone} from '@angular/core';
import {AccessService} from './access.service';
import {ExcelService} from './excel.service';
import {NoOfficeService} from './no.office.service';
import {OfficeService} from './office.service';
import {OneNoteService} from './onenote.service';
import {OutlookService} from './outlook.service';
import {PlatformService} from './platform.service';
import {PowerPointService} from './powerpoint.service';
import {ProjectService} from './project.service';
import {WordService} from './word.service';

export function OfficeServiceFactory(platformService: PlatformService, zone: NgZone): OfficeService {

    if (!platformService.isInOffice()) {
        return new NoOfficeService(zone);
    }

    if (platformService.isAccess) {
        return new AccessService(zone);
    }

    if (platformService.isExcel) {
        return new ExcelService(zone);
    }

    if (platformService.isOneNote) {
        return new OneNoteService(zone);
    }

    if (platformService.isOutlook) {
        return new OutlookService(zone);
    }

    if (platformService.isPowerPoint) {
        return new PowerPointService(zone);
    }

    if (platformService.isProject) {
        return new ProjectService(zone);
    }

    if (platformService.isWord) {
        return new WordService(zone);
    }

    return new NoOfficeService(zone);
}
