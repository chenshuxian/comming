0309 idea 啟用及反應變慢
原因:debug point 沒取消導致，將debug point 取消就變快了 

-----
### datagrid rowData 中有空格时，无法正常开启问题

__解决:__ 将字串中的空白以\&nbsp;字符取代

 `str.replace(/\s/g,"&nbsp;");`
 
0414 表单载入成功后高度一直跑掉
原因: dataGrid.js 预设有一个 loadSuccess event 会调整 grid 的高和宽
__解决:__ 

1.加一个控制参数，如果为两个grid不进行 loadSuccess event 的继承。

2.在前端加一个 loadSuccess overwrite。
-----

