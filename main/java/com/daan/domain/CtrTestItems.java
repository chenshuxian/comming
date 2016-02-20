package com.daan.domain;

import java.util.Date;

import com.daan.logBean.Log;
import com.daan.logBean.LogModule;

/**
 * 
 * @ClassName: CtrTestItems 
 * @Description: TODO(检测项目   记录最基本的项目内容) 
 * @author xieruiyun
 * @date 2015年11月26日 上午10:23:38
 */
@LogModule(moduleName = Constant.MODULE_TESTITEM, entityName = Constant.ENTITY_TESTITEM, moduleId = Constant.MODULEID_TESTITEM)
public class CtrTestItems implements Cloneable {
	
	private String idString;
	private String idStr;
	private Long id;             //'[主键id] — 关键字id,使用 【中心字典id规则】',                                                                                              
	private Integer itemTypeId;        //'[项目分类id] — 项目分类:1 — 单项 ， 2— 组合， 3—套餐',                                                                           
	private String codeNo;         //'[编码] — 项目的全国统一码',                                                                                                          
	private String name;           //'[项目名称] — 检验项目的名称',                                                                                                           
	private String enName;         //'[英文名称] — 项目的英文名称',                                                                                                        
	private String enShortName;    //'[英文简称] — 英文名称缩写 ',                                                                                               
	private Integer sexId;             //'[性别id] — 项目性别显示, 1— 男， 2— 女， 3— 不限。',                                                                                   
	private Long testMethodId;   //'[检验方法id] —   ,对应ctr_dict_codes的“检验方法”分类',                                                                   
	private Long sampleTypeId;   //'[默认标本类型id] — ,对应ctr_dict_codes的“标本类型”分类',    
	private String sampleTypeIdString;
	private Integer displayOrder;      //'[顺序号] — 顺序号, 排列显示的序号。',                                                                                          
	private String memo;           //'[备注] — 备注内容',                                                                                                                
	private Integer status;            //'[是否停用] — 停用标志，0 —使用, 1 — 停用',                                                                                              
	private Integer isIndividualStat;  //'[是否按单项统计检测工作量 ] — 组合及套餐才会使用，统计控制标志,0— 按组合统计， 1— 按单项统计',                          
	private Long testItemId;     //'[主键id] — 关键字id,关联ctr_test_item.id 与ctr_test_item 是一对一的关系。',
	private Long disciplineId;   //'[医学专业组id] —,对应ctr_dict_codes的“医学专业组”分类',
	private String refMethod; 	   //'[参考值显示方法] — 用于显示参考范围内容有： [Min-Max] , [>Min], [>=Min] , [<Max], [<=Max]',
	private String unit;           //'[单位] — 项目单位，对应ctr_dict_codes.type_key =3 的名称',
	private Long resultTypeId;   //'[结果类型id] — 结果类型id对应ctr_result_types.id',
	private String fastCode;       //'[助记符] — 用于快速录入编码。',
	private Long resultPrecision;         //'[精度] — 结果保留多少位小数 ',
	private String stdCode;        //'[国家标准码] — 国家制定的标准编码',
	private Integer isFreeze;          //'[是否冰冻] — 冰冻标志, 0— 否 ， 1— 是',
	private String testMethodName;  //检验方法
	private String sampleTypeName;  //默认样本类型
	private String disciplineName;  //医学专业组
	private String resultTypeName;  //结果类型
	private Date timeVersion; //时间版本
	private String itemTypeName;//项目分类名称 
	private String statusName;//状态中文名称
	private String type;//操作类型add edit
	public CtrTestItems(){
	}
	
	public Long getId() {
		return id;
	}
	public void setId(Long id) {
		this.id = id;
	}
	public Integer getItemTypeId() {
		return itemTypeId;
	}
	public void setItemTypeId(Integer itemTypeId) {
		this.itemTypeId = itemTypeId;
	}
	
	@Log(name = "编码", order = 1, isSummary = true)
	public String getCodeNo() {
		return codeNo;
	}
	public void setCodeNo(String codeNo) {
		this.codeNo = codeNo;
	}
	@Log(name = "项目名称", order = 2, isSummary = true)
	public String getName() {
		return name;
	}
	public void setName(String name) {
		this.name = name;
	}
	@Log(name = "英文名称")
	public String getEnName() {
		return enName;
	}
	public void setEnName(String enName) {
		this.enName = enName;
	}
	@Log(name = "英文简称")
	public String getEnShortName() {
		return enShortName;
	}
	public void setEnShortName(String enShortName) {
		this.enShortName = enShortName;
	}
	@Log(name = "性别", valueFormat = Constant.SEXTYPE_FORMAT, dynamicField = {"getItemTypeId","2","3"})
	public Integer getSexId() {
		return sexId;
	}
	public void setSexId(Integer sexId) {
		this.sexId = sexId;
	}
	public Long getTestMethodId() {
		return testMethodId;
	}
	public void setTestMethodId(Long testMethodId) {
		this.testMethodId = testMethodId;
	}
	public Long getSampleTypeId() {
		return sampleTypeId;
	}
	public void setSampleTypeId(Long sampleTypeId) {
		this.sampleTypeId = sampleTypeId;
	}
	@Log(name = "顺序号")
	public Integer getDisplayOrder() {
		return displayOrder;
	}
	public void setDisplayOrder(Integer displayOrder) {
		this.displayOrder = displayOrder;
	}
	@Log(name = "备注", dynamicField = {"getItemTypeId","2","3"})
	public String getMemo() {
		return memo;
	}
	public void setMemo(String memo) {
		this.memo = memo;
	}
	@Log(name = "是否停用" , valueFormat = Constant.STATUS_FORMAT)
	public Integer getStatus() {
		return status;
	}
	public void setStatus(Integer status) {
		this.status = status;
	}
	@Log(name = "是否按单项统计检测工作量", valueFormat = Constant.YESORNOSTATUS_FORMAT, dynamicField = {"getItemTypeId","1"})
	public Integer getIsIndividualStat() {
		return isIndividualStat;
	}
	public void setIsIndividualStat(Integer isIndividualStat) {
		this.isIndividualStat = isIndividualStat;
	}
	public Date getTimeVersion() {
		return timeVersion;
	}
	public void setTimeVersion(Date timeVersion) {
		this.timeVersion = timeVersion;
	}

	public Long getTestItemId() {
		return testItemId;
	}

	public void setTestItemId(Long testItemId) {
		this.testItemId = testItemId;
	}

	public Long getDisciplineId() {
		return disciplineId;
	}

	public void setDisciplineId(Long disciplineId) {
		this.disciplineId = disciplineId;
	}
	
	@Log(name = "参考值方式", dynamicField = {"getItemTypeId","2","3"})
	public String getRefMethod() {
		return refMethod;
	}

	public void setRefMethod(String refMethod) {
		this.refMethod = refMethod;
	}

	@Log(name = "单位", dynamicField = {"getItemTypeId","2","3"})
	public String getUnit() {
		return unit;
	}

	public void setUnit(String unit) {
		this.unit = unit;
	}

	public Long getResultTypeId() {
		return resultTypeId;
	}

	public void setResultTypeId(Long resultTypeId) {
		this.resultTypeId = resultTypeId;
	}

	@Log(name = "助记符")
	public String getFastCode() {
		return fastCode;
	}

	public void setFastCode(String fastCode) {
		this.fastCode = fastCode;
	}

	@Log(name = "精度", dynamicField = {"getItemTypeId","2","3"})
	public Long getResultPrecision() {
		return resultPrecision;
	}

	public void setResultPrecision(Long resultPrecision) {
		this.resultPrecision = resultPrecision;
	}

	@Log(name = "国家标准码", dynamicField = {"getItemTypeId","2","3"})
	public String getStdCode() {
		return stdCode;
	}

	public void setStdCode(String stdCode) {
		this.stdCode = stdCode;
	}

	public Integer getIsFreeze() {
		return isFreeze;
	}

	public void setIsFreeze(Integer isFreeze) {
		this.isFreeze = isFreeze;
	}

	@Log(name = "检验方法", dynamicField = {"getItemTypeId","2","3"})
	public String getTestMethodName() {
		return testMethodName;
	}

	public void setTestMethodName(String testMethodName) {
		this.testMethodName = testMethodName;
	}

	@Log(name = "默认标本类型", dynamicField = {"getItemTypeId","2","3"})
	public String getSampleTypeName() {
		return sampleTypeName;
	}

	public void setSampleTypeName(String sampleTypeName) {
		this.sampleTypeName = sampleTypeName;
	}

	@Log(name = "医学专业组", dynamicField = {"getItemTypeId","2","3"})
	public String getDisciplineName() {
		return disciplineName;
	}

	public void setDisciplineName(String disciplineName) {
		this.disciplineName = disciplineName;
	}

	public String getIdString() {
		return id==null?"":id+"";
	}

	public void setIdString(String idString) {
		this.idString = idString;
	}
	
	public String getItemTypeName() {
		return itemTypeName;
	}

	public void setItemTypeName(String itemTypeName) {
		this.itemTypeName = itemTypeName;
	}
	
	public String getStatusName() {
		return statusName;
	}

	public void setStatusName(String statusName) {
		this.statusName = statusName;
	}
	
	@Log(name = "结果类型", dynamicField = {"getItemTypeId","2","3"})
	public String getResultTypeName() {
		return resultTypeName;
	}

	public void setResultTypeName(String resultTypeName) {
		this.resultTypeName = resultTypeName;
	}

	public Object clone() throws CloneNotSupportedException {
		CtrTestItems ctrTestItems = (CtrTestItems) super.clone();
		return ctrTestItems;
	}
	public String getStringId() {
		return this.id == null ? "" : this.id.toString();
	}

	public void setStringId(String stringId) {
	}

	public String getIdStr() {
		return idStr;
	}

	public void setIdStr(String idStr) {
		this.idStr = idStr;
	}

	public String getSampleTypeIdString() {
		return sampleTypeIdString;
	}

	public void setSampleTypeIdString(String sampleTypeIdString) {
		this.sampleTypeIdString = sampleTypeIdString;
	}

	public String getType() {
		return type;
	}

	public void setType(String type) {
		this.type = type;
	}
	
}
