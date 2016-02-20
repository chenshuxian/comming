package com.daan.domain;

import java.util.Date;

import com.daan.enums.AgeUnitType;
import com.daan.enums.CheckBoxType;
import com.daan.enums.IsAbleEnum;
import com.daan.enums.SexType;
import com.daan.logBean.Log;
import com.daan.logBean.LogModule;

/**
 * @ClassName: CtrInstrumentsRefranges
 * @Description: [中心仪器常规项目参考值对应表]
 * @author zhoujie
 * @date 2015年12月25日 上午00:15:16
 */
@LogModule(moduleName = Constant.MODULE_CTRINSTRUMENTS_ITEM, entityName = Constant.ENTITY_CTRINSTRUMENTS_ITEM, moduleId = Constant.MODULEID_CTRINSTRUMENTS_ITEM)
public class CtrInstrumentsRefranges {

	private Long id;// 主键
	private String idString; // 参考值id, 避免前台页面中，JSON对象对long数据类型的精度丢失
	private Long instrumentId; // 仪器id
	private Long testItemId;// 项目id
	private String testItemName;// 项目名称
	private String sampleTypeId;// 标本类型id
	private String sampleTypeName;// 标本类型name
	private Integer sexId;// 性别id
	private String sexName;// 性别Name
	private Integer ageUnitId;// 年龄单位id
	private String ageUnitName;// 年龄单位Name
	private String ageMin;// 起始年龄
	private String ageMax;// 终止年龄
	private Integer calcAgeMin;// 起始年龄计算值
	private Integer calcAgeMax;// 终止年龄计算值
	private String refLow;// 参考下限
	private String refHigh;// 参考上限
	private String panicLow;// 危急下限
	private String panicHigh;// 危急上限
	private String alarmLow;// 警告下限
	private String alarmHigh;// 警告上限
	private String refText;// 文字描述
	private String refRemark;// 备注
	private String enRefRemark;// 英文备注
	private String enRefText;// 英文文字描述
	private Date timeVersion;// 时间版本

	private String instrumentName;//仪器名称
	private String codeNo;//编码
	
	public CtrInstrumentsRefranges() {
	}

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
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

	public String getSampleTypeId() {
		return sampleTypeId;
	}

	public void setSampleTypeId(String sampleTypeId) {
		this.sampleTypeId = sampleTypeId;
	}

	@Log(name = "标本类型")
	public String getSampleTypeName() {
		return sampleTypeName;
	}

	public void setSampleTypeName(String sampleTypeName) {
		this.sampleTypeName = sampleTypeName;
	}

	public Integer getSexId() {
		return sexId;
	}

	public void setSexId(Integer sexId) {
		this.sexId = sexId;
	}

	@Log(name = "性别")
	public String getSexName() {
		if(this.sexId == null){
			return null;
		}
		return SexType.valueOf(this.sexId.intValue());
	}

	public void setSexName(String sexName) {
		this.sexName = sexName;
	}

	public Integer getAgeUnitId() {
		return ageUnitId;
	}

	public void setAgeUnitId(Integer ageUnitId) {
		this.ageUnitId = ageUnitId;
	}

	@Log(name = "年龄单位")
	public String getAgeUnitName() {
		return AgeUnitType.getTextByOrdinal(this.ageUnitId);
	}

	public void setAgeUnitName(String ageUnitName) {
		this.ageUnitName = ageUnitName;
	}

	@Log(name = "起始年龄")
	public String getAgeMin() {
		return ageMin;
	}

	public void setAgeMin(String ageMin) {
		this.ageMin = ageMin;
	}

	@Log(name = "终止年龄")
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

	@Log(name = "参考下限")
	public String getRefLow() {
		return refLow;
	}

	public void setRefLow(String refLow) {
		this.refLow = refLow;
	}

	@Log(name = "参考上限")
	public String getRefHigh() {
		return refHigh;
	}

	public void setRefHigh(String refHigh) {
		this.refHigh = refHigh;
	}

	@Log(name = "危急下限")
	public String getPanicLow() {
		return panicLow;
	}

	public void setPanicLow(String panicLow) {
		this.panicLow = panicLow;
	}

	@Log(name = "危急上限")
	public String getPanicHigh() {
		return panicHigh;
	}

	public void setPanicHigh(String panicHigh) {
		this.panicHigh = panicHigh;
	}

	@Log(name = "警告下限")
	public String getAlarmLow() {
		return alarmLow;
	}

	public void setAlarmLow(String alarmLow) {
		this.alarmLow = alarmLow;
	}

	@Log(name = "警告上限")
	public String getAlarmHigh() {
		return alarmHigh;
	}

	public void setAlarmHigh(String alarmHigh) {
		this.alarmHigh = alarmHigh;
	}

	@Log(name = "文字描述")
	public String getRefText() {
		return refText;
	}

	public void setRefText(String refText) {
		this.refText = refText;
	}

	@Log(name = "备注")
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

	public String getIdString() {
		return id==null?"":id+"";
	}

	public void setIdString(String idString) {
		this.idString = idString;
	}
	
	@Log(name = "仪器名称", order = 2, isSummary = true)
	public String getInstrumentName() {
		return instrumentName;
	}

	public void setInstrumentName(String instrumentName) {
		this.instrumentName = instrumentName;
	}
	
	@Log(name = "仪器代码", order = 1, isSummary = true)
	public String getCodeNo() {
		return codeNo;
	}

	public void setCodeNo(String codeNo) {
		this.codeNo = codeNo;
	}

	@Log(name = "项目名称")
	public String getTestItemName() {
		return testItemName;
	}

	public void setTestItemName(String testItemName) {
		this.testItemName = testItemName;
	}

}
