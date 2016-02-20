package com.daan.domain;

import java.io.Serializable;
import java.util.Date;

import com.daan.logBean.Log;
import com.daan.logBean.LogModule;

/**
 * 
* @ClassName: CtrTubeTypes 
* @Description: TODO(试管类型) 
* @author zengxiaowang
* @date 2015年12月8日 下午4:14:12 
*
 */
@LogModule(moduleName = Constant.MODULE_CTRTUBETYPES, entityName = Constant.ENTITY_CTRTUBETYPES, moduleId = Constant.MODULEID_CTRTUBETYPES)
public class CtrTubeTypes implements Serializable, Cloneable {

	private static final long serialVersionUID = -1969222846604250983L;
	/** 
	* @Fields id : TODO(主键) 
	*/
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
	* @Fields enShortName : TODO(英文简称) 
	*/
	private String enShortName; 	
	/** 
	* @Fields enName : TODO(英文名称) 
	*/
	private String enName; 			
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
	* @Fields timeVersion : TODO([时间版本) 
	*/
	private Date timeVersion; 		
	/** 
	* @Fields barcodePrefix : TODO(条码前缀) 
	*/
	private String barcodePrefix;   
	/** 
	* @Fields colorHex : TODO(颜色值) 
	*/
	private String colorHex;		
	/** 
	* @Fields barcodeLen : TODO(条码长度) 
	*/
	private Integer barcodeLen;     
	
	public CtrTubeTypes() {
		
	}

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

	@Log(name = "英文简称", order = 3)
	public String getEnShortName() {
		return enShortName;
	}

	public void setEnShortName(String enShortName) {
		this.enShortName = enShortName;
	}

	@Log(name = "英文名称", order = 4)
	public String getEnName() {
		return enName;
	}

	public void setEnName(String enName) {
		this.enName = enName;
	}

	@Log(name = "助记符", order = 5)
	public String getFastCode() {
		return fastCode;
	}

	public void setFastCode(String fastCode) {
		this.fastCode = fastCode;
	}

	@Log(name = "顺序号", order = 6)
	public Integer getDisplayOrder() {
		return displayOrder;
	}

	public void setDisplayOrder(Integer displayOrder) {
		this.displayOrder = displayOrder;
	}

	@Log(name = "备注", order = 7)
	public String getMemo() {
		return memo;
	}

	public void setMemo(String memo) {
		this.memo = memo;
	}

	@Log(name = "状态", order = 8, valueFormat = Constant.STATUS_FORMAT)
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
	
	public String getBarcodePrefix() {
		return barcodePrefix;
	}

	public void setBarcodePrefix(String barcodePrefix) {
		this.barcodePrefix = barcodePrefix;
	}
	
	public String getColorHex() {
		return colorHex;
	}

	public void setColor_hex(String colorHex) {
		this.colorHex = colorHex;
	}

	public Integer getBarcodeLen() {
		return barcodeLen;
	}

	public void setBarcodeLen(Integer barcodeLen) {
		this.barcodeLen = barcodeLen;
	}
	
	public String getStringId() {
		return this.id == null ? "" : this.id.toString();
	}
	
	@Override
	public Object clone() throws CloneNotSupportedException {
		CtrTubeTypes ctrTubeTypes = (CtrTubeTypes) super.clone();
		return ctrTubeTypes;
	}
}
