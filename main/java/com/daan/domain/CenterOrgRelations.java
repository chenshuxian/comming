package com.daan.domain;

import java.io.Serializable;
import java.util.Date;

import com.daan.logBean.LogModule;
/**
 * 
 * @ClassName: CenterOrgRelations 
 * @Description: TODO([行政机构关系关联表] — 行政机构关联关系描述，用此表重新描述行政机构之间的关系) 
 * @author zhangliping
 * @date 2015年12月29日 下午3:25:20
 */
@LogModule(moduleName = Constant.MODULE_CENTERORGRELATIONS, entityName = Constant.ENTITY_CENTERORGRELATIONS,moduleId = Constant.MODULEID_CENTERORGRELATIONS)
public class CenterOrgRelations implements Serializable, Cloneable {
	private static final long serialVersionUID = 4476690469879825251L;
	/**
	 * 主键id — 关键子id
	 */
	private Long id;
	/**
	 * 父机构id — 父机构id对应 ctr_orgs.id
	 */
	private Long parentId;
	/**
	 * 子机构id  — 子机构的id字段，对应ctr_orgs.id
	 */
	private Long childId;
	/**
	 * 时间版本 — 当新增、修改都需要把当前服务器时间写入次字段，用于同步数据用
	 */
	private Date timeVersion;
	public Long getId() {
		return id;
	}
	public void setId(Long id) {
		this.id = id;
	}
	public Long getParentId() {
		return parentId;
	}
	public void setParentId(Long parentId) {
		this.parentId = parentId;
	}
	public Long getChildId() {
		return childId;
	}
	public void setChildId(Long childId) {
		this.childId = childId;
	}
	public Date getTimeVersion() {
		return timeVersion;
	}
	public void setTimeVersion(Date timeVersion) {
		this.timeVersion = timeVersion;
	}
	
}
