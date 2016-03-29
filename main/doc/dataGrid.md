[dataGrid](https://github.com/chenshuxian/comming/blob/master/main/webapp/js/dataGrid.js) 
=========================
dataGrid 用来设定 dataGrid Obj，并返回一个dataGrid Obj

###使用方法:
1. Obj.init(params)
  * params 包括以下参数
    * _url:網址
  	* _data:传递到服务器參數
  	* _module:模塊名
  	* _hideCols:穩藏欄位是一个阵列
  	* _tableList:grid生成對象
  	* _preId:前辍
  	* _height:grid 高度
  	* _isSecond:是否为第二个grid，第二个grid不套用新增事件
  	
###范例:
 _dgParams = {

            url:_pageListUrl,
          
            data:_data,
            
            module:_module,
           
            hideCols:_hideCols,
            
            tableList:_tableList,
            
            preId:_preId
            
        },
        _gridObj = dataGridM.init(_dgParams),
        
        _dataGrid = _tableList.datagrid(_gridObj);

----
### clickRow 单高亮方法

使用方法:

于事件 onClickRow 中加入此方法就可以有高弹亮的效果了

dataGridObj.clickRow.call(this,index,row);
