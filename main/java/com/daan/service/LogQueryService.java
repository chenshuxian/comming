package com.daan.service;

import java.io.IOException;
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

import com.daan.dao.DictLogsDao;
import com.daan.domain.Constant;
import com.daan.domain.DictLogs;
import com.daan.dto.DictLogsQueryDto;
import com.daan.util.JsonUtil;
import com.daan.utils.Page;

/**
 * 
 * @ClassName: LogQueryService 
 * @Description: TODO(日志查询Service) 
 * @author zhangliping
 * @date 2015年12月10日 下午7:14:21
 */
@Controller
@RequestMapping(value = Constant.SERVICE + Constant.RMC_LOGQUERY)
public class LogQueryService extends AbstractService{
	@Autowired
	private DictLogsDao dictLogsDao;
	
	/**
	 * 
	 * @Title: logQueryPageList 
	 * @Description: TODO(日志查询列表) 
	 * @param queryDtoJson
	 * @param request
	 * @return String
	 * @throws
	 */
	@SuppressWarnings("unchecked")
	@RequestMapping(value = Constant.RMM_LOGQUERY_PAGE_LIST, method = RequestMethod.POST)
	@ResponseBody
	public String logQueryPageList(@RequestParam(value = "queryDtoJson", required = false) String queryDtoJson,
			HttpServletRequest request) {
		Map<String, Object> map = new HashMap<String, Object>();
		DictLogsQueryDto dto = (DictLogsQueryDto) JsonUtil.jsonToDto(queryDtoJson,DictLogsQueryDto.class, null);
		Page<DictLogs> page = (Page<DictLogs>) JsonUtil.jsonToDto(dto.getPage(), Page.class, null);
		map.put("queryDto", dto); // 查询条件Dto
		map.put("page", page); // 分页page对象
		Integer rowCount = this.dictLogsDao.queryCountByConditions(map);// 总记录数
		page.setTotalCount(rowCount);
		List<DictLogsQueryDto> list = dictLogsDao.queryPageListByConditions(map);
		return JsonUtil.DtosTojson(list) + "@@@" + JsonUtil.DtoTojson(page);
	}
	
	/**
	 * 
	 * @Title: exportLogQueryExcel 
	 * @Description: TODO(查询导出数据) 
	 * @param dtoJson
	 * @return
	 * @throws IOException String
	 * @throws
	 */
	@RequestMapping(value = Constant.RMM_EXPORT_LOGQUERY_EXCEL, method = RequestMethod.POST)
	@ResponseBody
	public String exportLogQueryExcel(@RequestParam(value = "dtoJson", required = true) String dtoJson) throws IOException{
		DictLogsQueryDto dto = (DictLogsQueryDto) JsonUtil.jsonToDto(dtoJson, DictLogsQueryDto.class,null);
		Map<String, Object> map = new HashMap<String, Object>();
		map.put("queryDto", dto); //查询条件Dto
	    //填充projects数据
		List<DictLogsQueryDto> list = dictLogsDao.queryDictLogs(map);
	    return JsonUtil.DtosTojson(list);
	}
}
