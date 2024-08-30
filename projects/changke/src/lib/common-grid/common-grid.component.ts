import {
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  TemplateRef,
  OnChanges,
  ViewChild,
  ChangeDetectorRef,
} from '@angular/core';
import { GridComponent } from '@syncfusion/ej2-angular-grids';
import { BeforeOpenCloseEventArgs } from '@syncfusion/ej2-angular-inputs';
import { IActionMenuItem, IColumnField } from '../types/commonGrid';
import { SharedSyncfusionModule } from '../modules/syncfusionModule';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'changke-common-grid',
  templateUrl: './common-grid.component.html',
  styleUrls: ['./common-grid.component.scss'],
  standalone: true,
  imports: [SharedSyncfusionModule, CommonModule],
})
export class CommonGridComponent implements OnInit, OnChanges {
  @ViewChild('grid', { static: false }) public grid: GridComponent | undefined;
  @Input() allowReordering = false;
  @Input() showCheckBox = true;
  @Input() checkBoxWidth = 40; // col 数量过少的时候，check宽度会拉伸，这时候设置null
  @Input() loaded = false;
  @Input() gridHeight = '';
  // 这玩意必填，不然filter columnChooser都会报错
  @Input() gridId = 'grid';
  @Input() resizeSettings = { mode: 'Auto' };
  @Input() filterSettings = { type: 'Menu' };
  @Input() template: any;
  @Input() fields: IColumnField[] = [];
  @Input() dataSource = [];
  @Input() defaultRecord: any;
  @Input() toolbarTemplate: TemplateRef<any> | undefined;
  @Input() columnTemplate: TemplateRef<any> | undefined;
  @Input() columnEditTemplate: TemplateRef<any> | undefined;
  @Input() pageSettings: any;
  @Input() allowPaging = true;
  @Input() showEditAction = false;

  @Input() clipMode = 'EllipsisWithTooltip';
  /**
 * Sample: [
    {
      text: "Preview",
      target: ".e-content",
      id: "preview-icon",
      iconCss: "preview",
    },
    {
      text: "Download",
      target: ".e-content",
      id: "download-icon",
      iconCss: "download",
    }
  ]
  用于定义row中 点击事件
 */
  @Input() contextMenuItems: IActionMenuItem[] = [];
  @Input() selectionSettings = { checkboxOnly: true };
  @Input() editSettings: object | undefined;
  @Input() authorized = true;
  @Input() disabled = false;
  @Input() allowSorting = true;
  @Input() allowFiltering = true;
  @Input() showColumnMenu = true;
  @Input() sortSettings: object | undefined;

  @Output() recordDoubleClick = new EventEmitter();
  @Output() rowSelected = new EventEmitter();
  @Output() rowDeselected = new EventEmitter();
  @Output() onContextMenu = new EventEmitter();
  @Output() actionHandler = new EventEmitter();
  @Output() queryCellInfo = new EventEmitter();
  @Output() recordClick = new EventEmitter();
  @Output() actionBegin = new EventEmitter();
  @Output() created = new EventEmitter();
  @Output() dataBound = new EventEmitter();
  @Output() excelQueryCellInfo = new EventEmitter();
  @Output() cellSaved = new EventEmitter();
  @Output() checkBoxChange = new EventEmitter();
  @Output() rowSelecting = new EventEmitter();
  @Output() cellEdit = new EventEmitter();
  @Output() columnDragStart = new EventEmitter();
  @Output() columnDrop = new EventEmitter();
  @Output() rowDataBound = new EventEmitter();

  loadedSource: any[] = [];

  constructor(private ref: ChangeDetectorRef) {}
  ngOnInit(): void {}

  ngOnChanges(changes: any) {
    if (changes.loaded && changes.loaded.currentValue === true) {
      if (this.dataSource && this.dataSource.length) {
        this.loadedSource = this.dataSource.map(() => null);
        this.dataSource = [];
      } else {
        this.loadedSource = [{}];
      }
      this.ref.markForCheck();
      this.ref.detectChanges();
    }
    if (changes.dataSource && changes.dataSource.currentValue) {
      if (
        this.allowPaging &&
        changes.dataSource.currentValue.length &&
        !this.pageSettings
      ) {
        this.pageSettings =
          changes.dataSource.currentValue.length > 9
            ? {
                pageSizes: ['All', '15', '50', '100'],
                pageSize: 15,
              }
            : null;
      }
    }
  }

  _dataBound(args: any) {
    // 整个组件加载完成时的回调函数
    var pagerContainer = document.querySelector('.e-pagercontainer');
    if (pagerContainer) {
      var linkElements = pagerContainer.querySelectorAll('.e-link');
      linkElements.forEach(function (element) {
        element.removeAttribute('href'); // SMP2-10310 删除分页器的href属性
      });
    }
    this.dataBound.emit(args);

    // autoFitColumns
    (this.grid as GridComponent).autoFitColumns();
  }

  _cellSaved($event: any) {
    this.cellSaved.emit($event);
  }
  _checkBoxChange($event: any) {
    this.checkBoxChange.emit($event);
  }
  _columnDragStart($event: any) {
    this.columnDragStart.emit($event);
  }
  _columnDrop($event: any) {
    this.columnDrop.emit($event);
  }

  _created(args: any) {
    if (this.editSettings) {
      // 可编辑时，自定义校验失败样式: 边框变红
      (this.grid?.editModule as any).validationComplete = function (args: any) {
        if (this.parent.isEdit) {
          const elem = this.getElemTable(args.element).querySelector(
            '#' + args.inputName + '_Error'
          );
          if (elem) {
            elem.style.display = 'none';
            if (args.status === 'failure') {
              args.element.closest('.e-input-group').classList.add('e-error');
            } else {
              args.element
                .closest('.e-input-group')
                .classList.remove('e-error');
            }
          }
        }
      };
    }
    this.created.emit(args);
  }

  _recordDoubleClick($event: any) {
    this.recordDoubleClick.emit($event);
  }

  _rowSelected($event: any) {
    this.rowSelected.emit($event);
  }

  _rowDeselected($event: any) {
    this.rowDeselected.emit($event);
  }

  _onContextMenu(args: any) {
    this.onContextMenu.emit(args);
  }

  _actionBegin(args: any) {
    this.actionBegin.emit(args);
  }

  search(keywords: string) {
    this.grid?.search(keywords);
  }

  selectRow(num: number) {
    this.grid?.selectRow(num);
  }

  selectRows(arr: any[]) {
    this.grid?.selectRows(arr);
  }

  excelExport() {
    this.grid?.excelExport();
  }

  customiseCell($event: any) {
    this.queryCellInfo.emit($event);
  }

  _beforeOpen(args: any) {
    var menuElement: any = args.element.querySelector('.e-contextmenu');
    menuElement.style.top = '600px';
  }

  contextMenuOpen(args?: BeforeOpenCloseEventArgs): void {
    const data = (args as BeforeOpenCloseEventArgs | any).rowInfo.rowData;
    if (!data) {
      if (args) {
        args.cancel = true;
      }
      return;
    }
    let enableItems: any[] = [];
    let hideItems: any[] = [];
    this.grid?.contextMenuModule.contextMenu.refresh(); // 每次点击按钮弹窗前需再次初始化状态 否则不更新；
    this.contextMenuItems.forEach((item: IActionMenuItem) => {
      // 用于处理部分按钮disabled的情况
      if (
        item.disabled ||
        (data.disableItem && data.disableItem.includes(item.iconCss))
      ) {
        enableItems.push(item.text);
      }
      // 用于处理部分按钮需要hide的情况
      if (
        item.isHide ||
        (data.hideItem && data.hideItem.includes(item.iconCss))
      ) {
        hideItems.push(item.text);
      }
    });
    this.grid?.contextMenuModule.contextMenu.enableItems(enableItems, false);
    this.grid?.contextMenuModule.contextMenu.hideItems(hideItems, false);
  }

  _actionHandler($event: any) {
    this.actionHandler.emit($event);
  }
  _recordClick($event: any) {
    this.recordClick.emit($event);
  }
  _rowSelecting($event: any) {
    this.rowSelecting.emit($event);
  }
  _cellEdit($event: any) {
    this.cellEdit.emit($event);
  }
  refresh() {
    this.grid?.refresh();
  }
  refreshColumns() {
    this.grid?.refreshColumns();
  }
  refreshHeader() {
    this.grid?.refreshHeader();
  }

  export(excelExportProperties?: any) {
    this.grid?.excelExport(excelExportProperties);
  }

  addItem() {
    this.grid?.addRecord({ ...this.defaultRecord, isNew: true }, 0);
    setTimeout(() => {
      this.grid?.selectRow(0);
      this.grid?.startEdit();
    }, 30);
  }

  saveItem() {
    this.grid?.endEdit();
  }

  editItem(index: number) {
    setTimeout(() => {
      this.grid?.selectRow(Number(index));
      this.grid?.startEdit();
    }, 30);
  }

  deleteItem(index: number) {
    this.grid?.selectRow(Number(index));
    var selectedRecord = this.grid?.getSelectedRecords()[0] as any;
    this.grid?.deleteRecord(selectedRecord as string);
  }

  cancelItem(index: number) {
    this.grid?.closeEdit();
    this.deleteItem(index);
  }

  _exportQueryCellInfo($args: any): void {
    this.excelQueryCellInfo.emit($args);
  }

  _rowDataBound(e: any) {
    this.rowDataBound.emit(e);
  }

  clearSelection() {
    this.grid?.clearSelection();
  }

  getSelectedRecords(): any {
    const records = this.grid?.getSelectedRecords();
    if (records && !records.hasOwnProperty('length')) {
      Object.defineProperty(records, 'length', {
        get: function () {
          return this.grid.getSelectedRecords().length;
        },
      });
    }
    return records;
  }
}
