import { ContextMenuItemModel } from '@syncfusion/ej2-angular-grids';

export interface IColumnField {
  columnName: string;
  columnDisplayName: string;
  visible: boolean;
  /**
   * sample: { class: 'hideColumnFilterClass' }
   * 可以考虑在部分情况下给column增加class等attribute
   */
  customAttributes?: string;
  // 不填默认是Left
  textAlign?: 'Left' | 'Right' | 'Center';
  width?: number;
  minWidth?: number;
  format?: string;
  showTemplate?: boolean;
  template?: any;
  dataType?: string;
  allowEditing?: boolean;
  edit?: any;
  editType?: string;
  showEditTemplate?: boolean;
  editTemplate?: any;
  isPrimaryKey?: boolean;
  validationRules?: any;
  /**
   * sample: { class: 'hideColumnFilterClass' }
   * 可以考虑在部分情况下给column增加class等attribute
   */
  // 不填默认是Left
  allowFiltering?: boolean;
  allowSorting?: boolean;
  showColumnMenu?: boolean;
  colName?: string;
  filter?: any;
  sortComparer?: (d1: string, d2: string) => number;
}

export interface IActionMenuItem extends ContextMenuItemModel {
  disabled?: boolean;
  isHide?: boolean;
}
