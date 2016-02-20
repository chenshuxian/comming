package com.daan.controller.pm;

import java.io.BufferedInputStream;
import java.io.BufferedOutputStream;
import java.io.ByteArrayInputStream;
import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.io.InputStream;
import java.util.ArrayList;
import java.util.HashMap;
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
import com.daan.domain.CtrDictCodes;
import com.daan.domain.CtrResultTypes;
import com.daan.domain.CtrTestItems;
import com.daan.domain.Message;
import com.daan.dto.CrtTestItemDto;
import com.daan.dto.QueryDto;
import com.daan.enums.IsAbleEnum;
import com.daan.enums.SexType;
import com.daan.enums.TestType;
import com.daan.enums.TypeKeyEnum;
import com.daan.util.CommonComponentController;
import com.daan.util.DateUtil;
import com.daan.util.ExcelUtil;
import com.daan.util.HttpUtil;
import com.daan.util.JsonUtil;
import com.daan.utils.Page;

/**
 * @ClassName: TestItemController 
 * @Description: TODO(检测项目Controller) 
 * @author xieruiyun
 * @date 2015年11月24日 下午4:53:54
 */
@Controller
@RequestMapping(value = Constant.RMC_TESTITEM)
public class CtrTestItemController extends CommonComponentController {
	
	/**
	 * 
	 * @Title: testItemInfo 
	 * @Description: TODO(初始化页面) 
	 * @param request
	 * @return ModelAndView
	 * @throws
	 */
	@SuppressWarnings("unchecked")
	@RequestMapping(value = Constant.RMM_TESTITEMINFO, method = RequestMethod.GET)
	public ModelAndView testItemInfo(HttpServletRequest request){
		ModelAndView mv = null;
		String url="";
		String sampleTypeString = ""; //样本类型
		String testMethodString = ""; //检验方法
		String disciplineString = ""; //医学专业组
		String unitString = ""; //结果单位
		String resultTypeString = ""; //结果类型
		List<CtrDictCodes> dictCodeList = null;
		List<CtrResultTypes> resultTypesList = null ;
		Map<String, String> params = new HashMap<String, String>();
		try {
			mv = new ModelAndView("/WEB-INF/jsp/pm/testItem/testItemMain.jsp");
			dictCodeList = new ArrayList<CtrDictCodes>();
			//查询基础字典URL
			url = Constant.serviceURL(Constant.RMC_TESTITEM, Constant.RMM_FINFBYDICTCODE);
			params.put("typeKey", TypeKeyEnum.sampleType.getIndex().toString());//样本类型
			sampleTypeString = HttpUtil.getResponseString(url, params, this.getAdminLoginUser(request));
			dictCodeList = (List<CtrDictCodes>) JsonUtil.jsonToDtos(sampleTypeString, CtrDictCodes.class);
			mv.addObject("sampleTypeList", dictCodeList);
			//---------------------------------------
			params.put("typeKey", TypeKeyEnum.testMethod.getIndex().toString());//检验方法
			testMethodString = HttpUtil.getResponseString(url, params, this.getAdminLoginUser(request));
			dictCodeList = (List<CtrDictCodes>) JsonUtil.jsonToDtos(testMethodString, CtrDictCodes.class);
			mv.addObject("testMethodList", dictCodeList);
			//---------------------------------------
			params.put("typeKey", TypeKeyEnum.discipline.getIndex().toString());//医学专业组
			disciplineString = HttpUtil.getResponseString(url, params, this.getAdminLoginUser(request));
			dictCodeList = (List<CtrDictCodes>) JsonUtil.jsonToDtos(disciplineString, CtrDictCodes.class);
			mv.addObject("disciplineList", dictCodeList);
			//---------------------------------------
			params.put("typeKey", TypeKeyEnum.unit.getIndex().toString());//结果单位
			unitString = HttpUtil.getResponseString(url, params, this.getAdminLoginUser(request));
			dictCodeList = (List<CtrDictCodes>) JsonUtil.jsonToDtos(unitString, CtrDictCodes.class);
			mv.addObject("unitList", dictCodeList);
			//---------------------------------------
			url = Constant.serviceURL(Constant.RMC_CTRRESULTTYPES, Constant.RMM_CTRRESULTTYPES_QUERYBYSTATUS);
			params.put("status", String.valueOf(IsAbleEnum.enable.ordinal()));//结果类型
			resultTypeString = HttpUtil.getResponseString(url, params,this.getAdminLoginUser(request));
			resultTypesList = (List<CtrResultTypes>) JsonUtil.jsonToDtos(resultTypeString, CtrResultTypes.class);
			mv.addObject("resultTypesList", resultTypesList);
			mv.addObject("isAbleList",isAbleEnumsDtoList());
		} catch (Exception e) {
			logger.error(e.getMessage(), e);
			String msg = Message.MSG_SERVICE_EXCEP;
		}
		return mv;
	}
	
	/**
	 * 
	 * @Title: testItemList 
	 * @Description: TODO(List列表加载) 
	 * @param dto 查询条件
	 * @param page 分页对象
	 * @param request
	 * @return ModelAndView
	 * @throws
	 */
	@SuppressWarnings("unchecked")
	@RequestMapping(value = Constant.RMM_TESTITEMLIST, method = RequestMethod.POST)
	@ResponseBody
	public void testItemList(QueryDto dto,Page<CtrTestItems> page, HttpServletRequest request, HttpServletResponse response){
		String pageNo=request.getParameter("page");
		String rows=request.getParameter("rows");
		if(null==dto.getStatus()){
			dto.setStatus("2");
		}
		if(null==dto.getOrderType()){
			dto.setOrderType("0");;
		}
		page.setPageNo(Integer.parseInt(pageNo));
		page.setPageSize(Integer.parseInt(rows));
		Map<String, String> params = new HashMap<String, String>();
		params.put("searchStr",dto.getSearchStr()); //搜索字符
		params.put("status",String.valueOf(dto.getStatus()));//是否可用
		params.put("orderType",dto.getOrderType());//排序类型
		//page对象转换成json
		params.put("page", JsonUtil.DtoTojson(page));
		String resultString = null;
		try {
			String url = Constant.serviceURL(Constant.RMC_TESTITEM, Constant.RMM_PAGEQUERYTESTITEMS);
			resultString = HttpUtil.postResponseString(url, params,this.getAdminLoginUser(request));
		} catch (Exception e) {
			logger.error(e.getMessage(), e);
		}
		this.printJsonData(resultString, response);
	}
	
	/**
	 * 
	 * @Title: saveOrEdit 
	 * @Description: TODO(添加项目或修改项目) 
	 * @param dto 表单数据保存修改使用
	 * @param type 修改类型
	 * @param request
	 * @return String
	 * @throws
	 */
	@RequestMapping(value = Constant.RMM_SAVEOREDITTESTITEM, method = RequestMethod.POST)
	@ResponseBody
	public String saveOrEditTestItem(CrtTestItemDto dto, HttpServletRequest request){
		String message = "";
		String resultString = "";
		try {
			Map<String, String> params = new HashMap<String, String>();
			params.put("dtoJson", JsonUtil.DtoTojson(dto));
			params.put("userJson", JsonUtil.DtoTojson(getAdminLoginUser(request)));
			String url = Constant.serviceURL(Constant.RMC_TESTITEM,Constant.RMM_SAVEOREDITTESTITEM);
			message = HttpUtil.postResponseString(url, params, this.getAdminLoginUser(request));
			/*if(dto.getId() != null){
				params.clear();
				params.put("testItemId", dto.getId() + "");
				url = Constant.serviceURL(Constant.RMC_TESTITEM, Constant.RMM_QUERY_TESTITEM_EDIT);
				resultString = HttpUtil.postResponseString(url, params, this.getAdminLoginUser(request));
				message = Message.DATA + resultString;
			}*/
			
		} catch (Exception e) {
			logger.error(e.getMessage(), e);
			message = Message.MSG_GETRESULT_FAIL;
		}
		return message;
	}
	
	/**
	 * 
	 * @Title: queryTestItem 
	 * @Description: TODO(根据检验项目ID查询当个的检验项目信息) 
	 * @param request
	 * @param testItemid 项目ID
	 * @param type 添加修改类型  add--添加 edit--修改
	 * @return ModelAndView
	 * @throws
	 */ 
	@SuppressWarnings("unchecked")
	@RequestMapping(value = Constant.RMM_QUERY_TESTITEM_EDIT, method = RequestMethod.POST)
	public ModelAndView queryTestItemToID(String testItemid, String type, HttpServletRequest request){
		Map<String, String> params = new HashMap<String, String>();
		params.put("testItemId", testItemid);
		String url = Constant.serviceURL(Constant.RMC_TESTITEM, Constant.RMM_QUERY_TESTITEM_EDIT);
		String resultString = null;
		String sampleTypeString = ""; //样本类型
		String testMethodString = ""; //检验方法
		String disciplineString = ""; //医学专业组
		String unitString = ""; //结果单位
		String resultTypeString = ""; //结果类型
		List<CtrDictCodes> dictCodeList = null;
		List<CtrResultTypes> resultTypesList = null ;
		ModelAndView mv = new ModelAndView("/WEB-INF/jsp/pm/testItem/testItemNewEdit.jsp");
		try {
			
			resultString = HttpUtil.postResponseString(url, params, this.getAdminLoginUser(request));
			CtrTestItems ctrTestItems = (CtrTestItems) JsonUtil.jsonToDto(resultString, CtrTestItems.class, null);
			if(ctrTestItems == null){
				ctrTestItems = new CtrTestItems();
			}
			mv.addObject("crtTestItemDto",ctrTestItems);
			
			//---------------------------------------
			url = Constant.serviceURL(Constant.RMC_TESTITEM, Constant.RMM_MAXDISPLAYORDER);
			params.put("tableName", Constant.TABLE_NAME_TESTITEM);
			//区分检验项目，组合项目，套餐项目的顺序号 1.检验项目 2.组合项目 3.套餐项目
			params.put("conditionStr", " and item_type_id = " + TestType.single.ordinal());
			//修改就不获取顺序号
			if(!type.equals("edit")){
				resultString = HttpUtil.postResponseString(url, params, this.getAdminLoginUser(request)); //最大顺序号
				ctrTestItems.setDisplayOrder(Integer.parseInt(resultString));//设置顺序号
			}
			//查询基础字典URL
			/*url = Constant.serviceURL(Constant.RMC_TESTITEM, Constant.RMM_FINFBYDICTCODE);
			params.put("typeKey", TypeKeyEnum.sampleType.getIndex().toString());//样本类型
			sampleTypeString = HttpUtil.getResponseString(url, params,this.getAdminLoginUser(request));
			dictCodeList = (List<CtrDictCodes>) JsonUtil.jsonToDtos(sampleTypeString, CtrDictCodes.class);
			mv.addObject("sampleTypeList", dictCodeList);
			//---------------------------------------
			params.put("typeKey", TypeKeyEnum.testMethod.getIndex().toString());//检验方法
			testMethodString = HttpUtil.getResponseString(url, params,this.getAdminLoginUser(request));
			dictCodeList = (List<CtrDictCodes>) JsonUtil.jsonToDtos(testMethodString, CtrDictCodes.class);
			mv.addObject("testMethodList", dictCodeList);
			//---------------------------------------
			params.put("typeKey", TypeKeyEnum.discipline.getIndex().toString());//医学专业组
			disciplineString = HttpUtil.getResponseString(url, params,this.getAdminLoginUser(request));
			dictCodeList = (List<CtrDictCodes>) JsonUtil.jsonToDtos(disciplineString, CtrDictCodes.class);
			mv.addObject("disciplineList", dictCodeList);
			//---------------------------------------
			params.put("typeKey", TypeKeyEnum.unit.getIndex().toString());//结果单位
			unitString = HttpUtil.getResponseString(url, params,this.getAdminLoginUser(request));
			dictCodeList = (List<CtrDictCodes>) JsonUtil.jsonToDtos(unitString, CtrDictCodes.class);
			mv.addObject("unitList", dictCodeList);
			//---------------------------------------
			url = Constant.serviceURL(Constant.RMC_CTRRESULTTYPES, Constant.RMM_CTRRESULTTYPES_QUERYBYSTATUS);
			params.put("status", String.valueOf(IsAbleEnum.enable.ordinal()));//结果类型
			resultTypeString = HttpUtil.postResponseString(url, params,this.getAdminLoginUser(request));
			resultTypesList = (List<CtrResultTypes>) JsonUtil.jsonToDtos(resultTypeString, CtrResultTypes.class);
			mv.addObject("resultTypesList", resultTypesList);*/
			mv.addObject("type", type);
		} catch (Exception e) {
			logger.error(e.getMessage(), e);
		}
		return mv;
	}
	
	/**
	 * 
	 * @Title: deleteTestItem 
	 * @Description: TODO(删除项目) 
	 * @param testItemid 要删除的项目ID
	 * @param request
	 * @return String
	 * @throws
	 */
	@RequestMapping(value = Constant.RMM_DELETETESTIEM, method = RequestMethod.POST)
	@ResponseBody
	public String deleteTestItem(String testItemid, HttpServletRequest request){
		Map<String, String> params = new HashMap<String, String>();
		params.put("testItemId", testItemid);
		params.put("userJson", JsonUtil.DtoTojson(getAdminLoginUser(request)));
		String url = Constant.serviceURL(Constant.RMC_TESTITEM, Constant.RMM_DELETETESTIEM);
		String message = "";
		try {
			message = HttpUtil.postResponseString(url, params, this.getAdminLoginUser(request));
			message = Message.MSG_DEL_SUCC;
		} catch (Exception e) {
			logger.error(e.getMessage(), e);
			message = Message.MSG_DEL_FAIL3;
		}
		return message;
	}
	
	/**
	 * 
	 * @Title: modifyStatus 
	 * @Description: TODO(启用停用项目) 
	 * @param testItemid 项目ID
	 * @param type    是否启用 1 启用  0停用
	 * @param request
	 * @return String
	 * @throws
	 */
	@RequestMapping(value = Constant.RMM_MODIFY_TESTITEM_STATUS, method = RequestMethod.POST)
	@ResponseBody
	public String modifyTestItemStatus(Long testItemid, String type, HttpServletRequest request){
		Map<String, String> params = new HashMap<String, String>();
		params.put("testItemId", String.valueOf(testItemid));
		params.put("type", type);
		params.put("userJson", JsonUtil.DtoTojson(getAdminLoginUser(request)));
		String url = Constant.serviceURL(Constant.RMC_TESTITEM, Constant.RMM_MODIFY_TESTITEM_STATUS);
		String message = "";
		try {
			message = HttpUtil.postResponseString(url, params, this.getAdminLoginUser(request));
		} catch (Exception e) {
			logger.error(e.getMessage(), e);
			message = Message.MSG_ERR_FAIL;
		}
		return message;
	}
	
	/**
	 * 
	 * @Title: queryTestItem 
	 * @Description: TODO(查看单个项目信息) 
	 * @param request
	 * @return ModelAndView
	 * @throws
	 */ 
	@SuppressWarnings("unchecked")
	@RequestMapping(value = Constant.RMM_QUERY_TESTITEM, method = RequestMethod.POST)
	public ModelAndView queryTestItem(String testItemid, HttpServletRequest request){
		Map<String, String> params = new HashMap<String, String>();
		params.put("testItemId", testItemid);
		String url = Constant.serviceURL(Constant.RMC_TESTITEM, Constant.RMM_QUERY_TESTITEM_EDIT);
		String resultString = null;
		String sampleTypeString = ""; //样本类型
		String testMethodString = ""; //检验方法
		String disciplineString = ""; //医学专业组
		String unitString = ""; //结果单位
		String resultTypeString = ""; //结果类型
		List<CtrDictCodes> dictCodeList = null;
		List<CtrResultTypes> resultTypesList = null ;
		ModelAndView mv = new ModelAndView("/WEB-INF/jsp/pm/testItem/testItemView.jsp");
		try {
			resultString = HttpUtil.postResponseString(url, params, this.getAdminLoginUser(request));
			CtrTestItems ctrTestItems = (CtrTestItems) JsonUtil.jsonToDto(resultString, CtrTestItems.class, null);
			mv.addObject("crtTestItemDto",ctrTestItems);
			
			//查询基础字典URL
			url = Constant.serviceURL(Constant.RMC_TESTITEM, Constant.RMM_FINFBYDICTCODE);
			//---------------------------------------
			params.put("typeKey", TypeKeyEnum.discipline.getIndex().toString());//样本类型
			sampleTypeString = HttpUtil.getResponseString(url, params,this.getAdminLoginUser(request));
			dictCodeList = (List<CtrDictCodes>) JsonUtil.jsonToDtos(sampleTypeString, CtrDictCodes.class);
			mv.addObject("sampleTypeList", dictCodeList);
			//---------------------------------------
			params.put("typeKey", TypeKeyEnum.testMethod.getIndex().toString());//检验方法
			testMethodString = HttpUtil.getResponseString(url, params,this.getAdminLoginUser(request));
			dictCodeList = (List<CtrDictCodes>) JsonUtil.jsonToDtos(testMethodString, CtrDictCodes.class);
			mv.addObject("testMethodList", dictCodeList);
			//---------------------------------------
			params.put("typeKey", TypeKeyEnum.discipline.getIndex().toString());//医学专业组
			disciplineString = HttpUtil.getResponseString(url, params,this.getAdminLoginUser(request));
			dictCodeList = (List<CtrDictCodes>) JsonUtil.jsonToDtos(disciplineString, CtrDictCodes.class);
			mv.addObject("disciplineList", dictCodeList);
			//---------------------------------------
			params.put("typeKey", TypeKeyEnum.unit.getIndex().toString());//结果单位
			unitString = HttpUtil.getResponseString(url, params,this.getAdminLoginUser(request));
			dictCodeList = (List<CtrDictCodes>) JsonUtil.jsonToDtos(unitString, CtrDictCodes.class);
			mv.addObject("unitList", dictCodeList);
			//---------------------------------------
			url = Constant.serviceURL(Constant.RMC_CTRRESULTTYPES, Constant.RMM_CTRRESULTTYPES_QUERYBYSTATUS);
			params.put("status", String.valueOf(IsAbleEnum.enable.ordinal()));//结果类型
			resultTypeString = HttpUtil.postResponseString(url, params,this.getAdminLoginUser(request));
			resultTypesList = (List<CtrResultTypes>) JsonUtil.jsonToDtos(resultTypeString, CtrResultTypes.class);
			mv.addObject("resultTypesList", resultTypesList);
		} catch (Exception e) {
			logger.error(e.getMessage(), e);
		}
		return mv;
	}
	
	/**
	 * 
	 * @Title: findCount 
	 * @Description: TODO(查询唯一性) 
	 * @param codeNo   达安标准码
	 * @param testName 项目名称
	 * @param request
	 * @return String
	 * @throws
	 */
	@RequestMapping(value = Constant.RMM_FIND_COUNT, method = RequestMethod.POST)
	@ResponseBody
	public String findCount(String codeNo, String testName, HttpServletRequest request){
		Map<String, String> params = new HashMap<String, String>();
		params.put("codeNo", codeNo);
		params.put("testName", testName);
		String url = Constant.serviceURL(Constant.RMC_TESTITEM, Constant.RMM_FIND_COUNT);
		String resultString = "";
		try {
			resultString = HttpUtil.postResponseString(url, params, this.getAdminLoginUser(request));
		} catch (Exception e) {
			logger.error(e.getMessage(), e);
		}
		return resultString;
	}
	
	/**
	 * 
	 * @Title: downLoadExcel 
	 * @Description: TODO(导出项目信息) 
	 * @return String
	 * @throws
	 */
	@SuppressWarnings("unchecked")
	@RequestMapping(value = Constant.RMM_EXPORT_TESTITEM_EXCEL, method = RequestMethod.GET)
	@ResponseBody
	public String downLoadExcel(QueryDto dto, HttpServletRequest request, HttpServletResponse response){
		Map<String, String> params = new HashMap<String, String>();
		params.put("dtoJson", JsonUtil.DtoTojson(dto));
		String url = Constant.serviceURL(Constant.RMC_TESTITEM, Constant.RMM_EXPORT_TESTITEM_EXCEL);
		String resultString = "";
		try {
			Map<String, Object> map = new HashMap<String, Object>();
			map.put("queryDto", dto); //查询条件Dto
			String fileName="testItem_" + DateUtil.generateTimeStamp();//文件名字
	        //填充CrtTestItemDto数据
			resultString = HttpUtil.postResponseString(url, params, this.getAdminLoginUser(request));
			List<CtrTestItems> ctrTestItems = (List<CtrTestItems>) JsonUtil.jsonToDtos(resultString, CtrTestItems.class);
	        List<Map<String,Object>> list = createExcelRecord(ctrTestItems);
	        String columnNames[] = {"项目名称","达安标准码","英文名称","英文简称","项目性别","检验方法","默认标本类型","医学专业组","助记符","顺序号","备注","参考值方式","单位","小数位数","国家标准码"};//列名
	        String keys[] = {"name","codeNo","enName","enShortName","sexId","testMethodName","sampleTypeName","disciplineName","fastCode","displayOrder","memo","refMethod","unit","resultPrecision","stdCode"};//map中的key
	        ByteArrayOutputStream os = new ByteArrayOutputStream();
	        try {
	            ExcelUtil.createWorkBook(list,keys,columnNames).write(os);
	        } catch (IOException e) {
	            e.printStackTrace();
	        }
	        byte[] content = os.toByteArray();
	        InputStream is = new ByteArrayInputStream(content);
	        // 设置response参数，可以打开下载页面
	        response.reset();
	        response.setContentType("application/x-msdownload;charset=utf-8");
	        response.setHeader("Content-Disposition", "attachment;filename="+ new String((fileName + ".xls").getBytes(), "iso-8859-1"));
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
	            throw e;
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
	 * @param dtos
	 * @return List<Map<String,Object>>
	 * @throws
	 */
	private List<Map<String, Object>> createExcelRecord(List<CtrTestItems> ctrs) {
        List<Map<String, Object>> listmap = new ArrayList<Map<String, Object>>();
        Map<String, Object> map = new HashMap<String, Object>();
        map.put("sheetName", "testItem");
        listmap.add(map);
        CtrTestItems ctrTestItems = null;
        //{"ID","项目名","达安标准码","英文名称","英文简称","项目性别","检验方法","默认样本类型","医学专业组","助记符","顺序号","备注"};
        //{"name","codeNo","enName","enShortName","sexId","testMethodName","sampleTypeName","disciplineName","fastCode","displayOrder","memo"};
        for (int j = 0; j < ctrs.size(); j++) {
        	ctrTestItems = ctrs.get(j);
            Map<String, Object> mapValue = new HashMap<String, Object>();
            mapValue.put("name", ctrTestItems.getName());
            mapValue.put("codeNo", ctrTestItems.getCodeNo());
            mapValue.put("enName", ctrTestItems.getEnName());
            mapValue.put("enShortName", ctrTestItems.getEnShortName());
            mapValue.put("sexId", SexType.values()[ctrTestItems.getSexId()].getText());
            mapValue.put("testMethodName", ctrTestItems.getTestMethodName());
            mapValue.put("sampleTypeName", ctrTestItems.getSampleTypeName());
            mapValue.put("disciplineName", ctrTestItems.getDisciplineName());
            mapValue.put("fastCode", ctrTestItems.getFastCode());
            mapValue.put("displayOrder", ctrTestItems.getDisplayOrder());
            mapValue.put("memo", ctrTestItems.getMemo());
            mapValue.put("refMethod", ctrTestItems.getRefMethod());
            mapValue.put("unit", ctrTestItems.getUnit());
            mapValue.put("resultPrecision", ctrTestItems.getResultPrecision());
            mapValue.put("stdCode", ctrTestItems.getStdCode());
            listmap.add(mapValue);
        }
        return listmap;
    }

}
