package com.daan.domain;

import java.io.Serializable;
import java.util.Date;

import com.daan.logBean.Log;
import com.daan.logBean.LogModule;

/**
 * 
 * @ClassName: CtrInstrMics
 * @Description: TODO(微生物的细菌、抗生素仪器通道表)
 * @author zengxiaowang
 * @date 2015年12月8日 下午4:14:12
 *
 */
@LogModule(moduleName = Constant.MODULE_INSTRMICS, entityName = Constant.ENTITY_INSTRMICS, moduleId = Constant.MODULEID_INSTRMICS)
public class InstrMics implements Serializable, Cloneable {

	private static final long serialVersionUID = -1969222846604250983L;
	/**
	 * @Fields id : TODO(主键)
	 */
	private Long id;
	/**
	 * @Fields appId : TODO(系统id)
	 */
	private Long appId;
	/**
	 * @Fields orgId : TODO(实验室id)
	 */
	private Long orgId;
	/**
	 * @Fields instrumentId : TODO(仪器id)
	 */
	private Long instrumentId;
	/**
	 * @Fields itemTypeId : TODO(微生物项目分类)
	 */
	private Integer itemTypeId;
	/**
	 * @Fields channelCode : TODO(通道码)
	 */
	private String channelCode;
	/**
	 * @Fields micItemId : TODO(微生物项目id)
	 */
	private Long micItemId;
	/**
	 * @Fields printOrder : TODO(打印次序)
	 */
	private Integer printOrder;
	/**
	 * @Fields timeVersion : TODO([时间版本)
	 */
	private Date timeVersion;

	public InstrMics() {

	}

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	@Log(name = "系统id")
	public Long getAppId() {
		return appId;
	}

	public void setAppId(Long appId) {
		this.appId = appId;
	}

	@Log(name = "实验室id")
	public Long getOrgId() {
		return orgId;
	}

	public void setOrgId(Long orgId) {
		this.orgId = orgId;
	}

	@Log(name = "仪器id")
	public Long getInstrumentId() {
		return instrumentId;
	}

	public void setInstrumentId(Long instrumentId) {
		this.instrumentId = instrumentId;
	}

	@Log(name = "微生物项目分类")
	public Integer getItemTypeId() {
		return itemTypeId;
	}

	public void setItemTypeId(Integer itemTypeId) {
		this.itemTypeId = itemTypeId;
	}

	@Log(name = "通道码")
	public String getChannelCode() {
		return channelCode;
	}

	public void setChannelCode(String channelCode) {
		this.channelCode = channelCode;
	}

	@Log(name = "微生物项目id")
	public Long getMicItemId() {
		return micItemId;
	}

	public void setMicItemId(Long micItemId) {
		this.micItemId = micItemId;
	}

	@Log(name = "打印次序")
	public Integer getPrintOrder() {
		return printOrder;
	}

	public void setPrintOrder(Integer printOrder) {
		this.printOrder = printOrder;
	}

	public Date getTimeVersion() {
		return timeVersion;
	}

	public void setTimeVersion(Date timeVersion) {
		this.timeVersion = timeVersion;
	}

	@Override
	public Object clone() throws CloneNotSupportedException {
		InstrMics instrMics = (InstrMics) super.clone();
		return instrMics;
	}
}
