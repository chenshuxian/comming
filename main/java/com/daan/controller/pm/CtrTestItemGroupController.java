package com.daan.controller.pm;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;

import org.apache.commons.lang.StringUtils;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.servlet.ModelAndView;

import com.daan.domain.Constant;
import com.daan.domain.CtrDictCodes;
import com.daan.domain.CtrInstruments;
import com.daan.domain.CtrTestItems;
import com.daan.domain.Message;
import com.daan.dto.CrtTestItemDto;
import com.daan.dto.CtrInstrumentsMicsDto;
import com.daan.dto.QueryDto;
import com.daan.enums.IsAbleEnum;
import com.daan.enums.TestType;
import com.daan.enums.TypeKeyEnum;
import com.daan.util.CommonComponentController;
import com.daan.util.HttpUtil;
import com.daan.util.JsonUtil;

/**
 * 
 * @ClassName: CtrTestItemGroupController 
 * @Description: TODO(组合项目controller) 
 * @author xieruiyun
 * @date 2015年12月8日 下午4:59:52
 */
@Controller
@RequestMapping(value = Constant.RMC_TESTITEM_GROUP)
public class CtrTestItemGroupController extends CommonComponentController {
	
	/**
	 * @throws Exception 
	 * 
	 * @Title: testItemGroupMain 
	 * @Description: TODO(初始化页面) 
	 * @param request
	 * @return ModelAndView
	 * @throws
	 */
	@RequestMapping(value = Constant.RMM_TESTITEM_GROUP_MAIN, method = RequestMethod.GET)
	public ModelAndView testItemGroupMain(HttpServletRequest request) throws Exception{
		//查询基础字典URL
		ModelAndView mv = new ModelAndView("/WEB-INF/jsp/pm/testItemGroup/testItemGroupMain.jsp");
		String sampleTypeString="";
		List<CtrDictCodes> dictCodeList=null;
		String url = Constant.serviceURL(Constant.RMC_TESTITEM, Constant.RMM_FINFBYDICTCODE);
		Map<String, String> params = new HashMap<String, String>();
		params.put("typeKey", TypeKeyEnum.sampleType.getIndex().toString());//样本类型
		sampleTypeString = HttpUtil.getResponseString(url, params,this.getAdminLoginUser(request));
		dictCodeList = (List<CtrDictCodes>) JsonUtil.jsonToDtos(sampleTypeString, CtrDictCodes.class);
		//仪器
		Map<String, String> instrumentParams = new HashMap<String, String>();
		String resultString = null;
		List<CtrInstruments> ctrInstrumentsList = null ;
		String urlIns = Constant.serviceURL(Constant.RMC_TESTITEM_GROUP, Constant.RMM_QUERY_BY_STATUS);
		instrumentParams.put("status", String.valueOf(IsAbleEnum.enable.ordinal()));//可用的仪器名称
		resultString = HttpUtil.postResponseString(urlIns, instrumentParams,this.getAdminLoginUser(request));
		if(StringUtils.isNotEmpty(resultString)){
			ctrInstrumentsList = (List<CtrInstruments>) JsonUtil.jsonToDtos(resultString, CtrInstruments.class);
		}
		mv.addObject("ctrInstrumentsList",ctrInstrumentsList);
		mv.addObject("sampleTypeList",dictCodeList);
		mv.addObject("isAbleList",isAbleEnumsDtoList());
		return mv;
	}
	
	/**
	 * 
	 * @Title: testItemGroupList 
	 * @Description: TODO(组合项目列表) 
	 * @param request
	 * @return ModelAndView
	 * @throws
	 */
	@SuppressWarnings("unchecked")
	@RequestMapping(value = Constant.RMM_TESTITEM_GROUP_LIST, method = RequestMethod.POST)
	@ResponseBody
	public Map<String, Object> testItemGroupList(QueryDto dto,HttpServletRequest request){
		Map<String, Object> map = new HashMap<String, Object>();
		map.put("total", 0);
		map.put("rows", new ArrayList<CtrTestItems>());
		//ModelAndView mv = new ModelAndView("/WEB-INF/jsp/pm/testItemGroup/testItemGroupList.jsp");
		Map<String, String> params = new HashMap<String, String>();
		params.put("JsonQueryDto", JsonUtil.DtoTojson(dto));
		String url = Constant.serviceURL(Constant.RMC_TESTITEM_GROUP, Constant.RMM_TESTITEM_GROUP_LIST);
		String resultString = null;
		try {
			//查询全部的组合项目
			resultString = HttpUtil.postResponseString(url, params, this.getAdminLoginUser(request));
			List<CtrTestItems> ctrTestItemGroups = (List<CtrTestItems>) JsonUtil.jsonToDtos(resultString, CtrTestItems.class);
			//mv.addObject("ctrTestItemGroups",ctrTestItemGroups);
			map.put("total", ctrTestItemGroups.size());
			map.put("rows", ctrTestItemGroups);
		} catch (Exception e) {
			logger.error(e.getMessage(), e);
		}
		return map;
	}
	
	/**
	 * 
	 * @Title: singleItemList 
	 * @Description: TODO(组合包含的单项列表) 
	 * @param request
	 * @return ModelAndView
	 * @throws
	 */
	@SuppressWarnings("unchecked")
	@RequestMapping(value = Constant.RMM_SINGLEITEM_LIST, method = RequestMethod.POST)
	@ResponseBody
	public Map<String, Object> singleItemList(String testItemId, HttpServletRequest request){
		Map<String, Object> map = new HashMap<String, Object>();
		map.put("total", 0);
		map.put("rows", new ArrayList<CtrTestItems>());
		//ModelAndView mv = new ModelAndView("/WEB-INF/jsp/pm/testItemGroup/singleItemList.jsp");
		//mv.addObject("testItemId", testItemId);
		Map<String, String> params = new HashMap<String, String>();
		params.put("testItemId", testItemId);//项目ID
		String url = Constant.serviceURL(Constant.RMC_TESTITEM_GROUP, Constant.RMM_SINGLEITEM_LIST);
		String resultString = "";// 结果返回字符串
		List<CtrTestItems> list = null; //组合包含的项目的集合
		try {
			resultString = HttpUtil.postResponseString(url, params, this.getAdminLoginUser(request));
			//判断调用Service返回的结果
			if(StringUtils.isNotEmpty(resultString)){
				list = (List<CtrTestItems>) JsonUtil.jsonToDtos(resultString, CtrTestItems.class);
			}
			//mv.addObject("containList",list);
			map.put("total", list.size());
			map.put("rows", list);
		} catch (Exception e) {
			logger.error(e.getMessage(), e);
		}
		return map;
	}
	
	/**
	 * 
	 * @Title: shwoAddOrEdit 
	 * @Description: TODO(显示添加修改页面) 
	 * @param request
	 * @return ModelAndView
	 * @throws
	 */
	@SuppressWarnings("unchecked")
	@ResponseBody
	@RequestMapping(value = Constant.RMM_SHOW_ADDOREDIT, method = RequestMethod.POST)
	public String shwoAddOrEdit(String testItemid, String type, HttpServletRequest request){
		ModelAndView mv = null;
		//信息查看页面
		if(type.equals("view")){
			mv = new ModelAndView("/WEB-INF/jsp/pm/testItemGroup/testItemGroupView.jsp");
		}else{//增加修改页面
			mv = new ModelAndView("/WEB-INF/jsp/pm/testItemGroup/testItemGroupEdit.jsp");
		}
		Map<String, String> params = new HashMap<String, String>();
		params.put("testItemId", testItemid);
		String url = Constant.serviceURL(Constant.RMC_TESTITEM_GROUP, Constant.RMM_QUERY_TESTITEM_GROUP);
		String resultString = null;
		String sampleTypeString = ""; //样本类型
		String ctrTestItemstr="";
		List<CtrDictCodes> dictCodeList = null;
		try {
			
			resultString = HttpUtil.postResponseString(url, params, this.getAdminLoginUser(request));
			CtrTestItems ctrTestItems = (CtrTestItems) JsonUtil.jsonToDto(resultString, CtrTestItems.class, null);
			if(ctrTestItems == null){
				ctrTestItems = new CtrTestItems();
			}
			//当type为修改状态时不需要获取编码
			ctrTestItems.setType(type);
			if(!type.equals("edit") && !type.equals("view")){
				params.clear();
				//获取编码
				params.put("code", String.valueOf(Constant.MODULEID_GROUP_TESTITEM));
				String getCodeUrl = Constant.serviceURL(Constant.RMC_CTRDICTCODES, Constant.RMM_GETCODENO);
				String codeNo = HttpUtil.postResponseString(getCodeUrl, params, this.getAdminLoginUser(request));
				//设置编码
				ctrTestItems.setCodeNo(codeNo);
				
				params.clear();
				//最大顺序号
				url = Constant.serviceURL(Constant.RMC_TESTITEM, Constant.RMM_MAXDISPLAYORDER);
				params.put("tableName", Constant.TABLE_NAME_TESTITEM);
				//区分检验项目，组合项目，套餐项目的顺序号 1.检验项目 2.组合项目 3.套餐项目
				params.put("conditionStr", " and item_type_id = " + TestType.group.ordinal());
				resultString = HttpUtil.postResponseString(url, params, this.getAdminLoginUser(request)); 
				//设置顺序号
				ctrTestItems.setDisplayOrder(Integer.parseInt(resultString));
			}
			
			mv.addObject("testItemGroup",ctrTestItems);
			
			/*//查询基础字典URL
			url = Constant.serviceURL(Constant.RMC_TESTITEM, Constant.RMM_FINFBYDICTCODE);
			params.put("typeKey", TypeKeyEnum.sampleType.getIndex().toString());//样本类型
			sampleTypeString = HttpUtil.getResponseString(url, params,this.getAdminLoginUser(request));
			dictCodeList = (List<CtrDictCodes>) JsonUtil.jsonToDtos(sampleTypeString, CtrDictCodes.class);*/
			mv.addObject("sampleTypeList", dictCodeList);
			mv.addObject("type", type);
			 ctrTestItemstr=JsonUtil.DtoTojson(ctrTestItems);
		} catch (Exception e) {
			logger.error(e.getMessage(), e);
		}
		return ctrTestItemstr;
	}
	
	/**
	 * 
	 * @Title: saveOrEdit 
	 * @Description: TODO(添加项目或修改项目) 
	 * @param dto 表单数据保存修改使用
	 * @param type 修改类型
	 * @param request
	 * @return String
	 * @throws
	 */
	@RequestMapping(value = Constant.RMM_SAVEOREDIT_TESTITEM_GROUP, method = RequestMethod.POST)
	@ResponseBody
	public String saveOrEditTestItemGroup(CrtTestItemDto dto, HttpServletRequest request){
		String message = "";
		String resultString = "";
		try {
			Map<String, String> params = new HashMap<String, String>();
			params.put("dtoJson", JsonUtil.DtoTojson(dto));
			params.put("userJson", JsonUtil.DtoTojson(getAdminLoginUser(request)));
			String url = Constant.serviceURL(Constant.RMC_TESTITEM,Constant.RMM_SAVEOREDITTESTITEM);
			message = HttpUtil.postResponseString(url, params, this.getAdminLoginUser(request));
			if(dto.getId() != null){
				//查询出修改后的数据，动态的填充到页面表格中
				params.clear();
				params.put("testItemId", dto.getId() + "");
				url = Constant.serviceURL(Constant.RMC_TESTITEM_GROUP, Constant.RMM_QUERY_TESTITEM_GROUP);
				resultString = HttpUtil.postResponseString(url, params, this.getAdminLoginUser(request));
				message = Message.DATA + resultString;
			}
			
		} catch (Exception e) {
			logger.error(e.getMessage(), e);
			message = Message.MSG_GETRESULT_FAIL;
		}
		return message;
	}
	
	/**
	 * 
	 * @Title: addSingleItmeShow 
	 * @Description: TODO(显示添加组合项目页面) 
	 * @return ModelAndView
	 * @throws
	 */
	@RequestMapping(value = Constant.RMM_ADD_SINGLEITEM_SHOW, method = RequestMethod.POST)
	public ModelAndView addSingleItmeShow(String testItemId, HttpServletRequest request){
		ModelAndView mv = new ModelAndView("/WEB-INF/jsp/pm/testItemGroup/addSingleItmeShow.jsp");
		mv.addObject("testItemId", testItemId);
		return mv;
	}
	
	/**
	 * 
	 * @Title: containList 
	 * @Description: TODO(组合包含的项目) 
	 * @param testItemId 项目ID
	 * @return ModelAndView
	 * @throws
	 */
	@SuppressWarnings("unchecked")
	@RequestMapping(value = Constant.RMM_CONTAINLIST, method = RequestMethod.POST)
	@ResponseBody
	public Map<String, Object> containList(String testItemId, HttpServletRequest request){
		//ModelAndView mv = new ModelAndView("/WEB-INF/jsp/pm/testItemGroup/containList.jsp");
		Map<String, Object> map = new HashMap<String, Object>();
		map.put("total", 0);
		map.put("rows", new ArrayList<CtrTestItems>());
		Map<String, String> params = new HashMap<String, String>();
		params.put("testItemId", testItemId);//项目ID
		String url = Constant.serviceURL(Constant.RMC_TESTITEM_GROUP, Constant.RMM_SINGLEITEM_LIST);
		String resultString = "";// 结果返回字符串
		List<CtrTestItems> list = null; //组合包含的项目的集合
		try {
			resultString = HttpUtil.postResponseString(url, params, this.getAdminLoginUser(request));
			//判断调用Service返回的结果
			if(StringUtils.isNotEmpty(resultString)){
				list = (List<CtrTestItems>) JsonUtil.jsonToDtos(resultString, CtrTestItems.class);
			}
			//mv.addObject("containList",list);
			map.put("total", list.size());
			map.put("rows", list);
		} catch (Exception e) {
			logger.error(e.getMessage(), e);
		}
		return map;
	}
	
	/**
	 * 
	 * @Title: notContainListMain 
	 * @Description: TODO(组合未包含的项目Main页面) 
	 * @param testItemId 组合ID
	 * @param request
	 * @return ModelAndView
	 * @throws
	 */
	@SuppressWarnings("unchecked")
	@RequestMapping(value = Constant.RMM_NOT_CONTAINLIST_MAIN, method = RequestMethod.POST)
	public ModelAndView notContainListMain(String testItemId, HttpServletRequest request){
		ModelAndView mv = new ModelAndView("/WEB-INF/jsp/pm/testItemGroup/notContainListMain.jsp");
		Map<String, String> params = new HashMap<String, String>();
		String resultString = null;
		List<CtrInstruments> list = null ;
		String url = Constant.serviceURL(Constant.RMC_TESTITEM_GROUP, Constant.RMM_QUERY_BY_STATUS);
		params.put("status", String.valueOf(IsAbleEnum.enable.ordinal()));//可用的仪器名称
		try {
			resultString = HttpUtil.postResponseString(url, params,this.getAdminLoginUser(request));
			if(StringUtils.isNotEmpty(resultString)){
			list = (List<CtrInstruments>) JsonUtil.jsonToDtos(resultString, CtrInstruments.class);
			}
		} catch (Exception e) {
			logger.error(e.getMessage(), e);
		}
		mv.addObject("ctrInstrumentsList", list);
		mv.addObject("testItemId", testItemId);
		return mv;
	}
	
	/**
	 * 
	 * @Title: notContainList 
	 * @Description: TODO(组合未包含的项目) 
	 * @return ModelAndView
	 * @throws
	 */
	@SuppressWarnings("unchecked")
	@RequestMapping(value = Constant.RMM_NOT_CONTAINLIST, method = RequestMethod.POST)
	@ResponseBody
	public Map<String, Object> notContainList(Long testitemId,Long instrumentId,String searchGroupStr, HttpServletRequest request){
		QueryDto dto=new QueryDto();
		dto.setTestitemId(testitemId);
		dto.setInstrumentId(instrumentId);
		dto.setSearchStr(searchGroupStr);
		dto.setSearchGroupStr(searchGroupStr);
		//ModelAndView mv = new ModelAndView("/WEB-INF/jsp/pm/testItemGroup/notContainList.jsp");
		Map<String, Object> map = new HashMap<String, Object>();
		map.put("total", 0);
		map.put("rows", new ArrayList<CtrTestItems>());
		Map<String, String> params = new HashMap<String, String>();
		params.put("JsonDto", JsonUtil.DtoTojson(dto));
		String url = Constant.serviceURL(Constant.RMC_TESTITEM_GROUP, Constant.RMM_NOT_CONTAINLIST);
		String resultString = ""; //结果json字符串
		List<CtrTestItems> notContainList = null; //组合未包含的项目
		try {
			resultString = HttpUtil.postResponseString(url, params, this.getAdminLoginUser(request));
			if(resultString != null){
				notContainList = (List<CtrTestItems>) JsonUtil.jsonToDtos(resultString, CtrTestItems.class);
			}
			//mv.addObject("notContainList",notContainList);
			map.put("total", notContainList.size());
			map.put("rows", notContainList);
		} catch (Exception e) {
			logger.error(e.getMessage(), e);
		}
		return map;
	}
	
	/**
	 * 
	 * @Title: addOrRemoveItem 
	 * @Description: TODO(添加或者修改组合项目) 
	 * @param removeItemID 组合需要删除的项目
	 * @param addItemID 组合需要添加的项目
	 * @param request
	 * @param groupItemID 组合ID
	 * @return String
	 * @throws
	 */
	@RequestMapping(value = Constant.RMM_ADD_OR_REMOVE_ITEM, method = RequestMethod.POST)
	@ResponseBody
	public String addOrRemoveItem(String removeItemID, String addItemID, String groupItemID, HttpServletRequest request){
		Map<String, String> params = new HashMap<String, String>();
		params.put("removeItemID", removeItemID);
		params.put("addItemID", addItemID);
		params.put("groupItemID", groupItemID);
		params.put("userJson", JsonUtil.DtoTojson(getAdminLoginUser(request)));
		String url = Constant.serviceURL(Constant.RMC_TESTITEM_GROUP, Constant.RMM_ADD_OR_REMOVE_ITEM);
		String message = "";
		try {
			message = HttpUtil.postResponseString(url, params, this.getAdminLoginUser(request));
		} catch (Exception e) {
			logger.error(e.getMessage(), e);
			message = Message.MSG_SERVICE_EXCEP;
		}
		return message;
	}
	
	/**
	 * 
	 * @Title: delSingleItem 
	 * @Description: TODO(删除组合包含的项目) 
	 * @param testItemid 单项项目ID
	 * @param groupItemid 组合项目ID
	 * @return String
	 * @throws
	 */
	@RequestMapping(value = Constant.RMM_DELETE_SINGLEITEM, method = RequestMethod.POST)
	@ResponseBody
	public String delSingleItem(String testItemid, String groupItemid, HttpServletRequest request){
		Map<String, String> params = new HashMap<String, String>();
		params.put("testItemid", testItemid);
		params.put("groupItemid", groupItemid);
		params.put("userJson", JsonUtil.DtoTojson(getAdminLoginUser(request)));
		//删除项目
		String url = Constant.serviceURL(Constant.RMC_TESTITEM_GROUP, Constant.RMM_DELETE_SINGLEITEM);
		String message = "";
		try {
			message = HttpUtil.postResponseString(url, params, this.getAdminLoginUser(request));
		} catch (Exception e) {
			logger.error(e.getMessage(), e);
			message = Message.MSG_DEL_FAIL3;
		}
		return message;
	}
	
	/**
	 * 
	 * @Title: delSingleItemBatch 
	 * @Description: TODO(批量删除组合中的项目) 
	 * @param testItemid 单项项目ID，多个项目ID
	 * @param groupItemid 组合项目ID
	 * @param request
	 * @return String
	 * @throws
	 */
	@RequestMapping(value = Constant.RMM_DELETE_SINGLEITEM_BATCH, method = RequestMethod.POST)
	@ResponseBody
	public String delSingleItemBatch(String testItemid, String groupItemid, HttpServletRequest request){
		Map<String, String> params = new HashMap<String, String>();
		params.put("testItemid", testItemid);
		params.put("groupItemid", groupItemid);
		params.put("userJson", JsonUtil.DtoTojson(getAdminLoginUser(request)));
		//删除项目
		String url = Constant.serviceURL(Constant.RMC_TESTITEM_GROUP, Constant.RMM_DELETE_SINGLEITEM_BATCH);
		String message = "";
		try {
			message = HttpUtil.postResponseString(url, params, this.getAdminLoginUser(request));
		} catch (Exception e) {
			logger.error(e.getMessage(), e);
			message = Message.MSG_DEL_FAIL3;
		}
		return message;
	}
}
