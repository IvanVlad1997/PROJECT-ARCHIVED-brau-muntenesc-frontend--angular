import {TemplateRef} from '@angular/core';

export interface HeaderAwareComponent {
  header: TemplateRef<any>;
}

export interface SearchAwareComponent {
  search: TemplateRef<any>
}

export interface  OptionsAwareComponent {
  options: TemplateRef<any>
}
