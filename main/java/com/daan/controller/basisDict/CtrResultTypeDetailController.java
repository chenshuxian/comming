package com.daan.controller.basisDict;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.daan.domain.DataGrid;
import org.apache.commons.lang.StringUtils;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.servlet.ModelAndView;
import com.daan.domain.Constant;
import com.daan.domain.CtrResultTypeDetail;
import com.daan.domain.Message;
import com.daan.dto.CtrResultTypeDetailDto;
import com.daan.util.CommonComponentController;
import com.daan.util.HttpUtil;
import com.daan.util.JsonUtil;
import com.daan.utils.Page;

/**
 * 
* @ClassName: CtrResultTypeDetailController 
* @Description: TODO(结果类型描述) 
* @author zengxiaowang
* @date 2015年12月4日 上午10:19:44 
*
 */
@Controller
@RequestMapping(value = Constant.RMC_CTRRESULTTYPEDETAIL)
public class CtrResultTypeDetailController extends CommonComponentController {

	/**
	 * 
	* @Title: ctrResultTypeDetailPageList 
	* @Description: TODO(结果类型描述列表) 
	* @param @param dto
	* @param @param page
	* @param @param request
	* @param @return    设定文件 
	* @return ModelAndView    返回类型 
	* @throws
	 */
	@SuppressWarnings("unchecked")
	@RequestMapping(value = Constant.RMM_CTRRESULTTYPEDETAIL_PAGELIST, method = RequestMethod.POST)
	public void ctrResultTypeDetailageList(CtrResultTypeDetailDto dto, HttpServletRequest request, HttpServletResponse response) {
		if (dto == null){
			return;
		}
//		ModelAndView mv = new ModelAndView(Constant.DEMO_CTRRESULTTYPEDETAIL_PAGELIST);
		try {
			Map<String, String> params = new HashMap<String, String>();
			params.put("queryDtoJson", JsonUtil.DtoTojson(dto));
			String resultString = null;
			String url = Constant.serviceURL(Constant.RMC_CTRRESULTTYPEDETAIL, Constant.RMM_CTRRESULTTYPEDETAIL_PAGELIST);
			resultString = HttpUtil.postResponseString(url, params, this.getAdminLoginUser(request));
			List<CtrResultTypeDetail> list = (List<CtrResultTypeDetail>) JsonUtil.jsonToDtos(resultString, CtrResultTypeDetail.class);
//			mv.addObject("resultList", list);
//			mv.addObject("typeId", dto.getTypeId());
			DataGrid dataGrid = new DataGrid(Long.parseLong(list.size() + ""), list);
			this.printJsonData(JsonUtil.DtoTojson(dataGrid), response);
		} catch (Exception e) {
			logger.error(e.getMessage(), e);
		}
	}
	
	/**
	 * 
	* @Title: ctrResultTypeDetailInfo 
	* @Description: TODO(结果类型描述明细页面) 
	* @param @param typeKey
	* @param @param id
	* @param @param opType
	* @param @param request
	* @param @return    设定文件 
	* @return ModelAndView    返回类型 
	* @throws
	 */
	@RequestMapping(value = Constant.RMM_CTRRESULTTYPEDETAIL_INFO, method = RequestMethod.POST)
	public ModelAndView ctrResultTypeDetailInfo(String id, String typeId, String opType, HttpServletRequest request) {
		ModelAndView mv = new ModelAndView();
		mv.addObject("opType", opType);
		String message = Message.MSG_SERVICE_EXCEP;
		if ("add".equals(opType)) { // 新增跳转
			try {
				mv.setViewName(Constant.DEMO_CTRRESULTTYPEDETAIL_ADD);
				// 查找最大顺序号
				String getOrderUrl = Constant.serviceURL(Constant.RMC_CTRRESULTTYPEDETAIL, Constant.RMM_MAXDISPLAYORDER);
				Map<String, String> getCodeParams = new HashMap<String, String>();
				getCodeParams.put("tableName", Constant.TABLENAME_CTRRESULTTYPEDETAIL);
				getCodeParams.put("conditionStr", "and type_id ="+typeId);
				String displayOrder = HttpUtil.postResponseString(getOrderUrl, getCodeParams, this.getAdminLoginUser(request));
				mv.addObject("displayOrder", displayOrder);
				mv.addObject("typeId", typeId);
			} catch (Exception e) {
				message = Message.MSG_SERVICE_EXCEP;
				logger.error(e.getMessage(), e);
			}
		} else if ("edit".equals(opType) && StringUtils.isNotEmpty(id)) { // 修改跳转
//			mv.setViewName(Constant.DEMO_CTRRESULTTYPEDETAIL_EDIT);
			mv.setViewName(Constant.DEMO_CTRRESULTTYPEDETAIL_ADD);
			try {
				Map<String, String> params = new HashMap<String, String>();
				params.put("id", id);

				// 查找Info
				String url = Constant.serviceURL(Constant.RMC_CTRRESULTTYPEDETAIL,Constant.RMM_CTRRESULTTYPEDETAIL_INFO);
				message = HttpUtil.postResponseString(url, params, this.getAdminLoginUser(request));
				CtrResultTypeDetail ctrResultTypeDetail = (CtrResultTypeDetail) JsonUtil.jsonToDto(message, CtrResultTypeDetail.class, null);
				mv.addObject("entity", ctrResultTypeDetail);
			} catch (Exception e) {
				logger.error(e.getMessage(), e);
			}
		}
		return mv;
	}
	
	/**
	 * 
	* @Title: ctrResultTypeDetailAdd 
	* @Description: TODO(新增结果类型描述信息) 
	* @param @param ctrInstruments
	* @param @param request
	* @param @return    设定文件 
	* @return String    返回类型 
	* @throws
	 */
	@RequestMapping(value = Constant.RMM_CTRRESULTTYPEDETAIL_ADD, method = RequestMethod.POST)
	@ResponseBody
	public String ctrResultTypeDetailAdd(@ModelAttribute CtrResultTypeDetail ctrResultTypeDetail, HttpServletRequest request){
		String message = Message.MSG_SERVICE_EXCEP;
		if(ctrResultTypeDetail == null){
			return message;
		}
		try{
			Map<String, String> params = new HashMap<String, String>();
			params.put("dtoJson", JsonUtil.DtoTojson(ctrResultTypeDetail));
			params.put("userJson", JsonUtil.DtoTojson(getAdminLoginUser(request)));
			String url = Constant.serviceURL(Constant.RMC_CTRRESULTTYPEDETAIL, Constant.RMM_CTRRESULTTYPEDETAIL_ADD);
			HttpUtil.postResponseString(url, params, this.getAdminLoginUser(request));
			message = Message.MSG_SAVE_SUCC;
		}catch(Exception e){
			logger.error(e.getMessage() , e);
			
		}
		return message;
	}
	
	/**
	 * 
	* @Title: ctrResultTypeDetailEdit 
	* @Description: TODO(结果类型描述修改) 
	* @param @param ctrInstruments
	* @param @param request
	* @param @return    设定文件 
	* @return String    返回类型 
	* @throws
	 */
	@RequestMapping(value = Constant.RMM_CTRRESULTTYPEDETAIL_EDIT, method = RequestMethod.POST)
	@ResponseBody
	public String ctrResultTypeDetailEdit(@ModelAttribute CtrResultTypeDetail ctrResultTypeDetail, HttpServletRequest request){
		String message = Message.MSG_SERVICE_EXCEP;
		if(ctrResultTypeDetail == null){
			return message;
		}
		try {
			Map<String, String> params = new HashMap<String, String>();
			params.put("dtoJson", JsonUtil.DtoTojson(ctrResultTypeDetail));
			params.put("userJson", JsonUtil.DtoTojson(getAdminLoginUser(request)));
			String url = Constant.serviceURL(Constant.RMC_CTRRESULTTYPEDETAIL, Constant.RMM_CTRRESULTTYPEDETAIL_EDIT);
			HttpUtil.postResponseString(url, params, this.getAdminLoginUser(request));
			params.clear();
			params.put("id", String.valueOf(ctrResultTypeDetail.getId()));
			url = Constant.serviceURL(Constant.RMC_CTRRESULTTYPEDETAIL, Constant.RMM_CTRRESULTTYPEDETAIL_INFO);
			message = HttpUtil.postResponseString(url, params, this.getAdminLoginUser(request));
			CtrResultTypeDetail entity = (CtrResultTypeDetail) JsonUtil.jsonToDto(message, CtrResultTypeDetail.class, null);
			message = Message.DATA + JsonUtil.DtoTojson(entity);
		} catch (Exception e) {
			logger.error(e.getMessage(), e);
		}
		return message;
	}
	
	/**
	 * 
	* @Title: checkNameExisted 
	* @Description: TODO(结果类型描述-新增同名验证) 
	* @param @param id
	* @param @param name
	* @param @return    设定文件 
	* @return String    返回类型 
	* @throws
	 */
	@RequestMapping(value = Constant.RMM_CTRRESULTTYPEDETAIL_IFEXISTED, method = RequestMethod.POST)
	@ResponseBody
	public String checkNameExisted(String id, String typeId, String name, HttpServletRequest request){
		String message = Message.MSG_SERVICE_EXCEP;
		if(StringUtils.isEmpty(name) || StringUtils.isEmpty(typeId)){
			return message;
		}
		try{
			Map<String, String> params = new HashMap<String, String>();
			params.put("id", id);
			params.put("name", name);
			params.put("typeId", typeId);
			String url = Constant.serviceURL(Constant.RMC_CTRRESULTTYPEDETAIL, Constant.RMM_CTRRESULTTYPEDETAIL_IFEXISTED);
			message = HttpUtil.postResponseString(url, params, this.getAdminLoginUser(request));
		}catch(Exception e){
			logger.error(e.getMessage() , e);
		}
		return message;
	}
	
	/**
	 * 
	* @Title: ctrResultTypeDetailDelete 
	* @Description: TODO(结果类型描述删除信息) 
	* @param @param id
	* @param @param request
	* @param @return    设定文件 
	* @return String    返回类型 
	* @throws
	 */
	@RequestMapping(value = Constant.RMM_CTRRESULTTYPEDETAIL_DELETE, method = RequestMethod.POST)
	@ResponseBody
	public String ctrResultTypeDetailDelete(String id, HttpServletRequest request) {
		String message = Message.MSG_SERVICE_EXCEP;
		if(StringUtils.isEmpty(id)){
			return message;
		}
		try {
			Map<String, String> params = new HashMap<String, String>();
			params.put("id", id);
			params.put("userJson", JsonUtil.DtoTojson(getAdminLoginUser(request)));
			String url = Constant.serviceURL(Constant.RMC_CTRRESULTTYPEDETAIL, Constant.RMM_CTRRESULTTYPEDETAIL_DELETE);
			HttpUtil.postResponseString(url, params, this.getAdminLoginUser(request));
			message = Message.MSG_DEL_SUCC;
		} catch (Exception e) {
			logger.error(e.getMessage() , e);
		}
		return message;
	}
	
	/**
	 * 
	* @Title: ctrResultTypeDetailDeleteBatch 
	* @Description: TODO(结果类型描述批量删除) 
	* @param @param ids
	* @param @param request
	* @param @return    设定文件 
	* @return String    返回类型 
	* @throws
	 */
	@RequestMapping(value = Constant.RMM_CTRRESULTTYPEDETAIL_DELETE_BATCH, method = RequestMethod.POST)
	@ResponseBody
	public String ctrResultTypeDetailDeleteBatch(String ids, HttpServletRequest request) {
		String message = Message.MSG_SERVICE_EXCEP;
		if(StringUtils.isEmpty(ids)){
			return message;
		}
		try {
			Map<String, String> params = new HashMap<String, String>();
			params.put("ids", ids);
			params.put("userJson", JsonUtil.DtoTojson(getAdminLoginUser(request)));
			String url = Constant.serviceURL(Constant.RMC_CTRRESULTTYPEDETAIL, Constant.RMM_CTRRESULTTYPEDETAIL_DELETE_BATCH);
			message = HttpUtil.postResponseString(url, params, this.getAdminLoginUser(request));
			message = Message.MSG_DEL_SUCC;
		} catch (Exception e) {
			logger.error(e.getMessage() , e);
		}
		return message;
	}
}
