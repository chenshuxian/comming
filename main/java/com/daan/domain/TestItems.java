package com.daan.domain;

import java.io.Serializable;
import java.util.Date;

import com.daan.logBean.Log;
import com.daan.logBean.LogModule;

/**
 * 
 * @ClassName: TestItems
 * @Description: TODO(本地项目库-中心项目字典库, 记录项目、组合、套餐的开单属性内容)
 * @author zhangliping
 * @date 2016年1月11日 上午10:21:00
 */
@LogModule(entityName = Constant.ENTITY_TESTITEMS, moduleName = Constant.ENTITY_TESTITEM, moduleId = Constant.MODULEID_TESTITEM)
public class TestItems implements Serializable {
	private static final long serialVersionUID = 2246998353771175722L;

	private String idString;
	private Long id; // ` bigint(19) '[主键id] — 关键子id',
	private Integer itemTypeId;// ` int(11) '[项目分类id] — 项目分类:1 — 单项 ， 2— 组合， 3—套餐',
	private Long orgId;// ` bigint(19)  '[实验室、机构id] — 一个字典对应一个实验室，对应 labs.id.',
	private String codeNo;// ` varchar(15)  '[编码] — 项目的全国统一码',
	private String name;// ` varchar(55)  '[项目名称] — 检验项目的名称',
	private String reportName;// ` varchar(55)  '[报告名称] —项目在报告上显示的名称.',
	private String enName;// ` varchar(55)  '[英文名称] — 项目的英文名称',
	private String enShortName;// ` varchar(30)  '[英文简称] — 英文名称缩写 ',
	private Integer sexId;// ` int(11)  '[性别id] — 项目性别显示, 1— 男， 2— 女， 3— 不限。',
	private Long testMethodId;// ` bigint(19)  '[检验方法id] —对应基础字典表的ctr_dict_codes.type_key =2',
	private String testMethodIdString;
	private Long sampleTypeId;// ` bigint(19)  '[默认标本类型id] — 标本类型id 对应ctr_dict_codes 的 type_key =1',
	private String sampleTypeIdString;
	private Long disciplineId;
	private String disciplineIdString;
	private String fastCode;// ` varchar(9)  '[助记符] — 用于快速录入编码。',
	private Integer displayOrder;// ` int(11)  '[顺序号] — 顺序号, 排列显示的序号。',
	private String memo;// ` varchar(500)  '[备注] — 备注内容',
	private Integer status;// ` int(11)  '[状态] — 停用标志，1 —使用, 0 —停用',
	private Integer isUseful;// ` int(11)  '[不可开单项] — 是否可开单标志，0— 可开单，1 — 不可开单。',
	private Integer isIndividualStat;// ` int(11) '[是否按单项统计检测工作量 ] —组合及套餐才会使用，统计控制标志,0— 按组合统计， 1— 按单项统计',
	private String price;// ` varchar(10)  '[价格] — 项目价格.',
	private String receiptDesc;// ` varchar(150)  '[指引单说明] — 打印在指引单上的说明内容。',
	private String collectDesc;// ` varchar(150)  '[采集说明] —标本采集的时候显示的说明。',
	private String combineKey;// ` varchar(15)  '[合管原则] — 一个标本项目的合管原则分到同一只管上。分管原则字符串。',
	private String volumeMl;// ` varchar(10)  '[抽血量] — 项目对应的抽血量，以ml为单位。',
	private Long collectSampleTypeId;// ` bigint(19) '[采集标本类型id] — 采集标本类型id 对应dict_codes的”标本类型”分类',
	private String collectSampleTypeIdString;
	private String collectSampleTypeName;
	private Long tubeTypeId;// ` bigint(19)  '[试管类别id] — 对应tubetypes.id ',
	private String tubeTypeIdString;
	private String tubeTypeName;
	private Integer relationCount;// ` int(11)  '[项目对照数量] —项目对照的数量。通过这个字段可以知道项目有没有被对照过。',
	private Date timeVersion;// ` timestamp '[时间版本] — 当新增、修改都需要把当前服务器时间写入次字段，用于同步数据用。',
	private String testMethodName;  //检验方法
	private String sampleTypeName;  //默认样本类型
	private String disciplineName;  //医学专业组
	private String resultTypeName;  //结果类型
	private Long resultTypeId;
	private String resultTypeIdString;
	private String formulaDescribe; //计算公式
	private String instrumentName;  //设备名称
	private String itemTypeName;//项目分类名称 
	private String unit;
	private String refMethod;//参考值方式
	
	public String getIdString() {
		return idString;
	}

	public void setIdString(String idString) {
		this.idString = idString;
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


	public Long getOrgId() {
		return orgId;
	}

	public void setOrgId(Long orgId) {
		this.orgId = orgId;
	}
	
	@Log(name = "编码", order = 10, isSummary = true)
	public String getCodeNo() {
		return codeNo;
	}

	public void setCodeNo(String codeNo) {
		this.codeNo = codeNo;
	}
	
	@Log(name = "项目名称", order = 20, isSummary = true)
	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public String getReportName() {
		return reportName;
	}

	public void setReportName(String reportName) {
		this.reportName = reportName;
	}
	
	@Log(name = "英文名称", order = 30)
	public String getEnName() {
		return enName;
	}

	public void setEnName(String enName) {
		this.enName = enName;
	}

	@Log(name = "英文简称", order = 40)
	public String getEnShortName() {
		return enShortName;
	}

	public void setEnShortName(String enShortName) {
		this.enShortName = enShortName;
	}

	@Log(name = "性别", order = 50, valueFormat = Constant.SEXTYPE_FORMAT, dynamicField = {"getItemTypeId","2","3"})
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

	@Log(name = "助记符")
	public String getFastCode() {
		return fastCode;
	}

	public void setFastCode(String fastCode) {
		this.fastCode = fastCode;
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

	public Integer getIsUseful() {
		return isUseful;
	}

	public void setIsUseful(Integer isUseful) {
		this.isUseful = isUseful;
	}

	public Integer getIsIndividualStat() {
		return isIndividualStat;
	}

	public void setIsIndividualStat(Integer isIndividualStat) {
		this.isIndividualStat = isIndividualStat;
	}

	public String getPrice() {
		return price;
	}

	public void setPrice(String price) {
		this.price = price;
	}

	public String getReceiptDesc() {
		return receiptDesc;
	}

	public void setReceiptDesc(String receiptDesc) {
		this.receiptDesc = receiptDesc;
	}

	public String getCollectDesc() {
		return collectDesc;
	}

	public void setCollectDesc(String collectDesc) {
		this.collectDesc = collectDesc;
	}

	public String getCombineKey() {
		return combineKey;
	}

	public void setCombineKey(String combineKey) {
		this.combineKey = combineKey;
	}

	public String getVolumeMl() {
		return volumeMl;
	}

	public void setVolumeMl(String volumeMl) {
		this.volumeMl = volumeMl;
	}

	public Long getCollectSampleTypeId() {
		return collectSampleTypeId;
	}

	public void setCollectSampleTypeId(Long collectSampleTypeId) {
		this.collectSampleTypeId = collectSampleTypeId;
	}

	public Long getTubeTypeId() {
		return tubeTypeId;
	}

	public void setTubeTypeId(Long tubeTypeId) {
		this.tubeTypeId = tubeTypeId;
	}

	public Integer getRelationCount() {
		return relationCount;
	}

	public void setRelationCount(Integer relationCount) {
		this.relationCount = relationCount;
	}

	public Date getTimeVersion() {
		return timeVersion;
	}

	public void setTimeVersion(Date timeVersion) {
		this.timeVersion = timeVersion;
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

	@Log(name = "结果类型", dynamicField = {"getItemTypeId","2","3"})
	public String getResultTypeName() {
		return resultTypeName;
	}

	public void setResultTypeName(String resultTypeName) {
		this.resultTypeName = resultTypeName;
	}

	public String getFormulaDescribe() {
		return formulaDescribe;
	}

	public void setFormulaDescribe(String formulaDescribe) {
		this.formulaDescribe = formulaDescribe;
	}

	public String getInstrumentName() {
		return instrumentName;
	}

	public void setInstrumentName(String instrumentName) {
		this.instrumentName = instrumentName;
	}

	public String getItemTypeName() {
		return itemTypeName;
	}

	public void setItemTypeName(String itemTypeName) {
		this.itemTypeName = itemTypeName;
	}

	public Long getDisciplineId() {
		return disciplineId;
	}

	public void setDisciplineId(Long disciplineId) {
		this.disciplineId = disciplineId;
	}



	public String getUnit() {
		return unit;
	}

	public void setUnit(String unit) {
		this.unit = unit;
	}

	public String getTestMethodIdString() {
		return testMethodId==null?"":testMethodId+"";
	}

	public void setTestMethodIdString(String testMethodIdString) {
		this.testMethodIdString = testMethodIdString;
	}

	public String getSampleTypeIdString() {
		return sampleTypeId==null?"":sampleTypeId+"";
	}

	public void setSampleTypeIdString(String sampleTypeIdString) {
		this.sampleTypeIdString = sampleTypeIdString;
	}

	public String getDisciplineIdString() {
		return disciplineId==null?"":disciplineId+"";
	}

	public void setDisciplineIdString(String disciplineIdString) {
		this.disciplineIdString = disciplineIdString;
	}

	public Long getResultTypeId() {
		return resultTypeId;
	}

	public void setResultTypeId(Long resultTypeId) {
		this.resultTypeId = resultTypeId;
	}

	public String getResultTypeIdString() {
		return resultTypeId==null?"":resultTypeId+"";
	}

	public void setResultTypeIdString(String resultTypeIdString) {
		this.resultTypeIdString = resultTypeIdString;
	}

	public String getUnitString() {
		return unit==null?"":unit+"";
	}

	public String getTubeTypeIdString() {
		return tubeTypeIdString;
	}

	public void setTubeTypeIdString(String tubeTypeIdString) {
		this.tubeTypeIdString = tubeTypeIdString;
	}

	public String getTubeTypeName() {
		return tubeTypeName;
	}

	public void setTubeTypeName(String tubeTypeName) {
		this.tubeTypeName = tubeTypeName;
	}

	public String getCollectSampleTypeIdString() {
		return collectSampleTypeIdString;
	}

	public void setCollectSampleTypeIdString(String collectSampleTypeIdString) {
		this.collectSampleTypeIdString = collectSampleTypeIdString;
	}

	public String getCollectSampleTypeName() {
		return collectSampleTypeName;
	}

	public void setCollectSampleTypeName(String collectSampleTypeName) {
		this.collectSampleTypeName = collectSampleTypeName;
	}

	public String getRefMethod() {
		return refMethod;
	}

	public void setRefMethod(String refMethod) {
		this.refMethod = refMethod;
	}
	

}
