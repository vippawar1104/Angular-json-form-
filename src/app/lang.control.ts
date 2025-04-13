import { Component } from '@angular/core';
import { JsonFormsAngularService, JsonFormsControl } from '@jsonforms/angular';
import { getLocale, setLocale } from '@jsonforms/core';
import { DateAdapter } from '@angular/material/core';

@Component({
  selector: 'app-lang-component',
  template: `
    <div class="space-y-4 p-4 bg-white rounded shadow">
      <p class="text-sm text-gray-700">Click button to set locale</p>
      <p class="text-sm text-gray-600">Current locale: <span class="font-medium">{{ currentLocale }}</span></p>
      <div class="flex space-x-2">
        <button class="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded" (click)="changeLocale('de-DE')">de-DE</button>
        <button class="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded" (click)="changeLocale('en-US')">en-US</button>
      </div>
    </div>
  `,
  standalone: false
})
export class LangComponent extends JsonFormsControl {

  currentLocale: string | undefined;
  dateAdapter;

  constructor(service: JsonFormsAngularService, dateAdapter: DateAdapter<Date>) {
    super(service);
    this.dateAdapter = dateAdapter;
  }

  override mapAdditionalProps() {
    this.currentLocale = getLocale(this.jsonFormsService.getState());
  }

  changeLocale(localeString: string) {
    this.jsonFormsService.updateI18n(setLocale(localeString));
    this.dateAdapter.setLocale(localeString);
  }
}
