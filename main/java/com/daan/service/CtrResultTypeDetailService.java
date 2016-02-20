package com.daan.service;

import java.util.Date;
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
import com.daan.dao.CtrResultTypeDetailDao;
import com.daan.dao.CtrResultTypesDao;
import com.daan.domain.Constant;
import com.daan.domain.CtrResultTypeDetail;
import com.daan.domain.CtrResultTypes;
import com.daan.domain.DictLogs;
import com.daan.domain.Message;
import com.daan.domain.User;
import com.daan.dto.CtrResultTypeDetailDto;
import com.daan.logBean.DictLogsFactory;
import com.daan.logBean.IDictLogger;
import com.daan.service.AbstractService;
import com.daan.service.DictLogsService;
import com.daan.util.IDCreater;
import com.daan.util.JsonUtil;

/**
* @ClassName: CtrResultTypeDetailService
* @Description: TODO(结果类型描述Service) 
* @author zengxiaowang
* @date 2015年11月25日 下午4:52:56 
*
 */
@Controller
@Transactional
@RequestMapping(value = Constant.SERVICE + Constant.RMC_CTRRESULTTYPEDETAIL)
public class CtrResultTypeDetailService extends AbstractService{
	
	@Autowired
	private CtrResultTypeDetailDao ctrResultTypeDetailDao;
	@Autowired
	private DictLogsService dictLogsService;
	@Autowired
	private CtrResultTypesDao ctrResultTypesDao;

	/**
	 * 
	* @Title: ctrResultTypeDetailPageList 
	* @Description: TODO(结果类型描述数据详细列表) 
	* @param @param queryDtoJson
	* @param @param request
	* @param @return    设定文件 
	* @return String    返回类型 
	* @throws
	 */
	@RequestMapping(value = Constant.RMM_CTRRESULTTYPEDETAIL_PAGELIST, method = RequestMethod.POST)
	@ResponseBody
	public String ctrResultTypeDetailPageList(@RequestParam(value = "queryDtoJson", required = false) String queryDtoJson,	HttpServletRequest request) throws Exception {
		if (StringUtils.isEmpty(queryDtoJson)) {
			throw new Exception("ctrResultTypeDetailPageList: params Is Null!"); 
		}
		Map<String, Object> map = new HashMap<String, Object>();
		CtrResultTypeDetailDto dto = (CtrResultTypeDetailDto) JsonUtil.jsonToDto(queryDtoJson, CtrResultTypeDetailDto.class, null);
//		Page<CtrResultTypeDetail> page = (Page<CtrResultTypeDetail>) JsonUtil.jsonToDto(dto.getPage(), Page.class, null);
		map.put("queryDto", dto); // 查询条件Dto
//		map.put("page", page); // 分页page对象
//		Integer rowCount = this.ctrResultTypeDetailDao.queryCountByConditions(map);// 总记录数
//		page.setTotalCount(rowCount);
		List<CtrResultTypeDetail> list = ctrResultTypeDetailDao.queryPageListByConditions(map);
		return JsonUtil.DtosTojson(list);// + "|" + JsonUtil.DtoTojson(page);
	}

	/**
	 * 
	* @Title: ctrResultTypeDetailInfo 
	* @Description: TODO(结果类型描述信息列表信息) 
	* @param @param id
	* @param @param request
	* @param @return    设定文件 
	* @return String    返回类型 
	* @throws
	 */
	@RequestMapping(value = Constant.RMM_CTRRESULTTYPEDETAIL_INFO, method = RequestMethod.POST)
	@ResponseBody
	public String ctrResultTypeDetailInfo(@RequestParam(value = "id", required = true) String id, HttpServletRequest request) throws Exception {
		if (StringUtils.isEmpty(id)) {
			throw new Exception("ctrResultTypeDetailInfo: params Is Null!"); 
		}
		CtrResultTypeDetail entity = ctrResultTypeDetailDao.findById(id);
		return JsonUtil.DtoTojson(entity);
	}
	
	/**
	 * 
	* @Title: ctrResultTypeDetailAdd 
	* @Description: TODO(新增结果类型描述信息) 
	* @param @param dtoJson
	* @param @param userJson
	* @param @return    设定文件 
	* @return String    返回类型 
	* @throws
	 */
	@RequestMapping(value = Constant.RMM_CTRRESULTTYPEDETAIL_ADD, method = RequestMethod.POST)
	@ResponseBody
	public String ctrResultTypeDetailAdd(@RequestParam(value = "dtoJson", required = true) String dtoJson, @RequestParam(value = "userJson", required = true) String userJson) throws Exception {
		if (StringUtils.isEmpty(dtoJson) || StringUtils.isEmpty(userJson)) {
			throw new Exception("ctrResultTypeDetailAdd: params Is Null!");
		}
		CtrResultTypeDetail ctrResultTypeDetail = (CtrResultTypeDetail) JsonUtil.jsonToDto(dtoJson, CtrResultTypeDetail.class, null);
		User user = (User) JsonUtil.jsonToDto(userJson, User.class, null);
		ctrResultTypeDetail.setId(IDCreater.nextId());
		ctrResultTypeDetail.setTimeVersion(new Date());
		ctrResultTypeDetailDao.addCtrResultTypeDetail(ctrResultTypeDetail);
		// 添加日志（添加）
		IDictLogger op = DictLogsFactory.CreateAddNewLogger();
		op.AddChangedObject(ctrResultTypeDetail);
		DictLogs log = op.ToDictLog(user);
		CtrResultTypes ctrResultTypes = ctrResultTypesDao.findById(String.valueOf(ctrResultTypeDetail.getTypeId()));
		log.setSummary("["+ctrResultTypes.getCodeNo()+"]"+ctrResultTypes.getName());
		this.dictLogsService.createDictLogs(log);
		return Message.MSG_SAVE_SUCC;
	}

	/**
	 * 
	* @Title: ctrResultTypeDetailEdit 
	* @Description: TODO(结果类型描述信息修改) 
	* @param @param dtoJson
	* @param @param userJson
	* @param @return    设定文件 
	* @return String    返回类型 
	* @throws
	 */
	@RequestMapping(value = Constant.RMM_CTRRESULTTYPEDETAIL_EDIT, method = RequestMethod.POST)
	@ResponseBody
	public String ctrResultTypeDetailEdit(@RequestParam(value = "dtoJson", required = true) String dtoJson, @RequestParam(value = "userJson", required = true) String userJson) throws Exception {
		if(StringUtils.isEmpty(dtoJson) || StringUtils.isEmpty(userJson)){
			throw new Exception("CtrResultTypeDetailEdit: params Is Null!"); 
		}
		CtrResultTypeDetail ctrResultTypeDetail = (CtrResultTypeDetail) JsonUtil.jsonToDto(dtoJson, CtrResultTypeDetail.class, null);
		User user = (User) JsonUtil.jsonToDto(userJson, User.class, null);
		CtrResultTypeDetail oldCtrResultTypeDetail = ctrResultTypeDetailDao.findById(String.valueOf(ctrResultTypeDetail.getId()));
		ctrResultTypeDetailDao.modifyCtrResultTypeDetail(ctrResultTypeDetail);
		// 添加日志（修改）
		IDictLogger op = DictLogsFactory.CreateEditLogger(oldCtrResultTypeDetail);
		op.AddChangedObject(ctrResultTypeDetail);
		DictLogs log = op.ToDictLog(user);
		CtrResultTypes ctrResultTypes = ctrResultTypesDao.findById(String.valueOf(ctrResultTypeDetail.getTypeId()));
		log.setSummary("["+ctrResultTypes.getCodeNo()+"]"+ctrResultTypes.getName());
		this.dictLogsService.createDictLogs(log);
		return Message.MSG_SAVE_SUCC;
	}

	/**
	 * 
	* @Title: chkNameExisted 
	* @Description: TODO(检查系统内是否有同名数据) 
	* @param @param dtoJson
	* @param @return    设定文件 
	* @return String    返回类型 
	* @throws
	 */
	@RequestMapping(value = Constant.RMM_CTRRESULTTYPEDETAIL_IFEXISTED, method = RequestMethod.POST)
	@ResponseBody
	public String chkNameExisted(@RequestParam(value = "id", required = false) String id, @RequestParam(value = "name", required = true) String name, @RequestParam(value = "typeId", required = true) String typeId) throws Exception {
		if (StringUtils.isEmpty(name) || StringUtils.isEmpty(typeId)) {
			throw new Exception("chkNameExisted: params Is Null!");
		}
		HashMap<String, String> params = new HashMap<String, String>();
		params.put("name", name);
		params.put("typeId", typeId);
		List<CtrResultTypeDetail> list = ctrResultTypeDetailDao.findListByConditions(params);
		if(StringUtils.isEmpty(id)){
			// 新增
			for(CtrResultTypeDetail entity : list){
				if(name.equals(entity.getResultValue())){
					return Message.MSG_CONFIRM_1;
				}
			}
		} else {
			// 修改
			for(CtrResultTypeDetail entity : list){
				if(name.equals(entity.getResultValue()) && !id.equals(String.valueOf(entity.getId()))){
					return Message.MSG_CONFIRM_1;
				}
			}
		}
		return "";
	}

	/**
	 * 
	* @Title: ctrResultTypeDetailDelete 
	* @Description: TODO(删除结果类型描述信息) 
	* @param @param id
	* @param @param userJson
	* @param @return    设定文件 
	* @return String    返回类型 
	* @throws
	 */
	@RequestMapping(value = Constant.RMM_CTRRESULTTYPEDETAIL_DELETE, method = RequestMethod.POST)
	@ResponseBody
	public String ctrResultTypeDetailDelete(@RequestParam(value = "id", required = true) String id, @RequestParam(value = "userJson", required = true) String userJson) throws Exception {
		if(StringUtils.isEmpty(id) || StringUtils.isEmpty(userJson)){
			throw new Exception("CtrResultTypeDetailDelete: params Is Null!"); 
		}
		User user = (User) JsonUtil.jsonToDto(userJson, User.class, null);
		CtrResultTypeDetail entity = ctrResultTypeDetailDao.findById(id);
		ctrResultTypeDetailDao.deleteById(id);
		// 添加日志（删除）
		IDictLogger op = DictLogsFactory.CreateDeleteLogger();
		op.AddChangedObject(entity);
		DictLogs log = op.ToDictLog(user);
		CtrResultTypes ctrResultTypes = ctrResultTypesDao.findById(String.valueOf(entity.getTypeId()));
		log.setSummary("["+ctrResultTypes.getCodeNo()+"]"+ctrResultTypes.getName());
		this.dictLogsService.createDictLogs(log);
		return Message.MSG_SAVE_SUCC;
	}

	/**
	 * 
	* @Title: ctrResultTypeDetailDeleteBatch 
	* @Description: TODO(批量删除) 
	* @param @param ids
	* @param @param userJson
	* @param @return
	* @param @throws Exception    设定文件 
	* @return String    返回类型 
	* @throws
	 */
	@RequestMapping(value = Constant.RMM_CTRRESULTTYPEDETAIL_DELETE_BATCH, method = RequestMethod.POST)
	@ResponseBody
	public String ctrResultTypeDetailDeleteBatch(@RequestParam(value = "ids", required = true) String ids, @RequestParam(value = "userJson", required = true) String userJson) throws Exception {
		if(StringUtils.isEmpty(ids) || StringUtils.isEmpty(userJson)){
			throw new Exception("CtrResultTypeDetailDeleteBatch: params Is Null!"); 
		}
		User user = (User) JsonUtil.jsonToDto(userJson, User.class, null);
		if (StringUtils.isNotEmpty(ids)) {
			String[] idArray = ids.split(",");
			for (String id : idArray) {
				if (StringUtils.isNotEmpty(id)) {
					CtrResultTypeDetail entity = ctrResultTypeDetailDao.findById(id);
					ctrResultTypeDetailDao.deleteById(id);
					// 添加日志（删除）
					IDictLogger op = DictLogsFactory.CreateDeleteLogger();
					op.AddChangedObject(entity);
					DictLogs log = op.ToDictLog(user);
					CtrResultTypes ctrResultTypes = ctrResultTypesDao.findById(String.valueOf(entity.getTypeId()));
					log.setSummary("["+ctrResultTypes.getCodeNo()+"]"+ctrResultTypes.getName());
					this.dictLogsService.createDictLogs(log);
				}
			}
		}
		return Message.MSG_SAVE_SUCC;
	}
}
