import {
  Component,
  Input,
  ViewEncapsulation,
  ContentChildren,
  QueryList,
  Output,
  EventEmitter,
  OnChanges
} from '@angular/core';
import { JsonEditorNodeComponent } from './json-editor-node.component';
import { SchemaValidator } from './schema-validator';

@Component({
  selector: 'ngx-json-editor',
  templateUrl: 'json-editor.component.html',
  encapsulation: ViewEncapsulation.None,
  styleUrls: ['./json-editor.component.scss']
})
export class JsonEditorComponent implements OnChanges {
  @Input()
  model: any;

  @Input()
  schema: any;

  @Input()
  label: string;

  @Output()
  modelChange: EventEmitter<any> = new EventEmitter();

  errors: any[];

  @ContentChildren(JsonEditorNodeComponent)
  nodeElms: QueryList<JsonEditorNodeComponent>;

  ngOnChanges() {
    if (!this.schema) {
      this.schema = {
        type: 'object'
      };
    }
    if (!this.schema.type) {
      this.schema.type = 'object';
    }
  }

  /**
   * Model change callback. Validates the model and emits a change event
   * @param model
   */
  modelChangedCallback(model: any) {
    this.validate(this.schema, model);
    this.modelChange.emit(model);
  }

  /**
   * Validates the model based on the schema
   * @param schema
   * @param model
   */
  validate(schema: any, model: any): boolean {
    this.errors = SchemaValidator.validate(schema, model);
    return this.errors && this.errors.length > 0;
  }
}
