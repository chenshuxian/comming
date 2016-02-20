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

import com.daan.dao.CtrLoincDao;
import com.daan.domain.Constant;
import com.daan.domain.CtrDictCodes;
import com.daan.domain.CtrLoinc;
import com.daan.domain.CtrTestItems;
import com.daan.domain.DictLogs;
import com.daan.domain.Message;
import com.daan.domain.User;
import com.daan.dto.CtrLoincDto;
import com.daan.enums.IsAbleEnum;
import com.daan.logBean.DictLogsFactory;
import com.daan.logBean.IDictLogger;
import com.daan.util.CodingCreater;
import com.daan.util.IDCreater;
import com.daan.util.JsonUtil;
import com.daan.utils.Page;

/**
 * @ClassName: CtrLoincService
 * @Description: TODO(LOINC编码表SERVICE)
 * @author xiaobing
 * @date 2015年12月07日 下午20:06:01
 */
@Controller
@Transactional
@RequestMapping(value = Constant.SERVICE + Constant.RMC_CTRLOINC)
public class CtrLoincService extends AbstractService {
	
	@Autowired
	private CtrLoincDao ctrLoincDao;
	@Autowired
	private DictLogsService dictLogsService;

	/**
	 * 
	 * @Title: CtrLoincList
	 * @Description: 查询LOINC编码列表
	 * @param queryDtoJson
	 * @param request
	 * @return String
	 */
	@RequestMapping(value = Constant.RMM_CTRLOINC_PAGE_LIST, method = RequestMethod.POST)
	@ResponseBody
	public String ctrLoincPageList(@RequestParam(value = "queryDtoJson", required = false) String queryDtoJson,
			HttpServletRequest request) {
		Map<String, Object> map = new HashMap<String, Object>();
		CtrLoincDto dto = (CtrLoincDto) JsonUtil.jsonToDto(queryDtoJson,
				CtrLoincDto.class, null);
		Page<CtrLoinc> page = (Page<CtrLoinc>) JsonUtil.jsonToDto(dto.getPage(), Page.class, null);
		map.put("queryDto", dto); // 查询条件Dto
		map.put("page", page); 	  // 分页page对象

		Integer rowCount = this.ctrLoincDao.queryCountByCtrLoinc(map);// 总记录数
		page.setTotalCount(rowCount);
		List<CtrLoinc> list = ctrLoincDao.queryPageListByConditions(map);
		
		return JsonUtil.DtosTojson(list) + "|" + JsonUtil.DtoTojson(page);
	}

	/**
	 * 
	 * @Title: ctrLoincInfo
	 * @Description: 查询LOINC编码信息
	 * @param id
	 * @param request
	 * @return String
	 */
	@RequestMapping(value = Constant.RMM_CTRLOINC_INFO, method = RequestMethod.POST)
	@ResponseBody
	public String ctrLoincInfo(@RequestParam(value = "id", required = true) String id,
			HttpServletRequest request) {
		CtrLoinc entity = ctrLoincDao.findById(id);
		
		return JsonUtil.DtoTojson(entity);
	}

	/**
	 * 
	 * @Title: ctrLoincInfoStList
	 * @Description: 查询分类代码列表
	 * @param typeKey
	 * @param request
	 * @return String
	 */
	@RequestMapping(value = Constant.RMM_CTRLOINC_INFO_STLIST, method = RequestMethod.POST)
	@ResponseBody
	public String ctrLoincInfoStList(@RequestParam(value = "typeKey", required = true) String typeKey, HttpServletRequest request) {
		List<CtrDictCodes> list = ctrLoincDao.getAllSampleTypeList(typeKey);
		
		return JsonUtil.DtosTojson(list);
	}

	/**
	 * 检查系统内是否有同名数据
	 * 
	 * @param dtoJson
	 * @return String
	 */
	@RequestMapping(value = Constant.RMM_CTRLOINC_IFEXISTED, method = RequestMethod.POST)
	@ResponseBody
	public String chkNameExisted(@RequestParam(value = "dtoJson", required = true) String dtoJson){
		return "";
	}
	
	/**
	 * 
	 * @Title: ctrLoincAdd
	 * @Description: 新增LOINC编码
	 * @param dtoJson
	 * @param userJson
	 * @return String
	 * @throws Exception 
	 */
	@RequestMapping(value = Constant.RMM_CTRLOINC_ADD, method = RequestMethod.POST)
	@ResponseBody
	public String ctrLoincAdd(@RequestParam(value = "dtoJson", required = true) String dtoJson,
			@RequestParam(value = "userJson", required = true) String userJson) throws Exception {
		CtrLoinc dto = (CtrLoinc) JsonUtil.jsonToDto(dtoJson, CtrLoinc.class, null);
		User user = (User) JsonUtil.jsonToDto(userJson, User.class, null);
		
		dto.setId(IDCreater.nextId());
		dto.setCodeNo(CodingCreater.createOreder(Constant.CODE_CTRLOINC));
		dto.setStatus(IsAbleEnum.disable.ordinal()); // 新增状态默认为停用
		ctrLoincDao.insertCtrLoinc(dto);

		// 添加日志（添加）
		IDictLogger op = DictLogsFactory.CreateAddNewLogger();
		op.AddChangedObject(dto);
		DictLogs log = op.ToDictLog(user);
		this.dictLogsService.createDictLogs(log);
		
		return Message.MSG_SAVE_SUCC;
	}
	
	/**
	 * 
	 * @Title: ctrLoincEdit
	 * @Description: 修改LOINC编码
	 * @param dtoJson
	 * @param userJson
	 * @return String
	 * @throws Exception 
	 */
	@RequestMapping(value = Constant.RMM_CTRLOINC_EDIT, method = RequestMethod.POST)
	@ResponseBody
	public String ctrLoincEdit(@RequestParam(value = "dtoJson", required = true) String dtoJson,
			@RequestParam(value = "userJson", required = true) String userJson) throws Exception {
		CtrLoinc newCtrLoinc = (CtrLoinc) JsonUtil.jsonToDto(dtoJson, CtrLoinc.class, null);
		User user = (User) JsonUtil.jsonToDto(userJson, User.class, null);

		CtrLoinc oldCtrLoinc = ctrLoincDao.findById(newCtrLoinc.getId() + "");
		if(oldCtrLoinc == null){
			// 数据不存在
			return Message.MSG_NOT_EXISTED;
		}
		
		ctrLoincDao.updateCtrLoinc(newCtrLoinc);

		// 添加日志（修改）
		IDictLogger op = DictLogsFactory.CreateEditLogger(oldCtrLoinc);
		op.AddChangedObject(newCtrLoinc);
		DictLogs log = op.ToDictLog(user);
		this.dictLogsService.createDictLogs(log);
		
		return Message.MSG_SAVE_SUCC;
	}

	/**
	 * 
	 * @Title: ctrLoincEnable
	 * @Description: LOINC编码信息 --启用
	 * @param id
	 * @param userJson
	 * @return String
	 * @throws Exception 
	 */
	@RequestMapping(value = Constant.RMM_CTRLOINC_ENABLE, method = RequestMethod.POST)
	@ResponseBody
	public String ctrLoincEnable(@RequestParam(value = "id", required = true) String id,
			@RequestParam(value = "userJson", required = true) String userJson) throws Exception {
		User user = (User) JsonUtil.jsonToDto(userJson, User.class, null);

		CtrLoinc entity = ctrLoincDao.findById(id);  // 旧数据
		CtrLoinc newEntity = new CtrLoinc(); 		 // 新数据
		
		
		if(entity == null){
			// 数据不存在
			return Message.MSG_NOT_EXISTED;
		}
		
		ctrLoincDao.enableById(id);
		newEntity = (CtrLoinc) entity.clone();

		// 添加日志（修改）
		entity.setStatus(entity.getStatus());
		IDictLogger op = DictLogsFactory.CreateEditLogger(entity);
		newEntity.setStatus(IsAbleEnum.enable.ordinal());
		op.AddChangedObject(newEntity);
		DictLogs log = op.ToDictLog(user);
		this.dictLogsService.createDictLogs(log);
		
		return Message.MSG_SAVE_SUCC;
	}

	/**
	 * 
	 * @Title: ctrLoincDisable
	 * @Description: LOINC编码信息 --停用
	 * @param id
	 * @param userJson
	 * @return String
	 * @throws Exception 
	 */
	@RequestMapping(value = Constant.RMM_CTRLOINC_DISABLE, method = RequestMethod.POST)
	@ResponseBody
	public String ctrLoincDisable(@RequestParam(value = "id", required = true) String id,
			@RequestParam(value = "userJson", required = true) String userJson) throws Exception {
		User user = (User) JsonUtil.jsonToDto(userJson, User.class, null);

		CtrLoinc entity = ctrLoincDao.findById(id);  // 旧数据
		CtrLoinc newEntity = new CtrLoinc(); 		 // 新数据
		
		if(entity == null){
			// 数据不存在
			return Message.MSG_NOT_EXISTED;
		}
		
		ctrLoincDao.disableById(id);
		newEntity = (CtrLoinc) entity.clone();
		
		// 添加日志（修改）
		entity.setStatus(entity.getStatus());
		IDictLogger op = DictLogsFactory.CreateEditLogger(entity);
		newEntity.setStatus(IsAbleEnum.disable.ordinal());
		op.AddChangedObject(newEntity);
		DictLogs log = op.ToDictLog(user);
		this.dictLogsService.createDictLogs(log);

		return Message.MSG_SAVE_SUCC;
	}

	/**
	 * 
	 * @Title: ctrLoincDelete
	 * @Description: 删除LOINC编码信息
	 * @param id
	 * @param userJson
	 * @return String
	 * @throws Exception 
	 */
	@RequestMapping(value = Constant.RMM_CTRLOINC_DELETE, method = RequestMethod.POST)
	@ResponseBody
	public String ctrLoincDelete(@RequestParam(value = "id", required = true) String id,
			@RequestParam(value = "userJson", required = true) String userJson) throws Exception {
		User user = (User) JsonUtil.jsonToDto(userJson, User.class, null);

		CtrLoinc entity = ctrLoincDao.findById(id);
		if(entity == null){
			// 数据不存在
			return Message.MSG_NOT_EXISTED;
		}

		// 仅有状态为“停用”时，数据方可删除
		if(entity.getStatus()==null || entity.getStatus().intValue() == IsAbleEnum.enable.ordinal()){
			return Message.MSG_DEL_FAIL4;
		}
		
		ctrLoincDao.deleteById(id);

		// 添加日志（删除）
		IDictLogger op = DictLogsFactory.CreateDeleteLogger();
		op.AddChangedObject(entity);
		DictLogs log = op.ToDictLog(user);
		this.dictLogsService.createDictLogs(log);
		
		return Message.MSG_DEL_SUCC;
	}

	/**
	 * 
	 * @Title: ctrLoincDeleteBatch
	 * @Description: 批量删除LOINC编码信息
	 * @param ids
	 * @param userJson
	 * @return String
	 * @throws Exception 
	 */
	@RequestMapping(value = Constant.RMM_CTRLOINC_DELETE_BATCH, method = RequestMethod.POST)
	@ResponseBody
	public String ctrLoincDeleteBatch(@RequestParam(value = "ids", required = true) String ids,
			@RequestParam(value = "userJson", required = true) String userJson) throws Exception {
			User user = (User) JsonUtil.jsonToDto(userJson, User.class, null);
		if (StringUtils.isNotEmpty(ids)) {
			
			// 检查状态，是否可删除
			Map<String, CtrLoinc> map = new HashMap<String, CtrLoinc>();
			String[] idArray = ids.split(",");
			int i=0;
			for (String id : idArray) {
				i++;
				if (StringUtils.isNotBlank(id)) {
					CtrLoinc entity = ctrLoincDao.findById(id);
					
					if(entity != null){
						// 仅有状态为“停用”时，数据方可删除
						if(entity.getStatus()==null || entity.getStatus().intValue() == IsAbleEnum.enable.ordinal()){
							return Message.MSG_DEL_FAIL5.replace("#", i+"");
						}
						map.put(id, entity);
					}
				}
			}
			
			// 依次删除
			for (String key : map.keySet()) {
				ctrLoincDao.deleteById(map.get(key).getId()+"");
				
				// 添加日志（删除）
				IDictLogger op = DictLogsFactory.CreateDeleteLogger();
				op.AddChangedObject(map.get(key));
				DictLogs log = op.ToDictLog(user);
				this.dictLogsService.createDictLogs(log);
			}
		}
		
		return Message.MSG_DEL_SUCC;
	}

	/**
	 *
	 * @Title: ctrLoincDisableOrEnable
	 * @Description: TODO(编码表-启用/停用)
	 * @param @param id
	 * @param @param operatioType
	 * @param @param request
	 * @param @return    设定文件
	 * @return String    返回类型
	 * @throws
	 */
	@RequestMapping(value = Constant.RMM_CTRLOINC_DISABLEORENABLE, method = RequestMethod.POST)
	@ResponseBody
	public String ctrLoincDisableOrEnable(@RequestParam(value = "id", required = true) String id, @RequestParam(value = "operatioType", required = true) String operatioType,
											 @RequestParam(value = "userJson", required = true) String userJson) throws Exception {
		if(StringUtils.isEmpty(id) || StringUtils.isEmpty(userJson) || StringUtils.isEmpty(operatioType)){
			throw new Exception("LoincDisableOrEnable: params Is Null!");
		}
		User user = (User) JsonUtil.jsonToDto(userJson, User.class, null);
		// operatioType: Enable 启用 Disable 停用
		Integer status = 0;
		if ("Enable".equals(operatioType)) {
			status = IsAbleEnum.enable.ordinal();
		} else if ("Disable".equals(operatioType)) {
			status = IsAbleEnum.disable.ordinal();
		}
		CtrLoinc oldEntity = ctrLoincDao.findById(id);
		CtrLoinc CtrInstruments = (CtrLoinc)oldEntity.clone();
		CtrInstruments.setStatus(status);
		ctrLoincDao.modifyLoinc(CtrInstruments);
		// 添加日志（修改）
		IDictLogger op = DictLogsFactory.CreateEditLogger(oldEntity);
		op.AddChangedObject(CtrInstruments);
		DictLogs log = op.ToDictLog(user);
		this.dictLogsService.createDictLogs(log);
		return Message.MSG_SAVE_SUCC;
	}

}
