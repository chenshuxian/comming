package com.daan.domain;

import java.io.Serializable;
import java.util.Date;

import com.daan.logBean.Log;
import com.daan.logBean.LogModule;

/**
 * 
 * @ClassName: LocDictCodes
 * @Description: TODO(本地基础字典)
 * @author xialing
 * @date 2016年01月11日
 *
 */
@LogModule(moduleName = Constant.MODULE_LOCDICTCODES, entityName = Constant.ENTITY_LOCDICTCODES, moduleId = Constant.MODULEID_LOCDICTCODES)
public class LocDictCodes implements Serializable, Cloneable {

	private static final long serialVersionUID = -1981238512298073878L;
	/** 
	* @Fields id : TODO(主键) 
	*/
	private Long id;
	/** 
	* @Fields id : TODO(主键) 
	*/
	private String idString; 	   // 避免前台页面中，JSON对象对long数据类型的精度丢失
	/** 
	* @Fields app_id : TODO() 
	*/
	private Long appId;
	/** 
	* @Fields org_id : TODO() 
	*/
	private Long orgId;
	/** 
	* @Fields typeKey : TODO(分类代码) 
	*/
	private Integer typeKey;
	/** 
	* @Fields codeNo : TODO(编码) 
	*/
	private String codeNo;
	/** 
	* @Fields codeNo : TODO(是否自动生成编码类型) 
	*/
	private String codeNoType;
	/** 
	* @Fields name : TODO(中文名称) 
	*/
	private String name;
	/** 
	* @Fields enName : TODO(英文名称) 
	*/
	private String enName;
	/** 
	* @Fields enShortName : TODO(英文简称) 
	*/
	private String enShortName;
	/** 
	* @Fields whonetCode : TODO(whonet编码) 
	*/
	private String whonetCode;
	/** 
	* @Fields fastCode : TODO(助记符) 
	*/
	private String fastCode;
	/** 
	* @Fields displayOrder : TODO(顺序号) 
	*/
	private Integer displayOrder;
	/** 
	* @Fields memo : TODO(备注) 
	*/
	private String memo;
	/** 
	* @Fields status : TODO(状态) 
	*/
	private Integer status;
	/** 
	* @Fields timeVersion : TODO(时间版本) 
	*/
	private Date timeVersion; 
	
	//新增查询中心库基础字典要用到
	/** 
	* @Fields id : TODO(主键) 
	*/
	private String ctrIString; 	   // 避免前台页面中，JSON对象对long数据类型的精度丢失
	/** 
	* @Fields typeKey : TODO(分类代码) 
	*/
	private Integer ctrTypeKey;
	/** 
	* @Fields codeNo : TODO(编码) 
	*/
	private String ctrCodeNo;
	/** 
	* @Fields name : TODO(中文名称) 
	*/
	private String ctrName;
	/** 
	* @Fields enShortName : TODO(英文简称) 
	*/
	private String ctrEnShortName;
	/** 
	* @Fields enName : TODO(英文名称) 
	*/
	private String ctrEnName;
	/** 
	* @Fields whonetCode : TODO(whonet编码) 
	*/
	private String ctrWhonetCode;
	/** 
	* @Fields fastCode : TODO(助记符) 
	*/
	private String ctrFastCode;
	/** 
	* @Fields displayOrder : TODO(顺序号) 
	*/
	private Integer ctrDisplayOrder;
	/** 
	* @Fields memo : TODO(备注) 
	*/
	private String ctrMemo;
	/** 
	* @Fields status : TODO(状态) 
	*/
	private Integer ctrStatus;
	/** 
	* @Fields timeVersion : TODO(时间版本) 
	*/
	private Date ctrTimeVersion;

	public LocDictCodes() {
		
	}

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}
	
	public String getIdString() {
		return idString;
	}

	public void setIdString(String idString) {
		this.idString = idString;
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

	public Integer getTypeKey() {
		return typeKey;
	}

	public void setTypeKey(Integer typeKey) {
		this.typeKey = typeKey;
	}

	@Log(name = "编码", order = 1, isSummary = true)
	public String getCodeNo() {
		return codeNo;
	}

	public void setCodeNo(String codeNo) {
		this.codeNo = codeNo;
	}
	
	public String getCodeNoType() {
		return codeNoType;
	}

	public void setCodeNoType(String codeNoType) {
		this.codeNoType = codeNoType;
	}

	@Log(name = "中文名称", order = 2, isSummary = true)
	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	@Log(name = "英文名称", order = 3, dynamicField = {"getTypeKey", "11"})
	public String getEnName() {
		return enName;
	}

	public void setEnName(String enName) {
		this.enName = enName;
	}
	
	@Log(name = "英文简称", order = 4, dynamicField = {"getTypeKey", "11"})
	public String getEnShortName() {
		return enShortName;
	}

	public void setEnShortName(String enShortName) {
		this.enShortName = enShortName;
	}

	@Log(name = "whonet编码", order = 5, dynamicField = {"getTypeKey", "2", "3", "4","5","6","7","8","9", "10", "11"})
	public String getWhonetCode() {
		return whonetCode;
	}

	public void setWhonetCode(String whonetCode) {
		this.whonetCode = whonetCode;
	}

	@Log(name = "助记符", order = 6, dynamicField = {"getTypeKey", "11"})
	public String getFastCode() {
		return fastCode;
	}

	public void setFastCode(String fastCode) {
		this.fastCode = fastCode;
	}

	@Log(name = "顺序号", order = 7)
	public Integer getDisplayOrder() {
		return displayOrder;
	}

	public void setDisplayOrder(Integer displayOrder) {
		this.displayOrder = displayOrder;
	}

	@Log(name = "备注", order = 8)
	public String getMemo() {
		return memo;
	}

	public void setMemo(String memo) {
		this.memo = memo;
	}

	@Log(name = "状态", valueFormat = Constant.STATUS_FORMAT, order = 9)
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
	
	public String getCtrIString() {
		return ctrIString;
	}

	public void setCtrIString(String ctrIString) {
		this.ctrIString = ctrIString;
	}

	public Integer getCtrTypeKey() {
		return ctrTypeKey;
	}

	public void setCtrTypeKey(Integer ctrTypeKey) {
		this.ctrTypeKey = ctrTypeKey;
	}

	public String getCtrCodeNo() {
		return ctrCodeNo;
	}

	public void setCtrCodeNo(String ctrCodeNo) {
		this.ctrCodeNo = ctrCodeNo;
	}

	public String getCtrName() {
		return ctrName;
	}

	public void setCtrName(String ctrName) {
		this.ctrName = ctrName;
	}

	public String getCtrEnShortName() {
		return ctrEnShortName;
	}

	public void setCtrEnShortName(String ctrEnShortName) {
		this.ctrEnShortName = ctrEnShortName;
	}

	public String getCtrEnName() {
		return ctrEnName;
	}

	public void setCtrEnName(String ctrEnName) {
		this.ctrEnName = ctrEnName;
	}

	public String getCtrWhonetCode() {
		return ctrWhonetCode;
	}

	public void setCtrWhonetCode(String ctrWhonetCode) {
		this.ctrWhonetCode = ctrWhonetCode;
	}

	public String getCtrFastCode() {
		return ctrFastCode;
	}

	public void setCtrFastCode(String ctrFastCode) {
		this.ctrFastCode = ctrFastCode;
	}

	public Integer getCtrDisplayOrder() {
		return ctrDisplayOrder;
	}

	public void setCtrDisplayOrder(Integer ctrDisplayOrder) {
		this.ctrDisplayOrder = ctrDisplayOrder;
	}

	public String getCtrMemo() {
		return ctrMemo;
	}

	public void setCtrMemo(String ctrMemo) {
		this.ctrMemo = ctrMemo;
	}

	public Integer getCtrStatus() {
		return ctrStatus;
	}

	public void setCtrStatus(Integer ctrStatus) {
		this.ctrStatus = ctrStatus;
	}

	public Date getCtrTimeVersion() {
		return ctrTimeVersion;
	}

	public void setCtrTimeVersion(Date ctrTimeVersion) {
		this.ctrTimeVersion = ctrTimeVersion;
	}

	@Override
	public Object clone() throws CloneNotSupportedException {
		LocDictCodes locDictCodes = (LocDictCodes) super.clone();
		return locDictCodes;
	}

}
