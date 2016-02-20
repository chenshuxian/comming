package com.daan.controller.org;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.stereotype.Controller;
import org.springframework.util.StringUtils;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.servlet.ModelAndView;

import com.daan.domain.Constant;
import com.daan.domain.CtrDictCodes;
import com.daan.domain.CtrRegions;
import com.daan.domain.CtrTubeTypes;
import com.daan.domain.DataGrid;
import com.daan.domain.Message;
import com.daan.domain.User;
import com.daan.util.CommonComponentController;
import com.daan.util.HttpUtil;
import com.daan.util.JsonUtil;
import com.daan.utils.Page;
import com.fasterxml.jackson.core.JsonParser;

import net.sf.json.JSONObject;

/**
 * @ClassName: CtrRegionsController 
 * @Description: TODO(地区控制器) 
 * @author Wumingjava
 * @date 2015年11月26日 上午11:43:18
 */
@Controller
@RequestMapping(value = Constant.RMC_CTRREGIONS)
public class CtrRegionsController extends CommonComponentController {
	/**
	 * @Title: ctrRegionsMain 
	 * @Description: TODO(进入地区主页面) 
	 * @return ModelAndView
	 * @throws
	 */
	@RequestMapping(value = Constant.RMM_CTRREGIONSMAIN)
	public ModelAndView ctrRegionsMain() {
		ModelAndView mv = new ModelAndView();
		mv.setViewName(Constant.JSP_CTRREGIONSMAIN);
		//mv.addObject("list",isAbleEnumsDtoList());
		return mv;
	}
	/**
	 * @Title: saveCtrRegions 
	 * @Description: TODO(保存地区方法) 
	 * @param dto
	 * @param request
	 * @return String
	 * @throws
	 */
	@RequestMapping(value = Constant.RMM_SAVECTRREGIONS,method = RequestMethod.POST, produces = "text/html;charset=UTF-8")
	@ResponseBody
	public String saveCtrRegions(String pid,CtrRegions dto,HttpServletRequest request) {
		String message="";
		try{
			Map<String, String> params = new HashMap<String, String>();
			params.put("ctrRegionsDtoJson", JsonUtil.DtoTojson(dto));
			params.put("pid", pid);
//			User user = this.getAdminLoginUser(request);
			params.put("userJson", JsonUtil.DtoTojson(this.getAdminLoginUser(request)));
			String url = Constant.serviceURL(Constant.RMC_CTRREGIONS, Constant.RMM_SAVECTRREGIONS);
			message=HttpUtil.postResponseString(url, params,this.getAdminLoginUser(request));
		}catch(Exception e){
			e.printStackTrace();
			message=Message.MSG_SERVICE_EXCEP;
		}
		return message;
	}
	/**
	 * @Title: nameRepeat 
	 * @Description: TODO(用于验证名字重复) 
	 * @param name
	 * @param request
	 * @return String
	 * @throws
	 */
	@RequestMapping(value = Constant.RMM_NAMEREPEAT,method = RequestMethod.POST, produces = "text/html;charset=UTF-8")
	@ResponseBody
	public String nameRepeat(String name,HttpServletRequest request) {
		String message="";
		try{
			Map<String, String> params = new HashMap<String, String>();
			params.put("name", name);
			String url = Constant.serviceURL(Constant.RMC_CTRREGIONS, Constant.RMM_NAMEREPEAT);
			message=HttpUtil.postResponseString(url, params,this.getAdminLoginUser(request));
		}catch(Exception e){
			e.printStackTrace();
			message=Message.MSG_SERVICE_EXCEP;
		}
		return message;
	}
	/**
	 * @Title: loadCtrRegionsById 
	 * @Description: TODO(根据ID加载实体) 
	 * @param dto
	 * @param request
	 * @return String
	 */
	@RequestMapping(value = Constant.RMM_LOADCTRREGIONSBYID,method = RequestMethod.POST, produces = "text/html;charset=UTF-8")
	//@ResponseBody(这会影喀回传)
	public ModelAndView loadCtrRegionsById(String id,String otype,HttpServletRequest request) {
		
		ModelAndView mv = new ModelAndView();
		mv.setViewName(Constant.JSP_CTRREGIONSADD);
		//mv.addObject("isAbleList",isAbleEnumsDtoList());
		//mv.addObject("page", page);
		
		if(!otype.equals("add")){
			String message="";
			try{
				Map<String, String> params = new HashMap<String, String>();
				params.put("id", id);
				String url = Constant.serviceURL(Constant.RMC_CTRREGIONS, Constant.RMM_LOADCTRREGIONSBYID);
				message=HttpUtil.postResponseString(url, params,this.getAdminLoginUser(request));
				String json = message.substring(message.indexOf("|")+1, message.length());
	//			json = "[" + json + "]";
				CtrDictCodes list2 = (CtrDictCodes) JsonUtil.jsonToDto(json, CtrDictCodes.class,null);
				mv.addObject("formdata", list2);
			}catch(Exception e){
				e.printStackTrace();
				message=Message.MSG_SERVICE_EXCEP;
			}
		}
		
		return mv;
		
	}
	
//	public String loadCtrRegionsById(String id,HttpServletRequest request) {
//		String message="";
//		try{
//			Map<String, String> params = new HashMap<String, String>();
//			params.put("id", id);
//			String url = Constant.serviceURL(Constant.RMC_CTRREGIONS, Constant.RMM_LOADCTRREGIONSBYID);
//			message=HttpUtil.postResponseString(url, params,this.getAdminLoginUser(request));
//		}catch(Exception e){
//			e.printStackTrace();
//			message=Message.MSG_SERVICE_EXCEP;
//		}
//		return message;
//	}
     /**
	 * @Title: getCodeNo 
	 * @Description: TODO(在新增的时候获得地区编码) 
	 * @param request
	 * @return String
	 * @throws
	 */
	@RequestMapping(value = Constant.RMM_GETCODENO , method = RequestMethod.POST)
	@ResponseBody
	public String getCodeNo(HttpServletRequest request) {
		String message="";
		try{
			Map<String, String> params = new HashMap<String, String>();
			params.put("code", String.valueOf(Constant.CODE_CTRREGIONS));
			String url = Constant.serviceURL(Constant.RMC_CTRREGIONS, Constant.RMM_GETCODENO);
			message = Message.DATA+HttpUtil.postResponseString(url, params,this.getAdminLoginUser(request));
		}catch(Exception e){
			e.printStackTrace();
			message=Message.MSG_SERVICE_EXCEP;
		}
		return message;
	}
	/**
	 * @Title: delCtrRegions 
	 * @Description: TODO(删除地区方法) 
	 * @param id
	 * @param request
	 * @return String
	 * @throws
	 */
	@RequestMapping(value = Constant.RMM_DELCTRREGIONS , method = RequestMethod.POST)
	@ResponseBody
	public String delCtrRegions(String id,HttpServletRequest request) {
		String message="";
		if(null==id||"".equals(id)){
			return Message.MSG_PARAMS_NULL;
		}
		try{
			Map<String, String> params = new HashMap<String, String>();
//			User user = this.getAdminLoginUser(request);
			params.put("userJson", JsonUtil.DtoTojson(this.getAdminLoginUser(request)));
			params.put("id", id);
			String url = Constant.serviceURL(Constant.RMC_CTRREGIONS, Constant.RMM_DELCTRREGIONS);
			message=HttpUtil.postResponseString(url, params,this.getAdminLoginUser(request));
		}catch(Exception e){
			e.printStackTrace();
			message=Message.MSG_SERVICE_EXCEP;
		}
		return message;
	}
	/**
	 * @Title: initCtrRegionsTree 
	 * @Description: TODO() 
	 * @param id
	 * @param request
	 * @return String
	 * @throws
	 */
	@RequestMapping(value = Constant.RMM_LOADCTRREGIONSTREE, method = RequestMethod.POST, produces = "text/html;charset=UTF-8")
	@ResponseBody
	public String loadCtrRegionsTree(String id,String tier,HttpServletRequest request) {
		String json= "";
		try{
			Map<String, String> params = new HashMap<String, String>();
			params.put("id", id);
			params.put("tier", tier);
			String url = Constant.serviceURL(Constant.RMC_CTRREGIONS, Constant.RMM_LOADCTRREGIONSTREE);
			json=HttpUtil.postResponseString(url, params,this.getAdminLoginUser(request));
			if(json==null || "".equals(json)){
				return Message.MSG_FIND_NULL;
			}
		}catch(Exception e){
			e.printStackTrace();
			return Message.MSG_SERVICE_EXCEP;
		}
		StringBuffer outxml = new StringBuffer();
		outxml.append("[");
		List<CtrRegions> list = (List<CtrRegions>) JsonUtil.jsonToDtos(json, CtrRegions.class);
		for (CtrRegions cr : list) {
			outxml.append("{");
			outxml.append("id:\"" + cr.getId() + "\",");
			outxml.append("text:\"" + cr.getName() + "\",");
			outxml.append("attributes:{tier:\"" + cr.getTier() + "\"},");
			//outxml.append("parentId:\"" + id + "\",");
			//outxml.append("tier:\"" + cr.getTier() + "\",");
			if (cr.getRightValue() - cr.getLeftValue() > 1) {
				//为父节点
				outxml.append("state:\"closed\"");
			} else {
				outxml.append("state:\"open\"");
			}
			outxml.append("},");
		}
		if (StringUtils.endsWithIgnoreCase(outxml.toString(), ",")) {
			outxml.deleteCharAt(outxml.length() - 1);
		}
		outxml.append("]");
		return outxml.toString();
	}
	@RequestMapping(value = Constant.RMM_INITCTRREGIONSTREE, method = RequestMethod.POST, produces = "text/html;charset=UTF-8")
	@ResponseBody
	public String initCtrRegionsTree(HttpServletRequest request) {
		String json= "";
		String id = String.valueOf(Constant.CTRREGIONS_CHINA_ID);
		try{
			Map<String, String> params = new HashMap<String, String>();
			params.put("id", id);
			String url = Constant.serviceURL(Constant.RMC_CTRREGIONS, Constant.RMM_INITCTRREGIONSTREE);
			json=HttpUtil.postResponseString(url, params,this.getAdminLoginUser(request));
			if(json==null || "".equals(json)){
				return Message.MSG_FIND_NULL;
			}
		}catch(Exception e){
			e.printStackTrace();
			return Message.MSG_SERVICE_EXCEP;
		}
		StringBuffer outxml = new StringBuffer();
		outxml.append("[");
		List<CtrRegions> list = (List<CtrRegions>) JsonUtil.jsonToDtos(json, CtrRegions.class);
		for (CtrRegions cr : list) {
			outxml.append("{");
			outxml.append("id:\"" + cr.getId() + "\",");
			outxml.append("text:\"" + cr.getName() + "\",");
			outxml.append("attributes:{tier:\"" + cr.getTier() + "\"},");
			//outxml.append("parentId:\"" + id + "\",");
			if (cr.getRightValue() - cr.getLeftValue() > 1) {
				outxml.append("state:\"closed\"");
			} else {
				outxml.append("state:\"open\"");
			}
			outxml.append("},");
		}
		if (StringUtils.endsWithIgnoreCase(outxml.toString(), ",")) {
			outxml.deleteCharAt(outxml.length() - 1);
		}
		outxml.append("]");
		//return Message.DATA+outxml.toString();
		return outxml.toString();
	}
	@RequestMapping(value = Constant.RMM_MOVECTRREGIONS, method = RequestMethod.POST, produces = "text/html;charset=UTF-8")
	@ResponseBody
	public String moveCtrRegions(@RequestParam(value = "moveType", required = true) String moveType,
			@RequestParam(value = "nodeID", required = true) String nodeID,
			@RequestParam(value = "targetNodeID", required = true) String targetNodeID,
			@RequestParam(value = "targetNodePId", required = true) String targetNodePId,HttpServletRequest request) {
		String message = "";
		try {
			Map<String, String> params = new HashMap<String, String>();
			params.put("moveType", moveType);
			params.put("nodeID", nodeID);
			params.put("targetNodeID", targetNodeID);
			params.put("targetNodePId", targetNodePId);
//			User user = this.getAdminLoginUser(request);
			params.put("userJson", JsonUtil.DtoTojson(this.getAdminLoginUser(request)));
			String url = Constant.serviceURL(Constant.RMC_CTRREGIONS, Constant.RMM_MOVECTRREGIONS);
			message=HttpUtil.postResponseString(url, params,this.getAdminLoginUser(request));
		} catch (Exception e) {
			e.printStackTrace();
			message = Message.MSG_SERVICE_EXCEP;
		}
		return message;
	}
}
