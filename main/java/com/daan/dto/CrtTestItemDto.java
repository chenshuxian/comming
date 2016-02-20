package com.daan.dto;

/**
 * 
 * @ClassName: CrtTestItemDto 
 * @Description: TODO(检测项目DTO) 
 * @author xieruiyun
 * @date 2015年11月26日 上午11:36:14
 */
public class CrtTestItemDto {
	
	private String idString;
	private Long id;             //'[主键id] — 关键字id,使用 【中心字典id规则】',                                                                                              
	private Integer itemTypeId;        //'[项目分类id] — 项目分类:1 — 单项 ， 2— 组合， 3—套餐',                                                                           
	private String codeNo;         //'[编码] — 项目的全国统一码',                                                                                                          
	private String name;           //'[项目名称] — 检验项目的名称',                                                                                                           
	private String enName;         //'[英文名称] — 项目的英文名称',                                                                                                        
	private String enShortName;    //'[英文简称] — 英文名称缩写 ',                                                                                               
	private Integer sexId;             //'[性别id] — 项目性别显示, 1— 男， 2— 女， 3— 不限。',                                                                                   
	private Long testMethodId;   //'[检验方法id] —   ,对应ctr_dict_codes的“检验方法”分类',                                                                   
	private Long sampleTypeId;   //'[默认标本类型id] — ,对应ctr_dict_codes的“标本类型”分类',                                                                     
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
	private Long instrumentId; //仪器id
	
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
	public void setDisplayOrder(Integer displayOrder) {
		this.displayOrder = displayOrder;
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
	public Long getResultPrecision() {
		return resultPrecision;
	}
	public void setResultPrecision(Long resultPrecision) {
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
	public Integer getDisplayOrder() {
		return displayOrder;
	}
	public String getIdString() {
		return idString;
	}
	public void setIdString(String idString) {
		this.idString = idString;
	}
	public Long getInstrumentId() {
		return instrumentId;
	}
	public void setInstrumentId(Long instrumentId) {
		this.instrumentId = instrumentId;
	}
	public String getResultTypeName() {
		return resultTypeName;
	}
	public void setResultTypeName(String resultTypeName) {
		this.resultTypeName = resultTypeName;
	}
	
}
