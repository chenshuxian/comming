package com.daan.domain;

import java.io.Serializable;
import java.util.Date;

import com.daan.logBean.LogModule;

/**
 * @ClassName: InstrRefranges
 * @Description: [本地仪器常规项目参考值对应表]
 * @author xiaobing
 * @date 2015年12月15日 下午11:06:01
 */
@LogModule(moduleName = Constant.MODULE_INSTRREFRANGES, entityName = Constant.ENTITY_INSTRREFRANGES, moduleId = Constant.CODE_INSTRUMENTS)
public class InstrRefranges implements Serializable{
	
	private static final long serialVersionUID = 152189572720151217L;
	
	private Long    id;				// [主键id] — 关键字id;使用 【系统id规则】                                                                                                                                                                                                                                                                                                     
	private Long    appId;			// [系统id] — 功能点、菜单对应那个系统，对应applications.id                                                                                                                                                                                                                                                                                
	private Long    orgId;			// [实验室、机构id] — 一个字典对应一个实验室，对应 labs.id.                                                                                                                                                                                                                                                                             
	private Long    instrumentId;	// [仪器id] — 对应ctr_instruments.id                                                                                                                                                                                                                                                                                                                    
	private Long    testItemId;		// [检验项目id] — 对应crt_test_items.id                                                                                                                                                                                                                                                                                                               
	private Long    sampleTypeId;	// [标本类型id] — 对应 ctr_dict_codes 的key = 1的数据                                                                                                                                                                                                                                                                                             
	private Integer sexId;			// [性别id] —  性别id ; 1— 男 ;2 — 女 ;3 — 不限                                                                                                                                                                                                                                                                                               
	private Integer ageUnitId;		// [年龄单位id] — 年龄单位id; 内容：1—岁;2—月;3—周;4—天;5—小时; 6 —详细年龄                                                                                                                                                                                                                                                
	private String  ageMin;			// [起始年龄] — 参考值起始年龄，中文内容例：                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                             
	private String  ageMax;			// [终止年龄] — 参考值年龄最大值;中文内容例：                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               
	private Integer calcAgeMin;		// [起始年龄计算值] —                                                                                                                                                                                                                                                                                                                                
	private Integer calcAgeMax;		// [终止年龄计算值] —                                                                                                                                                                                                                                                                                                                                
	private String  refLow;			// [参考下限] — 参考范围的参考低值，最小值。(只能保存数字)                                                                                                                                                                                                                                                                          
	private String  refHigh;		// [参考上限] — 参考范围参考高值，最大值.(只能保存数字)                                                                                                                                                                                                                                                                               
	private String  panicLow;		// [危急下限] — 参考范围的危急低值，危机最小值.(只能保存数字)                                                                                                                                                                                                                                                                      
	private String  panicHigh;		// [危急上限] — 参考范围的危急高值，危机最大值.(只能保存数字)                                                                                                                                                                                                                                                                      
	private String  alarmLow;		// [警告下限] — 警告低值，最小值。（只能保存数字）                                                                                                                                                                                                                                                                                     
	private String  alarmHigh;		// [警告上限] — 警告高值，最大值(只能保存数字)                                                                                                                                                                                                                                                                                            
	private String  refText;		// [文字描述] — 参考范围的文字描述内容;不进行偏高、偏低、危机判断。                                                                                                                                                                                                                                                            
	private String  refRemark;		// [备注] — 参考范围备注内容，文字内容                                                                                                                                                                                                                                                                                                       
	private String  enRefRemark;	// [英文备注] — ，英文文字内容。（只有独立实验室用）                                                                                                                                                                                                                                                                                  
	private String  enRefText;		// [英文文字描述] — 参考范围的英文文字描述内容;不进行偏高、偏低、危机判断。（只有独立实验室用）                                                                                                                                                                                                                  
	private Date    timeVersion;	// [时间版本] — 当新增、修改都需要把当前服务器时间写入次字段，用于同步数据用。 
	
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
	public Long getSampleTypeId() {
		return sampleTypeId;
	}
	public void setSampleTypeId(Long sampleTypeId) {
		this.sampleTypeId = sampleTypeId;
	}
	public Integer getSexId() {
		return sexId;
	}
	public void setSexId(Integer sexId) {
		this.sexId = sexId;
	}
	public Integer getAgeUnitId() {
		return ageUnitId;
	}
	public void setAgeUnitId(Integer ageUnitId) {
		this.ageUnitId = ageUnitId;
	}
	public String getAgeMin() {
		return ageMin;
	}
	public void setAgeMin(String ageMin) {
		this.ageMin = ageMin;
	}
	public String getAgeMax() {
		return ageMax;
	}
	public void setAgeMax(String ageMax) {
		this.ageMax = ageMax;
	}
	public Integer getCalcAgeMin() {
		return calcAgeMin;
	}
	public void setCalcAgeMin(Integer calcAgeMin) {
		this.calcAgeMin = calcAgeMin;
	}
	public Integer getCalcAgeMax() {
		return calcAgeMax;
	}
	public void setCalcAgeMax(Integer calcAgeMax) {
		this.calcAgeMax = calcAgeMax;
	}
	public String getRefLow() {
		return refLow;
	}
	public void setRefLow(String refLow) {
		this.refLow = refLow;
	}
	public String getRefHigh() {
		return refHigh;
	}
	public void setRefHigh(String refHigh) {
		this.refHigh = refHigh;
	}
	public String getPanicLow() {
		return panicLow;
	}
	public void setPanicLow(String panicLow) {
		this.panicLow = panicLow;
	}
	public String getPanicHigh() {
		return panicHigh;
	}
	public void setPanicHigh(String panicHigh) {
		this.panicHigh = panicHigh;
	}
	public String getAlarmLow() {
		return alarmLow;
	}
	public void setAlarmLow(String alarmLow) {
		this.alarmLow = alarmLow;
	}
	public String getAlarmHigh() {
		return alarmHigh;
	}
	public void setAlarmHigh(String alarmHigh) {
		this.alarmHigh = alarmHigh;
	}
	public String getRefText() {
		return refText;
	}
	public void setRefText(String refText) {
		this.refText = refText;
	}
	public String getRefRemark() {
		return refRemark;
	}
	public void setRefRemark(String refRemark) {
		this.refRemark = refRemark;
	}
	public String getEnRefRemark() {
		return enRefRemark;
	}
	public void setEnRefRemark(String enRefRemark) {
		this.enRefRemark = enRefRemark;
	}
	public String getEnRefText() {
		return enRefText;
	}
	public void setEnRefText(String enRefText) {
		this.enRefText = enRefText;
	}
	public Date getTimeVersion() {
		return timeVersion;
	}
	public void setTimeVersion(Date timeVersion) {
		this.timeVersion = timeVersion;
	}	
}
