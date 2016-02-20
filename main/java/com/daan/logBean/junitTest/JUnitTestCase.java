package com.daan.logBean.junitTest;

import java.util.Date;

import org.junit.Before;
import org.junit.Test;

import com.daan.domain.DictLogs;
import com.daan.domain.User;
import com.daan.logBean.DictLogsFactory;
import com.daan.logBean.IDictLogger;

public class JUnitTestCase {
	private TestEntity obj1;
	private TestEntity obj2;

	@Before
	public void setUp() throws Exception {
		obj1=new TestEntity();
		obj2=new TestEntity();
		obj1.setId("1111");
		obj1.setName("测试1");
		obj1.setSex("男");
		obj1.setAge(18);
		obj1.setAddress("测试地址1");
		obj1.setBirthday(new Date());
		obj2.setId("2222");
		obj2.setName("测试2");
		obj2.setSex("女");
		obj2.setAge(18);
		obj2.setAddress("测试地址2");
//		Thread.sleep(1000);
		obj2.setBirthday(new Date());
		obj2.setIsMarry(true);
	}

	@Test
	public void add() {
		IDictLogger op=DictLogsFactory.CreateAddNewLogger();
		op.AddChangedObject(obj2);
		DictLogs log = null;
		try {
			log = op.ToDictLog(new User());
		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		System.out.println(log.getModuleName());
		System.out.println(log.getModuleId());
		System.out.println(log.getUserId());
		System.out.println(log.getFunctionDesc());
	}

	@Test
	public void update() {
//		IOperateLogger op=LogFactory.CreateEditLogger(obj1);
//		op.AddChangedObject(obj2,111111);
//		OperationLog log=op.ToOperation();
//		System.out.println(log.getModuleName());
//		System.out.println(log.getModuleId());
//		System.out.println(log.getOperateUser());
//		System.out.println(log.getOperation());
	}
	
	@Test
	public void delete() {
//		IOperateLogger op=LogFactory.CreateDeleteLogger();
//		op.AddChangedObject(obj2,111111);
//		OperationLog log=op.ToOperation();
//		System.out.println(log.getModuleName());
//		System.out.println(log.getModuleId());
//		System.out.println(log.getOperateUser());
//		System.out.println(log.getOperation());
	}
}
