0309 idea 啟用及反應變慢
原因:debug point 沒取消導致，將debug point 取消就變快了 

------
3/11
重大問題，datagridcombobox 若是在 addcallback 和 editcallback 中建立

在其他頁面如果也同時打開，會導致不知名錯誤。

如想防止，就是在頁面戴入時在建立物件及設定物件參數。

今日進度，第一個表單的所有功能全部完成，

第二部分的新增功能，目前只將頁面獨立出一個addSingleItemShow.jsp

及將 controller 中的 addSingleItemShow 進行修改。

-----

3/18
###问题:datagrid 重新载入时grid原始设定跑掉了。(高度)
__原因:__ dataGrid JS 中初始化有一个__onLoadSuccess__函数，呼叫了一个grid调整的函数所致。

__解决:__在前端建立物件时重新定议载入__onLoadSuccess__函数。

-----
###解决KH-670问题 datagrid 高单亮问题
http://www.easyui.info/archives/396.html

----
4/1
###问题:在form表单发送触发异常
__原因:__ 因为在button 上也写了一个 onclick 事件，在事件触发后，系统又自动触发了表单submit事件。

__解决:__ 把button放到 from 表单外，或加event.preventDefault();

-----
### datagrid rowData 中有空格时，无法正常开启问题

__解决:__ 将字串中的空白以\&nbsp;字符取代

 `str.replace(/\s/g,"&nbsp;");`
 
----
8/5
### 机构报表模板页面无法正常运作
__原因:__ pageIds.jsp 中的前缀不小心被删除了，导致页面对映不见了。 

__解决:__ 将前辍加回来了。
 
 



