package com.daan.domain;

import java.io.Serializable;
import java.util.Date;

import com.daan.logBean.LogModule;

/**
 * @ClassName: INSTRUMENTS
 * @Description: [仪器字典表]
 * @author xiaobing
 * @date 2015年12月10日 下午11:06:01
 */
@LogModule(moduleName = Constant.MODULE_INSTRUMENTS, entityName = Constant.ENTITY_INSTRUMENTS, moduleId = Constant.CODE_INSTRUMENTS)
public class Instruments implements Serializable{
	
	private static final long serialVersionUID = 155089572773711550L;
	
	private Long    id;				  // [仪器id] — 使用 【中心字典id规则】                         
	private String idString; 		  // 避免前台页面中，JSON对象对long数据类型的精度丢失
	private Long    appId;			  // [系统id] — 功能点、菜单对应那个系统，对应applications.id                                                                                            
	private Long    orgId;			  // [实验室、机构id] — 一个字典对应一个实验室，对应 labs.id.                                                                                         
	private String  codeNo;		  	  // [仪器代码] — 仪器编码                                                                                                                                        
	private String  name; 			  // [仪器名称] — 仪器的显示名称.                                                                                                                              
	private String  producer; 	      // [生产厂家] — 生产厂家名称.                                                                                                                                 
	private String  model; 			  // [设备型号] — 仪器设备的型号                                                                                                                               
	private String  fastCode;  	      // [助记符] — 用于快速搜索仪器。                                                                                                                            
	private Long    labGroupId; 	  // [实验室物理组id] — 仪器所属的实验室物理组，用于分发标本及整个检验过程区分科室标本。                                            
	private Long    sampleTypeId;     // [默认标本类型id] — 默认标本类型对应dict_codes.type_key=1的id字段                                                                                    
	private Long    rptTemplateId;    // [单列报告模板id] — 仪器对应的默认报告模板id,对应report_template.id 
	private String  rptTemplatenName; // [单列报告模板名称] 
	private Long    rptTemplate2Id;   // [双列报告模板] — 报告单对应的双列报告模板      
	private String  rptTemplate2Name; // [双列报告模板名称]      
	private Integer displayOrder;     // [顺序号] — 仪器显示的顺序号，用于列表现实排序。                                                                                                 
	private Integer typeId;      	  // [仪器分类] — 标记仪器属于种类别的仪器, 0 — 常规仪器, 1— 微生物仪器 , 如果选项未“是否微生物”则将次字段内容写为1.  
	private Integer status;      	  // [状态] — 停用标志，1 —使用, 0 — 停用                                                                                                                  
	private String  reportHeader;     // [报告抬头] — 仪器对应的报告抬头的其中一个变量.                                                                                                   
	private Date    purchaseDate;     // [购买日期] — 仪器的购买日期.                                                                                                                              
	private String  provider; 		  // [供应商] — 仪器销售公司                                                                                                                                     
	private Date    installDate;      // [安装日期] — 仪器的安装日期.                                                                                                                              
	private String  maintainer;       // [维护人员] — 仪器的维护人员。                                                                                                                            
	private String  maintainTel;      // [联系电话] — 仪器维护联系电话。                                                                                                                         
	private Date    timeVersion;      // [时间版本] — 当新增、修改都需要把当前服务器时间写入次字段，用于同步数据用。 
	private String purchaseDateString; // [购买日期] — 仪器的购买日期. YYYY-MM-DD
	private String installDateString; // [安装日期] — 仪器的安装日期. YYYY-MM-DD
	
	
	
	
	
	private String labGroupIdString;
	private String labGroupName;// [实验室物理组名称]
								// 默认标本类型对应dict_codes.type_key=1的id字段
	private String sampleTypeIdString;
	private String sampleTypeName; // [默认标本类型名称]
								// 仪器对应的默认报告模板id,对应report_template.id
	private String rptTemplateIdString;
									// 仪器对应的默认报告模板id,对应report_template.id
	private String rptTemplate2IdString;
	private String rptTemplateName; // [单列报告模板名称] [双列报告模板] — 报告单对应的双列报告模板
							// 如果选项未“是否微生物”则将次字段内容写为1.
	public Long getId() {
		return id;
	}
	public void setId(Long id) {
		this.id = id;
	}
	public Long getAppId() {
		return appId;
	}
	public void setAppId(Long appId) {
		this.appId = appId;
	}
	public Long getOrgId() {
		return orgId;
	}
	public void setOrgId(Long orgId) {
		this.orgId = orgId;
	}
	public String getCodeNo() {
		return codeNo;
	}
	public void setCodeNo(String codeNo) {
		this.codeNo = codeNo;
	}
	public String getName() {
		return name;
	}
	public void setName(String name) {
		this.name = name;
	}
	public String getProducer() {
		return producer;
	}
	public void setProducer(String producer) {
		this.producer = producer;
	}
	public String getModel() {
		return model;
	}
	public void setModel(String model) {
		this.model = model;
	}
	public String getFastCode() {
		return fastCode;
	}
	public void setFastCode(String fastCode) {
		this.fastCode = fastCode;
	}
	public Long getLabGroupId() {
		return labGroupId;
	}
	public void setLabGroupId(Long labGroupId) {
		this.labGroupId = labGroupId;
	}
	public Long getSampleTypeId() {
		return sampleTypeId;
	}
	public void setSampleTypeId(Long sampleTypeId) {
		this.sampleTypeId = sampleTypeId;
	}
	public Long getRptTemplateId() {
		return rptTemplateId;
	}
	public void setRptTemplateId(Long rptTemplateId) {
		this.rptTemplateId = rptTemplateId;
	}
	public String getRptTemplatenName() {
		return rptTemplatenName;
	}
	public void setRptTemplatenName(String rptTemplatenName) {
		this.rptTemplatenName = rptTemplatenName;
	}
	public Long getRptTemplate2Id() {
		return rptTemplate2Id;
	}
	public void setRptTemplate2Id(Long rptTemplate2Id) {
		this.rptTemplate2Id = rptTemplate2Id;
	}
	public String getRptTemplate2Name() {
		return rptTemplate2Name;
	}
	public void setRptTemplate2Name(String rptTemplate2Name) {
		this.rptTemplate2Name = rptTemplate2Name;
	}
	public Integer getDisplayOrder() {
		return displayOrder;
	}
	public void setDisplayOrder(Integer displayOrder) {
		this.displayOrder = displayOrder;
	}
	public Integer getTypeId() {
		return typeId;
	}
	public void setTypeId(Integer typeId) {
		this.typeId = typeId;
	}
	public Integer getStatus() {
		return status;
	}
	public void setStatus(Integer status) {
		this.status = status;
	}
	public String getReportHeader() {
		return reportHeader;
	}
	public void setReportHeader(String reportHeader) {
		this.reportHeader = reportHeader;
	}
	public Date getPurchaseDate() {
		return purchaseDate;
	}
	public void setPurchaseDate(Date purchaseDate) {
		this.purchaseDate = purchaseDate;
	}
	public String getProvider() {
		return provider;
	}
	public void setProvider(String provider) {
		this.provider = provider;
	}
	public Date getInstallDate() {
		return installDate;
	}
	public void setInstallDate(Date installDate) {
		this.installDate = installDate;
	}
	public String getMaintainer() {
		return maintainer;
	}
	public void setMaintainer(String maintainer) {
		this.maintainer = maintainer;
	}
	public String getMaintainTel() {
		return maintainTel;
	}
	public void setMaintainTel(String maintainTel) {
		this.maintainTel = maintainTel;
	}
	public Date getTimeVersion() {
		return timeVersion;
	}
	public void setTimeVersion(Date timeVersion) {
		this.timeVersion = timeVersion;
	}
	public String getIdString() {
		return idString;
	}
	public void setIdString(String idString) {
		this.idString = idString;
	}
	//2016/1/16 add by chenshuxian
	public Object clone() throws CloneNotSupportedException {  
        return super.clone();  
    }
	
	public String getStringId() {
		return this.id == null ? "" : this.id.toString();
	}
	public String getPurchaseDateString() {
		return purchaseDateString;
	}
	public void setPurchaseDateString(String purchaseDateString) {
		this.purchaseDateString = purchaseDateString;
	}
	public String getInstallDateString() {
		return installDateString;
	}
	public void setInstallDateString(String installDateString) {
		this.installDateString = installDateString;
	}
	public String getLabGroupIdString() {
		return labGroupIdString;
	}
	public void setLabGroupIdString(String labGroupIdString) {
		this.labGroupIdString = labGroupIdString;
	}
	public String getLabGroupName() {
		return labGroupName;
	}
	public void setLabGroupName(String labGroupName) {
		this.labGroupName = labGroupName;
	}
	public String getSampleTypeIdString() {
		return sampleTypeIdString;
	}
	public void setSampleTypeIdString(String sampleTypeIdString) {
		this.sampleTypeIdString = sampleTypeIdString;
	}
	public String getSampleTypeName() {
		return sampleTypeName;
	}
	public void setSampleTypeName(String sampleTypeName) {
		this.sampleTypeName = sampleTypeName;
	}
	public String getRptTemplateIdString() {
		return rptTemplateIdString;
	}
	public void setRptTemplateIdString(String rptTemplateIdString) {
		this.rptTemplateIdString = rptTemplateIdString;
	}
	public String getRptTemplate2IdString() {
		return rptTemplate2IdString;
	}
	public void setRptTemplate2IdString(String rptTemplate2IdString) {
		this.rptTemplate2IdString = rptTemplate2IdString;
	}
	public String getRptTemplateName() {
		return rptTemplateName;
	}
	public void setRptTemplateName(String rptTemplateName) {
		this.rptTemplateName = rptTemplateName;
	}
	
}
