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
import com.daan.dao.CtrTubeTypesDao;
import com.daan.domain.Constant;
import com.daan.domain.CtrTubeTypes;
import com.daan.domain.DictLogs;
import com.daan.domain.Message;
import com.daan.domain.User;
import com.daan.dto.CtrTubeTypesDto;
import com.daan.enums.IsAbleEnum;
import com.daan.logBean.DictLogsFactory;
import com.daan.logBean.IDictLogger;
import com.daan.service.AbstractService;
import com.daan.service.DictLogsService;
import com.daan.util.IDCreater;
import com.daan.util.JsonUtil;
import com.daan.utils.Page;

/**
* @ClassName: CtrTubeTypesService
* @Description: TODO(试管类型Service) 
* @author zengxiaowang
* @date 2015年11月25日 下午4:52:56 
*
 */
@Controller
@Transactional
@RequestMapping(value = Constant.SERVICE + Constant.RMC_CTRTUBETYPES)
public class CtrTubeTypesService extends AbstractService {
	
	@Autowired
	private CtrTubeTypesDao ctrTubeTypesDao;
	@Autowired
	private DictLogsService dictLogsService;

	/**
	 * 
	* @Title: ctrTubeTypesPageList 
	* @Description: TODO(试管类型数据详细列表) 
	* @param @param queryDtoJson
	* @param @param request
	* @param @return    设定文件 
	* @return String    返回类型 
	* @throws
	 */
	@SuppressWarnings("unchecked")
	@RequestMapping(value = Constant.RMM_CTRTUBETYPES_PAGELIST, method = RequestMethod.POST)
	@ResponseBody
	public String ctrTubeTypesPageList(@RequestParam(value = "queryDtoJson", required = false) String queryDtoJson,	HttpServletRequest request) throws Exception {
		if (StringUtils.isEmpty(queryDtoJson)) {
			throw new Exception("ctrTubeTypesPageList: params Is Null!"); 
		}
		Map<String, Object> map = new HashMap<String, Object>();
		CtrTubeTypesDto dto = (CtrTubeTypesDto) JsonUtil.jsonToDto(queryDtoJson, CtrTubeTypesDto.class, null);
		Page<CtrTubeTypes> page = (Page<CtrTubeTypes>) JsonUtil.jsonToDto(dto.getPage(), Page.class, null);
		map.put("queryDto", dto); // 查询条件Dto
		map.put("page", page); // 分页page对象
		Integer rowCount = this.ctrTubeTypesDao.queryCountByConditions(map);// 总记录数
		page.setTotalCount(rowCount);
		List<CtrTubeTypes> list = ctrTubeTypesDao.queryPageListByConditions(map);
		return JsonUtil.DtosTojson(list) + "|" + JsonUtil.DtoTojson(page);
	}

	/**
	 * 
	* @Title: ctrTubeTypesInfo 
	* @Description: TODO(试管类型信息列表信息) 
	* @param @param id
	* @param @param request
	* @param @return    设定文件 
	* @return String    返回类型 
	* @throws
	 */
	@RequestMapping(value = Constant.RMM_CTRTUBETYPES_INFO, method = RequestMethod.POST)
	@ResponseBody
	public String ctrTubeTypesInfo(@RequestParam(value = "id", required = true) String id, HttpServletRequest request) throws Exception {
		if (StringUtils.isEmpty(id)) {
			throw new Exception("ctrTubeTypesInfo: params Is Null!"); 
		}
		CtrTubeTypes entity = ctrTubeTypesDao.findById(id);
		return JsonUtil.DtoTojson(entity);
	}
	
	/**
	 * 
	* @Title: ctrTubeTypesAdd 
	* @Description: TODO(新增试管类型信息) 
	* @param @param dtoJson
	* @param @param userJson
	* @param @return    设定文件 
	* @return String    返回类型 
	* @throws
	 */
	@RequestMapping(value = Constant.RMM_CTRTUBETYPES_ADD, method = RequestMethod.POST)
	@ResponseBody
	public String ctrTubeTypesAdd(@RequestParam(value = "dtoJson", required = true) String dtoJson, @RequestParam(value = "userJson", required = true) String userJson) throws Exception {
		if (StringUtils.isEmpty(dtoJson) || StringUtils.isEmpty(userJson)) {
			throw new Exception("ctrTubeTypesAdd: params Is Null!");
		}
		CtrTubeTypes ctrTubetype = (CtrTubeTypes) JsonUtil.jsonToDto(dtoJson, CtrTubeTypes.class, null);
		User user = (User) JsonUtil.jsonToDto(userJson, User.class, null);
		ctrTubetype.setId(IDCreater.nextId());
		ctrTubetype.setStatus(IsAbleEnum.disable.ordinal());// 改为枚举类 ,新增默认为停用状态
		ctrTubetype.setTimeVersion(new Date());
		ctrTubeTypesDao.addCtrTubeTypes(ctrTubetype);
		// 添加日志（添加）
		IDictLogger op = DictLogsFactory.CreateAddNewLogger();
		op.AddChangedObject(ctrTubetype);
		DictLogs log = op.ToDictLog(user);
		this.dictLogsService.createDictLogs(log);
		return Message.MSG_SAVE_SUCC;
	}

	/**
	 * 
	* @Title: ctrTubeTypesEdit 
	* @Description: TODO(试管类型信息修改) 
	* @param @param dtoJson
	* @param @param userJson
	* @param @return    设定文件 
	* @return String    返回类型 
	* @throws
	 */
	@RequestMapping(value = Constant.RMM_CTRTUBETYPES_EDIT, method = RequestMethod.POST)
	@ResponseBody
	public String ctrTubeTypesEdit(@RequestParam(value = "dtoJson", required = true) String dtoJson, @RequestParam(value = "userJson", required = true) String userJson) throws Exception {
		if(StringUtils.isEmpty(dtoJson) || StringUtils.isEmpty(userJson)){
			throw new Exception("CtrTubeTypesEdit: params Is Null!"); 
		}
		CtrTubeTypes ctrTubeType = (CtrTubeTypes) JsonUtil.jsonToDto(dtoJson, CtrTubeTypes.class, null);
		User user = (User) JsonUtil.jsonToDto(userJson, User.class, null);
		CtrTubeTypes oldCtrDictCode = ctrTubeTypesDao.findById(String.valueOf(ctrTubeType.getId()));
		ctrTubeTypesDao.modifyCtrTubeTypes(ctrTubeType);
		// 添加日志（修改）
		IDictLogger op = DictLogsFactory.CreateEditLogger(oldCtrDictCode);
		op.AddChangedObject(ctrTubeType);
		DictLogs log = op.ToDictLog(user);
		this.dictLogsService.createDictLogs(log);
		return Message.MSG_SAVE_SUCC;
	}

	/**
	 * 
	* @Title: ctrTubeTypesDisableOrEnable 
	* @Description: TODO(试管类型-启用/停用) 
	* @param @param id
	* @param @param operatioType
	* @param @param request
	* @param @return    设定文件 
	* @return String    返回类型 
	* @throws
	 */
	@RequestMapping(value = Constant.RMM_CTRTUBETYPES_DIDABLEORENABLE, method = RequestMethod.POST)
	@ResponseBody
	public String ctrTubeTypesDisableOrEnable(@RequestParam(value = "id", required = true) String id, @RequestParam(value = "operatioType", required = true) String operatioType, 
			@RequestParam(value = "userJson", required = true) String userJson) throws Exception {
		if(StringUtils.isEmpty(id) || StringUtils.isEmpty(userJson) || StringUtils.isEmpty(operatioType)){
			throw new Exception("ctrTubeTypesDisableOrEnable: params Is Null!"); 
		}
		User user = (User) JsonUtil.jsonToDto(userJson, User.class, null);
		// operatioType: Enable 启用 Disable 停用
		Integer status = 0;
		if ("Enable".equals(operatioType)) {
			status = IsAbleEnum.enable.ordinal();
		} else if ("Disable".equals(operatioType)) {
			status = IsAbleEnum.disable.ordinal();
		}
		CtrTubeTypes oldEntity = ctrTubeTypesDao.findById(id);
		CtrTubeTypes CtrTubeTypes =	(CtrTubeTypes) oldEntity.clone();
		CtrTubeTypes.setStatus(status);
		ctrTubeTypesDao.modifyCtrTubeTypes(CtrTubeTypes);
		// 添加日志（修改）
		IDictLogger op = DictLogsFactory.CreateEditLogger(oldEntity);
		op.AddChangedObject(CtrTubeTypes);
		DictLogs log = op.ToDictLog(user);
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
	@RequestMapping(value = Constant.RMM_CTRTUBETYPES_IFEXISTED, method = RequestMethod.POST)
	@ResponseBody
	public String chkNameExisted(@RequestParam(value = "id", required = false) String id, @RequestParam(value = "name", required = true) String name) throws Exception {
		if (StringUtils.isEmpty(name)) {
			throw new Exception("chkNameExisted: params Is Null!");
		}
		HashMap<String, String> params = new HashMap<String, String>();
		params.put("name", name);
		List<CtrTubeTypes> list = ctrTubeTypesDao.findListByConditions(params);
		if(StringUtils.isEmpty(id)){
			// 新增
			for(CtrTubeTypes entity : list){
				if(name.equals(entity.getName())){
					return Message.MSG_CONFIRM_1;
				}
			}
		} else {
			// 修改
			for(CtrTubeTypes entity : list){
				if(name.equals(entity.getName()) && !id.equals(String.valueOf(entity.getId()))){
					return Message.MSG_CONFIRM_1;
				}
			}
		}
		return "";
	}

	/**
	 * 
	* @Title: ctrTubeTypesDelete 
	* @Description: TODO(删除试管类型信息) 
	* @param @param id
	* @param @param userJson
	* @param @return    设定文件 
	* @return String    返回类型 
	* @throws
	 */
	@RequestMapping(value = Constant.RMM_CTRTUBETYPES_DELETE, method = RequestMethod.POST)
	@ResponseBody
	public String ctrTubeTypesDelete(@RequestParam(value = "id", required = true) String id, @RequestParam(value = "userJson", required = true) String userJson) throws Exception {
		if(StringUtils.isEmpty(id) || StringUtils.isEmpty(userJson)){
			throw new Exception("ctrTubeTypesDelete: params Is Null!"); 
		}
		User user = (User) JsonUtil.jsonToDto(userJson, User.class, null);
		CtrTubeTypes entity = ctrTubeTypesDao.findById(id);
		ctrTubeTypesDao.deleteById(id);
		// 添加日志（删除）
		IDictLogger op = DictLogsFactory.CreateDeleteLogger();
		op.AddChangedObject(entity);
		DictLogs log = op.ToDictLog(user);
		this.dictLogsService.createDictLogs(log);
		return Message.MSG_SAVE_SUCC;
	}

	/**
	 * 
	* @Title: ctrTubeTypesDeleteBatch 
	* @Description: TODO(批量删除) 
	* @param @param ids
	* @param @param userJson
	* @param @return
	* @param @throws Exception    设定文件 
	* @return String    返回类型 
	* @throws
	 */
	@RequestMapping(value = Constant.RMM_CTRTUBETYPES_DELETE_BATCH, method = RequestMethod.POST)
	@ResponseBody
	public String ctrTubeTypesDeleteBatch(@RequestParam(value = "ids", required = true) String ids, @RequestParam(value = "userJson", required = true) String userJson) throws Exception {
		if(StringUtils.isEmpty(ids) || StringUtils.isEmpty(userJson)){
			throw new Exception("ctrTubeTypesDeleteBatch: params Is Null!"); 
		}
		User user = (User) JsonUtil.jsonToDto(userJson, User.class, null);
		if (StringUtils.isNotEmpty(ids)) {
			String[] idArray = ids.split(",");
			for (String id : idArray) {
				if (StringUtils.isNotEmpty(id)) {
					CtrTubeTypes entity = ctrTubeTypesDao.findById(id);
					ctrTubeTypesDao.deleteById(id);
					// 添加日志（删除）
					IDictLogger op = DictLogsFactory.CreateDeleteLogger();
					op.AddChangedObject(entity);
					DictLogs log = op.ToDictLog(user);
					this.dictLogsService.createDictLogs(log);
				}
			}
		}
		return Message.MSG_SAVE_SUCC;
	}
}
