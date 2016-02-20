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
import com.daan.domain.CtrMicsItems;
import com.daan.domain.CtrTestItems;
import com.daan.domain.Message;
import com.daan.dto.CtrInstrumentsItemDto;
import com.daan.dto.CtrInstrumentsMicsDto;
import com.daan.dto.CtrInstrumentsMicsQueryDto;
import com.daan.util.CommonComponentController;
import com.daan.util.HttpUtil;
import com.daan.util.JsonUtil;

/**
 * @ClassName: CtrInstrumentsMicsController
 * @Description: 中心仪器微生物对照控制器
 * @author zhoujie
 */
@Controller
@RequestMapping(value = Constant.RMC_CTRINSTRUMENTSMICS)
public class CtrInstrumentsMicsController extends CommonComponentController {

	/**
	 * 
	 * @Title: ctrInstrumentsMicsMain 
	 * @Description: 初始化主页面
	 * @return ModelAndView 
	 * @throws
	 */
	@RequestMapping(value = { Constant.RMM_CTRINSTRUMENTSMICS_MAIN, "/", "" }, method = RequestMethod.GET)
	public ModelAndView ctrInstrumentsMicsMain(HttpServletRequest request) {
		ModelAndView mv = new ModelAndView("/WEB-INF/jsp/inst/ctrInstrumentsMics/ctrInstrumentsMicsMain.jsp");
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
		ModelAndView mv = new ModelAndView("/WEB-INF/jsp/inst/ctrInstrumentsMics/ctrInstrumentsMain.jsp");
		return mv;
	}
	
	/**
	 * 
	 * @Title: ctrInstrumentsMicsListMain 
	 * @Description: 初始化微生物对照列表页面
	 * @return ModelAndView 
	 * @throws
	 */
	@RequestMapping(value = Constant.RMM_CTRINSTRUMENTSMICS_LIST_MAIN, method = RequestMethod.GET)
	public ModelAndView ctrInstrumentsMicsListMain(String itemTypeId, HttpServletRequest request) {
		ModelAndView mv = new ModelAndView();
		if("1".equals(itemTypeId)){
			// 细菌
			mv.setViewName("/WEB-INF/jsp/inst/ctrInstrumentsMics/ctrInstrumentsMicsGermListMain.jsp");
		} else if("2".equals(itemTypeId)){
			// 抗生素
			mv.setViewName("/WEB-INF/jsp/inst/ctrInstrumentsMics/ctrInstrumentsMicsAntiListMain.jsp");
		}
		return mv;
	}
	
	/**
	 * @Title: ctrInstrumentsMicsList 
	 * @Description: 查询中心仪器微生物对照列表 
	 * @return ModelAndView 
	 * @throws
	 */
	@RequestMapping(value = Constant.RMM_CTRINSTRUMENTSMICS_LIST, method = RequestMethod.POST)
	@ResponseBody
	public  Map<String, Object> ctrInstrumentsMicsList(CtrInstrumentsMicsQueryDto dto, HttpServletRequest request) {
		Map<String, Object> map = new HashMap<String, Object>();
		map.put("total", 0);
		map.put("rows", new ArrayList<CtrInstrumentsMicsDto>());
//		ModelAndView mv = new ModelAndView();
		if("1".equals(dto.getItemTypeId())){
			// 细菌
//			mv.setViewName("/WEB-INF/jsp/inst/ctrInstrumentsMics/ctrInstrumentsMicsGermList.jsp");
		} else if("2".equals(dto.getItemTypeId())){
			// 抗生素
//			mv.setViewName("/WEB-INF/jsp/inst/ctrInstrumentsMics/ctrInstrumentsMicsAntiList.jsp");
		}
		
		//初始化时，没有仪器
		if(StringUtils.isEmpty(dto.getInstrumentId())){
//			mv.addObject("germList", new ArrayList<CtrInstrumentsMicsDto>());
//			mv.addObject("antiList", new ArrayList<CtrInstrumentsMicsDto>());
			map.put("total", 0);
			map.put("rows", null);
			return map;
		}
		
		String message = "";
		try {
			Map<String, String> params = new HashMap<String, String>();
			params.put("queryDtoJson", JsonUtil.DtoTojson(dto));
			
			String url = Constant.serviceURL(Constant.RMC_CTRINSTRUMENTSMICS, Constant.RMM_CTRINSTRUMENTSMICS_LIST);
			message = HttpUtil.postResponseString(url, params, this.getAdminLoginUser(request));
			List<CtrInstrumentsMicsDto> list = (List<CtrInstrumentsMicsDto>) JsonUtil.jsonToDtos(message, CtrInstrumentsMicsDto.class);
//			mv.addObject("germList", list);
//			mv.addObject("antiList", list);
			map.put("total", list.size());
			map.put("rows", list);
		} catch (Exception e) {
			logger.error(e.getMessage() , e);
			message = Message.MSG_SERVICE_EXCEP;
		}

		return map;
	}
	
	/**
	 * 修改微生物对照
	 * @param ctrInstrumentsMicsGermSave
	 * @param request
	 * @return
	 */
	@RequestMapping(value = Constant.RMM_CTRINSTRUMENTSMICS_SAVE, method = RequestMethod.POST)
	@ResponseBody
	public String ctrInstrumentsMicsSave(@ModelAttribute CtrInstrumentsMicsDto dto, HttpServletRequest request){
		String message="";
		try{
			//无数据，直接返回
			if("1".equals(dto.getItemTypeId()) && (dto.getTxtIdGerm()==null || dto.getTxtIdGerm().isEmpty())){
				return message;
			}
			if("2".equals(dto.getItemTypeId()) && (dto.getTxtIdAnti()==null || dto.getTxtIdAnti().isEmpty())){
				return message;
			}
			
			Map<String, String> params = new HashMap<String, String>();
			params.put("dtoJson", JsonUtil.DtoTojson(dto));
			params.put("userJson", JsonUtil.DtoTojson(getAdminLoginUser(request)));
			String url = Constant.serviceURL(Constant.RMC_CTRINSTRUMENTSMICS, Constant.RMM_CTRINSTRUMENTSMICS_SAVE);
			message = HttpUtil.postResponseString(url, params, this.getAdminLoginUser(request));

		}catch(Exception e){
			logger.error(e.getMessage() , e);
			message = Message.MSG_SERVICE_EXCEP;
		}
		return message;
	}
	
	/**
	 * 
	 * @Title: ctrInstrumentsMicsDeleteBatch
	 * @Description: 批量删除微生物
	 * @return String 
	 * @throws
	 */
	@RequestMapping(value = Constant.RMM_CTRINSTRUMENTSMICS_DELETE_BATCH, method = RequestMethod.POST)
	@ResponseBody
	public String ctrInstrumentsMicsDeleteBatch(String ids, HttpServletRequest request) {
		
		String message = "";
		try {
			Map<String, String> params = new HashMap<String, String>();
			params.put("ids", ids);
			params.put("userJson", JsonUtil.DtoTojson(getAdminLoginUser(request)));
			String url = Constant.serviceURL(Constant.RMC_CTRINSTRUMENTSMICS, Constant.RMM_CTRINSTRUMENTSMICS_DELETE_BATCH);
			message = HttpUtil.postResponseString(url, params, this.getAdminLoginUser(request));
		} catch (Exception e) {
			logger.error(e.getMessage() , e);
			message = Message.MSG_SERVICE_EXCEP;
		}
		
		return message;
	}
	
	/**
	 * 
	 * @Title: ctrInstrumentsMicsAddMain 
	 * @Description: 初始化微生物添加页面
	 * @return ModelAndView 
	 * @throws
	 */
	@RequestMapping(value = Constant.RMM_CTRINSTRUMENTSMICS_ADD_MAIN, method = RequestMethod.GET)
	public ModelAndView ctrInstrumentsMicsAddMain(String itemTypeId, HttpServletRequest request) {
		ModelAndView mv = new ModelAndView();
		if("1".equals(itemTypeId)){
			// 细菌
			mv.setViewName("/WEB-INF/jsp/inst/ctrInstrumentsMics/ctrInstrumentsMicsGermAddMain.jsp");
		} else if("2".equals(itemTypeId)){
			// 抗生素
			mv.setViewName("/WEB-INF/jsp/inst/ctrInstrumentsMics/ctrInstrumentsMicsAntiAddMain.jsp");
		}
		return mv;
	}
		
	/**
	 * 
	 * @Title: containList 
	 * @Description: 查询已包含微生物列表
	 * @return ModelAndView 
	 * @throws
	 */
	@RequestMapping(value = Constant.RMM_CTRINSTRUMENTSMICS_ADD_LEFT, method = RequestMethod.POST)
	@ResponseBody
	public Map<String, Object>  containList(String instrumentId, String itemTypeId, HttpServletRequest request){
//		ModelAndView mv = new ModelAndView();
		Map<String, Object> map = new HashMap<String, Object>();
		map.put("total", 0);
		map.put("rows", new ArrayList<CtrMicsItems>());		
//		if("1".equals(itemTypeId)){
//			// 细菌
//			mv.setViewName("/WEB-INF/jsp/inst/ctrInstrumentsMics/ctrInstrumentsMicsGermAddLeft.jsp");
//		} else if("2".equals(itemTypeId)){
//			// 抗生素
//			mv.setViewName("/WEB-INF/jsp/inst/ctrInstrumentsMics/ctrInstrumentsMicsAntiAddLeft.jsp");
//		}
		
		String message = "";
		try {
			Map<String, String> params = new HashMap<String, String>();
			params.put("instrumentId", instrumentId);
			params.put("itemTypeId", itemTypeId);
			
			String url = Constant.serviceURL(Constant.RMC_CTRINSTRUMENTSMICS, Constant.RMM_CTRINSTRUMENTSMICS_ADD_LEFT);
			message = HttpUtil.postResponseString(url, params, this.getAdminLoginUser(request));
			List<CtrMicsItems> list = (List<CtrMicsItems>) JsonUtil.jsonToDtos(message, CtrMicsItems.class);
//			mv.addObject("containGermList", list);
//			mv.addObject("containAntiList", list);
			map.put("total", list.size());
			map.put("rows", list);
		} catch (Exception e) {
			logger.error(e.getMessage() , e);
			message = Message.MSG_SERVICE_EXCEP;
		}

		return map;
	}
	
	/**
	 * 
	 * @Title: unContainListMain 
	 * 
	 * @Description: 初始化微生物对照列表页面
	 * @return ModelAndView 
	 * @throws
	 */
	@RequestMapping(value = Constant.RMM_CTRINSTRUMENTSMICS_ADD_RIGHT_MAIN, method = RequestMethod.POST)
	public ModelAndView unContainListMain(String itemTypeId, HttpServletRequest request) {
		ModelAndView mv = new ModelAndView();
		if("1".equals(itemTypeId)){
			// 细菌
			mv.setViewName("/WEB-INF/jsp/inst/ctrInstrumentsMics/ctrInstrumentsMicsGermAddRightMain.jsp");
		} else if("2".equals(itemTypeId)){
			// 抗生素
			mv.setViewName("/WEB-INF/jsp/inst/ctrInstrumentsMics/ctrInstrumentsMicsAntiAddRightMain.jsp");
		}
		return mv;
	}
		
	/**
	 * 
	 * @Title: unContainList 
	 * 
	 * @Description: 查询未包含微生物列表
	 * @return ModelAndView 
	 * @throws
	 */
	@RequestMapping(value = Constant.RMM_CTRINSTRUMENTSMICS_ADD_RIGHT_LIST, method = RequestMethod.POST)
	@ResponseBody
	public Map<String, Object>  unContainList(CtrInstrumentsMicsQueryDto dto, HttpServletRequest request){
		//ModelAndView mv = new ModelAndView();
		Map<String, Object> map = new HashMap<String, Object>();
		map.put("total", 0);
		map.put("rows", new ArrayList<CtrMicsItems>());	
//		if("1".equals(dto.getItemTypeId())){2
//			// 细菌
//			mv.setViewName("/WEB-INF/jsp/inst/ctrInstrumentsMics/ctrInstrumentsMicsGermAddRightList.jsp");
//		} else if("2".equals(dto.getItemTypeId())){
//			// 抗生素
//			mv.setViewName("/WEB-INF/jsp/inst/ctrInstrumentsMics/ctrInstrumentsMicsAntiAddRightList.jsp");
//		}
//		
//		if("1".equals(dto.getInit())){
//			// 初始化页面时，返回空列表。
//			mv.addObject("unContainGermList", new ArrayList<CtrMicsItems>());
//			mv.addObject("unContainAntiList", new ArrayList<CtrMicsItems>());
//			return mv;
//		}
		
		String message = "";
		try {
			Map<String, String> params = new HashMap<String, String>();
			params.put("queryDtoJson", JsonUtil.DtoTojson(dto));
			
			String url = Constant.serviceURL(Constant.RMC_CTRINSTRUMENTSMICS, Constant.RMM_CTRINSTRUMENTSMICS_ADD_RIGHT_LIST);
			message = HttpUtil.postResponseString(url, params, this.getAdminLoginUser(request));
			List<CtrMicsItems> list = (List<CtrMicsItems>) JsonUtil.jsonToDtos(message, CtrMicsItems.class);
//			mv.addObject("unContainGermList", list);
//			mv.addObject("unContainAntiList", list);
			map.put("total", list.size());
			map.put("rows", list);
		} catch (Exception e) {
			logger.error(e.getMessage() , e);
			message = Message.MSG_SERVICE_EXCEP;
		}

		return map;
	}
	
	/**
	 * 
	 * @Title: ctrInstrumentsMicsAddBatch
	 * 
	 * @Description: 添加微生物确认
	 * @return String 
	 * @throws
	 */
	@RequestMapping(value = Constant.RMM_CTRINSTRUMENTSMICS_ADD_BATCH, method = RequestMethod.GET)
	@ResponseBody
	public String ctrInstrumentsMicsAddBatch(String instrumentId, String itemTypeId, String addMicsIds, 
			String delMicsIds, HttpServletRequest request) {
		String message = "";
		try {
			Map<String, String> params = new HashMap<String, String>();
			params.put("instrumentId", instrumentId);
			params.put("itemTypeId", itemTypeId);
			params.put("addMicsIds", addMicsIds);
			params.put("delMicsIds", delMicsIds);
			params.put("userJson", JsonUtil.DtoTojson(getAdminLoginUser(request)));
			String url = Constant.serviceURL(Constant.RMC_CTRINSTRUMENTSMICS, Constant.RMM_CTRINSTRUMENTSMICS_ADD_BATCH);
			message = HttpUtil.postResponseString(url, params, this.getAdminLoginUser(request));
		} catch (Exception e) {
			logger.error(e.getMessage() , e);
			message = Message.MSG_SERVICE_EXCEP;
		}
		
		return message;
	}
	
}
