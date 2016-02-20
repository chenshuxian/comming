package com.daan.dao;

import java.util.List;
import java.util.Map;

import com.daan.domain.CtrDictCodes;
import com.daan.domain.CtrLoinc;
/**
 * @ClassName: CtrLoincDao 
 * @DescriptioCtrLoinco) 
 * @author xiaobing
 * @date 2015年12月07日 下午20:06:01
 */
public interface CtrLoincDao {
	
	/**
	 * 根据条件查找LOINC编码表列表条数
	 * @param dto
	 * @return Integer
	 */
	public Integer queryCountByCtrLoinc(Map<String, Object> map); 
	
	/**
	 * 根据条件查找LOINC编码表列表
	 * @param dto
	 * @return List<CtrLoinc>
	 */
	public List<CtrLoinc> queryPageListByConditions(Map<String, Object> map); 
	
	/**
	 * 根据ID查找记录
	 * @param id
	 * @return CtrLoinc
	 */
	public CtrLoinc findById(String id); 
	
	/**
	 * 根据ID查找记录
	 * @param name
	 * @return List<CtrLoinc>
	 */
	public List<CtrLoinc> findByName(String name); 
	
	/**
	 * 查找分类代码类型
	 * @param typeKey
	 * @return List<CtrDictCodes>
	 */
	public List<CtrDictCodes> getAllSampleTypeList(String typeKey); 
	
	/**
	 * 新增LOINC编码表
	 * @param dto
	 * @return
	 */
	public void insertCtrLoinc(CtrLoinc dto); 
	
	/**
	 * 修改LOINC编码表
	 * @return
	 */
	public void updateCtrLoinc(CtrLoinc dto); 
	
	/**
	 * 启用LOINC编码表
	 * @return
	 */
	public void enableById(String id); 
	
	/**
	 * 停用LOINC编码表
	 * @return
	 */
	public void disableById(String id); 
	
	/**
	 * 删除LOINC编码表
	 * @return
	 */
	public void deleteById(String id);

	/**
	 *
	 * @Title: modifyLoinc
	 * @Description: TODO(修改)
	 * @return int    返回类型
	 * @throws
	 */
	public int modifyLoinc(CtrLoinc ctrLoinc);

}
