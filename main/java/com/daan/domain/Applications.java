package com.daan.domain;

import java.util.Date;
import com.daan.logBean.LogModule;

/**
 * @ClassName: CtrLoinc
 * @Description: TODO([LOINC编码对应表] - 检验项目与LOINC编码的对应关系表， 有这个对应表可以使得标本中检验项目能找到LOINC编码。
 * 检验项目对应LOINC 是通过 一下六个属性（受检成份 component_id,受检属性 property_id, 检验方法 test_method_id,样本标识 type_of_scale_id,
 * 时间特性 time_aspect_id,标本类型 sample_type_id）分别进行对照而得出LOINC编码。)
 * @author xiaobing
 * @date 2015年12月07日 上午11:06:01
 */
@LogModule(entityName = Constant.ENTITY_APPLICATIONS, moduleName = Constant.MODULE_APPLICATIONS, moduleId=Constant.MODULEID_APPLICATIONS)
public class Applications implements Cloneable{
	
	private Long id;		   		//主键
	private String idString;		    //对应页面显示主键
	private String codeNo;		   	//编码 — 字典的编码',
	private String name;		   	//名称 — 字典内容的名称，字典的主要内容字段',
	private Integer display_order;	//顺序号 — 显示用的顺序号.',
	private String memo;		   	//备注 — 备注内容，描述内容。',
	private Integer status;		   	//状态 — 停用标志，1 —使用, 0 — 停用',
	private Date timeVersion;		//时间版本 
	
	public Applications(){
	}

	public Long getId() {
		return id;
	}

	public String getIdString() {
		return idString;
	}
	public void setId(Long id) {
		this.id = id;
		this.idString = String.valueOf(id);
	}
	public String getCodeNo() {
		return codeNo;
	}

	public void setCodeNo(String codeNo) {
		this.codeNo = codeNo;
	}

	public void setIdString(String idString) {
		this.idString = idString;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public Integer getDisplay_order() {
		return display_order;
	}

	public void setDisplay_order(Integer display_order) {
		this.display_order = display_order;
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
}
