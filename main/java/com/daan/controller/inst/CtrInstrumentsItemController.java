package com.daan.controller.inst;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;

import org.apache.commons.lang.StringUtils;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.servlet.ModelAndView;

import com.daan.domain.Constant;
import com.daan.domain.CtrDictCodes;
import com.daan.domain.CtrInstruments;
import com.daan.domain.CtrInstrumentsRefranges;
import com.daan.domain.CtrTestItems;
import com.daan.domain.Message;
import com.daan.dto.CtrInstrumentsItemDto;
import com.daan.dto.CtrInstrumentsItemQueryDto;
import com.daan.dto.CtrInstrumentsQueryDto;
import com.daan.enums.TypeKeyEnum;
import com.daan.util.CommonComponentController;
import com.daan.util.HttpUtil;
import com.daan.util.JsonUtil;
import com.daan.util.StringUtil;
import com.daan.utils.Page;

/**
 * @ClassName: CtrInstrumentsItemController
 * @Description: 中心仪器项目对照控制器
 * @author zhoujie
 */
@Controller
@RequestMapping(value = Constant.RMC_CTRINSTRUMENTSITEM)
public class CtrInstrumentsItemController extends CommonComponentController {

	/**
	 * 
	 * @Title: ctrInstrumentsItemMain 
	 * @Description: 初始化主页面
	 * @return ModelAndView 
	 * @throws
	 */
	@RequestMapping(value =Constant.RMM_CTRINSTRUMENTSITEM_MAIN, method = RequestMethod.GET)
	public ModelAndView ctrInstrumentsItemMain(HttpServletRequest request) {
		
		ModelAndView mv = new ModelAndView("/WEB-INF/jsp/inst/ctrInstrumentsItem/ctrInstrumentsItemMain.jsp");
		Map<String, String> params = new HashMap<String, String>();
		// 查找标本类型List
		String message = "";
		try {
			String url = Constant.serviceURL(Constant.RMC_TESTITEM, Constant.RMM_FINFBYDICTCODE);
			params.put("typeKey", TypeKeyEnum.sampleType.getIndex().toString());//检验方法
			message = HttpUtil.getResponseString(url, params,this.getAdminLoginUser(request));
			List<CtrDictCodes> list = (List<CtrDictCodes>) JsonUtil.jsonToDtos(message, CtrDictCodes.class);
			mv.addObject("stList", list);
			
			// 查找检验方法List
			params = new HashMap<String, String>();
			params.put("typeKey", TypeKeyEnum.testMethod.getIndex().toString());//检验方法
			
			url = Constant.serviceURL(Constant.RMC_TESTITEM, Constant.RMM_FINFBYDICTCODE);
			message = HttpUtil.getResponseString(url, params,this.getAdminLoginUser(request));
			List<CtrDictCodes> list2 = (List<CtrDictCodes>) JsonUtil.jsonToDtos(message, CtrDictCodes.class);
			mv.addObject("methodList", list2);
			
		} catch (Exception e) {
			logger.error(e.getMessage() , e);
			message = Message.MSG_SERVICE_EXCEP;
		}
		return mv;
	}
	
	/**
	 * 
	 * @Title: ctrInstrumentsMain 
	 * @Description: 初始化仪器选择页面
	 * @return ModelAndView 
	 * @throws
	 */
	@RequestMapping(value = Constant.RMM_CTRINSTRUMENTS_MAIN, method = RequestMethod.GET)
	public ModelAndView ctrInstrumentsMain(HttpServletRequest request) {
		ModelAndView mv = new ModelAndView("/WEB-INF/jsp/inst/ctrInstrumentsItem/ctrInstrumentsMain.jsp");
		return mv;
	}

	/**
	 * @Title: ctrInstrumentsList 
	 * @Description: (仪器选择页面) 中心仪器列表
	 * @return ModelAndView 
	 * @throws
	 */
	@RequestMapping(value = Constant.RMM_CTRINSTRUMENTS_PAGE_LIST, method = RequestMethod.POST)
	@ResponseBody
	public Map<String, Object> ctrInstrumentsPageList(CtrInstrumentsQueryDto dto, Page<CtrInstruments> page, HttpServletRequest request) {
		String pageNo = request.getParameter("page");
		int no = 1;
		try{
			no = Integer.valueOf(pageNo);
		} catch (Exception e) {
			no = 1;
		}
		page.setPageNo(no);
		Map<String, Object> map = new HashMap<String, Object>();
		map.put("total", 0);
		map.put("rows", new ArrayList<CtrInstruments>());
		
//		ModelAndView mv = new ModelAndView("/WEB-INF/jsp/inst/ctrInstrumentsItem/ctrInstrumentsList.jsp");

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
			map.put("total", page.getTotalCount());
			map.put("rows", list);
//			mv.addObject("resultList", list);
//			mv.addObject("page",page);
		} catch (Exception e) {
			logger.error(e.getMessage() , e);
			message = Message.MSG_SERVICE_EXCEP;
		}

		return map;
	}
	
	/**
	 * 
	 * @Title: ctrInstrumentsItemListMain 
	 * @Description: 初始化项目对照列表页面
	 * @return ModelAndView 
	 * @throws
	 */
	@RequestMapping(value = Constant.RMM_CTRINSTRUMENTSITEM_LIST_MAIN, method = RequestMethod.GET)
	public ModelAndView ctrInstrumentsItemListMain(HttpServletRequest request) {
		ModelAndView mv = new ModelAndView("/WEB-INF/jsp/inst/ctrInstrumentsItem/ctrInstrumentsItemListMain.jsp");
		return mv;
	}
	
	/**
	 * @Title: ctrInstrumentsItemList 
	 * @Description: 查询中心仪器项目对照列表 
	 * @return ModelAndView 
	 * @throws
	 */
	@RequestMapping(value = Constant.RMM_CTRINSTRUMENTSITEM_LIST, method = RequestMethod.POST)
	@ResponseBody
	public Map<String, Object> ctrInstrumentsItemList(CtrInstrumentsItemQueryDto dto, HttpServletRequest request) {
		Map<String, Object> map = new HashMap<String, Object>();
		map.put("total", 0);
		map.put("rows", new ArrayList<CtrInstrumentsItemDto>());
		
//		ModelAndView mv = new ModelAndView("/WEB-INF/jsp/inst/ctrInstrumentsItem/ctrInstrumentsItemList.jsp");
		
		//初始化时，没有仪器
		if(StringUtils.isEmpty(dto.getInstrumentId())){
//			mv.addObject("itemList", new ArrayList<CtrInstrumentsItemDto>());
			return map;
		}
		
		String message = "";
		try {
			Map<String, String> params = new HashMap<String, String>();
			params.put("queryDtoJson", JsonUtil.DtoTojson(dto));
			
			String url = Constant.serviceURL(Constant.RMC_CTRINSTRUMENTSITEM, Constant.RMM_CTRINSTRUMENTSITEM_LIST);
			message = HttpUtil.postResponseString(url, params, this.getAdminLoginUser(request));
			List<CtrInstrumentsItemDto> list = (List<CtrInstrumentsItemDto>) JsonUtil.jsonToDtos(message, CtrInstrumentsItemDto.class);
			if (list != null) {

				map.put("total", list.size());
				map.put("rows", list);
			}
//			mv.addObject("itemList", list);
		} catch (Exception e) {
			logger.error(e.getMessage() , e);
			message = Message.MSG_SERVICE_EXCEP;
		}

		return map;
	}
	
	/**
	 * @Title: ctrInstrumentsItemRegrangeList 
	 * @Description: 查询参考值列表 
	 * @return ModelAndView 
	 * @throws
	 */
	@RequestMapping(value = Constant.RMM_CTRINSTRUMENTSITEM_REF_LIST, method = RequestMethod.GET)
	@ResponseBody
	public Map<String, Object> ctrInstrumentsItemRegrangeList(CtrInstrumentsItemQueryDto dto, HttpServletRequest request) {
		Map<String, Object> map = new HashMap<String, Object>();
		map.put("total", 0);
		map.put("rows", new ArrayList<CtrInstrumentsRefranges>());
		
//		ModelAndView mv = new ModelAndView("/WEB-INF/jsp/inst/ctrInstrumentsItem/ctrInstrumentsRefrangeList.jsp");
		
		//初始化时，没有仪器
		if(StringUtils.isEmpty(dto.getInstrumentId()) || StringUtils.isEmpty(dto.getTestItemId())){
//			mv.addObject("itemList", new ArrayList<CtrTestItems>());
			return map;
		}
		
		String message = "";
		try {
			Map<String, String> params = new HashMap<String, String>();
			params.put("queryDtoJson", JsonUtil.DtoTojson(dto));
			
			String url = Constant.serviceURL(Constant.RMC_CTRINSTRUMENTSITEM, Constant.RMM_CTRINSTRUMENTSITEM_REF_LIST);
			message = HttpUtil.postResponseString(url, params, this.getAdminLoginUser(request));
			List<CtrInstrumentsRefranges> list = (List<CtrInstrumentsRefranges>) JsonUtil.jsonToDtos(message, CtrInstrumentsRefranges.class);
//			mv.addObject("itemList", list);
			map.put("total", list.size());
			map.put("rows", list);
		} catch (Exception e) {
			logger.error(e.getMessage() , e);
			message = Message.MSG_SERVICE_EXCEP;
		}

		return map;
	}
	
	/**
	 * 修改项目对照
	 * @param ctrInstrumentsEdit
	 * @param request
	 * @return
	 */
	@RequestMapping(value = Constant.RMM_CTRINSTRUMENTSITEM_SAVE, method = RequestMethod.POST)
	@ResponseBody
	public String ctrInstrumentsItemSave(@ModelAttribute CtrInstrumentsItemDto dto, HttpServletRequest request){
		String message="";
		try{
			//无数据，直接返回
			if(dto.getTxtId()==null || dto.getTxtId().isEmpty()){
				return message;
			}
			
			Map<String, String> params = new HashMap<String, String>();
			params.put("dtoJson", JsonUtil.DtoTojson(dto));
			params.put("userJson", JsonUtil.DtoTojson(getAdminLoginUser(request)));
			String url = Constant.serviceURL(Constant.RMC_CTRINSTRUMENTSITEM, Constant.RMM_CTRINSTRUMENTSITEM_SAVE);
			message = HttpUtil.postResponseString(url, params, this.getAdminLoginUser(request));

		}catch(Exception e){
			logger.error(e.getMessage() , e);
			message = Message.MSG_SERVICE_EXCEP;
		}
		return message;
	}
	
	/**
	 * 
	 * @Title: ctrInstrumentsInfo
	 * @Description: 初始化参考值查看页面
	 * @return ModelAndView 
	 * @throws
	 */
	@RequestMapping(value = Constant.RMM_CTRINSTRUMENTSITEM_REF_INFO, method = RequestMethod.POST)
	@ResponseBody
	public Map<String, Object> ctrInstrumentsRefangeInfo(String id, String opType, HttpServletRequest request) {
		Map<String, Object> map = new HashMap<String, Object>();
		map.put("entity", new CtrInstrumentsRefranges());
//		ModelAndView mv = new ModelAndView();
//		if("add".equals(opType)){
//			mv.setViewName("/WEB-INF/jsp/inst/ctrInstrumentsItem/ctrInstrumentsRefrangeAdd.jsp");
//		} else if("edit".equals(opType)){
//			mv.setViewName("/WEB-INF/jsp/inst/ctrInstrumentsItem/ctrInstrumentsRefrangeEdit.jsp");
//		} else if("copy".equals(opType)){
//			mv.setViewName("/WEB-INF/jsp/inst/ctrInstrumentsItem/ctrInstrumentsRefrangeCopy.jsp");
//		}
		
		String message = "";
		try {
			Map<String, String> params = new HashMap<String, String>();
			params.put("id", id);
//			mv.addObject("opType", opType);
			
			// 查找Info
			String url = "";
			if(StringUtils.isNotEmpty(id)){
				url = Constant.serviceURL(Constant.RMC_CTRINSTRUMENTSITEM, Constant.RMM_CTRINSTRUMENTSITEM_REF_INFO);
				message = HttpUtil.postResponseString(url, params, this.getAdminLoginUser(request));
				CtrInstrumentsRefranges entity = (CtrInstrumentsRefranges) JsonUtil.jsonToDto(message, CtrInstrumentsRefranges.class, null);
//				mv.addObject("entity", entity);
				map.put("entity", entity);
			}
			
			// 查找标本类型List
//			url = Constant.serviceURL(Constant.RMC_TESTITEM, Constant.RMM_FINFBYDICTCODE);
//			params.put("typeKey", TypeKeyEnum.sampleType.getIndex().toString());//检验方法
//			message = HttpUtil.getResponseString(url, params,this.getAdminLoginUser(request));
//			List<CtrDictCodes> list = (List<CtrDictCodes>) JsonUtil.jsonToDtos(message, CtrDictCodes.class);
//			mv.addObject("stList", list);
			
		} catch (Exception e) {
			logger.error(e.getMessage() , e);
			message = Message.MSG_SERVICE_EXCEP;
		}
		
		return map;
	}
	
	/**
	 * 年龄段重叠验证
	 * @param ctrInstrumentsAdd
	 * @param request
	 * @return
	 */
	@RequestMapping(value = Constant.RMM_CTRINSTRUMENTSITEM_REF_IFOVERLAP, method = RequestMethod.POST)
	@ResponseBody
	public String checkAgeOverlap(@ModelAttribute CtrInstrumentsRefranges ctrInstrumentsRefranges, HttpServletRequest request){
		String message="";
		try{
			Map<String, String> params = new HashMap<String, String>();
			params.put("dtoJson", JsonUtil.DtoTojson(ctrInstrumentsRefranges));
			String url = Constant.serviceURL(Constant.RMC_CTRINSTRUMENTSITEM, Constant.RMM_CTRINSTRUMENTSITEM_REF_IFOVERLAP);
			message = HttpUtil.postResponseString(url, params, this.getAdminLoginUser(request));
		}catch(Exception e){
			e.printStackTrace();
			logger.error(e.getMessage() , e);
			message = Message.MSG_SERVICE_EXCEP;
		}
		return message;
	}
	
	/**
	 * 新增参考值
	 * 
	 * @param ctrInstrumentsRefrangesAdd
	 * @param request
	 * @return
	 */
	@RequestMapping(value = Constant.RMM_CTRINSTRUMENTSITEM_REF_ADD, method = RequestMethod.POST)
	@ResponseBody
	public String ctrInstrumentsRefrangesAdd(@ModelAttribute CtrInstrumentsRefranges ctrInstrumentsRefranges, HttpServletRequest request){
		String message="";
		try{
			Map<String, String> params = new HashMap<String, String>();
			params.put("dtoJson", JsonUtil.DtoTojson(ctrInstrumentsRefranges));
			params.put("userJson", JsonUtil.DtoTojson(getAdminLoginUser(request)));
			String url = Constant.serviceURL(Constant.RMC_CTRINSTRUMENTSITEM, Constant.RMM_CTRINSTRUMENTSITEM_REF_ADD);
			HttpUtil.postResponseString(url, params, this.getAdminLoginUser(request));
			message = Message.MSG_SAVE_SUCC;
		}catch(Exception e){
			logger.error(e.getMessage() , e);
			message = Message.MSG_SERVICE_EXCEP;
		}
		return message;
	}
	
	/**
	 * 修改参考值
	 * @param ctrInstrumentsRefrangesEdit
	 * @param request
	 * @return
	 */
	@RequestMapping(value = Constant.RMM_CTRINSTRUMENTSITEM_REF_EDIT, method = RequestMethod.POST)
	@ResponseBody
	public String ctrInstrumentsRefrangesEdit(@ModelAttribute CtrInstrumentsRefranges ctrInstrumentsRefranges, HttpServletRequest request){
		String message="";
		try{
			Map<String, String> params = new HashMap<String, String>();
			params.put("dtoJson", JsonUtil.DtoTojson(ctrInstrumentsRefranges));
			params.put("userJson", JsonUtil.DtoTojson(getAdminLoginUser(request)));
			String url = Constant.serviceURL(Constant.RMC_CTRINSTRUMENTSITEM, Constant.RMM_CTRINSTRUMENTSITEM_REF_EDIT);
			HttpUtil.postResponseString(url, params, this.getAdminLoginUser(request));
			
			params.clear();
			params.put("id", ctrInstrumentsRefranges.getId()+"");
			url = Constant.serviceURL(Constant.RMC_CTRINSTRUMENTSITEM, Constant.RMM_CTRINSTRUMENTSITEM_REF_INFO);
			message = HttpUtil.postResponseString(url, params, this.getAdminLoginUser(request));
			CtrInstrumentsRefranges entity = (CtrInstrumentsRefranges) JsonUtil.jsonToDto(message, CtrInstrumentsRefranges.class, null);
			entity.setIdString(entity.getId()+"");
			message = Message.DATA + JsonUtil.DtoTojson(entity);
		}catch(Exception e){
			logger.error(e.getMessage() , e);
			message = Message.MSG_SERVICE_EXCEP;
		}
		return message;
	}
	
	/**
	 * 
	 * @Title: ctrInstrumentsItemRefrangeDelete
	 * @Description: 删除参考值
	 * @return String 
	 * @throws
	 */
	@RequestMapping(value = Constant.RMM_CTRINSTRUMENTSITEM_REF_DELETE, method = RequestMethod.GET)
	@ResponseBody
	public String ctrInstrumentsItemRefrangeDelete(String id, HttpServletRequest request) {
		String message = "";
		try {
			Map<String, String> params = new HashMap<String, String>();
			params.put("id", id);
			params.put("userJson", JsonUtil.DtoTojson(getAdminLoginUser(request)));
			String url = Constant.serviceURL(Constant.RMC_CTRINSTRUMENTSITEM, Constant.RMM_CTRINSTRUMENTSITEM_REF_DELETE);
			message = HttpUtil.postResponseString(url, params, this.getAdminLoginUser(request));
		} catch (Exception e) {
			logger.error(e.getMessage() , e);
			message = Message.MSG_SERVICE_EXCEP;
		}
		
		return message;
	}
	
	/**
	 * 
	 * @Title: ctrInstrumentsRegrangeDeleteBatch
	 * @Description: 批量删除参考值
	 * @return String 
	 * @throws
	 */
	@RequestMapping(value = Constant.RMM_CTRINSTRUMENTSITEM_REF_DELETE_BATCH, method = RequestMethod.GET)
	@ResponseBody
	public String ctrInstrumentsRegrangeDeleteBatch(String ids, HttpServletRequest request) {
		String message = "";
		try {
			Map<String, String> params = new HashMap<String, String>();
			params.put("ids", ids);
			params.put("userJson", JsonUtil.DtoTojson(getAdminLoginUser(request)));
			String url = Constant.serviceURL(Constant.RMC_CTRINSTRUMENTSITEM, Constant.RMM_CTRINSTRUMENTSITEM_REF_DELETE_BATCH);
			message = HttpUtil.postResponseString(url, params, this.getAdminLoginUser(request));
		} catch (Exception e) {
			logger.error(e.getMessage() , e);
			message = Message.MSG_SERVICE_EXCEP;
		}
		
		return message;
	}
	
	/**
	 * 
	 * @Title: ctrInstrumentsItemDeleteBatch
	 * @Description: 批量删除项目
	 * @return String 
	 * @throws
	 */
	@RequestMapping(value = Constant.RMM_CTRINSTRUMENTSITEM_DELETE_BATCH, method = RequestMethod.GET)
	@ResponseBody
	public String ctrInstrumentsItemDeleteBatch(String ids, HttpServletRequest request) {
		
		String message = "";
		try {
			Map<String, String> params = new HashMap<String, String>();
			params.put("ids", ids);
			params.put("userJson", JsonUtil.DtoTojson(getAdminLoginUser(request)));
			String url = Constant.serviceURL(Constant.RMC_CTRINSTRUMENTSITEM, Constant.RMM_CTRINSTRUMENTSITEM_DELETE_BATCH);
			message = HttpUtil.postResponseString(url, params, this.getAdminLoginUser(request));
		} catch (Exception e) {
			logger.error(e.getMessage() , e);
			message = Message.MSG_SERVICE_EXCEP;
		}
		
		return message;
	}
	
	/**
	 * 
	 * @Title: ctrInstrumentsItemAddMain 
	 * @Description: 初始化项目添加页面
	 * @return ModelAndView 
	 * @throws
	 */
	@RequestMapping(value = Constant.RMM_CTRINSTRUMENTSITEM_ADD_MAIN, method = RequestMethod.GET)
	public ModelAndView ctrInstrumentsItemAddMain(HttpServletRequest request) {
		ModelAndView mv = new ModelAndView("/WEB-INF/jsp/inst/ctrInstrumentsItem/ctrInstrumentsItemAddMain.jsp");
		return mv;
	}
	
	/**
	 * 
	 * @Title: containList 
	 * @Description: 查询已包含项目列表
	 * @return ModelAndView 
	 * @throws
	 */
	@RequestMapping(value = Constant.RMM_CTRINSTRUMENTSITEM_ADD_LEFT, method = RequestMethod.POST)
	@ResponseBody
	public Map<String, Object> containList(String instrumentId, HttpServletRequest request){
		Map<String, Object> map = new HashMap<String, Object>();
		map.put("total", 0);
		map.put("rows", new ArrayList<CtrTestItems>());
		
//		ModelAndView mv = new ModelAndView("/WEB-INF/jsp/inst/ctrInstrumentsItem/ctrInstrumentsItemAddLeft.jsp");
				
		String message = "";
		try {
			Map<String, String> params = new HashMap<String, String>();
			params.put("instrumentId", instrumentId);
			
			String url = Constant.serviceURL(Constant.RMC_CTRINSTRUMENTSITEM, Constant.RMM_CTRINSTRUMENTSITEM_ADD_LEFT);
			message = HttpUtil.postResponseString(url, params, this.getAdminLoginUser(request));
			List<CtrTestItems> list = (List<CtrTestItems>) JsonUtil.jsonToDtos(message, CtrTestItems.class);
//			mv.addObject("containList", list);
			if (list != null) {
				map.put("total", list.size());
				map.put("rows", list);
			}
			
		} catch (Exception e) {
			logger.error(e.getMessage() , e);
			message = Message.MSG_SERVICE_EXCEP;
		}

		return map;
	}
	
	/**
	 * 
	 * @Title: ctrInstrumentsItemListMain 
	 * @Description: 初始化项目对照列表页面
	 * @return ModelAndView 
	 * @throws
	 */
	@RequestMapping(value = Constant.RMM_CTRINSTRUMENTSITEM_ADD_RIGHT_MAIN, method = RequestMethod.GET)
	public Map<String, Object> unContainListMain(HttpServletRequest request) {
		Map<String, Object> map = new HashMap<String, Object>();
		map.put("total", 0);
		map.put("rows", new ArrayList<CtrDictCodes>());
		
//		ModelAndView mv = new ModelAndView("/WEB-INF/jsp/inst/ctrInstrumentsItem/ctrInstrumentsItemAddRightMain.jsp");
		
		String message = "";
		try {
			// 查找检验方法List
			Map<String, String> params = new HashMap<String, String>();
			params.put("typeKey", TypeKeyEnum.testMethod.getIndex().toString());//检验方法
			
			String url = Constant.serviceURL(Constant.RMC_TESTITEM, Constant.RMM_FINFBYDICTCODE);
			message = HttpUtil.getResponseString(url, params,this.getAdminLoginUser(request));
			List<CtrDictCodes> list = (List<CtrDictCodes>) JsonUtil.jsonToDtos(message, CtrDictCodes.class);
//			mv.addObject("methodList", list2);
			if (list != null) {
				map.put("total", list.size());
				map.put("rows", list);
			}
		} catch (Exception e) {
			logger.error(e.getMessage() , e);
			message = Message.MSG_SERVICE_EXCEP;
		}
		
		return map;
	}
	
	/**
	 * 
	 * @Title: unContainList 
	 * @Description: 查询未包含项目列表
	 * @return ModelAndView 
	 * @throws
	 */
	@RequestMapping(value = Constant.RMM_CTRINSTRUMENTSITEM_ADD_RIGHT_LIST, method = RequestMethod.POST)
	@ResponseBody
	public Map<String, Object> unContainList(CtrInstrumentsItemQueryDto dto, HttpServletRequest request){
		Map<String, Object> map = new HashMap<String, Object>();
		map.put("total", 0);
		map.put("rows", new ArrayList<CtrTestItems>());
//		ModelAndView mv = new ModelAndView("/WEB-INF/jsp/inst/ctrInstrumentsItem/ctrInstrumentsItemAddRightList.jsp");
				
		if("1".equals(dto.getInit())){
			// 初始化页面时，返回空列表。
//			mv.addObject("unContainList", new ArrayList<CtrTestItems>());
			return map;
		}
		
		String message = "";
		try {
			Map<String, String> params = new HashMap<String, String>();
			params.put("queryDtoJson", JsonUtil.DtoTojson(dto));
			
			String url = Constant.serviceURL(Constant.RMC_CTRINSTRUMENTSITEM, Constant.RMM_CTRINSTRUMENTSITEM_ADD_RIGHT_LIST);
			message = HttpUtil.postResponseString(url, params, this.getAdminLoginUser(request));
			List<CtrTestItems> list = (List<CtrTestItems>) JsonUtil.jsonToDtos(message, CtrTestItems.class);
//			mv.addObject("unContainList", list);
			if (list != null) {
				map.put("total", list.size());
				map.put("rows", list);
			}
		} catch (Exception e) {
			logger.error(e.getMessage() , e);
			message = Message.MSG_SERVICE_EXCEP;
		}

		return map;
	}
	
	/**
	 * 
	 * @Title: ctrInstrumentsItemAddBatch
	 * @Description: 添加项目确认
	 * @return String 
	 * @throws
	 */
	@RequestMapping(value = Constant.RMM_CTRINSTRUMENTSITEM_ADD_BATCH, method = RequestMethod.GET)
	@ResponseBody
	public String ctrInstrumentsItemAddBatch(String instrumentId, String addTestItemIds, 
			String delTestItemIds, HttpServletRequest request) {
		String message = "";
		try {
			Map<String, String> params = new HashMap<String, String>();
			params.put("instrumentId", instrumentId);
			params.put("addTestItemIds", addTestItemIds);
			params.put("delTestItemIds", delTestItemIds);
			params.put("userJson", JsonUtil.DtoTojson(getAdminLoginUser(request)));
			String url = Constant.serviceURL(Constant.RMC_CTRINSTRUMENTSITEM, Constant.RMM_CTRINSTRUMENTSITEM_ADD_BATCH);
			message = HttpUtil.postResponseString(url, params, this.getAdminLoginUser(request));
		} catch (Exception e) {
			logger.error(e.getMessage() , e);
			message = Message.MSG_SERVICE_EXCEP;
		}
		
		return message;
	}
}
