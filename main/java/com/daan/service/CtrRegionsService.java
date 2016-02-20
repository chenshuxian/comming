package com.daan.service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import com.daan.dao.CtrRegionsDao;
import com.daan.domain.Constant;
import com.daan.domain.CtrRegions;
import com.daan.domain.DictLogs;
import com.daan.domain.Message;
import com.daan.domain.User;
import com.daan.enums.IsAbleEnum;
import com.daan.logBean.DictLogsFactory;
import com.daan.logBean.IDictLogger;
import com.daan.util.IDCreater;
import com.daan.util.JsonUtil;
/**
 * @ClassName: CtrRegionsServiceImpl 
 * @Description: TODO(地区SERVICE)
 * @author Wumingjava
 * @date 2015年11月26日 上午11:45:11
 */
@Controller
@Transactional
@RequestMapping(value = Constant.SERVICE + Constant.RMC_CTRREGIONS)
public class CtrRegionsService extends AbstractService {
	@Autowired
	private CtrRegionsDao ctrRegionsDao;
	@Autowired
	private DictLogsService dictLogsService;
	/**
	 * @throws Exception 
	 * @Title: saveCtrRegions 
	 * @Description: TODO(保存地区service方法) 
	 * @param ctrRegionsDtoJson
	 * @param request
	 * @return String
	 * @throws
	 */
	@RequestMapping(value = Constant.RMM_SAVECTRREGIONS, method = RequestMethod.POST)
	@ResponseBody
	public String saveCtrRegions(@RequestParam(value = "ctrRegionsDtoJson", required = true) String ctrRegionsDtoJson,
			@RequestParam(value = "pid", required = true) String pid,
			@RequestParam(value = "userJson", required = true) String userJson,HttpServletRequest request) throws Exception {
		String message = Message.MSG_SAVE_SUCC;
		User user = (User) JsonUtil.jsonToDto(userJson, User.class, null);
		CtrRegions ctrRegions = (CtrRegions) JsonUtil.jsonToDto(ctrRegionsDtoJson, CtrRegions.class, null);
		Long id = ctrRegions.getId();
		if (id != null && id != 0) {// 修改
			CtrRegions oldCtrRegions = ctrRegionsDao.findById(id);
			ctrRegionsDao.updateCtrRegions(ctrRegions);
			IDictLogger op = DictLogsFactory.CreateEditLogger(oldCtrRegions);//旧
			op.AddChangedObject(ctrRegions);
			DictLogs log = op.ToDictLog(user);
			this.dictLogsService.createDictLogs(log);
		} else {
			// 父节点
			if (pid == null || "".equals(pid)) {
				return Message.MSG_PARAMS_NULL;
			}
			CtrRegions pctrRegions = ctrRegionsDao.findById(Long.parseLong(pid));
			if (pctrRegions == null) {
				return Message.MSG_FIND_NULL;
			}
			int rightValue = pctrRegions.getRightValue();
			id = IDCreater.nextId();
			ctrRegions.setId(id);
			ctrRegions.setStatus(IsAbleEnum.enable.ordinal());
			//ctrRegions.setCodeNo(CodingCreater.createOreder(Constant.CODE_CTRREGIONS));
			ctrRegions.setLeftValue(rightValue);
			ctrRegions.setRightValue(rightValue + 1);
			ctrRegions.setTier(pctrRegions.getTier() + 1);
			// 更新左右值
			Map<String, Object> map = new HashMap<String, Object>();
			map.put("left", rightValue);
			map.put("right", rightValue);
			map.put("type", 2);//2相当于+
			map.put("add", 2);
			ctrRegionsDao.updateCtrRegionsLeft(map);
			ctrRegionsDao.updateCtrRegionsRight(map);
			ctrRegionsDao.insertCtrRegions(ctrRegions);
			message = Message.DATA+id;
			// 添加日志（保存）
			IDictLogger op = DictLogsFactory.CreateAddNewLogger();
			op.AddChangedObject(ctrRegions);
			DictLogs log = op.ToDictLog(user);
			this.dictLogsService.createDictLogs(log);
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
	public String nameRepeat(@RequestParam(value = "name", required = true) String name,HttpServletRequest request) {
		String message=Message.DATA;
		 List<CtrRegions> ctrRegions = ctrRegionsDao.findCtrRegionsByName(name);
		 if(ctrRegions!=null && ctrRegions.size()>0){
			 message = Message.MSG_CONFIRM_1;
		 }
		return message;
	}
	/**
	 * @Title: loadCtrRegionsById 
	 * @Description: TODO(根据ID加载实体) 
	 * @param dto
	 * @param request
	 * @return String
	 * @throws
	 */
	@RequestMapping(value = Constant.RMM_LOADCTRREGIONSBYID,method = RequestMethod.POST, produces = "text/html;charset=UTF-8")
	@ResponseBody
	public String loadCtrRegionsById(@RequestParam(value = "id", required = true) String id,CtrRegions dto,HttpServletRequest request) {
		String message="";
		// 父节点
		List<CtrRegions> pList = ctrRegionsDao.findByProperty(new CtrRegions(Long.parseLong(id)));
		if (pList == null || pList.size() == 0) {
			return Message.MSG_FIND_NULL;
		}
		CtrRegions pctrRegions = pList.iterator().next();
		message = Message.DATA+JsonUtil.DtoTojson(pctrRegions);
		return message;
	}
	/**
	 * @throws Exception 
	 * @Title: delCtrRegions 
	 * @Description: TODO(删除,先判断下面有没有子记录。) 
	 * @param id
	 * @param request
	 * @return String
	 * @throws
	 */
	@RequestMapping(value = Constant.RMM_DELCTRREGIONS, method = RequestMethod.POST)
	@ResponseBody
	public String delCtrRegions(@RequestParam(value = "id", required = true) String id,
			@RequestParam(value = "userJson", required = true) String userJson,HttpServletRequest request) throws Exception {
		User user = (User) JsonUtil.jsonToDto(userJson, User.class, null);
		String message = Message.MSG_DEL_SUCC1;
		List<CtrRegions> sons = ctrRegionsDao.findByIdReturnSon(id);
		if(sons!=null && sons.size()>0){
			message = Message.MSG_DEL_FAIL;
			return message;
		}
		if (id == null || "".equals(id)) {
			return Message.MSG_PARAMS_NULL;
		}
		List<CtrRegions> pList = ctrRegionsDao.findByProperty(new CtrRegions(Long.parseLong(id)));
		if (pList == null || pList.size() == 0) {
			return Message.MSG_FIND_NULL;
		}
		CtrRegions pctrRegions = pList.iterator().next();
		int rightValue = pctrRegions.getRightValue();
		// 更新左右值
		Map<String, Object> map = new HashMap<String, Object>();
		map.put("left", rightValue);
		map.put("right", rightValue);
		map.put("type", 1);//相当于-
		map.put("add", 2);
		ctrRegionsDao.updateCtrRegionsLeft(map);
		ctrRegionsDao.updateCtrRegionsRight(map);
		ctrRegionsDao.deleteById(Long.parseLong(id));
		// 添加日志（删除）
		IDictLogger op = DictLogsFactory.CreateDeleteLogger();
		op.AddChangedObject(pctrRegions);
		DictLogs log = op.ToDictLog(user);
		this.dictLogsService.createDictLogs(log);
		return message;
	}
	
	@RequestMapping(value = Constant.RMM_LOADCTRREGIONSTREE, method = RequestMethod.POST, produces = "text/html;charset=UTF-8")
	@ResponseBody
	public String loadCtrRegionsTree(@RequestParam(value = "id", required = true) String id,
			@RequestParam(value = "tier", required = true) String tier, HttpServletRequest request) {
		CtrRegions ctrRegions = new CtrRegions();
		boolean idIsNotNull = id!=null && !"".equals(id);
		boolean tierIsNotNull = tier!=null && !"".equals(tier);
		if(idIsNotNull){
			ctrRegions.setId(Long.parseLong(id));
		}
		if(idIsNotNull&&tierIsNotNull){
			ctrRegions.setTier(Integer.parseInt(tier));
		}
		List<CtrRegions> crL = ctrRegionsDao.findByTierReturnSon(ctrRegions);
		return JsonUtil.DtosTojson(crL);
	}
	
	@RequestMapping(value = Constant.RMM_INITCTRREGIONSTREE, method = RequestMethod.POST, produces = "text/html;charset=UTF-8")
	@ResponseBody
	public String initCtrRegionsTree(@RequestParam(value = "id", required = true) String id,HttpServletRequest request) {
		CtrRegions ctrRegions = new CtrRegions();
		boolean idIsNotNull = id!=null && !"".equals(id);
		if(idIsNotNull){
			ctrRegions.setId(Long.parseLong(id));
		}
		List<CtrRegions> crL = ctrRegionsDao.findByProperty(ctrRegions);
		return JsonUtil.DtosTojson(crL);
	}
	@RequestMapping(value = Constant.RMM_MOVECTRREGIONS, method = RequestMethod.POST, produces = "text/html;charset=UTF-8")
	@ResponseBody
	public String moveCtrRegions(@RequestParam(value = "moveType", required = true) String moveType,
			@RequestParam(value = "nodeID", required = true) String nodeID,
			@RequestParam(value = "targetNodeID", required = true) String targetNodeID,
			@RequestParam(value = "targetNodePId", required = true) String targetNodePId,
			@RequestParam(value = "userJson", required = true) String userJson,HttpServletRequest request) throws Exception {
		User user = (User) JsonUtil.jsonToDto(userJson, User.class, null);
		String parentId="";
		if("inner".equals(moveType)){
			parentId=targetNodeID;
		}else{
			if(null==targetNodePId){
				return "false";
			}
			parentId=targetNodePId;
		}
		List<CtrRegions> pList = ctrRegionsDao.findByProperty(new CtrRegions(Long.parseLong(parentId)));
		if (pList == null || pList.size() == 0) {
			return Message.MSG_FIND_NULL;
		}
		CtrRegions pctrRegions = pList.iterator().next();
		if(null==pctrRegions){
			return "false";
		}else{
			Map<String,Object> map=new HashMap<String,Object>();
			List<CtrRegions> list = ctrRegionsDao.findByProperty(new CtrRegions(Long.parseLong(nodeID)));
			if (list == null || list.size() == 0) {
				return Message.MSG_FIND_NULL;
			}
			CtrRegions moveNode = list.iterator().next();
			int moveLeft=moveNode.getLeftValue();//4
			int moveRight=moveNode.getRightValue();//7
			int moveTier=moveNode.getTier();//2
			int add=moveRight-moveLeft+1;//4
			map.put("left", moveLeft);
			map.put("right", moveRight);
			map.put("add", add);
			map.put("type", 1);//相当于-
			//更新子树成负值
			ctrRegionsDao.updateCtrRegionsToNe(map);
			//更新后面节点左右值
			ctrRegionsDao.updateCtrRegionsLeft(map);
			ctrRegionsDao.updateCtrRegionsRight(map);
			//找出父节点
			pList = ctrRegionsDao.findByProperty(new CtrRegions(Long.parseLong(parentId)));
			pctrRegions = pList.iterator().next();
			int parentLeft=pctrRegions.getLeftValue();//1
			int parentRight=pctrRegions.getRightValue();//4
			int parentTier=pctrRegions.getTier();//1
			//子树增量
			int childAdd=parentRight-moveLeft;//0
			//子树层级增量
			int childTierAdd=parentTier+1-moveTier;//0
			//更新后面的树节点左右值
			map.put("left", parentLeft);
			map.put("right", parentRight);
			map.put("add", add);
			map.put("type", 2);//相当于+
			if(childTierAdd<0){
				ctrRegionsDao.updateCtrRegionsLeft(map);
			}else{
				ctrRegionsDao.updateCtrRegionsLeftNotSelf(map);
			}
			ctrRegionsDao.updateCtrRegionsRight(map);
			//更新子树的左右值，层级
			map.put("childAdd", childAdd);
			map.put("childTierAdd", childTierAdd);
			ctrRegionsDao.updateChildLRT(map);
			//移动的日志记录
			CtrRegions regions = ctrRegionsDao.findById(Long.parseLong(nodeID));
			IDictLogger op = DictLogsFactory.CreateEditLogger(moveNode);
			op.AddChangedObject(regions);
			DictLogs log = op.ToDictLog(user);
			this.dictLogsService.createDictLogs(log);
		}
		return "true";
	}
}
