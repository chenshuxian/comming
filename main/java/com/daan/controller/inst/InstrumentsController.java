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

import com.daan.domain.CenterOrg;
import com.daan.domain.Constant;
import com.daan.domain.InstrBoxs;
import com.daan.domain.InstrParams;
import com.daan.domain.Instruments;
import com.daan.domain.LocDictCodes;
import com.daan.domain.Message;
import com.daan.domain.ReportTemplates;
import com.daan.domain.User;
import com.daan.dto.CenterOrgQueryDto;
import com.daan.enums.StatusEnum;
import com.daan.enums.TypeKeyEnum;
import com.daan.util.CommonComponentController;
import com.daan.util.HttpUtil;
import com.daan.util.JsonUtil;
import com.daan.util.StringUtil;
import com.daan.utils.DataGrid;
import com.daan.utils.Page;

/**
 * @ClassName: InstrumentsController
 * @Description: 仪器控制器
 * @author zhoujie
 * @date 2016年01月12日
 */
@Controller
@RequestMapping(value = Constant.RMC_LOCAL_INSTRUMENTS)
public class InstrumentsController extends CommonComponentController {

	/**
	 * 
	 * @Title: ctrInstrumentsMain 
	 * @Description: 初始化页面 
	 * @return ModelAndView 
	 * @throws
	 */
	@RequestMapping(value = { Constant.RMM_INSTRUMENTS_MAIN, "/", "" }, method = RequestMethod.GET)
	public ModelAndView ctrInstrumentsMain(HttpServletRequest request) {
		ModelAndView mv = new ModelAndView(Constant.JSP_INSTRUMENTS_MIAN);
		
		// 查找下拉框List
		String message = "";
		try {
			User user = this.getAdminLoginUser(request);
			
			// 实验室专业组
			Map<String, String> params = new HashMap<String, String>();
			String url = Constant.serviceURL(Constant.RMC_LOCDICTCODES, Constant.RMM_LOCDICTCODES_LOCDICTCODELIST);
			params.put("typeKey", TypeKeyEnum.discipline.getIndex().toString());
			params.put("status", StatusEnum.enable.getIndex().toString());
			if(user != null){
//				params.put("orgId", user.getOrgId()+"");
				params.put("appId", user.getSysId()+"");
			}
			message = HttpUtil.postResponseString(url, params,this.getAdminLoginUser(request));
			List<LocDictCodes> labGroupList = (List<LocDictCodes>) JsonUtil.jsonToDtos(message, LocDictCodes.class);
			mv.addObject("labGroupList", labGroupList);
			
			// 标本类型
			params.put("typeKey", TypeKeyEnum.sampleType.getIndex().toString());
			params.put("status", StatusEnum.enable.getIndex().toString());
			message = HttpUtil.postResponseString(url, params,this.getAdminLoginUser(request));
			List<LocDictCodes> sampleTypeList = (List<LocDictCodes>) JsonUtil.jsonToDtos(message, LocDictCodes.class);
			mv.addObject("sampleTypeList", sampleTypeList);
			
			// 报告模板
			url = Constant.serviceURL(Constant.RMC_LOCAL_INSTRUMENTS, Constant.RMM_INSTRUMENTS_RT_LIST);
			params.put("status", StatusEnum.enable.getIndex().toString());
			params.put("userJson", JsonUtil.DtoTojson(user));
			message = HttpUtil.postResponseString(url, params,this.getAdminLoginUser(request));
			List<ReportTemplates> rtList = (List<ReportTemplates>) JsonUtil.jsonToDtos(message, ReportTemplates.class);
			mv.addObject("rtList", rtList);
			mv.addObject("rtList2", rtList);
			
			// 盒子条码
			url = Constant.serviceURL(Constant.RMC_LOCAL_INSTRUMENTS, Constant.RMM_INSTRUMENTS_BB_LIST);
			params.put("status", StatusEnum.enable.getIndex().toString());
			params.put("userJson", JsonUtil.DtoTojson(user));
			message = HttpUtil.postResponseString(url, params,this.getAdminLoginUser(request));
			List<InstrBoxs> bbList = (List<InstrBoxs>) JsonUtil.jsonToDtos(message, InstrBoxs.class);
			mv.addObject("bbList", bbList);
			
			// 虚拟仪器
			url = Constant.serviceURL(Constant.RMC_LOCAL_INSTRUMENTS, Constant.RMM_INSTRUMENTS_VI_LIST);
			params.put("status", StatusEnum.enable.getIndex().toString());
			params.put("userJson", JsonUtil.DtoTojson(user));
			message = HttpUtil.postResponseString(url, params,this.getAdminLoginUser(request));
			List<Instruments> viList = (List<Instruments>) JsonUtil.jsonToDtos(message, Instruments.class);
			mv.addObject("viList", viList);
			
		} catch (Exception e) {
			logger.error(e.getMessage() , e);
			message = Message.MSG_SERVICE_EXCEP;
		}
		mv.addObject("total", 0);
		return mv;
	}
	
	/**
	 * 获取编号和最大顺序号
	 * 
	 * @param instruments
	 * @param request
	 * @return String
	 * @throws Exception
	 */
	@RequestMapping(value = Constant.RMM_INSTRUMENTS_CODE_DISPLAYORDER, method = RequestMethod.POST)
	@ResponseBody
	public String instrumentsCodeDisplayorder(HttpServletRequest request){
		String message="";
		try{
			User user = this.getAdminLoginUser(request);
			
			// 获取最大顺序号
			Map<String, String> params = new HashMap<String, String>();
			String url = Constant.serviceURL(Constant.RMC_LOCAL_INSTRUMENTS, Constant.RMM_MAXDISPLAYORDER);
			params.put("tableName", Constant.TABLENAME_INSTRUMENTS);
			if(user != null){
				params.put("conditionStr", " and app_id="+user.getSysId()+" and org_id="+user.getOrgId());
			}
			String displayOrder = HttpUtil.postResponseString(url, params, this.getAdminLoginUser(request));
			
			//根据字典类型获取编码
			url = Constant.serviceURL(Constant.RMC_LOCAL_INSTRUMENTS, Constant.RMM_GETCODENO);
			params.put("code", Constant.CODE_INSTRUMENTS+"");
			String codeNo = HttpUtil.postResponseString(url, params, this.getAdminLoginUser(request));
			
			Instruments instruments = new Instruments();
			instruments.setDisplayOrder(Integer.parseInt(displayOrder));
			instruments.setCodeNo(codeNo);

			message = JsonUtil.DtoTojson(instruments);
		}catch(Exception e){
			logger.error(e.getMessage() , e);
			message = Message.MSG_SERVICE_EXCEP;
		}
		return message;
	}

	/**
	 * 仪器列表数据加载
	 * @param request
	 * @return
	 */
	@RequestMapping(value = Constant.RMM_INSTRUMENTS_LIST, method = RequestMethod.POST)
	public void instrumentsList(DataGrid dataGrid, HttpServletRequest request, HttpServletResponse response) {
		String pageSize = request.getParameter("rows"); 	  	// 获取页面每页显示条数
		try {
			User user = this.getAdminLoginUser(request);
			if(user != null){
				dataGrid.setAppId(user.getSysId()+"");
//				dataGrid.setOrgId(user.getOrgId()+"");
			}
			
			String resultString = null;	// 返回的joson字符串
			Map<String, String> params = new HashMap<String, String>();
			if(StringUtil.isNotEmpty(pageSize)){
				dataGrid.setPageSize(Integer.parseInt(pageSize));
			}
			params.put("dataGrid", JsonUtil.DtoTojson(dataGrid));
			String url = Constant.serviceURL(Constant.RMC_LOCAL_INSTRUMENTS, Constant.RMM_INSTRUMENTS_LIST);
			resultString = HttpUtil.postResponseString(url, params, this.getAdminLoginUser(request));
			// 打印json数据, 输出到Jsp页面
			this.printJsonData(resultString, response); 
		} catch (Exception e) {
			logger.error(e.getMessage() , e);
		}
	}

	/**
	 * @Title: instrumentsInfo
	 * @Description: 仪器信息查看
	 * @param id
	 * @param request
	 * @return String 
	 */
	@RequestMapping(value = Constant.RMM_INSTRUMENTS_INFO, method = RequestMethod.POST)
	@ResponseBody
	public String instrumentsInfo(String id, HttpServletRequest request) {
		String resultString = "";
		try {
			Map<String, String> params = new HashMap<String, String>();
			params.put("id", id);
			// 查找Info
			if(StringUtils.isNotEmpty(id)){
				String url = Constant.serviceURL(Constant.RMC_LOCAL_INSTRUMENTS, Constant.RMM_INSTRUMENTS_INFO);
				resultString = HttpUtil.postResponseString(url, params, this.getAdminLoginUser(request));
			}
		} catch (Exception e) {
			logger.error(e.getMessage() , e);
			return Message.MSG_SERVICE_EXCEP;
		}
		return resultString;
	}
	
	/**
	 * 同名验证
	 * @param instruments
	 * @param request
	 * @return String
	 * @throws Exception
	 */
	@RequestMapping(value = Constant.RMM_INSTRUMENTS_IFEXISTED, method = RequestMethod.POST)
	@ResponseBody
	public String instrumentsIfExisted(@ModelAttribute Instruments instruments, HttpServletRequest request){
		String message="";
		try{
			Map<String, String> params = new HashMap<String, String>();
			params.put("dtoJson", JsonUtil.DtoTojson(instruments));
			params.put("userJson", JsonUtil.DtoTojson(this.getAdminLoginUser(request)));
			String url = Constant.serviceURL(Constant.RMC_LOCAL_INSTRUMENTS, Constant.RMM_INSTRUMENTS_IFEXISTED);
			message = HttpUtil.postResponseString(url, params, this.getAdminLoginUser(request));
		}catch(Exception e){
			logger.error(e.getMessage() , e);
			message = Message.MSG_SERVICE_EXCEP;
		}
		return message;
	}
	
	/**
	 * 新增仪器
	 * 
	 * @param instruments
	 * @param request
	 * @return
	 */
	@RequestMapping(value = Constant.RMM_INSTRUMENTS_ADD, method = RequestMethod.POST)
	@ResponseBody
	public String instrumentsAdd(@ModelAttribute Instruments instruments, HttpServletRequest request){
		String message="";
		try{
			Map<String, String> params = new HashMap<String, String>();
			params.put("dtoJson", JsonUtil.repairJson(JsonUtil.DtoTojson(instruments),instruments));
			params.put("userJson", JsonUtil.DtoTojson(getAdminLoginUser(request)));
			String url = Constant.serviceURL(Constant.RMC_LOCAL_INSTRUMENTS, Constant.RMM_INSTRUMENTS_ADD);
			message = HttpUtil.postResponseString(url, params, this.getAdminLoginUser(request));
		}catch(Exception e){
			logger.error(e.getMessage() , e);
			message = Message.MSG_SERVICE_EXCEP;
		}
		return message;
	}
	
	/**
	 * 编辑仪器
	 * 
	 * @param instruments
	 * @param request
	 * @return String
	 * @throws Exception
	 */
	@RequestMapping(value = Constant.RMM_INSTRUMENTS_EDIT, method = RequestMethod.POST)
	@ResponseBody
	public String instrumentsEdit(@ModelAttribute Instruments instruments, HttpServletRequest request){
		String message="";
		try{
			Map<String, String> params = new HashMap<String, String>();
			params.put("dtoJson", JsonUtil.repairJson(JsonUtil.DtoTojson(instruments),instruments));
			params.put("userJson", JsonUtil.DtoTojson(getAdminLoginUser(request)));
			String url = Constant.serviceURL(Constant.RMC_LOCAL_INSTRUMENTS, Constant.RMM_INSTRUMENTS_EDIT);
			message = HttpUtil.postResponseString(url, params, this.getAdminLoginUser(request));
		}catch(Exception e){
			logger.error(e.getMessage() , e);
			message = Message.MSG_SERVICE_EXCEP;
		}
		return message;
	}
	
	/**
	 * 
	 * @Title: instrumentsStatusUpdate
	 * @Description: 启用、停用状态
	 * @param  id
	 * @param  status
	 * @return String 
	 * @throws Exception
	 */
	@RequestMapping(value = Constant.RMM_INSTRUMENTS_UPDATESTATUS, method = RequestMethod.POST)
	@ResponseBody
	public String instrumentsStatusUpdate(String id, String status, HttpServletRequest request) {
		if(StringUtil.isEmpty(id) && StringUtil.isEmpty(status)){
			return Message.MSG_PARAMS_NULL;
		}
		String message = "";
		try {
			Map<String, String> params = new HashMap<String, String>();
			params.put("id", id);
			params.put("status", status);
			params.put("userJson", JsonUtil.DtoTojson(getAdminLoginUser(request)));
			String url = Constant.serviceURL(Constant.RMC_LOCAL_INSTRUMENTS, Constant.RMM_INSTRUMENTS_UPDATESTATUS);
			message = HttpUtil.postResponseString(url, params, this.getAdminLoginUser(request));
		} catch (Exception e) {
			logger.error(e.getMessage() , e);
			message = Message.MSG_SERVICE_EXCEP;
		}
		return message;
	}
	
	/**
	 * 
	 * @Title: instrumentsDelete
	 * 
	 * @Description: 删除仪器信息
	 * @param  ids
	 * @return String 
	 * @throws Exception
	 */
	@RequestMapping(value = Constant.RMM_INSTRUMENTS_DELETE, method = RequestMethod.POST)
	@ResponseBody
	public String instrumentsDelete(String ids, HttpServletRequest request) {
		String message = "";
		try {
			Map<String, String> params = new HashMap<String, String>();
			params.put("ids", ids);
			params.put("userJson", JsonUtil.DtoTojson(getAdminLoginUser(request)));
			String url = Constant.serviceURL(Constant.RMC_LOCAL_INSTRUMENTS, Constant.RMM_INSTRUMENTS_DELETE);
			message = HttpUtil.postResponseString(url, params, this.getAdminLoginUser(request));
		} catch (Exception e) {
			logger.error(e.getMessage() , e);
			message = Message.MSG_SERVICE_EXCEP;
		}		
		return message;
	}
	
	/**
	 * @Title: instrParamsInfo
	 * @Description: 仪器通讯参数明细查询
	 * @param id
	 * @param request
	 * @return String 
	 */
	@RequestMapping(value = Constant.RMM_INSTRUMENTS_PARAMS_INFO, method = RequestMethod.POST)
	@ResponseBody
	public String instrParamsInfo(String id, HttpServletRequest request) {
		String resultString = "";
		try {
			Map<String, String> params = new HashMap<String, String>();
			params.put("id", id);
			// 查找Info
			if(StringUtils.isNotEmpty(id)){
				String url = Constant.serviceURL(Constant.RMC_LOCAL_INSTRUMENTS, Constant.RMM_INSTRUMENTS_PARAMS_INFO);
				resultString = HttpUtil.postResponseString(url, params, this.getAdminLoginUser(request));
			}
		} catch (Exception e) {
			logger.error(e.getMessage() , e);
			return Message.MSG_SERVICE_EXCEP;
		}
		return resultString;
	}
	
	
	/**
	 * 编辑仪器通讯参数
	 * 
	 * @param instrParamsEdit
	 * @param request
	 * @return String
	 * @throws Exception
	 */
	@RequestMapping(value = Constant.RMM_INSTRUMENTS_PARAMS_EDIT, method = RequestMethod.POST)
	@ResponseBody
	public String instrParamsEdit(@ModelAttribute InstrParams instrParams, HttpServletRequest request){
		String message="";
		try{
			Map<String, String> params = new HashMap<String, String>();
			params.put("dtoJson", JsonUtil.repairJson(JsonUtil.DtoTojson(instrParams),instrParams));
			params.put("userJson", JsonUtil.DtoTojson(getAdminLoginUser(request)));
			String url = Constant.serviceURL(Constant.RMC_LOCAL_INSTRUMENTS, Constant.RMM_INSTRUMENTS_PARAMS_EDIT);
			message = HttpUtil.postResponseString(url, params, this.getAdminLoginUser(request));
		}catch(Exception e){
			logger.error(e.getMessage() , e);
			message = Message.MSG_SERVICE_EXCEP;
		}
		return message;
	}
	
	/**
	 * （从仪器库添加）仪器列表数据加载
	 * @param request
	 * @return
	 */
	@RequestMapping(value = Constant.RMM_INSTRUMENTS_CTR_LIST, method = RequestMethod.POST)
	public void instrumentsCtrPageList(DataGrid dataGrid, HttpServletRequest request, HttpServletResponse response) {
		String pageSize = request.getParameter("rows"); 	  	// 获取页面每页显示条数
		try {
			User user = this.getAdminLoginUser(request);
			if(user != null){
				dataGrid.setAppId(user.getSysId()+"");
				dataGrid.setOrgId(user.getOrgId()+"");
			}
			
			String resultString = null;	// 返回的joson字符串
			Map<String, String> params = new HashMap<String, String>();
			if(StringUtil.isNotEmpty(pageSize)){
				dataGrid.setPageSize(Integer.parseInt(pageSize));
			}
			params.put("dataGrid", JsonUtil.DtoTojson(dataGrid));
			String url = Constant.serviceURL(Constant.RMC_LOCAL_INSTRUMENTS, Constant.RMM_INSTRUMENTS_CTR_LIST);
			resultString = HttpUtil.postResponseString(url, params, this.getAdminLoginUser(request));
			// 打印json数据, 输出到Jsp页面
			this.printJsonData(resultString, response);
		} catch (Exception e) {
			logger.error(e.getMessage() , e);
		}
	}
	
	/**
	 * （从仪器库添加）仪器项目列表数据加载
	 * @param request
	 * @return
	 */
	@RequestMapping(value = Constant.RMM_INSTRUMENTS_CTR_ITEM_LIST, method = RequestMethod.POST)
	public void instrumentsCtrItemList(DataGrid dataGrid, HttpServletRequest request, HttpServletResponse response) {
		try {
			String resultString = null;	// 返回的joson字符串
			Map<String, String> params = new HashMap<String, String>();
			params.put("dataGrid", JsonUtil.DtoTojson(dataGrid));
			String url = Constant.serviceURL(Constant.RMC_LOCAL_INSTRUMENTS, Constant.RMM_INSTRUMENTS_CTR_ITEM_LIST);
			resultString = HttpUtil.postResponseString(url, params, this.getAdminLoginUser(request));
			// 打印json数据, 输出到Jsp页面
			this.printJsonData(resultString, response);
		} catch (Exception e) {
			logger.error(e.getMessage() , e);
		}
	}
	
	/**
	 * （从仪器库添加）仪器细菌列表数据加载
	 * @param request
	 * @return
	 */
	@RequestMapping(value = Constant.RMM_INSTRUMENTS_CTR_GERM_LIST, method = RequestMethod.POST)
	public void instrumentsCtrGermList(DataGrid dataGrid, HttpServletRequest request, HttpServletResponse response) {
		try {
			String resultString = null;	// 返回的joson字符串
			Map<String, String> params = new HashMap<String, String>();
			params.put("dataGrid", JsonUtil.DtoTojson(dataGrid));
			String url = Constant.serviceURL(Constant.RMC_LOCAL_INSTRUMENTS, Constant.RMM_INSTRUMENTS_CTR_GERM_LIST);
			resultString = HttpUtil.postResponseString(url, params, this.getAdminLoginUser(request));
			// 打印json数据, 输出到Jsp页面
			this.printJsonData(resultString, response);
		} catch (Exception e) {
			logger.error(e.getMessage() , e);
		}
	}
	
	/**
	 * （从仪器库添加）仪器抗生素列表数据加载
	 * @param request
	 * @return
	 */
	@RequestMapping(value = Constant.RMM_INSTRUMENTS_CTR_ANTI_LIST, method = RequestMethod.POST)
	public void instrumentsCtrAntiList(DataGrid dataGrid, HttpServletRequest request, HttpServletResponse response) {
		try {
			String resultString = null;	// 返回的joson字符串
			Map<String, String> params = new HashMap<String, String>();
			params.put("dataGrid", JsonUtil.DtoTojson(dataGrid));
			String url = Constant.serviceURL(Constant.RMC_LOCAL_INSTRUMENTS, Constant.RMM_INSTRUMENTS_CTR_ANTI_LIST);
			resultString = HttpUtil.postResponseString(url, params, this.getAdminLoginUser(request));
			// 打印json数据, 输出到Jsp页面
			this.printJsonData(resultString, response);
		} catch (Exception e) {
			logger.error(e.getMessage() , e);
		}
	}
	
	/**
	 * instrumentsCtrAdd
	 * 
	 * @Description: 从仪器库添加
	 * @param  ids
	 * @return String 
	 * @throws Exception
	 */
	@RequestMapping(value = Constant.RMM_INSTRUMENTS_CTR_ADD, method = RequestMethod.POST)
	@ResponseBody
	public String instrumentsCtrAdd(String ids,String orgId, HttpServletRequest request) {
		String message = "";
		try {
			Map<String, String> params = new HashMap<String, String>();
			params.put("ids", ids);
			params.put("orgId", orgId);
			params.put("userJson", JsonUtil.DtoTojson(getAdminLoginUser(request)));
			String url = Constant.serviceURL(Constant.RMC_LOCAL_INSTRUMENTS, Constant.RMM_INSTRUMENTS_CTR_ADD);
			message = HttpUtil.postResponseString(url, params, this.getAdminLoginUser(request));
		} catch (Exception e) {
			logger.error(e.getMessage() , e);
			message = Message.MSG_SERVICE_EXCEP;
		}		
		return message;
	}

	/** 
	 * @Title: centerOrgPageList 
	 * @Description: TODO(机构独立实验室和医疗机构列表) 
	 * @param dto
	 * @param page
	 * @param request
	 * @param response void
	 * @throws 
	 */
	@SuppressWarnings("unchecked")
	@RequestMapping(value = Constant.RMM_CENTERORG_PAGE_LIST, method = RequestMethod.POST)
	public void centerOrgPageList(CenterOrgQueryDto dto, Page<CenterOrg> page, HttpServletRequest request,HttpServletResponse response) {
		logger.info(Constant.METHOD + Constant.RMM_CENTERORG_PAGE_LIST + ", " + Constant.INPUT_PARAMS + "CenterOrgQueryDto:" + JsonUtil.DtoTojson(dto) + "," + "Page<CenterOrg>: " + JsonUtil.DtoTojson(page));
		if (dto == null || page == null ){
			logger.info(Constant.METHOD + Constant.RMM_CENTERORG_PAGE_LIST + "," + Constant.RETURN_VALUE + null);
			//return null;
		}
		HashMap<String, String> modelUrl = Constant.CENTERORG_MODULE_MAP.get(dto.getOrgTypeId());
		//ModelAndView mv = new ModelAndView(modelUrl.get("list"));
		Map<String, String> params = new HashMap<String, String>();
		try {
			dto.setPage(JsonUtil.DtoTojson(page));
			dto.setOrgTypeFlag("1");
			dto.setStatus(StatusEnum.enable.getIndex()+"");
			params.put("queryDtoJson", JsonUtil.DtoTojson(dto));
			String resultString = null;
			String resultList = null; // 结果List json
			String resultPage = null; // 分页page json
			String url = Constant.serviceURL(Constant.RMC_CENTERORG, Constant.RMM_CENTERORG_PAGE_LIST);
			resultString = HttpUtil.postResponseString(url, params, this.getAdminLoginUser(request));
			resultList = resultString.substring(0, resultString.indexOf("@@@"));
			resultPage = resultString.substring(resultString.indexOf("@@@") + 3, resultString.length());
			List<CenterOrg> list = (List<CenterOrg>) JsonUtil.jsonToDtos(resultList, CenterOrg.class);
			page = (Page<CenterOrg>) JsonUtil.jsonToDto(resultPage, Page.class, null);
			DataGrid<CenterOrg> dataGrid = new DataGrid<CenterOrg>();	
	        dataGrid.setTotal((int) page.getTotalCount());
	        dataGrid.setRows(list);

			this.printJsonData(JsonUtil.DtoTojson(dataGrid),response);
			
			//mv.addObject("resultList", list);
			//mv.addObject("page", page);
		} catch (Exception e) {
			logger.error(Constant.METHOD + Constant.RMM_CENTERORG_PAGE_LIST + "," + Constant.INPUT_PARAMS + JsonUtil.objectToJson(params) + "," + Constant.EXCEPTION + e.getMessage(), e);
		}
		//logger.info(Constant.METHOD + Constant.RMM_CENTERORG_PAGE_LIST + "," + Constant.RETURN_VALUE + JsonUtil.objectToJson(mv));
		//return mv;
	}
}
