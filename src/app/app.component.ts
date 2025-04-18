import { Component } from '@angular/core';
import { angularMaterialRenderers } from '@jsonforms/angular-material';
import { and, createAjv, isControl, optionIs, rankWith, schemaTypeIs, scopeEndsWith, Tester } from '@jsonforms/core';
import { CustomAutocompleteControlRenderer } from './custom.autocomplete';
import { DataDisplayComponent } from './data.control';
import { LangComponent } from './lang.control';
import ordersUischema from '../assets/uischema.json';
import ordersSchema from '../assets/schema.json';
import employeeUischema from '../assets/employee-uischema.json';
import employeeSchema from '../assets/employee-schema.json';
import ordersData from './data';
import { parsePhoneNumber } from 'libphonenumber-js';
import { DateAdapter } from '@angular/material/core';

const departmentTester: Tester = and(
  schemaTypeIs('string'),
  scopeEndsWith('department')
);

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  standalone: false
})
export class AppComponent {
  title = 'JSONForms Angular Material Playground';
  currentLayout = 'orders';
  
  // Schemas and UI Schemas
  ordersSchema = ordersSchema;
  ordersUischema = ordersUischema;
  employeeSchema = employeeSchema;
  employeeUischema = employeeUischema;

  // Default data
  ordersData = ordersData;
  employeeData = {
    personalInfo: {
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      dateOfBirth: ''
    },
    employmentDetails: {
      employeeId: '',
      position: 'Developer',
      department: 'Engineering',
      startDate: '',
      salary: 0
    },
    skills: []
  };

  // Current form state
  get currentSchema() {
    return this.currentLayout === 'orders' ? this.ordersSchema : this.employeeSchema;
  }

  get currentUischema() {
    return this.currentLayout === 'orders' ? this.ordersUischema : this.employeeUischema;
  }

  get data() {
    return this.currentLayout === 'orders' ? this.ordersData : this.employeeData;
  }
  
  renderers = [
    ...angularMaterialRenderers,
    { tester: rankWith(5, departmentTester), renderer: CustomAutocompleteControlRenderer },
    {
      renderer: DataDisplayComponent,
      tester: rankWith(
        6,
        and(
          isControl,
          scopeEndsWith('___data')
        )
      )
    },
    {
      renderer: LangComponent,
      tester: rankWith(
        6,
        and(
          isControl,
          optionIs('lang', true)
        )
      )
    },
  ];

  i18n = {locale: 'de-DE'}
  dateAdapter;
  ajv = createAjv({
    schemaId: 'id',
    allErrors: true
  });

  constructor(dateAdapter: DateAdapter<Date>) {
    this.ajv.addFormat('time', '^([0-1][0-9]|2[0-3]):[0-5][0-9]$');
    this.dateAdapter = dateAdapter;
    dateAdapter.setLocale(this.i18n.locale);
    this.ajv.addFormat('tel', maybePhoneNumber => {
      try {
        parsePhoneNumber(maybePhoneNumber, 'DE');
        return true;
      } catch (_) {
        return false;
      }
    });
  }

  switchLayout(layout: 'orders' | 'employee') {
    this.currentLayout = layout;
  }
}
