package com.daan.service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;

import org.apache.commons.lang.StringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import com.daan.dao.LocDictCodesDao;
import com.daan.domain.Constant;
import com.daan.domain.DictLogs;
import com.daan.domain.LocDictCodes;
import com.daan.domain.Message;
import com.daan.domain.User;
import com.daan.enums.IsAbleEnum;
import com.daan.logBean.DictLogsFactory;
import com.daan.logBean.IDictLogger;
import com.daan.service.AbstractService;
import com.daan.service.DictLogsService;
import com.daan.util.CodingCreater;
import com.daan.util.IDCreater;
import com.daan.util.JsonUtil;
import com.daan.utils.DataGrid;

/**
 * 
 * @ClassName: LocDictCodesService
 * @Description: TODO(本地基础字典表Service)
 * @author xialing
 * @date 2016年01月11日
 *
 */
@Controller
@Transactional
@RequestMapping(value = Constant.SERVICE + Constant.RMC_LOCDICTCODES)
public class LocDictCodesService extends AbstractService{
	
	@Autowired
	private LocDictCodesDao locdictCodesDao;
	@Autowired
	private DictLogsService dictLogsService;

	/**
	 * 
	 * @Title: locdictCodesList
	 * @Description: TODO(本地基础字典)
	 * @param dtoJson 
	 * @param userJson
	 * @return String    返回类型 
	 * 
	 */
	@RequestMapping(value = Constant.RMM_LOCDICTCODES_LOCDICTCODELIST, method = RequestMethod.POST)
	@ResponseBody
	public String locdictCodesList(@RequestParam(value = "typeKey", required = true) String typeKey, 
			@RequestParam(value = "status", required = true) String status,
			@RequestParam(value = "orgId", required = false) String orgId,
			@RequestParam(value = "appId", required = false) String appId) throws Exception {
		if (StringUtils.isEmpty(typeKey)) {
			throw new Exception("chkNameExisted: params Is Null!");
		}
		HashMap<String, String> params = new HashMap<String, String>();
		params.put("name", "");
		params.put("typeKey", typeKey);
		params.put("status", status);
		params.put("orgId", orgId);
		params.put("appId", appId);
		List<LocDictCodes> list = locdictCodesDao.findListByConditions(params);
		return JsonUtil.DtosTojson(list);
	}
	
}
