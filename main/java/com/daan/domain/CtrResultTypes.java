package com.daan.domain;

import java.io.Serializable;
import java.util.Date;

import com.daan.logBean.Log;
import com.daan.logBean.LogModule;

/**
 * 
* @ClassName: ResultType 
* @Description: 结果类型Entity
* @author zengxiaowang
* @date 2015年11月23日 下午3:36:56 
*
 */
@LogModule(moduleName = Constant.MODULE_CTRRESULTTYPES, entityName = Constant.ENTITY_CTRRESULTTYPES, moduleId = Constant.MODULEID_CTRRESULTTYPES)
public class CtrResultTypes implements Serializable, Cloneable {
	
	private static final long serialVersionUID = -7252721558241976851L;
	
	private Long id;
	
	/** 
	* @Fields codeNo : TODO(编码) 
	*/
	private String codeNo;
	
	/** 
	* @Fields name : TODO(中文名称) 
	*/
	private String name;
	
	/** 
	* @Fields id : TODO(顺序号) 
	*/
	private Integer displayOrder;
	
	/** 
	* @Fields status : TODO(状态) 
	*/
	private Integer status;
	
	/** 
	* @Fields timeVersion : TODO(时间版本 — 当新增、修改都需要把当前服务器时间写入次字段) 
	*/
	private Date timeVersion;
	
	
	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
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

	@Log(name="顺序号",order=3)
	public Integer getDisplayOrder() {
		return displayOrder;
	}

	public void setDisplayOrder(Integer displayOrder) {
		this.displayOrder = displayOrder;
	}
	
	@Log(name = "状态", order = 4, valueFormat = Constant.STATUS_FORMAT)
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

	@Override
	public Object clone() throws CloneNotSupportedException {
		CtrResultTypes ctrResultType = (CtrResultTypes) super.clone();
		return ctrResultType;
	}
}
