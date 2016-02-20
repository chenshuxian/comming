package com.daan.dto;


/**
 * 
 * @ClassName: TestItemsDto 
 * @Description: TODO(检测项目DTO) 
 * @author zhangliping
 * @date 2016年1月11日 下午3:37:17
 */
public class TestItemsDto {
	
	private Long orgId;//[实验室、机构id] — 一个字典对应一个实验室，对应 labs.id.',
	private String reportName;//[报告名称] —项目在报告上显示的名称.',
	private Integer isUseful;//[不可开单项] — 是否可开单标志，0— 可开单，1 — 不可开单。',
	private String price;//[价格] — 项目价格.',
	private String receiptDesc;//[指引单说明] — 打印在指引单上的说明内容。',
	private String collectDesc;//[采集说明] —标本采集的时候显示的说明。',
	private String combineKey;//[合管原则] — 一个标本项目的合管原则分到同一只管上。分管原则字符串。',
	private String volumeMl;//[抽血量] — 项目对应的抽血量，以ml为单位。',
	private Long collectSampleTypeId;//[采集标本类型id] — 采集标本类型id 对应dict_codes的”标本类型”分类',
	private Long tubeTypeId;//[试管类别id] — 对应tubetypes.id ',
	private Integer relationCount;//[项目对照数量] —项目对照的数量。通过这个字段可以知道项目有没有被对照过。',

	private Long appId;//[系统id] —功能点、菜单对应那个系统，对应applications.id',
	private String formulaDescribe;//[计算公式]— 计算公式内容描述.从公式复制过来并且对长度进行截取。限制为150个字符。',
	private String defaultResult;//[默认结果] — 默认的结果值。'
	
	private String idString;
	private Long id;             //'[主键id] — 关键字id,使用 【中心字典id规则】',                                                                                              
	private Integer itemTypeId;        //'[项目分类id] — 项目分类:1 — 单项 ， 2— 组合， 3—套餐',        
	private String itemTypeName;        //'[项目分类id] — 项目分类:1 — 单项 ， 2— 组合， 3—套餐',   
	private String codeNo;         //'[编码] — 项目的全国统一码',                                                                                                          
	private String name;           //'[项目名称] — 检验项目的名称',                                                                                                           
	private String enName;         //'[英文名称] — 项目的英文名称',                                                                                                        
	private String enShortName;    //'[英文简称] — 英文名称缩写 ',                                                                                               
	private Integer sexId;             //'[性别id] — 项目性别显示, 1— 男， 2— 女， 3— 不限。',                                                                                   
	                                                                   
	                                                                  
	private Integer displayOrder;      //'[顺序号] — 顺序号, 排列显示的序号。',                                                                                          
	private String memo;           //'[备注] — 备注内容',                                                                                                                
	private Integer status;            //'[是否停用] — 停用标志，0 —使用, 1 — 停用',     
	private Integer isIndividualStat;  //'[是否按单项统计检测工作量 ] — 组合及套餐才会使用，统计控制标志,0— 按组合统计， 1— 按单项统计',                          
	private Long testItemId;     //'[主键id] — 关键字id,关联ctr_test_item.id 与ctr_test_item 是一对一的关系。',
	
	private String refMethod; 	   //'[参考值显示方法] — 用于显示参考范围内容有： [Min-Max] , [>Min], [>=Min] , [<Max], [<=Max]',
	private String unit;           //'[单位] — 项目单位，对应ctr_dict_codes.type_key =3 的名称',
	private Long resultTypeId;   //'[结果类型id] — 结果类型id对应ctr_result_types.id',
	private String fastCode;       //'[助记符] — 用于快速录入编码。',
	private Integer resultPrecision;         //'[精度] — 结果保留多少位小数 ',
	private String stdCode;        //'[国家标准码] — 国家制定的标准编码',
	private Integer isFreeze;          //'[是否冰冻] — 冰冻标志, 0— 否 ， 1— 是',
	
	private Long testMethodId;   //'[检验方法id] —   ,对应ctr_dict_codes的“检验方法”分类',
	private String testMethodName;  //检验方法
	private String testMethodCodeNo;  //检验方法的编码

	private Long sampleTypeId;   //'[默认标本类型id] — ,对应ctr_dict_codes的“标本类型”分类',   
	private String sampleTypeName;  //默认样本类型的名字
	private String sampleTypeCodeNo;  //默认样本类型的编码

	private Long disciplineId;   //'[医学专业组id] —,对应ctr_dict_codes的“医学专业组”分类',
	private String disciplineName;  //医学专业组
	private String disciplineCodeNo;  //医学专业组的编码
	
	
	
	private String resultTypeName;  //结果类型
	private Long instrumentId; //仪器id
	private String  instrumentCodeNo; // [仪器代码] 仪器编码                                                                                                                                        
	private String  instrumentName;  // [仪器名称]
	
	private String  testMethodIdString;
	private String  disciplineIdString;
	private String  sampleTypeIdString;
	private String  resultTypeIdString;

	
	
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
	public String getCodeNo() {
		return codeNo;
	}
	public void setCodeNo(String codeNo) {
		this.codeNo = codeNo;
	}
	public String getName() {
		return name;
	}
	public void setName(String name) {
		this.name = name;
	}
	public String getEnName() {
		return enName;
	}
	public void setEnName(String enName) {
		this.enName = enName;
	}
	public String getEnShortName() {
		return enShortName;
	}
	public void setEnShortName(String enShortName) {
		this.enShortName = enShortName;
	}
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
	public Integer getDisplayOrder() {
		return displayOrder;
	}
	public void setDisplayOrder(Integer displayOrder) {
		this.displayOrder = displayOrder;
	}
	public String getMemo() {
		return memo;
	}
	public void setMemo(String memo) {
		this.memo = memo;
	}
	public Integer getStatus() {
		return status;
	}
	public void setStatus(Integer status) {
		this.status = status;
	}
	public Integer getIsIndividualStat() {
		return isIndividualStat;
	}
	public void setIsIndividualStat(Integer isIndividualStat) {
		this.isIndividualStat = isIndividualStat;
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
	public String getRefMethod() {
		return refMethod;
	}
	public void setRefMethod(String refMethod) {
		this.refMethod = refMethod;
	}
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
	public String getFastCode() {
		return fastCode;
	}
	public void setFastCode(String fastCode) {
		this.fastCode = fastCode;
	}
	public Integer getResultPrecision() {
		return resultPrecision;
	}
	public void setResultPrecision(Integer resultPrecision) {
		this.resultPrecision = resultPrecision;
	}
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
	public String getTestMethodName() {
		return testMethodName;
	}
	public void setTestMethodName(String testMethodName) {
		this.testMethodName = testMethodName;
	}
	public String getSampleTypeName() {
		return sampleTypeName;
	}
	public void setSampleTypeName(String sampleTypeName) {
		this.sampleTypeName = sampleTypeName;
	}
	public String getDisciplineName() {
		return disciplineName;
	}
	public void setDisciplineName(String disciplineName) {
		this.disciplineName = disciplineName;
	}
	public String getResultTypeName() {
		return resultTypeName;
	}
	public void setResultTypeName(String resultTypeName) {
		this.resultTypeName = resultTypeName;
	}
	public Long getInstrumentId() {
		return instrumentId;
	}
	public void setInstrumentId(Long instrumentId) {
		this.instrumentId = instrumentId;
	}
	public Long getOrgId() {
		return orgId;
	}
	public void setOrgId(Long orgId) {
		this.orgId = orgId;
	}
	public String getReportName() {
		return reportName;
	}
	public void setReportName(String reportName) {
		this.reportName = reportName;
	}
	public Integer getIsUseful() {
		return isUseful;
	}
	public void setIsUseful(Integer isUseful) {
		this.isUseful = isUseful;
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
	public Long getAppId() {
		return appId;
	}
	public void setAppId(Long appId) {
		this.appId = appId;
	}
	public String getFormulaDescribe() {
		return formulaDescribe;
	}
	public void setFormulaDescribe(String formulaDescribe) {
		this.formulaDescribe = formulaDescribe;
	}
	public String getDefaultResult() {
		return defaultResult;
	}
	public void setDefaultResult(String defaultResult) {
		this.defaultResult = defaultResult;
	}
	public String getInstrumentCodeNo() {
		return instrumentCodeNo;
	}
	public void setInstrumentCodeNo(String instrumentCodeNo) {
		this.instrumentCodeNo = instrumentCodeNo;
	}
	public String getInstrumentName() {
		return instrumentName;
	}
	public void setInstrumentName(String instrumentName) {
		this.instrumentName = instrumentName;
	}
	public String getTestMethodCodeNo() {
		return testMethodCodeNo;
	}
	public void setTestMethodCodeNo(String testMethodCodeNo) {
		this.testMethodCodeNo = testMethodCodeNo;
	}
	
	public String getSampleTypeCodeNo() {
		return sampleTypeCodeNo;
	}
	public void setSampleTypeCodeNo(String sampleTypeCodeNo) {
		this.sampleTypeCodeNo = sampleTypeCodeNo;
	}
	
	public String getDisciplineCodeNo() {
		return disciplineCodeNo;
	}
	public void setDisciplineCodeNo(String disciplineCodeNo) {
		this.disciplineCodeNo = disciplineCodeNo;
	}
	public String getItemTypeName() {
		return itemTypeName;
	}
	public void setItemTypeName(String itemTypeName) {
		this.itemTypeName = itemTypeName;
	}
	public String getTestMethodIdString() {
		return testMethodIdString;
	}
	public void setTestMethodIdString(String testMethodIdString) {
		this.testMethodIdString = testMethodIdString;
	}
	public String getDisciplineIdString() {
		return disciplineIdString;
	}
	public void setDisciplineIdString(String disciplineIdString) {
		this.disciplineIdString = disciplineIdString;
	}
	public String getSampleTypeIdString() {
		return sampleTypeIdString;
	}
	public void setSampleTypeIdString(String sampleTypeIdString) {
		this.sampleTypeIdString = sampleTypeIdString;
	}
	public String getResultTypeIdString() {
		return resultTypeIdString;
	}
	public void setResultTypeIdString(String resultTypeIdString) {
		this.resultTypeIdString = resultTypeIdString;
	}
	
	
}
