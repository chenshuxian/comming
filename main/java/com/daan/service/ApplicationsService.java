package com.daan.service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import com.daan.dao.ApplicationsDao;
import com.daan.domain.Applications;
import com.daan.domain.Constant;
import com.daan.util.JsonUtil;

/**
 * @ClassName: ApplicationsService 
 * @Description: TODO(系统信息设置Service) 
 * @author 吴明明
 * @date 2015年12月10日 下午7:14:21
 */
@Controller
@RequestMapping(value = Constant.SERVICE + Constant.RMC_APPLICATIONS)
public class ApplicationsService extends AbstractService{
	@Autowired
	private ApplicationsDao applicationsDao;
	/**
	 * @Title: findApplications
	 * @Description: TODO(日志查询列表) 
	 * @param queryDtoJson
	 * @param request
	 * @return String
	 * @throws
	 */
	@SuppressWarnings("unchecked")
	@RequestMapping(value = Constant.RMC_FINDAPPLICATIONS, method = RequestMethod.POST)
	@ResponseBody
	public String findApplications(@RequestParam(value = "status", required = false) String status,HttpServletRequest request) {
		Map<String, Object> map = new HashMap<String, Object>();
		map.put("status", status);
		List<Applications> list = applicationsDao.findApplications(map);
		return JsonUtil.DtosTojson(list);
	}
}
