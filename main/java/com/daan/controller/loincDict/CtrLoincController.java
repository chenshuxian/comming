package com.daan.controller.loincDict;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.daan.domain.*;
import org.apache.commons.lang.StringUtils;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.servlet.ModelAndView;

import com.daan.dto.CtrLoincDto;
import com.daan.enums.IsAbleEnum;
import com.daan.enums.TypeKeyEnum;
import com.daan.util.CodingCreater;
import com.daan.util.CommonComponentController;
import com.daan.util.HttpUtil;
import com.daan.util.JsonUtil;
import com.daan.utils.Page;
	
/**
 * @ClassName: CtrLoincController
 * @Description: TODO(LOINC编码表控制器)
 * @author xiaobing
 * @date 2015年12月07日 下午15:00:00
 */
@Controller
@RequestMapping(value = Constant.RMC_CTRLOINC)
public class CtrLoincController extends CommonComponentController {

	/**
	 * 
	 * @Title: ctrLoincMain 
	 * @Description: TODO(初始化页面) 
	 * @param request
	 * @return ModelAndView 
	 * @throws Exception
	 */
	@RequestMapping(value = { Constant.RMM_CTRLOINC_MAIN, "/", "" }, method = RequestMethod.GET)
	public ModelAndView ctrLoincMain(HttpServletRequest request) {
//		Page<CtrLoinc> page = new Page<CtrLoinc>(Constant.PAGE_NUMBER);
//		ModelAndView mv = new ModelAndView("/WEB-INF/jsp/loincDict/ctrLoinc/ctrLoincMain.jsp");
//		mv.addObject("page", page);
//
//		return mv;

		ModelAndView mv = null;
		String url="";
		String sampleTypeString = ""; //样本类型
		String testMethodString = ""; //检验方法
		String componentString = ""; //受检成份
		String propertyString = ""; //受检属性
		String typeOfScaleString = ""; //样本标识
		String timeAspectString = ""; //时间特性
		String resultTypeString = ""; //结果类型
		List<CtrDictCodes> dictCodeList = null;
		List<CtrResultTypes> resultTypesList = null ;
		Map<String, String> params = new HashMap<String, String>();
		try {
			mv = new ModelAndView("/WEB-INF/jsp/loincDict/ctrLoinc/ctrLoincMain.jsp");
			dictCodeList = new ArrayList<CtrDictCodes>();
			//查询基础字典URL
			url = Constant.serviceURL(Constant.RMC_TESTITEM, Constant.RMM_FINFBYDICTCODE);
			params.put("typeKey", TypeKeyEnum.sampleType.getIndex().toString());//样本类型
			sampleTypeString = HttpUtil.getResponseString(url, params,this.getAdminLoginUser(request));
			dictCodeList = (List<CtrDictCodes>) JsonUtil.jsonToDtos(sampleTypeString, CtrDictCodes.class);
			mv.addObject("sampleTypeList", dictCodeList);
			//---------------------------------------
			params.put("typeKey", TypeKeyEnum.testMethod.getIndex().toString());//检验方法
			testMethodString = HttpUtil.getResponseString(url, params,this.getAdminLoginUser(request));
			dictCodeList = (List<CtrDictCodes>) JsonUtil.jsonToDtos(testMethodString, CtrDictCodes.class);
			mv.addObject("testMethodList", dictCodeList);
			//---------------------------------------
			params.put("typeKey", TypeKeyEnum.component.getIndex().toString());//受检成份
			componentString = HttpUtil.getResponseString(url, params,this.getAdminLoginUser(request));
			dictCodeList = (List<CtrDictCodes>) JsonUtil.jsonToDtos(componentString, CtrDictCodes.class);
			mv.addObject("componentList", dictCodeList);
			//---------------------------------------
			params.put("typeKey", TypeKeyEnum.property.getIndex().toString());//受检属性
			propertyString = HttpUtil.getResponseString(url, params,this.getAdminLoginUser(request));
			dictCodeList = (List<CtrDictCodes>) JsonUtil.jsonToDtos(propertyString, CtrDictCodes.class);
			mv.addObject("propertyList", dictCodeList);
			//---------------------------------------
			params.put("typeKey", TypeKeyEnum.typeOfScale.getIndex().toString());//样本标识
			typeOfScaleString = HttpUtil.getResponseString(url, params,this.getAdminLoginUser(request));
			dictCodeList = (List<CtrDictCodes>) JsonUtil.jsonToDtos(typeOfScaleString, CtrDictCodes.class);
			mv.addObject("typeOfScaleList", dictCodeList);
			//---------------------------------------
			params.put("typeKey", TypeKeyEnum.timeAspect.getIndex().toString());//时间特性
			timeAspectString = HttpUtil.getResponseString(url, params, this.getAdminLoginUser(request));
			dictCodeList = (List<CtrDictCodes>) JsonUtil.jsonToDtos(timeAspectString, CtrDictCodes.class);
			mv.addObject("timeAspectList", dictCodeList);

			mv.addObject("isAbleList",isAbleEnumsDtoList());
		} catch (Exception e) {
			logger.error(e.getMessage(), e);
			String msg = Message.MSG_SERVICE_EXCEP;
		}
		return mv;
	}

	/**
	 * @Title: ctrLoincList 
	 * @Description: TODO(LOINC编码表列表) 
	 * @param CtrLoincDto
	 * @param page
	 * @param request
	 * @return ModelAndView 
	 * @throws Exception
	 */
	@RequestMapping(value = Constant.RMM_CTRLOINC_PAGE_LIST, method = RequestMethod.POST)
	public void ctrLoincPageList(CtrLoincDto dto, Page<CtrLoinc> page, HttpServletRequest request, HttpServletResponse response) {
		ModelAndView mv = new ModelAndView("/WEB-INF/jsp/loincDict/ctrLoinc/ctrLoincList.jsp");

		try {
			Map<String, String> params = new HashMap<String, String>();
			dto.setPage(JsonUtil.DtoTojson(page));
			params.put("queryDtoJson", JsonUtil.DtoTojson(dto));
			String resultString = null;
			String resultList = null; // 结果List json
			String resultPage = null; // 分页page json
			
			String url = Constant.serviceURL(Constant.RMC_CTRLOINC, Constant.RMM_CTRLOINC_PAGE_LIST);
			resultString = HttpUtil.postResponseString(url, params, this.getAdminLoginUser(request));
			resultList = resultString.substring(0,resultString.indexOf("|"));
			resultPage = resultString.substring(resultString.indexOf("|") + 1, resultString.length());
			
			List<CtrLoinc> list = (List<CtrLoinc>) JsonUtil.jsonToDtos(resultList, CtrLoinc.class);
			page = (Page<CtrLoinc>) JsonUtil.jsonToDto(resultPage, Page.class, null);
//			mv.addObject("resultList", list);
//			mv.addObject("page",page);
			DataGrid dataGrid = new DataGrid(page.getTotalCount(), list);
			this.printJsonData(JsonUtil.DtoTojson(dataGrid), response);

		} catch (Exception e) {
			logger.error(e.getMessage() , e);
			mv.addObject(Message.ERRORMSG, Message.MSG_SERVICE_EXCEP);
		}
	}
	
	/**
	 * 
	 * @Title: ctrLoincInfo
	 * @Description: TODO(初始化查看页面) 
	 * @param id
	 * @param opType
	 * @param request
	 * @return ModelAndView 
	 * @throws Exception
	 */
	@RequestMapping(value = Constant.RMM_CTRLOINC_INFO, method = RequestMethod.POST)
	public ModelAndView ctrLoincInfo(String id, String opType, HttpServletRequest request) {
		ModelAndView mv = new ModelAndView();
		if("add".equals(opType)){
			mv.setViewName("/WEB-INF/jsp/loincDict/ctrLoinc/ctrLoincAdd.jsp");
		} else if("edit".equals(opType)){
//			mv.setViewName("/WEB-INF/jsp/loincDict/ctrLoinc/ctrLoincEdit.jsp");
			mv.setViewName("/WEB-INF/jsp/loincDict/ctrLoinc/ctrLoincAdd.jsp");
		} else {
			mv.setViewName("/WEB-INF/jsp/loincDict/ctrLoinc/ctrLoincView.jsp");
		}
		
		String message = "";
		try {
			Map<String, String> params = new HashMap<String, String>();
			params.put("id", id);
			mv.addObject("opType", opType);
			
//			// 查找Info
			String url = "";
			String sampleTypeString = ""; //样本类型
			String testMethodString = ""; //检验方法
			String componentString = ""; //受检成份
			String propertyString = ""; //受检属性
			String typeOfScaleString = ""; //样本标识
			String timeAspectString = ""; //时间特性
			String resultTypeString = ""; //结果类型
			List<CtrDictCodes> dictCodeList = null;
			List<CtrResultTypes> resultTypesList = null ;
			dictCodeList = new ArrayList<CtrDictCodes>();
			//查询基础字典URL
			url = Constant.serviceURL(Constant.RMC_TESTITEM, Constant.RMM_FINFBYDICTCODE);
			params.put("typeKey", TypeKeyEnum.sampleType.getIndex().toString());//样本类型
			sampleTypeString = HttpUtil.getResponseString(url, params,this.getAdminLoginUser(request));
			dictCodeList = (List<CtrDictCodes>) JsonUtil.jsonToDtos(sampleTypeString, CtrDictCodes.class);
			mv.addObject("sampleTypeList", dictCodeList);
			//---------------------------------------
			params.put("typeKey", TypeKeyEnum.testMethod.getIndex().toString());//检验方法
			testMethodString = HttpUtil.getResponseString(url, params,this.getAdminLoginUser(request));
			dictCodeList = (List<CtrDictCodes>) JsonUtil.jsonToDtos(testMethodString, CtrDictCodes.class);
			mv.addObject("testMethodList", dictCodeList);
			//---------------------------------------
			params.put("typeKey", TypeKeyEnum.component.getIndex().toString());//受检成份
			componentString = HttpUtil.getResponseString(url, params,this.getAdminLoginUser(request));
			dictCodeList = (List<CtrDictCodes>) JsonUtil.jsonToDtos(componentString, CtrDictCodes.class);
			mv.addObject("componentList", dictCodeList);
			//---------------------------------------
			params.put("typeKey", TypeKeyEnum.property.getIndex().toString());//受检属性
			propertyString = HttpUtil.getResponseString(url, params,this.getAdminLoginUser(request));
			dictCodeList = (List<CtrDictCodes>) JsonUtil.jsonToDtos(propertyString, CtrDictCodes.class);
			mv.addObject("propertyList", dictCodeList);
			//---------------------------------------
			params.put("typeKey", TypeKeyEnum.typeOfScale.getIndex().toString());//样本标识
			typeOfScaleString = HttpUtil.getResponseString(url, params,this.getAdminLoginUser(request));
			dictCodeList = (List<CtrDictCodes>) JsonUtil.jsonToDtos(typeOfScaleString, CtrDictCodes.class);
			mv.addObject("typeOfScaleList", dictCodeList);
			//---------------------------------------
			params.put("typeKey", TypeKeyEnum.timeAspect.getIndex().toString());//时间特性
			timeAspectString = HttpUtil.getResponseString(url, params, this.getAdminLoginUser(request));
			dictCodeList = (List<CtrDictCodes>) JsonUtil.jsonToDtos(timeAspectString, CtrDictCodes.class);
			mv.addObject("timeAspectList", dictCodeList);

			// 新增页面需要初始化最大顺序号
			if("add".equals(opType)){
				mv.addObject("codeNo", CodingCreater.createOreder(Constant.CODE_CTRLOINC));
				
				url = Constant.serviceURL(Constant.RMC_CTRLOINC, Constant.RMM_MAXDISPLAYORDER);
				params.put("tableName", Constant.TABLENAME_CTRLOINC);
				String displayOrder = HttpUtil.postResponseString(url, params, this.getAdminLoginUser(request));
				mv.addObject("displayOrder", displayOrder);
			}
			
		} catch (Exception e) {
			logger.error(e.getMessage() , e);
			message = Message.MSG_SERVICE_EXCEP;
		}
		
		return mv;
	}
	
	/**
	 * 检查是否可修改
	 * @param id
	 * @param request
	 * @return String
	 * @throws Exception
	 */
	@RequestMapping(value = Constant.RMM_CTRLOINC_IFEDIT, method = RequestMethod.GET)
	@ResponseBody
	public String ctrLoincIfEdit(String id, HttpServletRequest request){
		String message="";
		try{
			Map<String, String> params = new HashMap<String, String>();
			params.put("id", id);
			String url = Constant.serviceURL(Constant.RMC_CTRLOINC, Constant.RMM_CTRLOINC_INFO);
			message = HttpUtil.postResponseString(url, params, this.getAdminLoginUser(request));
			CtrLoinc entity = (CtrLoinc) JsonUtil.jsonToDto(message, CtrLoinc.class, null);
			if(entity == null){
				return Message.MSG_NOT_EXISTED;
			}
			if(entity.getStatus()==null || entity.getStatus().intValue() == IsAbleEnum.enable.ordinal()){
				return Message.MSG_SAVE_FAIL3;
			}
		}catch(Exception e){
			logger.error(e.getMessage() , e);
			message = Message.MSG_SERVICE_EXCEP;
		}
		
		return message;
	}
		
	/**
	 * 同名验证
	 * @param CtrLoinc
	 * @param request
	 * @return String
	 * @throws Exception
	 */
	@RequestMapping(value = Constant.RMM_CTRLOINC_IFEXISTED, method = RequestMethod.POST)
	@ResponseBody
	public String checkNameExisted(@ModelAttribute CtrLoinc ctrLoinc, HttpServletRequest request){
		String message="";
		try{
			Map<String, String> params = new HashMap<String, String>();
			params.put("dtoJson", JsonUtil.DtoTojson(ctrLoinc));
			String url = Constant.serviceURL(Constant.RMC_CTRLOINC, Constant.RMM_CTRLOINC_IFEXISTED);
			message = HttpUtil.postResponseString(url, params, this.getAdminLoginUser(request));
		}catch(Exception e){
			logger.error(e.getMessage() , e);
			message = Message.MSG_SERVICE_EXCEP;
		}
		
		return message;
	}
	
	/**
	 * 新增
	 * @param CtrLoinc
	 * @param request
	 * @return String
	 * @throws Exception
	 */
	@RequestMapping(value = Constant.RMM_CTRLOINC_ADD, method = RequestMethod.POST)
	@ResponseBody
	public String ctrLoincAdd(@ModelAttribute CtrLoinc ctrLoinc, HttpServletRequest request){
		String message="";
		try{
			Map<String, String> params = new HashMap<String, String>();
			params.put("dtoJson", JsonUtil.DtoTojson(ctrLoinc));
			params.put("userJson", JsonUtil.DtoTojson(getAdminLoginUser(request)));
			String url = Constant.serviceURL(Constant.RMC_CTRLOINC, Constant.RMM_CTRLOINC_ADD);
			HttpUtil.postResponseString(url, params, this.getAdminLoginUser(request));
			message = Message.MSG_SAVE_SUCC;
		}catch(Exception e){
			logger.error(e.getMessage() , e);
			message = Message.MSG_SERVICE_EXCEP;
		}
		
		return message;
	}
	
	/**
	 * 修改
	 * @param CtrLoinc
	 * @param request
	 * @return String
	 * @throws Exception
	 */
	@RequestMapping(value = Constant.RMM_CTRLOINC_EDIT, method = RequestMethod.POST)
	@ResponseBody
	public String ctrLoincEdit(@ModelAttribute CtrLoinc ctrLoinc, HttpServletRequest request){
		String message="";
		try{
			Map<String, String> params = new HashMap<String, String>();
			params.put("dtoJson", JsonUtil.DtoTojson(ctrLoinc));
			params.put("userJson", JsonUtil.DtoTojson(getAdminLoginUser(request)));
			String url = Constant.serviceURL(Constant.RMC_CTRLOINC, Constant.RMM_CTRLOINC_EDIT);
			HttpUtil.postResponseString(url, params, this.getAdminLoginUser(request));
			
			params.clear();
			params.put("id", ctrLoinc.getId()+"");
			url = Constant.serviceURL(Constant.RMC_CTRLOINC, Constant.RMM_CTRLOINC_INFO);
			message = HttpUtil.postResponseString(url, params, this.getAdminLoginUser(request));
			CtrLoinc entity = (CtrLoinc) JsonUtil.jsonToDto(message, CtrLoinc.class, null);
			entity.setIdString(entity.getId() + "");
			message = Message.DATA + JsonUtil.DtoTojson(entity);
		}catch(Exception e){
			logger.error(e.getMessage() , e);
			message = Message.MSG_SERVICE_EXCEP;
		}
		
		return message;
	}
	
	/**
	 * 
	 * @Title: ctrLoincEnable
	 * @Description: LOINC编码表--启用 
	 * @param  id
	 * @return String 
	 * @throws Exception
	 */
	@RequestMapping(value = Constant.RMM_CTRLOINC_ENABLE, method = RequestMethod.GET)
	@ResponseBody
	public String ctrLoincEnable(String id, HttpServletRequest request) {
		String message = "";
		try {
			Map<String, String> params = new HashMap<String, String>();
			params.put("id", id);
			params.put("userJson", JsonUtil.DtoTojson(getAdminLoginUser(request)));
			String url = Constant.serviceURL(Constant.RMC_CTRLOINC, Constant.RMM_CTRLOINC_ENABLE);
			message = HttpUtil.postResponseString(url, params, this.getAdminLoginUser(request));
		} catch (Exception e) {
			logger.error(e.getMessage() , e);
			message = Message.MSG_SERVICE_EXCEP;
		}
		
		return message;
	}
	
	/**
	 * 
	 * @Title: ctrLoincDisable
	 * @Description: LOINC编码表--停用 
	 * @param  id
	 * @return String 
	 * @throws Exception
	 */
	@RequestMapping(value = Constant.RMM_CTRLOINC_DISABLE, method = RequestMethod.GET)
	@ResponseBody
	public String ctrLoincDisable(String id, HttpServletRequest request) {
		String message = "";
		try {
			Map<String, String> params = new HashMap<String, String>();
			params.put("id", id);
			params.put("userJson", JsonUtil.DtoTojson(getAdminLoginUser(request)));
			String url = Constant.serviceURL(Constant.RMC_CTRLOINC, Constant.RMM_CTRLOINC_DISABLE);
			message = HttpUtil.postResponseString(url, params, this.getAdminLoginUser(request));
		} catch (Exception e) {
			logger.error(e.getMessage() , e);
			message = Message.MSG_SERVICE_EXCEP;
		}
		
		return message;
	}
	
	/**
	 * 
	 * @Title: ctrLoincDelete
	 * @Description: 删除LOINC编码
	 * @param  id
	 * @return String 
	 * @throws Exception
	 */
	@RequestMapping(value = Constant.RMM_CTRLOINC_DELETE, method = RequestMethod.POST)
	@ResponseBody
	public String ctrLoincDelete(String id, HttpServletRequest request) {
		String message = "";
		try {
			Map<String, String> params = new HashMap<String, String>();
			params.put("id", id);
			params.put("userJson", JsonUtil.DtoTojson(getAdminLoginUser(request)));
			String url = Constant.serviceURL(Constant.RMC_CTRLOINC, Constant.RMM_CTRLOINC_DELETE);
			message = HttpUtil.postResponseString(url, params, this.getAdminLoginUser(request));
		} catch (Exception e) {
			logger.error(e.getMessage() , e);
			message = Message.MSG_SERVICE_EXCEP;
		}
		
		return message;
	}
	
	/**
	 * 
	 * @Title: ctrLoincDeleteBatch
	 * @Description: 批量删除LOINC编码
	 * @param  ids
	 * @return String 
	 * @throws Exception
	 */
	@RequestMapping(value = Constant.RMM_CTRLOINC_DELETE_BATCH, method = RequestMethod.POST)
	@ResponseBody
	public String ctrLoincDeleteBatch(String ids, HttpServletRequest request) {
		String message = "";
		try {
			Map<String, String> params = new HashMap<String, String>();
			params.put("ids", ids);
			params.put("userJson", JsonUtil.DtoTojson(getAdminLoginUser(request)));
			String url = Constant.serviceURL(Constant.RMC_CTRLOINC, Constant.RMM_CTRLOINC_DELETE_BATCH);
			message = HttpUtil.postResponseString(url, params, this.getAdminLoginUser(request));
		} catch (Exception e) {
			logger.error(e.getMessage() , e);
			message = Message.MSG_SERVICE_EXCEP;
		}
		
		return message;
	}

	/**
	 *
	 * @Title: ctrLoincDisableOrEnable
	 * @Description: TODO(编码表-启用/停用)
	 * @param @param id
	 * @param @param operatioType
	 * @param @param request
	 * @param @return    设定文件
	 * @return String    返回类型
	 * @throws
	 */
	@RequestMapping(value = Constant.RMM_CTRLOINC_DISABLEORENABLE, method = RequestMethod.POST)
	@ResponseBody
	public String ctrLoincDisableOrEnable(String id, String operatioType, HttpServletRequest request) {
		String message = Message.MSG_SERVICE_EXCEP;
		if (StringUtils.isEmpty(id) || StringUtils.isEmpty(operatioType)) {
			return message;
		}
		try {
			Map<String, String> params = new HashMap<String, String>();
			params.put("id", id);
			params.put("operatioType", operatioType);
			params.put("userJson", JsonUtil.DtoTojson(getAdminLoginUser(request)));
			String url = Constant.serviceURL(Constant.RMC_CTRLOINC, Constant.RMM_CTRLOINC_DISABLEORENABLE);
			message = HttpUtil.postResponseString(url, params, this.getAdminLoginUser(request));
		} catch (Exception e) {
			logger.error(e.getMessage(), e);
		}
		return message;
	}


}
