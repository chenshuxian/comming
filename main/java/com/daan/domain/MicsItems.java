package com.daan.domain;

/**
 * @ClassName: MicsItems
 * @Description: [微生物表]
 * @author zhoujie
 * @date 2016年01月16日
 */
public class MicsItems {

	private Long id;// id
	private String idString;
	private String codeNo;// 仪器代码
	private Integer itemTypeId; // 分类
	private String name; // 中文名称
	private String enShortName; // 英文简称

	public MicsItems() {
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

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public String getEnShortName() {
		return enShortName;
	}

	public void setEnShortName(String enShortName) {
		this.enShortName = enShortName;
	}

}
