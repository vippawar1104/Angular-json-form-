import {generate} from "random-words";
import {debounceTime, finalize, tap} from 'rxjs/operators';
import {switchMap} from 'rxjs/operators';
import {delay} from 'rxjs/operators';
import {of} from 'rxjs';
import {AutocompleteControlRenderer} from '@jsonforms/angular-material';
import {Observable} from 'rxjs';
import {Component} from '@angular/core';

const words: string[] = generate(1000) as string[];

const fetchSuggestions = (input: string): Observable<string[]> => {
  const filtered: string[] = words.filter(word => word.startsWith(input));
  return of(filtered).pipe(delay(1000));
};

@Component({
  selector: 'jsonforms-custom-autocomplete',
  template: `
  <div class="w-full">
    <label [for]="id" class="block text-sm font-medium text-gray-700 mb-1">{{ label }}</label>
    <div class="relative">
      <input
        type="text"
        (input)="onChange($event)"
        [id]="id"
        [formControl]="form"
        placeholder="{{ description }}"
        class="block w-full rounded-md border border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm p-2"
      />
      <div class="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-md shadow-lg max-h-60 overflow-auto" *ngIf="form.value && (filteredOptions | async) as options">
        <div *ngIf="isLoading" class="flex justify-center py-2">
          <svg class="animate-spin h-5 w-5 text-gray-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
            <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"></path>
          </svg>
        </div>
        <div *ngIf="!isLoading">
          <div
            *ngFor="let option of options"
            (click)="onSelect(option)"
            class="cursor-pointer px-4 py-2 hover:bg-blue-100"
          >
            {{ option }}
          </div>
        </div>
      </div>
    </div>
    <p class="mt-1 text-sm text-red-600">{{ error }}</p>
  </div>
  `,
  standalone: false
})
export class CustomAutocompleteControlRenderer extends AutocompleteControlRenderer {

  isLoading: boolean = false;

  override ngOnInit() {
    super.ngOnInit();
    this.form.valueChanges
      .pipe(
        debounceTime(300),
        tap(() => this.isLoading = true),
        switchMap(value => fetchSuggestions(value)
          .pipe(
            finalize(() => this.isLoading = false)
          )
        )
      )
      .subscribe((options: string[]) => this.options = options);
  }
}
