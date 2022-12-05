import { Pipe, PipeTransform } from '@angular/core';
import { IApplication } from './application.component';

@Pipe({
  name: 'applicationsFilteredByCategory',
})
export class ApplicationsFilteredByCategoryPipe implements PipeTransform {
  transform(applications: IApplication[], ...args: unknown[]): IApplication[] {
    const [name] = args;
    console.log('pipe', applications, name);
    return applications.filter((app) => app.category === name);
  }
}
