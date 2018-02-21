import {NgZone} from '@angular/core';
import {OfficeService} from './office/office.service';
import {OfficeServiceFactory} from './office/office.service.factory';
import {PlatformService} from './office/platform.service';
import {TodoService} from './todo.service';

export const ALL_SERVICES = [
    PlatformService,
    TodoService,
    {provide: OfficeService, useFactory: OfficeServiceFactory, deps: [PlatformService, NgZone]},
];
