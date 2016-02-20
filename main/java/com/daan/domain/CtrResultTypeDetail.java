package com.daan.domain;

import java.io.Serializable;
import java.util.Date;

import com.daan.logBean.Log;
import com.daan.logBean.LogModule;

/**
 * 
 * @ClassName: CtrResultTypeDetail
 * @Description: 结果类型明细Entity
 * @author zengxiaowang
 * @date 2015年11月23日 下午3:36:56
 *
 */
@LogModule(moduleName = Constant.MODULE_CTRRESULTTYPESDETAIL, entityName = Constant.MODULE_CTRRESULTTYPESDETAIL, moduleId = Constant.MODULEID_CTRRESULTTYPES)
public class CtrResultTypeDetail implements Serializable, Cloneable {

	private static final long serialVersionUID = -7252721558241976851L;

	private Long id;

	/**
	 * @Fields typeId : TODO(结果类型id)
	 */
	private long typeId;

	/**
	 * @Fields resultValue : TODO(结果内容)
	 */
	private String resultValue;

	/**
	 * @Fields fastCode : TODO(助记符)
	 */
	private String fastCode;

	/**
	 * @Fields displayOrder : TODO(顺序号)
	 */
	private Integer displayOrder;

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

	public long getTypeId() {
		return typeId;
	}

	public void setTypeId(long typeId) {
		this.typeId = typeId;
	}

	@Log(name = "结果描述", order = 3)
	public String getResultValue() {
		return resultValue;
	}

	public void setResultValue(String resultValue) {
		this.resultValue = resultValue;
	}

	@Log(name = "助记符", order = 4)
	public String getFastCode() {
		return fastCode;
	}

	public void setFastCode(String fastCode) {
		this.fastCode = fastCode;
	}

	@Log(name = "顺序号", order = 5)
	public Integer getDisplayOrder() {
		return displayOrder;
	}

	public void setDisplayOrder(Integer displayOrder) {
		this.displayOrder = displayOrder;
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
}
