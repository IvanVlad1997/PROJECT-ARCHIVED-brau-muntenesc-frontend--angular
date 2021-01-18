import {HeaderAwareComponent, OptionsAwareComponent, SearchAwareComponent} from '../../../projects/common/metadata-aware';

export class TypeGuards {
  public static isHeaderAwareComponent(component: object): component is HeaderAwareComponent {
    return 'header' in component;
  }

  public static isSearchAwareComponent(component: object): component is SearchAwareComponent {
    return 'search' in component;
  }

  public static isOptionsAwareComponent(component: object): component is OptionsAwareComponent {
    return 'options' in component;
  }
}

