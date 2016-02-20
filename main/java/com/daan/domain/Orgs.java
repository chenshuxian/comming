package com.daan.domain;

import java.io.Serializable;
import java.util.Date;

import com.daan.logBean.LogModule;

/**
 * @ClassName: Orgs
 * @Description: [机构单位表]
 * @author xiaobing
 * @date 2015年12月10日 下午11:06:01
 */
@LogModule(moduleName = Constant.MODULE_ORGS, entityName = Constant.ENTITY_ORGS, moduleId = Constant.CODE_INSTRUMENTS)
public class Orgs implements Serializable{
	
	private static final long serialVersionUID = 202589572773711550L;
	
	private Long    id;   		 // [主键id] — 关键字id                                                                                                                                                                                                                                                                                                                                                                        
	private Integer orgTypeId;   // [机构分类id] — 机构分类标志，  1— 独立实验室 ，2— 医疗机构， 3— 行政管理机构                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                
	private String  codeNo;  	 // [代码] — 实验室或机构代码。                                                                                                                                                                                                                                                                                                                                                          
	private String  nacaoId;     // [卫生机构代码] — 全国组织机构代码管理中心统一分配的代码。                                                                                                                                                                                                                                                                                                             
	private Long    regionId;    // [区域id] — 所属区域id， 对应regions.id.    
	private String  regionName;  // [区域名称] — 所属区域id， 对应regions.id.    
	private String  name;        // [名称] — 实验室或机构名称                                                                                                                                                                                                                                                                                                                                                             
	private String  shortName;   // [简称] — 实验室// 机构的简称                                                                                                                                                                                                                                                                                                                                                          
	private String  address;     // [地址] — 实验室// 机构的地址。                                                                                                                                                                                                                                                                                                                                                       
	private String  enName;      // [英文名称] — 实验室// 机构的英文名称                                                                                                                                                                                                                                                                                                                                              
	private String  enShortName; // [英文简称] — 实验室// 机构的英文简称.                                                                                                                                                                                                                                                                                                                                             
	private String  enAddress;   // [英文地址] — 实验室// 机构的英文地址                                                                                                                                                                                                                                                                                                                                              
	private String  webUrl;      // [网址] — 实验室// 机构的网址url.                                                                                                                                                                                                                                                                                                                                                      
	private String  contacts;    // [联系人] — 实验室// 机构的联系人.                                                                                                                                                                                                                                                                                                                                                   
	private String  telephone;   // [联系电话] — 实验室// 机构的联系电话                                                                                                                                                                                                                                                                                                                                              
	private String  fax;   		 // [传真号码] — 实验室// 机构的传真号码。                                                                                                                                                                                                                                                                                                                                           
	private String  fastCode;    // [助记符] — 快速录入的代码                                                                                                                                                                                                                                                                                                                                                             
	private Integer displayOrder;// [顺序号] — 基础字典显示用的顺序号                                                                                                                                                                                                                                                                                                                                                 
	private String  memo;        // [备注] — 备注内容                                                                                                                                                                                                                                                                                                                                                                         
	private Integer status;      // [状态] — 停用标志，1 —使用, 0 — 停用                                                                                                                                                                                                                                                                                                                                             
	private Date    timeVersion; // [时间版本] — 当新增// 修改都需要把当前服务器时间写入次字段，用于同步数据用。  
	public Long getId() {
		return id;
	}
	public void setId(Long id) {
		this.id = id;
	}
	public Integer getOrgTypeId() {
		return orgTypeId;
	}
	public void setOrgTypeId(Integer orgTypeId) {
		this.orgTypeId = orgTypeId;
	}
	public String getCodeNo() {
		return codeNo;
	}
	public void setCodeNo(String codeNo) {
		this.codeNo = codeNo;
	}
	public String getNacaoId() {
		return nacaoId;
	}
	public void setNacaoId(String nacaoId) {
		this.nacaoId = nacaoId;
	}
	public Long getRegionId() {
		return regionId;
	}
	public void setRegionId(Long regionId) {
		this.regionId = regionId;
	}
	public String getName() {
		return name;
	}
	public void setName(String name) {
		this.name = name;
	}
	public String getShortName() {
		return shortName;
	}
	public void setShortName(String shortName) {
		this.shortName = shortName;
	}
	public String getAddress() {
		return address;
	}
	public void setAddress(String address) {
		this.address = address;
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
	public String getEnAddress() {
		return enAddress;
	}
	public void setEnAddress(String enAddress) {
		this.enAddress = enAddress;
	}
	public String getWebUrl() {
		return webUrl;
	}
	public void setWebUrl(String webUrl) {
		this.webUrl = webUrl;
	}
	public String getContacts() {
		return contacts;
	}
	public void setContacts(String contacts) {
		this.contacts = contacts;
	}
	public String getTelephone() {
		return telephone;
	}
	public void setTelephone(String telephone) {
		this.telephone = telephone;
	}
	public String getFax() {
		return fax;
	}
	public void setFax(String fax) {
		this.fax = fax;
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
	public String getRegionName() {
		return regionName;
	}
	public void setRegionName(String regionName) {
		this.regionName = regionName;
	}
	public String getStringId() {
		return this.id == null ? "" : this.id.toString();
	}
}
