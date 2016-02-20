package com.daan.utils;

import java.util.ArrayList;
import java.util.List;

import org.apache.commons.lang.StringUtils;


/**
 * 与具体ORM实现无关的分页参数及查询结果封装.
 * 
 * 注意所有序号从1开始.
 * 
 * @param <T> Page中记录的类型.
 * 
 * @author calvin
 */
public class Page<T> {
	//-- 公共变量 --//
	public static final String ASC = "asc";
	public static final String DESC = "desc";

	//-- 分页参数 --//
	protected int pageNo = 1;
	protected int pageSize = 10;
	protected String orderBy = null;
	protected String order = null;
	protected boolean autoCount = true;

	private int page;
	private int rows;

	//-- 返回结果 --//
	protected List<T> result =new ArrayList<T>();// Lists.newArrayList();
	protected long totalCount = 0;

	//-- 构造函数 --//
	public Page() {
	}

	public Page(int pageSize) {
		this.pageSize = pageSize;
	}

	public int getRows() {
		return rows;
	}

	public void setRows(int rows) {
		this.rows = rows;
	}

	public int getPage() {
		return page;
	}

	public void setPage(int page) {
		this.page = page;
	}

	//-- 分页参数访问函数 --//
	/**
	 * 获得当前页的页号,序号从1开始,默认为1.
	 */
	public int getPageNo() {
		return pageNo;
//		return this.page;
	}

	/**
	 * 设置当前页的页号,序号从1开始,低于1时自动调整为1.
	 */
	public void setPageNo(final int pageNo) {
		this.pageNo = pageNo;

		if (pageNo < 1) {
			this.pageNo = 1;
		}
	}

	/**
	 * 返回Page对象自身的setPageNo函数,可用于连续设置。
	 */
	public Page<T> pageNo(final int thePageNo) {
		setPageNo(thePageNo);
		return this;
	}

	/**
	 * 获得每页的记录数量, 默认为-1.
	 */
	public int getPageSize() {
//		return pageSize;
		return this.rows;
	}

	/**
	 * 设置每页的记录数量.
	 */
	public void setPageSize(final int pageSize) {
		this.pageSize = pageSize;
	}

	/**
	 * 返回Page对象自身的setPageSize函数,可用于连续设置。
	 */
	public Page<T> pageSize(final int thePageSize) {
		setPageSize(thePageSize);
		return this;
	}

	/**
	 * 根据pageNo和pageSize计算当前页第一条记录在总结果集中的位置,序号从1开始.
	 */
	public int getFirst() {
		return ((pageNo - 1) * pageSize) + 1;
	}

	/**
	 * 获得排序字段,无默认值. 多个排序字段时用','分隔.
	 */
	public String getOrderBy() {
		return orderBy;
	}

	/**
	 * 设置排序字段,多个排序字段时用','分隔.
	 */
	public void setOrderBy(final String orderBy) {
		this.orderBy = orderBy;
	}

	/**
	 * 返回Page对象自身的setOrderBy函数,可用于连续设置。
	 */
	public Page<T> orderBy(final String theOrderBy) {
		setOrderBy(theOrderBy);
		return this;
	}

	/**
	 * 获得排序方向, 无默认值.
	 */
	public String getOrder() {
		return order;
	}

	/**
	 * 设置排序方式向.
	 * 
	 * @param order 可选值为desc或asc,多个排序字段时用','分隔.
	 */
	public void setOrder(final String order) {
		String lowcaseOrder = StringUtils.lowerCase(order);

		//检查order字符串的合法值
		String[] orders = StringUtils.split(lowcaseOrder, ',');
		for (String orderStr : orders) {
			if (!StringUtils.equals(DESC, orderStr) && !StringUtils.equals(ASC, orderStr)) {
				throw new IllegalArgumentException("排序方向" + orderStr + "不是合法值");
			}
		}

		this.order = lowcaseOrder;
	}

	/**
	 * 返回Page对象自身的setOrder函数,可用于连续设置。
	 */
	public Page<T> order(final String theOrder) {
		setOrder(theOrder);
		return this;
	}

	/**
	 * 是否已设置排序字段,无默认值.
	 */
	public boolean isOrderBySetted() {
		return (StringUtils.isNotBlank(orderBy) && StringUtils.isNotBlank(order));
	}

	/**
	 * 获得查询对象时是否先自动执行count查询获取总记录数, 默认为false.
	 */
	public boolean isAutoCount() {
		return autoCount;
	}

	/**
	 * 设置查询对象时是否自动先执行count查询获取总记录数.
	 */
	public void setAutoCount(final boolean autoCount) {
		this.autoCount = autoCount;
	}

	/**
	 * 返回Page对象自身的setAutoCount函数,可用于连续设置。
	 */
	public Page<T> autoCount(final boolean theAutoCount) {
		setAutoCount(theAutoCount);
		return this;
	}

	//-- 访问查询结果函数 --//

	/**
	 * 获得页内的记录列表.
	 */
	public List<T> getResult() {
		return result;
	}

	/**
	 * 设置页内的记录列表.
	 */
	public void setResult(final List<T> result) {
		this.result = result;
	}

	/**
	 * 获得总记录数, 默认值为-1.
	 */
	public long getTotalCount() {
		return totalCount;
	}

	/**
	 * 设置总记录数.
	 */
	public void setTotalCount(final long totalCount) {
		this.totalCount = totalCount;
	}

	/**
	 * 根据pageSize与totalCount计算总页数, 默认值为-1.
	 */
	public long getTotalPages() {
		if (totalCount < 0) {
			return -1;
		}

		long count = totalCount / pageSize;
		if (totalCount % pageSize > 0) {
			count++;
		}
		return count==0?1:count;
	}

	/**
	 * 是否还有下一页.
	 */
	public boolean isHasNext() {
		return (pageNo + 1 <= getTotalPages());
	}

	/**
	 * 取得下页的页号, 序号从1开始.
	 * 当前页为尾页时仍返回尾页序号.
	 */
	public int getNextPage() {
		if (isHasNext()) {
			return pageNo + 1;
		} else {
			return pageNo;
		}
	}

	/**
	 * 是否还有上一页.
	 */
	public boolean isHasPre() {
		return (pageNo - 1 >= 1);
	}

	/**
	 * 取得上页的页号, 序号从1开始.
	 * 当前页为首页时返回首页序号.
	 */
	public int getPrePage() {
		if (isHasPre()) {
			return pageNo - 1;
		} else {
			return pageNo;
		}
	}
	
	public long getLastPage() {
		return getTotalPages();
	}
	
	public String getOrderCondition() {
		StringBuilder  condition =new StringBuilder(" ");
		if(this.orderBy!=null&&!"".equals(this.orderBy.trim())){
			condition.append(" order by ");
			String[] obFileds=this.orderBy.split(",");
			String[] obTypes=new String[obFileds.length];
			if(this.order!=null&&!"".equals(this.order)){
				String[] obTypesTmp=this.order.split(",");
				for(int i=0;i<obTypesTmp.length;i++	){
					if(i<obTypes.length){
						obTypes[i]=obTypesTmp[i];
					}else{
						break;
					}
				}
			}
			for(int i=0;i<obFileds.length;i++){
				if(obFileds[i]!=null){
					condition.append(" ");
					condition.append(obFileds[i]);
					condition.append(" ");
					/*
					 *如果排序为按录入时间排序，并且未规定排序规则，则默认降序
					 */
					if(i<obTypes.length){
						if(obTypes[i]==null||"".equals(obTypes[i])){
							//排序规则为空
							if(obFileds[i].contains("create_date")){
								//如果按录入时间排序，则降序
								condition.append("desc");
							}
						}else{
							//排序规则不为空
							condition.append(obTypes[i]);
						}
					}else{
						if(obFileds[i].contains("create_date")){
							//如果按录入时间排序，则降序
							condition.append("desc");
						}
					}
					condition.append(",");
//					condition.append(i<obTypes.length?((obTypes[i]==null?"":obTypes[i])+","):",");
				}
			}
		}
		return condition.replace(condition.length()-1, condition.length(), " ").toString();
	}
	
	public String getMysqlQueryCondition() {
		String condition = "";
//		if((pageNo-1)*pageSize==this.totalCount&&pageNo>1){
//			pageNo-=1;
//		}
//		condition = " limit " + (pageNo-1)*pageSize + "," + pageSize;

		if((page-1)*rows==this.totalCount&&page>1){
			page-=1;
		}
		condition = " limit " + (page-1)*rows + "," + rows;
		return condition;
	}
}
