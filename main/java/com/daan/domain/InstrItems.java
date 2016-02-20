package com.daan.domain;

import java.io.Serializable;
import java.util.Date;

import com.daan.logBean.LogModule;

/**
 * @ClassName: instrItems
 * @Description: [仪器关联项目表]
 * @author xiaobing
 * @date 2015年12月10日 下午11:06:01
 */
@LogModule(moduleName = Constant.MODULE_INSTRITEMS, entityName = Constant.ENTITY_INSTRITEMS, moduleId = Constant.CODE_INSTRUMENTS)
public class InstrItems implements Serializable{
	
	private static final long serialVersionUID = 152189572720151215L;
	
	private Long    id;            // [主键id] — 关键字id，仪器项目对应表主键,使用 【系统id规则】                                                                                                                                           
	private Long    appId;         // [系统id] — 功能点、菜单对应那个系统，对应applications.id                                                                                                                                                    
	private Long    orgId;         // [实验室、机构id] — 一个字典对应一个实验室，对应 labs.id.                                                                                                                                                 
	private Long    instrumentId;  // [仪器id] — 外键，关联instruments.id                                                                                                                                                                                   
	private Long    testItemId;    // [检验项目id] — 检验项目id，关联ctr_test_items.id                                                                                                                                                                  
	private String  channelCode;   // [通道码] — 仪器对应项目的通道码, 例：ACT                                                                                                                                                                      
	private Integer factor;        // [转换系数] — 结果转换系数，由于检验使用不同浓度的实际需要进行一个转换才能得到真正的结果，一般复查才会使用高浓度试剂，结果=仪器结果X转换系数， 例：3000  
    private String  unit;          // [项目单位] —  项目单位内容使用ctr_dict_codes 并typekey=3                                                                                                                                                        
	private Integer printOrder;    // [打印顺序] — 报告打印时使用的顺序号                                                                                                                                                                           
	private Date    timeVersion;   // [时间版本] — 当新增、修改都需要把当前服务器时间写入次字段，用于同步数据用。    
	private String	frontClassName;// [前端通讯类] — 前端通讯类名                                                                          
	private String	className;     // [通讯类名] — 通讯使用的类名称      
	private String  codeNo;        // [编码] — 项目的全国统一码',                                                                                                          
	private String  name;          // [项目名称] — 检验项目的名称',
	private String  sampleTypeName;// [默认标本类型名称] — ,对应ctr_dict_codes的“标本类型”分类 
	private String  enShortName;   // [英文简称] — 英文名称缩写 
	private String testName;       // 项目名称
	private String testMethodName; // 检验方法名称
	
	public Long getId() {
		return id;
	}
	public void setId(Long id) {
		this.id = id;
	}
	public Long getAppId() {
		return appId;
	}
	public void setAppId(Long appId) {
		this.appId = appId;
	}
	public Long getOrgId() {
		return orgId;
	}
	public void setOrgId(Long orgId) {
		this.orgId = orgId;
	}
	public Long getInstrumentId() {
		return instrumentId;
	}
	public void setInstrumentId(Long instrumentId) {
		this.instrumentId = instrumentId;
	}
	public Long getTestItemId() {
		return testItemId;
	}
	public void setTestItemId(Long testItemId) {
		this.testItemId = testItemId;
	}
	public String getChannelCode() {
		return channelCode;
	}
	public void setChannelCode(String channelCode) {
		this.channelCode = channelCode;
	}
	public Integer getFactor() {
		return factor;
	}
	public void setFactor(Integer factor) {
		this.factor = factor;
	}
	public String getUnit() {
		return unit;
	}
	public void setUnit(String unit) {
		this.unit = unit;
	}
	public Integer getPrintOrder() {
		return printOrder;
	}
	public void setPrintOrder(Integer printOrder) {
		this.printOrder = printOrder;
	}
	public Date getTimeVersion() {
		return timeVersion;
	}
	public void setTimeVersion(Date timeVersion) {
		this.timeVersion = timeVersion;
	}
	public String getTestName() {
		return testName;
	}
	public void setTestName(String testName) {
		this.testName = testName;
	}
	public String getTestMethodName() {
		return testMethodName;
	}
	public void setTestMethodName(String testMethodName) {
		this.testMethodName = testMethodName;
	}
	public String getFrontClassName() {
		return frontClassName;
	}
	public void setFrontClassName(String frontClassName) {
		this.frontClassName = frontClassName;
	}
	public String getClassName() {
		return className;
	}
	public void setClassName(String className) {
		this.className = className;
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
	public String getSampleTypeName() {
		return sampleTypeName;
	}
	public void setSampleTypeName(String sampleTypeName) {
		this.sampleTypeName = sampleTypeName;
	}
	public String getEnShortName() {
		return enShortName;
	}
	public void setEnShortName(String enShortName) {
		this.enShortName = enShortName;
	}
}
