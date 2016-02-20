package com.daan.domain;

import java.util.Date;

import com.daan.logBean.Log;
import com.daan.logBean.LogModule;

/**
 * 
 * @ClassName: CtrItemProperties 
 * @Description: TODO(中心项目扩展属性表 — 记录项目、套餐、组合其他的非开单属性。) 
 * @author xieruiyun
 * @date 2015年11月26日 上午10:36:19
 */
@LogModule(moduleName = Constant.MODULE_TESTITEM, entityName = "检验项目其他的非开单属性")
public class CtrItemProperties {
	
	private Long testItemId;       //'[主键id] — 关键字id,关联ctr_test_item.id 与ctr_test_item 是一对一的关系。',
	private Long disciplineId;   //'[医学专业组id] —,对应ctr_dict_codes的“医学专业组”分类',
	private String refMethod; 	   //'[参考值显示方法] — 用于显示参考范围内容有： [Min-Max] , [>Min], [>=Min] , [<Max], [<=Max]',
	private String unit;           //'[单位] — 项目单位，对应ctr_dict_codes.type_key =3 的名称',
	private Long resultTypeId;   //'[结果类型id] — 结果类型id对应ctr_result_types.id',
	private String fastCode;       //'[助记符] — 用于快速录入编码。',
	private Long resultPrecision;  //'[精度] — 结果保留多少位小数 ',
	private String stdCode;        //'[国家标准码] — 国家制定的标准编码',
	private Integer isFreeze;         //'[是否冰冻] — 冰冻标志, 0— 否 ， 1— 是',
	private Date timeVersion;      //'[时间版本] — 当新增、修改都需要把当前服务器时间写入次字段，用于同步数据用。'
	
	public CtrItemProperties(){
	}
	
	@Log(name = "主键id")
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
	@Log(name = "单位")
	public String getUnit() {
		return unit;
	}
	public void setUnit(String unit) {
		this.unit = unit;
	}
	@Log(name = "结果类型id")
	public Long getResultTypeId() {
		return resultTypeId;
	}
	public void setResultTypeId(Long resultTypeId) {
		this.resultTypeId = resultTypeId;
	}
	@Log(name = "助记符")
	public String getFastCode() {
		return fastCode;
	}
	public void setFastCode(String fastCode) {
		this.fastCode = fastCode;
	}
	@Log(name = "精度")
	public Long getResultPrecision() {
		return resultPrecision;
	}
	public void setResultPrecision(Long resultPrecision) {
		this.resultPrecision = resultPrecision;
	}
	@Log(name = "国家标准码")
	public String getStdCode() {
		return stdCode;
	}
	public void setStdCode(String stdCode) {
		this.stdCode = stdCode;
	}
	@Log(name = "是否冰冻")
	public Integer getIsFreeze() {
		return isFreeze;
	}
	public void setIsFreeze(Integer isFreeze) {
		this.isFreeze = isFreeze;
	}
	@Log(name = "时间版本")
	public Date getTimeVersion() {
		return timeVersion;
	}
	public void setTimeVersion(Date timeVersion) {
		this.timeVersion = timeVersion;
	}
	
}
