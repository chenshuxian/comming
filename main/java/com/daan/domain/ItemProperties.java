package com.daan.domain;

import java.io.Serializable;
import java.util.Date;

import com.daan.logBean.Log;
import com.daan.logBean.LogModule;

/**
 * 
 * @ClassName: ItemProperties
 * @Description: TODO(项目扩展属性表— 记录项目、套餐、组合其他的非开单属性)
 * @author zhangliping
 * @date 2016年1月11日 上午11:15:03
 */
@LogModule(moduleName = Constant.ENTITY_TESTITEMS, entityName = "检验项目其他的非开单属性")
public class ItemProperties implements Serializable {
	private static final long serialVersionUID = -9148557271738626606L;
	private String idString;
	private Long appId;// ` bigint(19) '[系统id] —功能点、菜单对应那个系统，对应applications.id',
	private Long orgId;// ` bigint(19) '[实验室、机构id] — 一个字典对应一个实验室，对应 labs.id.',
	private Long testItemId;// ` bigint(19) '[主键id] — 关键字id,使用【系统id规则】',
	private Long disciplineId;// ` bigint(19) '[医学专业组id]// —医学专业组id对应ctr_dict_codes.type_key的“医学专业组”分类',
	private String refMethod;// ` varchar(10) '[参考值显示方法] — 用于显示参考范围内容有：// [Min-Max] , [>Min], [>=Min] , [<Max],// [<=Max]',
	private Long resultTypeId;// ` bigint(19) '[结果类型id] —// 结果类型id对应ctr_result_types.id',
	private String unit;// ` varchar(10) '[单位] —// 项目单位，对应ctr_dict_codes.type_key=3 的名称',
	private Integer resultPrecision;// ` int(11) '[精度] — 结果保留多少位小数 ',
	private String formulaDescribe;// ` varchar(150) '[计算公式]—// 计算公式内容描述.从公式复制过来并且对长度进行截取。限制为150个字符。',
	private String stdCode;// ` varchar(15) '[国家标准码] — 国家制定的标准编码',
	private String defaultResult;// ` varchar(150) '[默认结果] — 默认的结果值。',
	private Date timeVersion;// ` timestamp '[时间版本]// —当新增、修改都需要把当前服务器时间写入次字段，用于同步数据用。',

	public String getIdString() {
		return idString;
	}

	public void setIdString(String idString) {
		this.idString = idString;
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

	public Long getTestItemId() {
		return testItemId;
	}

	public void setTestItemId(Long testItemId) {
		this.testItemId = testItemId;
	}

	@Log(name = "医学专业组id")
	public Long getDisciplineId() {
		return disciplineId;
	}

	public void setDisciplineId(Long disciplineId) {
		this.disciplineId = disciplineId;
	}

	@Log(name = "参考值显示方法")
	public String getRefMethod() {
		return refMethod;
	}

	public void setRefMethod(String refMethod) {
		this.refMethod = refMethod;
	}

	@Log(name = "结果类型id")
	public Long getResultTypeId() {
		return resultTypeId;
	}

	public void setResultTypeId(Long resultTypeId) {
		this.resultTypeId = resultTypeId;
	}

	@Log(name = "单位")
	public String getUnit() {
		return unit;
	}

	public void setUnit(String unit) {
		this.unit = unit;
	}

	@Log(name = "精度")
	public Integer getResultPrecision() {
		return resultPrecision;
	}

	public void setResultPrecision(Integer resultPrecision) {
		this.resultPrecision = resultPrecision;
	}

	public String getFormulaDescribe() {
		return formulaDescribe;
	}

	public void setFormulaDescribe(String formulaDescribe) {
		this.formulaDescribe = formulaDescribe;
	}

	@Log(name = "国家标准码")
	public String getStdCode() {
		return stdCode;
	}

	public void setStdCode(String stdCode) {
		this.stdCode = stdCode;
	}

	public String getDefaultResult() {
		return defaultResult;
	}

	public void setDefaultResult(String defaultResult) {
		this.defaultResult = defaultResult;
	}

	public Date getTimeVersion() {
		return timeVersion;
	}

	public void setTimeVersion(Date timeVersion) {
		this.timeVersion = timeVersion;
	}

}
