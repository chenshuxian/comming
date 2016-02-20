package com.daan.domain;

import java.io.Serializable;
import java.util.Date;

import com.daan.logBean.Log;
import com.daan.logBean.LogModule;

/**
 * 
 * @ClassName: CtrDictCodes
 * @Description: TODO(基础数据字典)
 * @author xieruiyun
 * @date 2015年11月25日 下午3:34:10
 */
@LogModule(moduleName = Constant.MODULE_CTRDICTCODES, entityName = Constant.ENTITY_CTRDICTCODES, moduleId = Constant.MODULEID_CTRDICTCODES)
public class CtrDictCodes implements Serializable, Cloneable  {

	private static final long serialVersionUID = -1981238512298073878L;
	/** 
	* @Fields id : TODO(主键) 
	*/
	private Long id;
	private String idString;
	/** 
	* @Fields typeKey : TODO(分类代码) 
	*/
	private Integer typeKey;
	/** 
	* @Fields codeNo : TODO(编码) 
	*/
	private String codeNo;
	/** 
	* @Fields name : TODO(中文名称) 
	*/
	private String name;
	/** 
	* @Fields enShortName : TODO(英文简称) 
	*/
	private String enShortName;
	/** 
	* @Fields enName : TODO(英文名称) 
	*/
	private String enName;
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

	public CtrDictCodes() {
		
	}

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
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

	@Log(name = "中文名称", order = 2, isSummary = true)
	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	@Log(name = "英文简称", order = 3, dynamicField = {"getTypeKey", "11"})
	public String getEnShortName() {
		return enShortName;
	}

	public void setEnShortName(String enShortName) {
		this.enShortName = enShortName;
	}

	@Log(name = "英文名称", order = 4, dynamicField = {"getTypeKey", "11"})
	public String getEnName() {
		return enName;
	}

	public void setEnName(String enName) {
		this.enName = enName;
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

	public String getStringId() {
		return this.id == null ? "" : this.id.toString();
	}
	

	public String getIdString() {
		return idString;
	}

	public void setIdString(String idString) {
		this.idString = idString;
	}

	@Override
	public Object clone() throws CloneNotSupportedException {
		CtrDictCodes ctrDictCodes = (CtrDictCodes) super.clone();
		return ctrDictCodes;
	}
}
