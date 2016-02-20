package com.daan.controller.inst;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.commons.lang.StringUtils;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.servlet.ModelAndView;

import com.daan.domain.Constant;
import com.daan.domain.CtrDictCodes;
import com.daan.domain.CtrInstrumentsParams;
import com.daan.domain.CtrInstruments;
import com.daan.domain.CtrReportTemplates;
import com.daan.domain.DataGrid;
import com.daan.domain.Message;
import com.daan.dto.CtrInstrumentsQueryDto;
import com.daan.enums.IsAbleEnum;
import com.daan.enums.TypeKeyEnum;
import com.daan.util.CommonComponentController;
import com.daan.util.HttpUtil;
import com.daan.util.JsonUtil;
import com.daan.utils.Page;

/**
 * @ClassName: CtrInstrumentsController
 * @Description: 中心仪器控制器
 * @author zhoujie
 * @date 2015年11月26日 下午15:00:00
 */
@Controller
@RequestMapping(value = Constant.RMC_CTRINSTRUMENTS)
public class CtrInstrumentsController extends CommonComponentController {

	/**
	 * 
	 * @Title: ctrInstrumentsMain 
	 * @Description: 初始化页面 
	 * @return ModelAndView 
	 * @throws
	 */
	@RequestMapping(value = { Constant.RMM_CTRINSTRUMENTS_MAIN, "/", "" }, method = RequestMethod.GET)
	public ModelAndView ctrInstrumentsMain(HttpServletRequest request) {
		Page<CtrInstruments> page = new Page<CtrInstruments>(10);
		ModelAndView mv = new ModelAndView("/WEB-INF/jsp/inst/ctrInstruments/ctrInstrumentsMain.jsp");
		mv.addObject("isAbleList",isAbleEnumsDtoList());
		mv.addObject("page", page);
		return mv;
	}

	/**
	 * @Title: ctrInstrumentsList 
	 * @Description: 中心仪器列表 
	 * @return ModelAndView 
	 * @throws
	 */
	@RequestMapping(value = Constant.RMM_CTRINSTRUMENTS_PAGE_LIST, method = RequestMethod.POST)
	public void ctrInstrumentsPageList(CtrInstrumentsQueryDto dto, Page<CtrInstruments> page, HttpServletRequest request,HttpServletResponse response) {
		//ModelAndView mv = new ModelAndView("/WEB-INF/jsp/inst/ctrInstruments/ctrInstrumentsList.jsp");

		String message = "";
		try {
			Map<String, String> params = new HashMap<String, String>();
			dto.setPage(JsonUtil.DtoTojson(page));
			params.put("queryDtoJson", JsonUtil.DtoTojson(dto));
			String resultString = null;
			String resultList = null; //结果List json
			String resultPage = null; //分页page json
			
			String url = Constant.serviceURL(Constant.RMC_CTRINSTRUMENTS, Constant.RMM_CTRINSTRUMENTS_PAGE_LIST);
			resultString = HttpUtil.postResponseString(url, params, this.getAdminLoginUser(request));
			resultList = resultString.substring(0,resultString.indexOf("|"));
			resultPage = resultString.substring(resultString.indexOf("|") + 1, resultString.length());
			
			List<CtrInstruments> list = (List<CtrInstruments>) JsonUtil.jsonToDtos(resultList, CtrInstruments.class);
			page = (Page<CtrInstruments>) JsonUtil.jsonToDto(resultPage, Page.class, null);
			
			DataGrid dataGrid = new DataGrid(page.getTotalCount(),list);					

			this.printJsonData(JsonUtil.DtoTojson(dataGrid),response); 
			//mv.addObject("resultList", list);
			//mv.addObject("page",page);
		} catch (Exception e) {
			logger.error(e.getMessage() , e);
			message = Message.MSG_SERVICE_EXCEP;
		}

		//return mv;
	}
	
	
	/**
	 * @Title: TestItem 
	 * @Description: 中心仪器列表 
	 * @return TestItem Json 
	 * @throws
	 * @author chenshuxian
	 * @date: 2016/01/19
	 */
	@RequestMapping(value = "getTestItem", method = RequestMethod.POST)
	public void getTestItem(CtrInstrumentsQueryDto dto, String q,HttpServletRequest request,HttpServletResponse response) {
		
		String message = "";
		try {
			Map<String, String> params = new HashMap<String, String>();
			String url="";
			// 查找标本类型List
			url = Constant.serviceURL(Constant.RMC_TESTITEM, Constant.RMM_FINFBYDICTCODE);
			params.put("typeKey", TypeKeyEnum.sampleType.getIndex().toString());//检验方法
			//params.put("name", q);
			message = HttpUtil.getResponseString(url, params,this.getAdminLoginUser(request));
			List<CtrDictCodes> list2 = (List<CtrDictCodes>) JsonUtil.jsonToDtos(message, CtrDictCodes.class);
			
			DataGrid dataGrid = new DataGrid(list2);					

			this.printJsonData(JsonUtil.DtoTojson(dataGrid),response); 
			
		} catch (Exception e) {
			logger.error(e.getMessage() , e);
			message = Message.MSG_SERVICE_EXCEP;
		}

	}
	
	/**
	 * 
	 * @Title: ctrInstrumentsInfo
	 * @Description: 初始化查看页面
	 * @return ModelAndView 
	 * @throws
	 */
	@RequestMapping(value = Constant.RMM_CTRINSTRUMENTS_INFO, method = RequestMethod.POST)
	public ModelAndView ctrInstrumentsInfo(String id, String opType, HttpServletRequest request) {
		ModelAndView mv = new ModelAndView();
		mv.setViewName("/WEB-INF/jsp/inst/ctrInstruments/ctrInstrumentsAdd.jsp");
		/*
		if("add".equals(opType)){
			mv.setViewName("/WEB-INF/jsp/inst/ctrInstruments/ctrInstrumentsAdd.jsp");
		} else if("edit".equals(opType)){
			mv.setViewName("/WEB-INF/jsp/inst/ctrInstruments/ctrInstrumentsEdit.jsp");
		} else {
			mv.setViewName("/WEB-INF/jsp/inst/ctrInstruments/ctrInstrumentsView.jsp");
		}*/
		
		String message = "";
		try {
			Map<String, String> params = new HashMap<String, String>();
			params.put("id", id);
			mv.addObject("opType", opType);
			
			// 查找Info
			String url = "";
			if(StringUtils.isNotEmpty(id)){
				url = Constant.serviceURL(Constant.RMC_CTRINSTRUMENTS, Constant.RMM_CTRINSTRUMENTS_INFO);
				message = HttpUtil.postResponseString(url, params, this.getAdminLoginUser(request));
				CtrInstruments ctrInstruments = (CtrInstruments) JsonUtil.jsonToDto(message, CtrInstruments.class, null);
				mv.addObject("entity", ctrInstruments);
			}
			
			// 查找报告模板List
			url = Constant.serviceURL(Constant.RMC_CTRINSTRUMENTS, Constant.RMM_CTRINSTRUMENTS_INFO_RTLIST);
			message = HttpUtil.postResponseString(url, params, this.getAdminLoginUser(request));
			List<CtrReportTemplates> list = (List<CtrReportTemplates>) JsonUtil.jsonToDtos(message, CtrReportTemplates.class);
			mv.addObject("rtList", list);
			
			// 查找标本类型List
			url = Constant.serviceURL(Constant.RMC_TESTITEM, Constant.RMM_FINFBYDICTCODE);
			params.put("typeKey", TypeKeyEnum.sampleType.getIndex().toString());//检验方法
			message = HttpUtil.getResponseString(url, params,this.getAdminLoginUser(request));
			List<CtrDictCodes> list2 = (List<CtrDictCodes>) JsonUtil.jsonToDtos(message, CtrDictCodes.class);
			mv.addObject("stList", list2);
			
			// 新增页面需要初始化最大顺序号
			if("add".equals(opType)){
				url = Constant.serviceURL(Constant.RMC_CTRINSTRUMENTS, Constant.RMM_MAXDISPLAYORDER);
				params.put("tableName", Constant.TABLENAME_CTRINSTRUMENTS);
				String displayOrder = HttpUtil.postResponseString(url, params, this.getAdminLoginUser(request));
				mv.addObject("displayOrder", displayOrder);
				//打开添加页面时过去codeNo编码；
				HashMap<String, String> codeNoParams = new HashMap<String, String>();
				codeNoParams.put("code", TypeKeyEnum.sampleType.getIndex().toString());
				//根据字典类型获取编码
				String getCodeUrl = Constant.serviceURL(Constant.RMC_CTRINSTRUMENTS, Constant.RMM_GETCODENO);
				String codeNo = HttpUtil.postResponseString(getCodeUrl, codeNoParams, this.getAdminLoginUser(request));
				mv.addObject("codeNo", codeNo);
			}
			
		} catch (Exception e) {
			logger.error(e.getMessage() , e);
			message = Message.MSG_SERVICE_EXCEP;
		}
		
		return mv;
	}
	
	/**
	 * 
	 * @Title: ctrInstrumentsParamsInfo
	 * @Description: 初始化查看页面 
	 * @return ModelAndView 
	 * @throws
	 */
	@RequestMapping(value = Constant.RMM_CTRINSTRUMENTS_PARAMS_INFO, method = RequestMethod.POST)
	public ModelAndView ctrInstrumentsParamsInfo(String instrumentId, String opType, HttpServletRequest request) {
		ModelAndView mv = new ModelAndView();
		mv.setViewName("/WEB-INF/jsp/inst/ctrInstruments/ctrInstrumentsParamsEdit.jsp");
		
		String message = "";
		try {
			Map<String, String> params = new HashMap<String, String>();
			params.put("instrumentId", instrumentId);
			
			// 查找Info
			if(StringUtils.isNotEmpty(instrumentId)){
				String url = Constant.serviceURL(Constant.RMC_CTRINSTRUMENTS, Constant.RMM_CTRINSTRUMENTS_PARAMS_INFO);
				message = HttpUtil.postResponseString(url, params, this.getAdminLoginUser(request));
				CtrInstrumentsParams entity = (CtrInstrumentsParams) JsonUtil.jsonToDto(message, CtrInstrumentsParams.class, null);
				mv.addObject("entity", entity);
			}
			
		} catch (Exception e) {
			logger.error(e.getMessage() , e);
			message = Message.MSG_SERVICE_EXCEP;
		}
		
		return mv;
	}
	
	/**
	 * 检查是否可修改
	 * @param ctrInstrumentsAdd
	 * @param request
	 * @return
	 */
	@RequestMapping(value = Constant.RMM_CTRINSTRUMENTS_IFEDIT, method = RequestMethod.POST)
	@ResponseBody
	public String ctrInstrumentsIfEdit(String id, HttpServletRequest request){
		String message="";
		try{
			Map<String, String> params = new HashMap<String, String>();
			params.put("id", id);
			String url = Constant.serviceURL(Constant.RMC_CTRINSTRUMENTS, Constant.RMM_CTRINSTRUMENTS_INFO);
			message = HttpUtil.postResponseString(url, params, this.getAdminLoginUser(request));
			CtrInstruments entity = (CtrInstruments) JsonUtil.jsonToDto(message, CtrInstruments.class, null);
			if(entity == null){
				return Message.MSG_NOT_EXISTED;
			}
			if(entity.getStatus()==null || entity.getStatus().intValue()==IsAbleEnum.enable.ordinal()){
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
	 * @param ctrInstrumentsAdd
	 * @param request
	 * @return
	 */
	@RequestMapping(value = Constant.RMM_CTRINSTRUMENTS_IFEXISTED, method = RequestMethod.POST)
	@ResponseBody
	public String checkNameExisted(@ModelAttribute CtrInstruments ctrInstruments, HttpServletRequest request){
		String message="";
		try{
			Map<String, String> params = new HashMap<String, String>();
			params.put("dtoJson", JsonUtil.DtoTojson(ctrInstruments));
			String url = Constant.serviceURL(Constant.RMC_CTRINSTRUMENTS, Constant.RMM_CTRINSTRUMENTS_IFEXISTED);
			message = HttpUtil.postResponseString(url, params, this.getAdminLoginUser(request));
		}catch(Exception e){
			logger.error(e.getMessage() , e);
			message = Message.MSG_SERVICE_EXCEP;
		}
		return message;
	}
	
	/**
	 * 新增
	 * @param ctrInstrumentsAdd
	 * @param request
	 * @return
	 */
	@RequestMapping(value = Constant.RMM_CTRINSTRUMENTS_ADD, method = RequestMethod.POST)
	@ResponseBody
	public String ctrInstrumentsAdd(@ModelAttribute CtrInstruments ctrInstruments, HttpServletRequest request){
		String message="";
		try{
			Map<String, String> params = new HashMap<String, String>();
			params.put("dtoJson", JsonUtil.DtoTojson(ctrInstruments));
			params.put("userJson", JsonUtil.DtoTojson(getAdminLoginUser(request)));
			String url = Constant.serviceURL(Constant.RMC_CTRINSTRUMENTS, Constant.RMM_CTRINSTRUMENTS_ADD);
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
	 * @param ctrInstrumentsEdit
	 * @param request
	 * @return
	 */
	@RequestMapping(value = Constant.RMM_CTRINSTRUMENTS_EDIT, method = RequestMethod.POST)
	@ResponseBody
	public String ctrInstrumentsEdit(@ModelAttribute CtrInstruments ctrInstruments, HttpServletRequest request){
		String message="";
		try{
			Map<String, String> params = new HashMap<String, String>();
			params.put("dtoJson", JsonUtil.DtoTojson(ctrInstruments));
			params.put("userJson", JsonUtil.DtoTojson(getAdminLoginUser(request)));
			String url = Constant.serviceURL(Constant.RMC_CTRINSTRUMENTS, Constant.RMM_CTRINSTRUMENTS_EDIT);
			HttpUtil.postResponseString(url, params, this.getAdminLoginUser(request));
			
			params.clear();
			params.put("id", ctrInstruments.getId()+"");
			url = Constant.serviceURL(Constant.RMC_CTRINSTRUMENTS, Constant.RMM_CTRINSTRUMENTS_INFO);
			message = HttpUtil.postResponseString(url, params, this.getAdminLoginUser(request));
			CtrInstruments entity = (CtrInstruments) JsonUtil.jsonToDto(message, CtrInstruments.class, null);
			entity.setIdString(entity.getId()+"");
			message = Message.DATA + JsonUtil.DtoTojson(entity);
		}catch(Exception e){
			logger.error(e.getMessage() , e);
			message = Message.MSG_SERVICE_EXCEP;
		}
		return message;
	}
	
	/**
	 * 修改通讯参数
	 * @param ctrInstrumentsParamsEdit
	 * @param request
	 * @return
	 */
	@RequestMapping(value = Constant.RMM_CTRINSTRUMENTS_PRAMS_EDIT, method = RequestMethod.POST)
	@ResponseBody
	public String ctrInstrumentsParamsEdit(@ModelAttribute CtrInstrumentsParams cstrInstrParams, HttpServletRequest request){
		String message="";
		try{
			Map<String, String> params = new HashMap<String, String>();
			params.put("dtoJson", JsonUtil.DtoTojson(cstrInstrParams));
			params.put("userJson", JsonUtil.DtoTojson(getAdminLoginUser(request)));
			String url = Constant.serviceURL(Constant.RMC_CTRINSTRUMENTS, Constant.RMM_CTRINSTRUMENTS_PRAMS_EDIT);
			HttpUtil.postResponseString(url, params, this.getAdminLoginUser(request));
		}catch(Exception e){
			logger.error(e.getMessage() , e);
			message = Message.MSG_SERVICE_EXCEP;
		}
		return message;
	}
	
	/**
	 * 
	 * @Title: ctrInstrumentsEnable
	 * @Description: 中心仪器--启用 
	 * @return String 
	 * @throws
	 */
	@RequestMapping(value = Constant.RMM_CTRINSTRUMENTS_ENABLE, method = RequestMethod.GET)
	@ResponseBody
	public String ctrInstrumentsEnable(String id, HttpServletRequest request) {
		String message = "";
		try {
			Map<String, String> params = new HashMap<String, String>();
			params.put("id", id);
			params.put("userJson", JsonUtil.DtoTojson(getAdminLoginUser(request)));
			String url = Constant.serviceURL(Constant.RMC_CTRINSTRUMENTS, Constant.RMM_CTRINSTRUMENTS_ENABLE);
			message = HttpUtil.postResponseString(url, params, this.getAdminLoginUser(request));
		} catch (Exception e) {
			logger.error(e.getMessage() , e);
			message = Message.MSG_SERVICE_EXCEP;
		}
		
		return message;
	}
	
	/**
	 * 
	 * @Title: ctrInstrumentsDisable
	 * @Description: 中心仪器--停用 
	 * @return String 
	 * @throws
	 */
	@RequestMapping(value = Constant.RMM_CTRINSTRUMENTS_DISABLE, method = RequestMethod.GET)
	@ResponseBody
	public String ctrInstrumentsDisable(String id, HttpServletRequest request) {
		String message = "";
		try {
			Map<String, String> params = new HashMap<String, String>();
			params.put("id", id);
			params.put("userJson", JsonUtil.DtoTojson(getAdminLoginUser(request)));
			String url = Constant.serviceURL(Constant.RMC_CTRINSTRUMENTS, Constant.RMM_CTRINSTRUMENTS_DISABLE);
			message = HttpUtil.postResponseString(url, params, this.getAdminLoginUser(request));
		} catch (Exception e) {
			logger.error(e.getMessage() , e);
			message = Message.MSG_SERVICE_EXCEP;
		}
		
		return message;
	}
	
	/**
	 * 
	 * @Title: ctrInstrumentsDelete
	 * @Description: 删除中心仪器 
	 * @return String 
	 * @throws
	 */
	@RequestMapping(value = Constant.RMM_CTRINSTRUMENTS_DELETE, method = RequestMethod.POST)
	@ResponseBody
	public String ctrInstrumentsDelete(String id, HttpServletRequest request) {
		String message = "";
		try {
			Map<String, String> params = new HashMap<String, String>();
			params.put("id", id);
			params.put("userJson", JsonUtil.DtoTojson(getAdminLoginUser(request)));
			String url = Constant.serviceURL(Constant.RMC_CTRINSTRUMENTS, Constant.RMM_CTRINSTRUMENTS_DELETE);
			message = HttpUtil.postResponseString(url, params, this.getAdminLoginUser(request));
		} catch (Exception e) {
			logger.error(e.getMessage() , e);
			message = Message.MSG_SERVICE_EXCEP;
		}
		
		return message;
	}
	
	/**
	 * 
	 * @Title: ctrInstrumentsDeleteBatch
	 * @Description: 批量删除中心仪器 
	 * @return String 
	 * @throws
	 */
	@RequestMapping(value = Constant.RMM_CTRINSTRUMENTS_DELETE_BATCH, method = RequestMethod.POST)
	@ResponseBody
	public String ctrInstrumentsDeleteBatch(String ids, HttpServletRequest request) {
		
		String message = "";
		try {
			Map<String, String> params = new HashMap<String, String>();
			params.put("ids", ids);
			params.put("userJson", JsonUtil.DtoTojson(getAdminLoginUser(request)));
			String url = Constant.serviceURL(Constant.RMC_CTRINSTRUMENTS, Constant.RMM_CTRINSTRUMENTS_DELETE_BATCH);
			message = HttpUtil.postResponseString(url, params, this.getAdminLoginUser(request));
		} catch (Exception e) {
			logger.error(e.getMessage() , e);
			message = Message.MSG_SERVICE_EXCEP;
		}
		
		return message;
	}
	
	/**
	 * 
	* @Title: instrumentsDisableOrEnable 
	* @Description: TODO(试管类型-启用/停用) 
	* @param @param id
	* @param @param operatioType
	* @param @param request
	* @param @return    设定文件 
	* @return String    返回类型 
	* @throws
	 */
	@RequestMapping(value = Constant.RMM_CTRINSTRUMENTS_DIDABLEORENABLE, method = RequestMethod.POST)
	@ResponseBody
	public String ctrInstrumentsDisableOrEnable(String id, String operatioType, HttpServletRequest request) {
		String message = Message.MSG_SERVICE_EXCEP;
		if (StringUtils.isEmpty(id) || StringUtils.isEmpty(operatioType)) {
			return message;
		}
		try {
			Map<String, String> params = new HashMap<String, String>();
			params.put("id", id);
			params.put("operatioType", operatioType);
			params.put("userJson", JsonUtil.DtoTojson(getAdminLoginUser(request)));
			String url = Constant.serviceURL(Constant.RMC_CTRINSTRUMENTS, Constant.RMM_CTRINSTRUMENTS_DIDABLEORENABLE);
			message = HttpUtil.postResponseString(url, params, this.getAdminLoginUser(request));
		} catch (Exception e) {
			logger.error(e.getMessage(), e);
		}
		return message;
	}
	
}
