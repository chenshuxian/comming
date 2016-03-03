gridColumns
=======
*gridColums* 是一个 DataGrid 的栏位集合，主要将所有栏位集中管理，提高工作效能，目前已和 datagrid 物件一起始用
，当使用者建立 datagrid 时，就会经由 getColumns 的方法取得相对映的栏位表。

###使用方法
=======
1. getColumns 方法中新增一个 case

  ``case "CtrInstrBoxs" :``
  
  ``				return _getCIB(table);``
  
  ``				break;``
* 新增 return 方法

  ``_getCIB(obj) = function(){}``
* 于 [datagrid] (/comming/main/doc/dataGrid.md) 产生时传入对映的参数

  主要对映参数是 module 
  
  module = 物件名称
  
  例如: module = MED
