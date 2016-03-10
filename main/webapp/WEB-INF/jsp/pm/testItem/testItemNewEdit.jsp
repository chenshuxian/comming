<%@ page contentType="text/html;charset=UTF-8" language="java" pageEncoding="UTF-8" %>
<%@ include file="/WEB-INF/jsp/common/taglibs.jsp"%>
<div class="pop-inner-wrap">
    <div class="pop-container">
        <div class="wrapper-container">
    <form id="InfoForm" name="testItem_crtTestItemFrom">
        <input type="hidden" id="opType" name="type" value="${type}"/>
    	<input type="hidden" id="testItem_id" name="id" value='<c:out value="${crtTestItemDto.id}" escapeXml="true"/>'>
    	<input id="testItem_itemTypeId" name="itemTypeId" type="hidden" value='1'/>
		<input id="testItem_testItemId" name="testItemId" type="hidden" value='<c:out value="${crtTestItemDto.testItemId}" escapeXml="true"/>'/>
		<input id="testItem_gridTestMethodId" name="gridTestMethodId" type="hidden" value="${crtTestItemDto.testMethodId}"/>
		<input id="testItem_codeNoValidation" name="codeNoValidation" type="hidden" value="<c:out value="${crtTestItemDto.codeNo}" escapeXml="true"/>" />
        <input id="testItem_nameValidation" name="nameValidation" type="hidden" value="<c:out value="${crtTestItemDto.name}" escapeXml="true"/>">    
        <input id="testItem_status" name="status" type="hidden" value='<c:out value="${crtTestItemDto.status}" escapeXml="true"/>'/>
         <div class="wrapper-header flex-container flex-space-between">
         <h1>基本信息</h1> 
         <!--  <small class="basic-code">编码: 666666</small> -->
         </div>
     <div class="wrapper-content">
         <div class="flex-container flex-space-between horizontal-group">
          <div class=" flex-container  block-show">
              <label for=""><span class="required-icon">*</span>达安标准码:</label>
              <input type="text" class="form-control block-show" id="testItem_codeNo" name="codeNo" value='<c:out value="${crtTestItemDto.codeNo}" escapeXml="true"/>' maxlength="15" <c:if test="${type == 'edit'}">readonly="readonly"</c:if>>
          </div>
          <div class=" flex-container  block-show">
              <label for=""><span class="required-icon">*</span>项目名称:</label>
              <input type="text" class="form-control block-show"  id="testItem_name" name="name" value='<c:out value="${crtTestItemDto.name}" escapeXml="true"/>' maxlength="55">  
          </div>
      </div> 
       <div class="flex-container flex-space-between horizontal-group">
            <div class=" flex-container  block-show">
                <label for=""><span class="required-icon">*</span>英文名称:</label>
                <input type="text" class="form-control block-show" id="testItem_enName" name="enName" value='<c:out value="${crtTestItemDto.enName}" escapeXml="true"/>' maxlength="55">
            </div>
            <div class=" flex-container  block-show">
                <label for=""><span class="required-icon">*</span>英文简称:</label>
                <input type="text" class="form-control block-show" id="testItem_enShortName" name="enShortName" value='<c:out value="${crtTestItemDto.enShortName}" escapeXml="true"/>' maxlength="30">
            </div>
        </div> 
         <div class="flex-container flex-space-between horizontal-group">                      
           <div class=" flex-container  block-show">
               <label for=""><span class="required-icon">*</span>项目性别:</label>
               <select name="sexId" data-options="editable:false,width:214,height:30,panelHeight:'auto'"
                       class="easyui-combobox xs-size form-control-combo" id="testItem_sexId" style="width: 210px;height: 30px;line-height: 16px;padding-left: 8px;border: 1px solid #cdd2d4;vertical-align: middle;box-sizing: border-box;box-shadow: 0 2px 3px rgba(0, 0, 0, 0.1) inset;">
                   <option <c:if test="${crtTestItemDto.sexId == 3}">selected="selected"</c:if> value="3">不限</option>
		          <option <c:if test="${crtTestItemDto.sexId == 1}">selected="selected"</c:if> value="1">男</option>
		          <option <c:if test="${crtTestItemDto.sexId == 2}">selected="selected"</c:if> value="2">女</option>
               </select>
           </div>
           <div class=" flex-container  block-show">
                <label for=""><span class="required-icon">*</span>检验方法:</label>
               <div id="testItem_testMethod" style="width: 183px"></div>
           </div>
       </div>
       <div class="flex-container flex-space-between horizontal-group">
       <div class=" flex-container  block-show">
             <label for=""><span class="required-icon">*</span>医学专业组:</label>
             <div id="testItem_discipline" style="width: 183px"></div>
         </div>
         <div class=" flex-container  block-show">
             <label for=""><span class="required-icon">*</span>默认标本类型:</label>
              <div id="testItem_sampleType" style="width: 183px"></div>
         </div>         
       </div>  
       <div class="flex-container flex-space-between horizontal-group">
       <div class=" flex-container  block-show">
             <label for="">参考值方式:</label>
             <select  name="refMethod" id="testItem_refMethod"  data-options="editable:false,width:214,height:30,panelHeight:'auto'"
                     style="width: 210px;height: 30px;line-height: 16px;padding-left: 8px;border: 1px solid #cdd2d4;vertical-align: middle;box-sizing: border-box;box-shadow: 0 2px 3px rgba(0, 0, 0, 0.1) inset;"
                     class="easyui-combobox xs-size form-control-combo" >
                 <option <c:if test="${crtTestItemDto.refMethod == ''}">selected="selected"</c:if> value=""></option>
                    <option <c:if test="${crtTestItemDto.refMethod == '[Min –Max]'}">selected="selected"</c:if> value="[Min –Max]">[Min –Max]</option>
					<option <c:if test="${crtTestItemDto.refMethod == '[<Max]'}">selected="selected"</c:if>value="[&lt;Max]">[&lt;Max]</option>
					<option <c:if test="${crtTestItemDto.refMethod == '[<=Max]'}">selected="selected"</c:if>value="[&lt;=Max]">[&lt;=Max]</option>
					<option <c:if test="${crtTestItemDto.refMethod == '[>Min]'}">selected="selected"</c:if>value="[>Min]">[>Min]</option>
					<option <c:if test="${crtTestItemDto.refMethod == '[>=Min]'}">selected="selected"</c:if>value="[>=Min]">[>=Min]</option>
             </select>
         </div>
         <div class=" flex-container  block-show">
             <label for="">单位:</label>
              <div id="testItem_units" style="width: 183px"></div>
         </div>         
       </div> 
         <div class="flex-container flex-space-between horizontal-group">
                        <div class=" flex-container  block-show">
                            <label for="">结果类型:</label>
                            <div id="testItem_resultType" style="width: 183px"></div>
                        </div>
                        <div class=" flex-container  block-show">
                            <label for="">小数位数:</label>
                            <input type="text" class="form-control block-show" id="testItem_resultPrecision" name="resultPrecision" value='<c:if test="${crtTestItemDto.resultPrecision != 0}"><c:out value="${crtTestItemDto.resultPrecision}" escapeXml="true"/></c:if>' maxlength="9">
                        </div>
                    </div>
       <div class="flex-container flex-space-between horizontal-group">
                        <div class=" flex-container  block-show">
                            <label for="">助记符:</label>
                            <input type="text" class="form-control block-show" id="testItem_fastCode" name="fastCode" value='<c:out value="${crtTestItemDto.fastCode}" escapeXml="true"/>' maxlength="9">
                        </div>
                        <div class=" flex-container flex-vertical-center  block-show">
                            <label for="">国家标准码: </label>
                             <input type="text" class="form-control block-show" id="testItem_stdCode" name="stdCode" value='<c:out value="${crtTestItemDto.stdCode}" escapeXml="true"/>' maxlength="15">
                        </div>
                    </div>
       <div class="flex-container flex-space-between horizontal-group">
                        <div class=" flex-container  block-show">
                            <label for="">顺序号:</label>
                            <input type="text" class="form-control block-show"  id="testItem_displayOrder" name="displayOrder"  value='<c:out value="${crtTestItemDto.displayOrder}" escapeXml="true"/>' maxlength="6">
                        </div>
                        <div class=" flex-container flex-vertical-center  block-show">
                            <label for="">备注: </label>
                             <input type="text" class="form-control block-show" id="testItem_memo" name="memo" value='<c:out value="${crtTestItemDto.memo}" escapeXml="true"/>' maxlength="150">
                        </div>
                    </div>
         <%-- <div class=" flex-container horizontal-group block-show">
                        <label for="" class="rowspan-title">冰冻:</label>
                        <input type="checkbox" id="testItem_isFreeze" name="isFreeze" value='1' <c:if test="${crtTestItemDto.isFreeze == 1}">checked="checked"</c:if>/>
                    </div> --%>
  </div>
        <div class="wrapper-footer text-center">
            <button id="testItem_editBtn" class="btn btn-submit sm-size" onclick="BasicModule.submit();">确定</button>
            <button class="btn btn-cancel sm-size J_ClosePop">关闭</button>
        </div>
  </form>
        </div>
    </div>
</div>

<script>
    $(document).ready(function () {
        TestItem.testMethodGrid = new TextCombo(TestItem.testMethodParam);
        TestItem.disciplineGrid = new TextCombo(TestItem.disciplineParam);
        TestItem.sampleTypeGrid = new TextCombo(TestItem.sampleTypeParam);
        TestItem.unitGrid = new TextCombo(TestItem.unitParam);
        TestItem.resultTypeGrid = new TextCombo(TestItem.resultTypeParam);
        //console.log(${crtTestItemDto.testMethodId});
        setTimeout(function(){
            TestItem.testMethodGrid.setText("${crtTestItemDto.testMethodName}");
            TestItem.disciplineGrid.setText("${crtTestItemDto.disciplineName}");
            TestItem.sampleTypeGrid.setText("${crtTestItemDto.sampleTypeName}");
            TestItem.unitGrid.setText("${crtTestItemDto.unit}");
            TestItem.resultTypeGrid.setText("${crtTestItemDto.resultTypeName}");
            $("input[name='testMethodId']").val("${crtTestItemDto.testMethodId}");
            $("input[name='disciplineId']").val("${crtTestItemDto.disciplineId}");
            $("input[name='sampleTypeId']").val("${crtTestItemDto.sampleTypeId}");
            if('${crtTestItemDto.resultTypeId}' != 0 ){
            $("input[name='resultTypeId']").val("${crtTestItemDto.resultTypeId}");
            }
        },500);
    });
</script>

