package com.daan.service.inst;

import com.daan.dao.inst.CtrInstrBoxsDao;
import com.daan.domain.Constant;
import com.daan.domain.DictLogs;
import com.daan.domain.Message;
import com.daan.domain.User;
import com.daan.domain.inst.CtrInstrBoxs;
import com.daan.enums.IsAbleEnum;
import com.daan.logBean.DictLogsFactory;
import com.daan.logBean.IDictLogger;
import com.daan.service.AbstractService;
import com.daan.service.DictLogsService;
import com.daan.util.IDCreater;
import com.daan.util.JsonUtil;
import com.daan.util.StringUtil;
import com.daan.utils.Page;
import org.apache.commons.beanutils.BeanUtils;
import org.apache.commons.lang.StringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import javax.servlet.http.HttpServletRequest;
import java.util.Date;
import java.util.HashMap;
import java.util.List;

/**
 * Created by reach-pc on 2016/1/25.
 */
@Controller
@Transactional
@RequestMapping(value = Constant.CtrInstrBoxsConstant.RMS_HEAD)
public class CtrInstrBoxsService extends AbstractService {
    @Autowired
    private DictLogsService dictLogsService;
    @Autowired
    private CtrInstrBoxsDao ctrInstrBoxsDao;

    @RequestMapping(value = Constant.CommonURI.RMM_SEARCH, method = RequestMethod.POST, produces = "charset=utf-8")
    @ResponseBody
    public String doSearch(HttpServletRequest request) throws Exception {
        if (request.getParameter("page") == null) {
            throw new Exception("AuthUsersService.page: params Is Null!");
        }
        ctrInstrBoxsDao.selectTest();
        HashMap mapSearchParam = new HashMap();
        mapSearchParam.put("searchStr", request.getParameter("searchStr"));
        mapSearchParam.put("sort", request.getParameter("sort"));
        mapSearchParam.put("status", request.getParameter("status"));
        mapSearchParam.put("orgId", request.getParameter("orgId"));
        Page<Object> pageParam = new Page<Object>();
        mapSearchParam.put("page", pageParam);
        pageParam.setRows(Integer.parseInt(request.getParameter("rows")));
        pageParam.setPage(Integer.parseInt(request.getParameter("page")));

        Integer rowCount = this.ctrInstrBoxsDao.doPageCount(mapSearchParam);// 总记录数
        pageParam.setTotalCount(rowCount);

        List<CtrInstrBoxs> dataList = ctrInstrBoxsDao.doPageList(mapSearchParam);
        HashMap result = new HashMap();
        result.put("rowCount", rowCount);
        result.put("data", JsonUtil.DtosTojson(dataList));
        return JsonUtil.DtoTojson(result);
    }

    @RequestMapping(value = Constant.CommonURI.RMM_ADD, method = RequestMethod.POST)
    @ResponseBody
    public String doAdd(@RequestParam(value = "dtoJson", required = true) String dtoJson,
                        @RequestParam(value = "userJson", required = true) String userJson,
                        @RequestParam(value = "opType", required = true) String opType) throws Exception {
        if (StringUtils.isEmpty(dtoJson) || StringUtils.isEmpty(userJson) || StringUtil.isEmpty(opType)) {
            throw new Exception("ctrInstrBoxsAdd: params Is Null!");
        }

        CtrInstrBoxs ctrInstrBoxs = (CtrInstrBoxs) JsonUtil.jsonToDto(dtoJson, CtrInstrBoxs.class, null);
        User user = (User) JsonUtil.jsonToDto(userJson, User.class, null);

        if ("add".equals(opType) || "edit".equals(opType)) {
            // 判断盒子条码是否存在
            CtrInstrBoxs box = ctrInstrBoxsDao.isExistedBarCode(ctrInstrBoxs.getBox_barcode());
            if (box != null) {
                if (!box.getId().equals(ctrInstrBoxs.getId()))
                    return Message.MSG_CONFIRM_4;
            }
            // 判断盒子IP是否已存在
            box = ctrInstrBoxsDao.isExistedBoxIp(ctrInstrBoxs.getBox_ip());
            if (box != null) {
                if (!box.getId().equals(ctrInstrBoxs.getId()))
                    return Message.MSG_CONFIRM_5;
            }
        }

        if ("add".equals(opType)) { // 添加
            ctrInstrBoxs.setId(String.valueOf(IDCreater.nextId()));
            ctrInstrBoxs.setStatus(String.valueOf(IsAbleEnum.disable.ordinal()));// 改为枚举类 ,新增默认为停用状态
            ctrInstrBoxsDao.addCtrInstrBoxs(ctrInstrBoxs);
            // 添加日志
            IDictLogger op = DictLogsFactory.CreateAddNewLogger();
            this.addDictLog(op, ctrInstrBoxs, user, Constant.OPERATION_ADD);
            return Message.MSG_SAVE_SUCC;
        } else if ("edit".equals(opType)) { // 编辑
            CtrInstrBoxs oldCtrInstrBoxs = ctrInstrBoxsDao.findById(ctrInstrBoxs.getId());
            ctrInstrBoxsDao.modifyCtrInstrBoxs(ctrInstrBoxs);

            IDictLogger op = DictLogsFactory.CreateEditLogger(oldCtrInstrBoxs);
            this.addDictLog(op, ctrInstrBoxs, user, Constant.OPERATION_EDIT);
            return Message.MSG_SAVE_SUCC;
        } else if ("changeStatus".equals(opType)) { // 修改状态
            String resultMsg = "";
            Integer status = 0;
            if ("0".equals(ctrInstrBoxs.getStatus())) {
                status = IsAbleEnum.enable.ordinal();
                resultMsg = Message.MSG_ENABLE_SUCC;
            } else if ("1".equals(ctrInstrBoxs.getStatus())) {
                status = IsAbleEnum.disable.ordinal();
                resultMsg = Message.MSG_DISABLED_SUCC;
            }
            CtrInstrBoxs oldEntity = ctrInstrBoxsDao.findById(ctrInstrBoxs.getId());
            CtrInstrBoxs newEntity = new CtrInstrBoxs();
            BeanUtils.copyProperties(newEntity, oldEntity);
            newEntity.setStatus(status.toString());
            ctrInstrBoxsDao.modifyCtrInstrBoxs(newEntity);

            IDictLogger op = DictLogsFactory.CreateEditLogger(oldEntity);
            this.addDictLog(op, newEntity, user, Constant.OPERATION_EDIT);
            return resultMsg;
        }

        return Message.MSG_ERR_FAIL;
    }

    @RequestMapping(value = Constant.CommonURI.RMM_DELETE, method = RequestMethod.POST)
    @ResponseBody
    public String deleteBoxs(@RequestParam(value = "ids", required = true) String ids, @RequestParam(value = "userJson", required = true) String userJson) throws Exception {
        if (StringUtils.isEmpty(ids) || StringUtils.isEmpty(userJson)) {
            throw new Exception("ctrInstrBoxsDelete: params Is Null!");
        }
        User user = (User) JsonUtil.jsonToDto(userJson, User.class, null);
        if (StringUtils.isNotEmpty(ids)) {
            String[] idArray = ids.split(",");
            for (String id : idArray) {
                if (StringUtils.isNotEmpty(id)) {
                    CtrInstrBoxs entity = ctrInstrBoxsDao.findById(id);
                    ctrInstrBoxsDao.deleteById(id);
                    // 添加日志（删除）
                    IDictLogger op = DictLogsFactory.CreateDeleteLogger();
                    this.addDictLog(op, entity, user, Constant.OPERATION_DETELE);
                }
            }
        }
        return Message.MSG_DEL_SUCC;
    }

    private void addDictLog(IDictLogger op, Object changedObj, User user, String operation) throws Exception {
        op.AddChangedObject(changedObj);
        DictLogs log = op.ToDictLog(user);
        log.setModuleId(Constant.CtrInstrBoxsConstant.MODULEID_ID);
        log.setModuleName(Constant.CtrInstrBoxsConstant.MODULEID_NAME);
        log.setFunctionDesc(operation + "-" + log.getModuleName());
        this.dictLogsService.createDictLogs(log);
    }
}
