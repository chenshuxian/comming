
/***
 *@ClassName: independent.js
 * @Description: TODO(中心机构单位-JS)
 * @date 2016年01月19日 
 ***/
var Indenpent = (function($){

	/* START render basicModule */
	Indenpent = Object.create(CenterOrg);
	/* END render basicModule */

	var
		_preId = CB.PREID.IDL,
		_module = "Indenpent",
		_tableList =  $("#" + _preId + "List"),
		_orgTypeId = $("#" + _preId + "orgTypeId").val(),
		_exParams = {orgTypeId: _orgTypeId},
		_hideCols = ["nacaoId"],	//要穩藏的欄位
		_data = Indenpent.searchObj(_preId),
		_pageListUrl = Indenpent.pageListUrl,

	/* 参数说明:
	 * url:pagelisturl
	 * data:初始时后台所有接收的参数，是一个物件
	 * module:目前的这个模组名，会对晕到gridColumus.js需要注意
	 * hideCols:想稳藏的栏位，是一个array
	 * tableList:dataGird的对象
	 * preId:前辍
	 */
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


	$.extend(Indenpent,{
		preId: _preId,
		module:_module,
		tableList: _tableList,
		dataGrid: _dataGrid,
		addParams: Indenpent.getAddParams(_exParams),
		exParams:_exParams,
		orgTypeId:_orgTypeId,
		searchHold: CB.SEARCHHOLDER.INDEPENDT,
	})

	return Indenpent;


}(jQuery));

$(function(){
	Indenpent.init();
});

