package com.daan.dto;

import java.util.Date;

import com.daan.logBean.Log;
import com.daan.logBean.LogModule;

/**
 * 
 * @ClassName: BictionaryDto
 * @Description: TODO(字典表Dto)
 * @author xieruiyun
 * @date 2015年11月24日 下午9:47:20
 */
public class DictionaryDto{
	
	private String id; //id
	private String typeCode; //类型CODE
	private String typeName; //类型名称
	private String code; //编码
	private String cnName;//中文名
	private String enName;//英文名
	private String enAbbrName;//英文简称
	private String fastCode;//英文简称
	private int displayOrder;//顺序号，用于排列显示
	private String remark;//备注
	private Boolean active;//是否可用
	private int createBy;//创建者
	private Date createDate;//创建时间
	private int updateBy;//修改者
	private Date updateDate;//修改时间
	public String getId() {
		return id;
	}
	public void setId(String id) {
		this.id = id;
	}
	public String getTypeCode() {
		return typeCode;
	}
	public void setTypeCode(String typeCode) {
		this.typeCode = typeCode;
	}
	public String getTypeName() {
		return typeName;
	}
	public void setTypeName(String typeName) {
		this.typeName = typeName;
	}
	public String getCode() {
		return code;
	}
	public void setCode(String code) {
		this.code = code;
	}
	public String getCnName() {
		return cnName;
	}
	public void setCnName(String cnName) {
		this.cnName = cnName;
	}
	public String getEnName() {
		return enName;
	}
	public void setEnName(String enName) {
		this.enName = enName;
	}
	public String getEnAbbrName() {
		return enAbbrName;
	}
	public void setEnAbbrName(String enAbbrName) {
		this.enAbbrName = enAbbrName;
	}
	public String getFastCode() {
		return fastCode;
	}
	public void setFastCode(String fastCode) {
		this.fastCode = fastCode;
	}
	public int getDisplayOrder() {
		return displayOrder;
	}
	public void setDisplayOrder(int displayOrder) {
		this.displayOrder = displayOrder;
	}
	public String getRemark() {
		return remark;
	}
	public void setRemark(String remark) {
		this.remark = remark;
	}
	public Boolean getActive() {
		return active;
	}
	public void setActive(Boolean active) {
		this.active = active;
	}
	public int getCreateBy() {
		return createBy;
	}
	public void setCreateBy(int createBy) {
		this.createBy = createBy;
	}
	public Date getCreateDate() {
		return createDate;
	}
	public void setCreateDate(Date createDate) {
		this.createDate = createDate;
	}
	public int getUpdateBy() {
		return updateBy;
	}
	public void setUpdateBy(int updateBy) {
		this.updateBy = updateBy;
	}
	public Date getUpdateDate() {
		return updateDate;
	}
	public void setUpdateDate(Date updateDate) {
		this.updateDate = updateDate;
	}
	
}
