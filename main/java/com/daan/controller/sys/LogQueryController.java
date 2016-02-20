package com.daan.controller.sys;

import java.io.BufferedInputStream;
import java.io.BufferedOutputStream;
import java.io.ByteArrayInputStream;
import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.io.InputStream;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.HashMap;
import java.util.Iterator;
import java.util.List;
import java.util.Map;

import javax.servlet.ServletOutputStream;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.servlet.ModelAndView;

import com.daan.domain.Constant;
import com.daan.domain.DataGrid;
import com.daan.domain.DictLogs;
import com.daan.dto.DictLogsQueryDto;
import com.daan.util.CommonComponentController;
import com.daan.util.DateUtil;
import com.daan.util.ExcelUtil;
import com.daan.util.HttpUtil;
import com.daan.util.JsonUtil;
import com.daan.utils.Page;

/**
 * 
 * @ClassName: LogQueryController
 * @Description: TODO(日志查询控制器)
 * @author zhangliping
 * @date 2015年12月10日 下午5:21:08
 */
@Controller
@RequestMapping(value = Constant.RMC_LOGQUERY)
public class LogQueryController extends CommonComponentController {
	/**
	 * 
	 * @Title: logQueryMain 
	 * @Description: TODO(初始化页面) 
	 * @param request http请求
	 * @return ModelAndView 返回main页面
	 * @throws 异常信息
	 */
	@RequestMapping(value = Constant.RMM_LOGQUERY_MAIN, method = RequestMethod.GET)
	public ModelAndView logQueryMain(HttpServletRequest request) {
		Page<DictLogs> page = new Page<DictLogs>(Constant.PAGE_NUMBER);
		ModelAndView mv = new ModelAndView(Constant.DEMO_LOGQUERY_MAIN);
		mv.addObject("page", page);
		List<DictLogsQueryDto> list = new ArrayList<DictLogsQueryDto>();
		Iterator<Integer> it = Constant.COMMON_MODULE_MAP.keySet().iterator();// 迭代器，找出所有的模块id
		while (it.hasNext()) {
			Integer key = it.next();
			String moduleName = Constant.COMMON_MODULE_MAP.get(key);
			DictLogsQueryDto dto = new DictLogsQueryDto();
			dto.setModuleId(key.toString());
			dto.setModuleName(moduleName);
			list.add(dto);// 把找到的模块名称存放到list中
		}
		mv.addObject("resultList", list);
		SimpleDateFormat bnginformat = new SimpleDateFormat("yyyy-MM-dd 00:00");
		SimpleDateFormat endinformat = new SimpleDateFormat("yyyy-MM-dd 23:59");
		mv.addObject("startDate", bnginformat.format(new Date()));
		mv.addObject("endDate", endinformat.format(new Date()));
		return mv;
	}

	/**
	 * 
	 * @Title: logQueryPageList 
	 * @Description: TODO(查询日志的列表信息) 
	 * @param dto 日志查询的dto对象
	 * @param page 分页对象
	 * @param request http请求
	 * @return ModelAndView 返回list页面
	 * @throws 异常信息
	 */
	@SuppressWarnings("unchecked")
	@RequestMapping(value = Constant.RMM_LOGQUERY_PAGE_LIST, method = RequestMethod.POST)
	public void logQueryPageList(DictLogsQueryDto dto, Page<DictLogs> page, HttpServletRequest request,HttpServletResponse response) {
		//ModelAndView mv = new ModelAndView(Constant.DEMO_LOGQUERY_PAGE_LIST);
		String message = "";
		try {
			Map<String, String> params = new HashMap<String, String>();
			dto.setPage(JsonUtil.DtoTojson(page));
			params.put("queryDtoJson", JsonUtil.DtoTojson(dto));
			String resultString = null;
			String resultList = null; // 结果List json
			String resultPage = null; // 分页page json
			List<DictLogsQueryDto> list=null;
			String url = Constant.serviceURL(Constant.RMC_LOGQUERY, Constant.RMM_LOGQUERY_PAGE_LIST);
			if(!"0".equals(dto.getIsMain())){
				resultString = HttpUtil.postResponseString(url, params, this.getAdminLoginUser(request));
				resultList = resultString.substring(0, resultString.indexOf("@@@"));
				resultPage = resultString.substring(resultString.indexOf("@@@") + 3, resultString.length());
				list = (List<DictLogsQueryDto>) JsonUtil.jsonToDtos(resultList, DictLogsQueryDto.class);
				page = (Page<DictLogs>) JsonUtil.jsonToDto(resultPage, Page.class, null);
			}	
			/*mv.addObject("isMain", dto.getIsMain());
			mv.addObject("resultList", list);
			mv.addObject("page", page);
			mv.addObject("message", message);*/
			

			DataGrid dataGrid = new DataGrid(page.getTotalCount(),list);				
			this.printJsonData(JsonUtil.DtoTojson(dataGrid),response);
			
		} catch (Exception e) {
			logger.error(e.getMessage(), e);
		}
		//return mv;
	}

	/**
	 * 
	 * @Title: exportLogQueryExcel 
	 * @Description: TODO(导出日志信息) 
	 * @param dto 日志查询的dto对象
	 * @param request http请求
	 * @param response http请求
	 * @return String 返回需要导出的数据
	 * @throws 异常信息
	 */
	@SuppressWarnings("unchecked")
	@RequestMapping(value = Constant.RMM_EXPORT_LOGQUERY_EXCEL, method = RequestMethod.GET)
	@ResponseBody
	public String exportLogQueryExcel(DictLogsQueryDto dto, HttpServletRequest request, HttpServletResponse response) {
		Map<String, String> params = new HashMap<String, String>();
		params.put("dtoJson", JsonUtil.DtoTojson(dto));
		String url = Constant.serviceURL(Constant.RMC_LOGQUERY, Constant.RMM_EXPORT_LOGQUERY_EXCEL);
		String resultString = null;
		try {
			Map<String, Object> map = new HashMap<String, Object>();
			map.put("queryDto", dto); // 查询条件Dto
			String fileName = "logQuery_" + DateUtil.generateTimeStamp();// 文件名字
			// 填充DictLogsQueryDto数据
			resultString = HttpUtil.postResponseString(url, params, this.getAdminLoginUser(request));
			List<DictLogsQueryDto> dictLogsQueryDto = (List<DictLogsQueryDto>) JsonUtil.jsonToDtos(resultString,
					DictLogsQueryDto.class);
			List<Map<String, Object>> list = createExcelRecord(dictLogsQueryDto);
			String columnNames[] = { "操作项目", "操作类型", "操作内容", "操作人", "操作时间" };// 列名
			String keys[] = { "summary", "functionDesc", "description", "userName", "operateTime" };// map中的key
			ByteArrayOutputStream os = new ByteArrayOutputStream();
			try {
				ExcelUtil.createWorkBook(list, keys, columnNames).write(os);
			} catch (IOException e) {
				logger.error(e.getMessage(), e);
			}
			byte[] content = os.toByteArray();
			InputStream is = new ByteArrayInputStream(content);
			// 设置response参数，可以打开下载页面
			response.reset();
			response.setContentType("application/x-msdownload;charset=utf-8");
			response.setHeader("Content-Disposition",
					"attachment;filename=" + new String((fileName + ".xls").getBytes(), "iso-8859-1"));
			ServletOutputStream out = response.getOutputStream();
			BufferedInputStream bis = null;
			BufferedOutputStream bos = null;
			try {
				bis = new BufferedInputStream(is);
				bos = new BufferedOutputStream(out);
				byte[] buff = new byte[2048];
				int bytesRead;
				while (-1 != (bytesRead = bis.read(buff, 0, buff.length))) {
					bos.write(buff, 0, bytesRead);
				}
			} catch (final IOException e) {
				logger.error(e.getMessage(), e);
			} finally {
				if (bis != null)
					bis.close();
				if (bos != null)
					bos.close();
			}
		} catch (Exception e) {
			logger.error(e.getMessage(), e);
		}
		return resultString;
	}

	/**
	 * 
	 * @Title: createExcelRecord 
	 * @Description: TODO( 转换数据) 
	 * @param dto  日志查询的dto对象
	 * @return List<Map<String,Object>> excel格式的数据
	 * @throws 异常信息
	 */
	private List<Map<String, Object>> createExcelRecord(List<DictLogsQueryDto> dto) {
		List<Map<String, Object>> listmap = new ArrayList<Map<String, Object>>();
		Map<String, Object> map = new HashMap<String, Object>();
		map.put("sheetName", "logsQuery");
		listmap.add(map);
		DictLogsQueryDto dictLogsQueryDto = null;
		for (int j = 0; j < dto.size(); j++) {
			dictLogsQueryDto = dto.get(j);
			Map<String, Object> mapValue = new HashMap<String, Object>();
			mapValue.put("summary", dictLogsQueryDto.getSummary());
			mapValue.put("functionDesc", dictLogsQueryDto.getFunctionDesc());
			mapValue.put("description", dictLogsQueryDto.getDescription());
			mapValue.put("userName", dictLogsQueryDto.getUserName());
			mapValue.put("operateTime", dictLogsQueryDto.getOperateTime());
			listmap.add(mapValue);
		}
		return listmap;
	}
}
