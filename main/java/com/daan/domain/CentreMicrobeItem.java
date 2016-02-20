package com.daan.domain;

import java.io.Serializable;
import java.util.Date;

import com.daan.logBean.Log;

/**
 * 
 * @ClassName: CentreMicrobeItem 
 * @Description: 中心微生物字典表实体类
 * @author liujiawei
 * @date 2015年12月10日 下午7:51:50
 */
public class CentreMicrobeItem  implements Serializable, Cloneable{
	
	private static final long serialVersionUID = 8288556996354626041L;
	
	//主键id
	private Long id;
	//编码,细菌或抗生素编码
	private String codeNo;
	//微生物项目分类:1:细菌,2:抗生素
	private Integer itemTypeId;
	//中文名称,细菌或抗生素的中文名称
	private String name;
	//英文简称,细菌或抗生素的英文简称
	private String enShortName;
	//英文名称
	private String enName;
	//whonet编码
	private String whonetCode;
	//助记符
	private String fastCode;
	//顺序号
	private Integer displayOrder;
	//备注
	private String memo;
	//状态
	private Integer status;
	//[时间版本] —  当新增、修改都需要把当前服务器时间写入此字段，用于同步数据用。
	private Date timeVersion;
	
	public CentreMicrobeItem() {
	
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
	

	public Integer getItemTypeId() {
		return itemTypeId;
	}
	public void setItemTypeId(Integer itemTypeId) {
		this.itemTypeId = itemTypeId;
	}
	
	@Log(name = "中文名称", order = 2, isSummary = true)
	public String getName() {
		return name;
	}
	public void setName(String name) {
		this.name = name;
	}
	
	@Log(name = "英文简称")
	public String getEnShortName() {
		return enShortName;
	}
	public void setEnShortName(String enShortName) {
		this.enShortName = enShortName;
	}
	
	@Log(name = "英文名称")
	public String getEnName() {
		return enName;
	}
	public void setEnName(String enName) {
		this.enName = enName;
	}
	
	@Log(name = "whonet编码")
	public String getWhonetCode() {
		return whonetCode;
	}
	public void setWhonetCode(String whonetCode) {
		this.whonetCode = whonetCode;
	}
	
	@Log(name = "助记符")
	public String getFastCode() {
		return fastCode;
	}
	public void setFastCode(String fastCode) {
		this.fastCode = fastCode;
	}
	
	@Log(name = "顺序号")
	public Integer getDisplayOrder() {
		return displayOrder;
	}
	public void setDisplayOrder(Integer displayOrder) {
		this.displayOrder = displayOrder;
	}
	
	@Log(name = "备注")
	public String getMemo() {
		return memo;
	}
	public void setMemo(String memo) {
		this.memo = memo;
	}
	
	@Log(name = "状态", valueFormat = Constant.STATUS_FORMAT)
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
		CentreMicrobeItem centreMicrobeItem = (CentreMicrobeItem) super.clone();
		return centreMicrobeItem;
	}
	
}
