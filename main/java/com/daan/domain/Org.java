package com.daan.domain;

import com.daan.logBean.Log;
import com.daan.logBean.LogModule;

import java.io.Serializable;
import java.util.Date;

/**
 * @ClassName: Orgs 
 * @Description: TODO([机构单位表] — 存储实验室及机构相关的信息，包括名称、电话、报告抬头等内容) 
 * @author liuguilin
 * @date 2016年01月12日 上午10:41:03
 */

public class Org implements Serializable, Cloneable {
	private static final long serialVersionUID = -397381396655487717L;
	/**
	 * 主键id
	 */
	private Long id;
	/**
	 * id, 避免前台页面中，JSON对象对long数据类型的精度丢失
	 */
	private String idString;
	/**
	 * 机构分类id，机构分类标志，  1— 独立实验室 ，2— 医疗机构\n两种分类的数据字典差异：\n独立实验室: 没有卫生机构代码, 有网址\n医疗机构 :有卫生机构代码，没有网址
	 */
	private Integer orgTypeId;
	/**
	 * 实验室或机构代码
	 */
	private String codeNo;
	/**
	 * 卫生机构代码
	 */
	private String nacaoId; 
	/**
	 * 区域id
	 */
	private Long regionId;
	/**
	 * 地区名称
	 */
	private String regionName;
	/**
	 * 实验室或机构名称
	 */
	private String name;
	/**
	 * 实验室、机构的简称
	 */
	private String shortName;
	/**
	 * 实验室、机构的地址
	 */
	private String address;
	/**
	 * 实验室、机构的英文名称
	 */
	private String enName;
	/**
	 * 实验室、机构的英文简称
	 */
	private String enShortName;
	/**
	 * 实验室、机构的英文地址
	 */
	private String enAddress;
	/**
	 * 实验室、机构的网址url
	 */
	private String webUrl;
	/**
	 * 实验室、机构的联系人
	 */
	private String contacts;
	/**
	 * 实验室、机构的联系电话
	 */
	private String telephone;
	/**
	 * 实验室、机构的传真号码
	 */
	private String fax;
	/**
	 * 助记符,快速录入的代码
	 */
	private String fastCode;
	/**
	 * 基础字典显示用的顺序号
	 */
	private Integer displayOrder;
	/**
	 * 备注内容
	 */
	private String memo;
	/**
	 *  状态标识
	 */
	private Integer status;
	/**
	 * 时间版本
	 */
	private Date timeVersion;
	
	public Org() {
	}

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
	
	@Log(name = "编码", order = 1, isSummary = true)
	public String getCodeNo() {
		return codeNo;
	}

	public void setCodeNo(String codeNo) {
		this.codeNo = codeNo;
	}
	
	@Log(name = "卫生机构代码", order = 3, dynamicField = {"getOrgTypeId", "41"})
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
	
	@Log(name = "中文名称", order = 4, isSummary = true)
	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	@Log(name = "中文简称", order = 5)
	public String getShortName() {
		return shortName;
	}

	public void setShortName(String shortName) {
		this.shortName = shortName;
	}
	
	@Log(name = "中文地址", order = 6)
	public String getAddress() {
		return address;
	}

	public void setAddress(String address) {
		this.address = address;
	}
	
	@Log(name = "英文名称", order = 7)
	public String getEnName() {
		return enName;
	}

	public void setEnName(String enName) {
		this.enName = enName;
	}
	
	@Log(name = "英文简称", order = 8)
	public String getEnShortName() {
		return enShortName;
	}

	public void setEnShortName(String enShortName) {
		this.enShortName = enShortName;
	}
	
	@Log(name = "英文地址", order = 9)
	public String getEnAddress() {
		return enAddress;
	}

	public void setEnAddress(String enAddress) {
		this.enAddress = enAddress;
	}
	
	@Log(name = "网站名称（地址）", order = 10, dynamicField = {"getOrgTypeId", "40"})
	public String getWebUrl() {
		return webUrl;
	}

	public void setWebUrl(String webUrl) {
		this.webUrl = webUrl;
	}
	
	@Log(name = "联系人", order = 11)
	public String getContacts() {
		return contacts;
	}

	public void setContacts(String contacts) {
		this.contacts = contacts;
	}
	
	@Log(name = "联系电话", order = 12)
	public String getTelephone() {
		return telephone;
	}

	public void setTelephone(String telephone) {
		this.telephone = telephone;
	}
	
	@Log(name = "传真号", order = 13)
	public String getFax() {
		return fax;
	}

	public void setFax(String fax) {
		this.fax = fax;
	}
	
	@Log(name="助记符",order = 14)
	public String getFastCode() {
		return fastCode;
	}

	public void setFastCode(String fastCode) {
		this.fastCode = fastCode;
	}
	
	@Log(name = "顺序号", order = 15)
	public Integer getDisplayOrder() {
		return displayOrder;
	}

	public void setDisplayOrder(Integer displayOrder) {
		this.displayOrder = displayOrder;
	}
	
	@Log(name="备注",order = 16)
	public String getMemo() {
		return memo;
	}

	public void setMemo(String memo) {
		this.memo = memo;
	}
	
	@Log(name="状态",order = 17, valueFormat = Constant.STATUS_FORMAT)
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
	
	@Log(name="所属地区", order = 2)
	public String getRegionName() {
		return regionName;
	}
	
	public void setRegionName(String regionName) {
		this.regionName = regionName;
	}

	public String getIdString() {
		return idString;
	}

	public void setIdString(String idString) {
		this.idString = idString;
	}
	@Override
	public Object clone() throws CloneNotSupportedException {
		Org centerOrg = (Org) super.clone();
		return centerOrg;
	}
	
}
