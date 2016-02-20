package com.daan.domain;

import java.util.Date;
import com.daan.logBean.Log;
import com.daan.logBean.LogModule;
/**
 * @ClassName: CtrRegions 
 * @Description: TODO([地区字典表] — 记录省、市、县...等字典信息， 地区是一个属性结构的信息，使用左、右值的方式进行记录。) 
 * @author Wumingjava
 * @date 2015年11月26日 上午11:46:44
 */
@LogModule(entityName = Constant.ENTITY_CTRREGIONS, moduleName = Constant.MODULE_CTRREGIONS,moduleId=Constant.CODE_CTRREGIONS)
public class CtrRegions {
	private static final long serialVersionUID = 522889572773714584L;
	/**
	 * 主键id
	 */
	private Long id;
	/**
	 * 代码
	 */
	private String codeNo;
	/**
	 * 名称
	 */
	private String name;
	/**
	 * 英文简称
	 */
	private String enShortName;
	/**
	 * 英文名称
	 */
	private String enName;
	/**
	 * 助记符
	 */
	private String fastCode;
	/**
	 * 左值
	 */
	private int leftValue;
	/**
	 * 右值
	 */
	private int rightValue;
	/**
	 * 状态标识， 0— 停用，1— 可用。
	 */
	private int status;
	/**
	 * 时间版本
	 */
	private Date timeVersion;
	/**
	 * 树的层级
	 */
	private int tier;

	public CtrRegions() {

	}
	public CtrRegions(Long id) {
		this.id = id;
	}

	public int getTier() {
		return tier;
	}

	public void setTier(int tier) {
		this.tier = tier;
	}

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}
	
	@Log(name="编码",order=10,isSummary=true)
	public String getCodeNo() {
		return codeNo;
	}

	public void setCodeNo(String codeNo) {
		this.codeNo = codeNo;
	}
	@Log(name="名称",order=20,isSummary=true)
	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}
	@Log(name="英文简称",order=29)
	public String getEnShortName() {
		return enShortName;
	}
	public void setEnShortName(String enShortName) {
		this.enShortName = enShortName;
	}
	@Log(name="英文名称",order=30)
	public String getEnName() {
		return enName;
	}

	public void setEnName(String enName) {
		this.enName = enName;
	}
	@Log(name="助记符",order=40)
	public String getFastCode() {
		return fastCode;
	}

	public void setFastCode(String fastCode) {
		this.fastCode = fastCode;
	}

	public int getLeftValue() {
		return leftValue;
	}

	public void setLeftValue(int leftValue) {
		this.leftValue = leftValue;
	}

	public int getRightValue() {
		return rightValue;
	}

	public void setRightValue(int rightValue) {
		this.rightValue = rightValue;
	}
	public int getStatus() {
		return status;
	}

	public void setStatus(int status) {
		this.status = status;
	}
	public Date getTimeVersion() {
		return timeVersion;
	}

	public void setTimeVersion(Date timeVersion) {
		this.timeVersion = timeVersion;
	}
}
