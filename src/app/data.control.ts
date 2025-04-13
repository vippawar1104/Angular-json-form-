import { Component } from '@angular/core';
import { JsonFormsAngularService, JsonFormsControl } from '@jsonforms/angular';
import { ControlProps } from '@jsonforms/core';

@Component({
  selector: 'app-data-component',
  template: `
  <div class="bg-gray-100 border border-gray-300 rounded-md p-4 overflow-auto text-sm text-gray-800">
    <code>{{ dataAsString }}</code>
  </div>
  `,
  standalone: false
})
export class DataDisplayComponent extends JsonFormsControl {

  dataAsString: string | undefined;

  constructor(service: JsonFormsAngularService) {
    super(service);
  }

  public override mapAdditionalProps(props: ControlProps) {
    this.dataAsString = JSON.stringify(props.data, null, 2);
  }
}
