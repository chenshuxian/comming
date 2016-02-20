package com.daan.domain;

import java.util.Date;

import com.daan.enums.CtrInstrumentsType;
import com.daan.enums.IsAbleEnum;
import com.daan.logBean.Log;
import com.daan.logBean.LogModule;

/**
 * @ClassName: CtrInstruments
 * @Description: [中心仪器表]
 * @author zhoujie
 * @date 2015年11月26日 下午20:06:01
 */
@LogModule(moduleName = Constant.MODULE_CTRINSTRUMENTS, entityName = Constant.ENTITY_CTRINSTRUMENTS, moduleId = Constant.MODULEID_CTRINSTRUMENTS)
public class CtrInstruments implements Cloneable{

	private Long id;// 仪器id
	private String idString; // 仪器id, 避免前台页面中，JSON对象对long数据类型的精度丢失
	private String idStr; 
	private String codeNo;// 仪器代码
	private String name;// 仪器名称
	private String producer;// 生产厂家
	private String model;// 设备型号
	private String fastCode;// 助记符
	private Long sampleTypeId;// 默认标本类型id
	private String sampleTypeName;// 默认标本类型name
	private Long reportTemplateId;// 默认报告模板id
	private String reportTemplateName;// 默认报告模板name
	private Integer displayOrder;// 顺序号
	private Integer typeId;// 仪器分类
	private String typeName;// 仪器分类名称
	private Integer status;// [状态] — 停用标志， 0— 有用， 1— 停用
	private String statusName;//状态名称
	private Date timeVersion;// 时间版本
	private String sampleTypeCodeNo;//默认标本类型的CodeNo
	public CtrInstruments() {
	}

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	@Log(name = "仪器代码", isSummary = true)
	public String getCodeNo() {
		return codeNo;
	}

	public void setCodeNo(String codeNo) {
		this.codeNo = codeNo;
	}

	@Log(name = "仪器名称", isSummary = true)
	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	@Log(name = "生产厂家")
	public String getProducer() {
		return producer;
	}

	public void setProducer(String producer) {
		this.producer = producer;
	}

	@Log(name = "设备型号")
	public String getModel() {
		return model;
	}

	public void setModel(String model) {
		this.model = model;
	}

	@Log(name = "助记符")
	public String getFastCode() {
		return fastCode;
	}

	public void setFastCode(String fastCode) {
		this.fastCode = fastCode;
	}

	public Long getSampleTypeId() {
		return sampleTypeId;
	}

	public void setSampleTypeId(Long sampleTypeId) {
		this.sampleTypeId = sampleTypeId;
	}
	
	public String getSampleTypeSId() {
		return this.sampleTypeId == null ? "" : this.sampleTypeId.toString();
	}

	public Long getReportTemplateId() {
		return reportTemplateId;
	}

	public void setReportTemplateId(Long reportTemplateId) {
		this.reportTemplateId = reportTemplateId;
	}
	
	public String getReportTemplateSId() {
		return this.reportTemplateId == null ? "" : this.reportTemplateId.toString();
	}

	@Log(name = "顺序号")
	public Integer getDisplayOrder() {
		return displayOrder;
	}

	public void setDisplayOrder(Integer displayOrder) {
		this.displayOrder = displayOrder;
	}

	public Integer getTypeId() {
		return typeId;
	}

	public void setTypeId(Integer typeId) {
		this.typeId = typeId;
	}

	@Log(name = "仪器类型")
	public String getTypeName() {
		return CtrInstrumentsType.getTextByOrdinal(this.typeId);
	}

	public void setTypeName(String typeName) {
		this.typeName = typeName;
	}

	public Integer getStatus() {
		return status;
	}

	public void setStatus(Integer status) {
		this.status = status;
	}

	@Log(name = "状态")
	public String getStatusName() {
		if(this.status == null){
			return null;
		}
		return IsAbleEnum.valueOf(this.status.intValue());
	}

	public void setStatusName(String statusName) {
		this.statusName = statusName;
	}

	public Date getTimeVersion() {
		return timeVersion;
	}

	public void setTimeVersion(Date timeVersion) {
		this.timeVersion = timeVersion;
	}

	@Log(name = "默认报告模板")
	public String getReportTemplateName() {
		return reportTemplateName;
	}

	public void setReportTemplateName(String reportTemplateName) {
		this.reportTemplateName = reportTemplateName;
	}

	@Log(name = "默认标本类型")
	public String getSampleTypeName() {
		return sampleTypeName;
	}

	public void setSampleTypeName(String sampleTypeName) {
		this.sampleTypeName = sampleTypeName;
	}

	public String getIdString() {
		return id==null?"":id+"";
	}

	public void setIdString(String idString) {
		this.idString = idString;
	}
	
	public String getStringId() {
		return this.id == null ? "" : this.id.toString();
	}

	public Object clone() throws CloneNotSupportedException {  
        return super.clone();  
    }

	public String getIdStr() {
		return idStr;
	}

	public void setIdStr(String idStr) {
		this.idStr = idStr;
	}

	public String getSampleTypeCodeNo() {
		return sampleTypeCodeNo;
	}

	public void setSampleTypeCodeNo(String sampleTypeCodeNo) {
		this.sampleTypeCodeNo = sampleTypeCodeNo;
	}
	
	
}
