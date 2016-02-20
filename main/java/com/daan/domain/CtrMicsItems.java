package com.daan.domain;

import java.util.Date;

import com.daan.logBean.LogModule;

/**
 * @ClassName: CtrMicsItems
 * @Description: [中心微生物表]
 * @author zhoujie
 * @date 2015年12月16日 下午20:06:01
 */
@LogModule(moduleName = Constant.MODULE_CTRMICITEMS, entityName = Constant.ENTITY_CTRMICITEMS, moduleId = Constant.MODULEID_CTRMICITEMS)
public class CtrMicsItems {

	private Long id;// 仪器id
	private String idString; // 仪器id, 避免前台页面中，JSON对象对long数据类型的精度丢失
	private String codeNo;// 仪器代码
	private Integer itemTypeId; // 项目分类:1 — 细菌 ， 2— 抗生素
	private String name;// 中文名称
	private String enName;// 英文名称
	private String enShortName;// 英文简称
	private String whonetCode;// whonet编码
	private String fastCode;// 助记符
	private Integer displayOrder;// 顺序号
	private String memo;// 备注
	private Integer status;// 状态

	private Date timeVersion;// 时间版本

	public CtrMicsItems() {
	}

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public String getIdString() {
		return id==null?"":id+"";
	}

	public void setIdString(String idString) {
		this.idString = idString;
	}

	public String getCodeNo() {
		return codeNo;
	}

	public void setCodeNo(String codeNo) {
		this.codeNo = codeNo;
	}

	public Integer getItemTypeId() {
		return itemTypeId;
	}

	public void setItemTypeId(Integer itemTypeId) {
		this.itemTypeId = itemTypeId;
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

	public String getWhonetCode() {
		return whonetCode;
	}

	public void setWhonetCode(String whonetCode) {
		this.whonetCode = whonetCode;
	}

	public String getFastCode() {
		return fastCode;
	}

	public void setFastCode(String fastCode) {
		this.fastCode = fastCode;
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

	public Date getTimeVersion() {
		return timeVersion;
	}

	public void setTimeVersion(Date timeVersion) {
		this.timeVersion = timeVersion;
	}

}
