package com.daan.logBean.junitTest;

import java.util.Date;

import com.daan.logBean.Log;
import com.daan.logBean.LogModule;

@LogModule(entityName="检测项目",moduleName="检验项目")
public class TestEntity {
	private String id;
	private String name;
	private String sex;
	private Integer age;
	private String address;
	private Date birthday;
	private Boolean isMarry;
	
	public String getId() {
		return id;
	}
	public void setId(String id) {
		this.id = id;
	}
	@Log(name="姓名",order=1)
	public String getName() {
		return name;
	}
	public void setName(String name) {
		this.name = name;
	}
	//@Log(name="性别",order=3,delete=false)
	public String getSex() {
		return sex;
	}
	public void setSex(String sex) {
		this.sex = sex;
	}
	@Log(name="年龄",order=2)
	public Integer getAge() {
		return age;
	}
	public void setAge(Integer age) {
		this.age = age;
	}
	@Log(name="地址")
	public String getAddress() {
		return address;
	}
	public void setAddress(String address) {
		this.address = address;
	}
	@Log(name="出生日期",order=5)
	public Date getBirthday() {
		return birthday;
	}
	public void setBirthday(Date birthday) {
		this.birthday = birthday;
	}
	@Log(name="婚否",order=6)
	public Boolean getIsMarry() {
		return isMarry;
	}
	public void setIsMarry(Boolean isMarry) {
		this.isMarry = isMarry;
	}
}
