package com.daan.controller.inst;

import com.daan.domain.Constant;
import com.daan.domain.DataGrid;
import com.daan.domain.Message;
import com.daan.domain.inst.CtrInstrBoxs;
import com.daan.util.CommonComponentController;
import com.daan.util.HttpUtil;
import com.daan.util.JsonUtil;
import com.daan.utils.Page;
import org.apache.commons.lang.StringUtils;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.servlet.ModelAndView;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

/**
 * Created by reach-pc on 2016/1/25.
 */
@Controller
@RequestMapping(value = Constant.CtrInstrBoxsConstant.RMC_HEAD)
public class CtrInstrBoxsController extends CommonComponentController {

    @RequestMapping(value = Constant.CommonURI.RMM_INIT, method = RequestMethod.GET)
    public ModelAndView doInit(HttpServletRequest request) {
        // user == null, redirect login page
        if (this.getAdminLoginUser(request) == null) {
            return new ModelAndView(Constant.JSP_LOGIN);
        }

        Object obj = request.getParameter("type");
        if (obj != null) {
            if ("selectorg".equals(obj.toString())) {
                ModelAndView mv = new ModelAndView(Constant.CtrInstrBoxsConstant.JSP_HEAD + Constant.CtrInstrBoxsConstant.JSP_SELECT_ORG_MAIN);
                return mv;
            }
        }
        Page<CtrInstrBoxs> page = new Page<CtrInstrBoxs>(Constant.PAGE_NUMBER);
        ModelAndView mv = new ModelAndView(Constant.CtrInstrBoxsConstant.JSP_HEAD + Constant.CtrInstrBoxsConstant.JSP_MAIN);
        mv.addObject("isAbleList", isAbleEnumsDtoList());
        mv.addObject("page", page);
        return mv;
    }

    @RequestMapping(value = Constant.CommonURI.RMM_SEARCH, method = RequestMethod.POST)
    public void doSearch(HttpServletRequest request, HttpServletResponse response) {
        if (request.getParameter("page") == null) {
            return;
        }
        try {
            //==========组装调用服务需要的参数==========
            Map<String, String> params = new HashMap<String, String>();
            params.put("page", request.getParameter("page"));
            params.put("searchStr", request.getParameter("searchStr"));
            params.put("sort", request.getParameter("sort"));
            params.put("status", request.getParameter("status"));
            params.put("rows", request.getParameter("rows"));
            params.put("orgId", request.getParameter("orgId"));

            String resultString = null;

            //===============调用服务层方法======================
            String url = Constant.SERVICE_URI + Constant.CtrInstrBoxsConstant.RMS_HEAD + Constant.CommonURI.RMM_SEARCH;
            resultString = HttpUtil.postResponseString(url, params, this.getAdminLoginUser(request));
            HashMap result = (HashMap) JsonUtil.jsonToDto(resultString, HashMap.class, null);
            List<CtrInstrBoxs> authUsersList = (List<CtrInstrBoxs>) JsonUtil.jsonToDtos(result.get("data").toString(), CtrInstrBoxs.class);
            DataGrid dataGrid = new DataGrid(Long.parseLong(result.get("rowCount").toString()), authUsersList);
            this.printJsonData(JsonUtil.DtoTojson(dataGrid), response);
        } catch (Exception e) {
            logger.error(e.getMessage(), e);
        }
    }

    @RequestMapping(value = Constant.CommonURI.RMM_VIEW, method = RequestMethod.GET)
    public ModelAndView showInfo(HttpServletRequest request) {
        Object obj = request.getParameter("opType");
        ModelAndView mv = new ModelAndView(Constant.CtrInstrBoxsConstant.JSP_HEAD + Constant.CtrInstrBoxsConstant.JSP_EDIT);
        try {
            if (obj != null) {
                mv.addObject("opType", obj.toString());
                if ("add".equals(obj.toString())) {
                    // 获取编码
                    HashMap<String, String> codeNoParams = new HashMap<String, String>();
                    codeNoParams.put("code", String.valueOf(Constant.CtrInstrBoxsConstant.MODULEID_ID));
                    String getCodeUrl = Constant.serviceURL(Constant.CtrInstrBoxsConstant.RMC_HEAD, Constant.RMM_GETCODENO);
                    String codeNo = HttpUtil.postResponseString(getCodeUrl, codeNoParams, this.getAdminLoginUser(request));
                    mv.addObject("codeNo", codeNo);
                    // 查找最大顺序号
                    String getOrderUrl = Constant.serviceURL(Constant.CtrInstrBoxsConstant.RMC_HEAD, Constant.RMM_MAXDISPLAYORDER);
                    Map<String, String> getCodeParams = new HashMap<String, String>();
                    getCodeParams.put("tableName", Constant.CtrInstrBoxsConstant.TABLENAME);
                    String displayOrder = HttpUtil.postResponseString(getOrderUrl, getCodeParams, this.getAdminLoginUser(request));
                    mv.addObject("displayOrder", displayOrder);
                }
            }
        } catch (Exception e) {
            logger.error(e.getMessage(), e);
        }
        return mv;
    }

    @RequestMapping(value = Constant.CommonURI.RMM_ADD, method = RequestMethod.POST)
    @ResponseBody
    public String doAdd(CtrInstrBoxs ctrInstrBoxs, HttpServletRequest request) {
        String message = Message.MSG_SERVICE_EXCEP;
        if (ctrInstrBoxs == null) {
            return message;
        }
        try {
            Map<String, String> params = new HashMap<String, String>();
            params.put("dtoJson", JsonUtil.DtoTojson(ctrInstrBoxs));
            params.put("userJson", JsonUtil.DtoTojson(getAdminLoginUser(request)));
            params.put("opType", request.getParameter("opType"));
            String url = Constant.serviceURL(Constant.CtrInstrBoxsConstant.RMC_HEAD, Constant.CommonURI.RMM_ADD);
            message = HttpUtil.postResponseString(url, params, this.getAdminLoginUser(request));
//            message = Message.MSG_SAVE_SUCC;
        } catch (Exception e) {
            logger.error(e.getMessage(), e);
        }
        return message;
    }

    @RequestMapping(value = Constant.CommonURI.RMM_DELETE, method = RequestMethod.POST)
    @ResponseBody
    public String doDelete(String ids, HttpServletRequest request) {
        String message = Message.MSG_SERVICE_EXCEP;
        if(StringUtils.isEmpty(ids)){
            return message;
        }
        try {
            Map<String, String> params = new HashMap<String, String>();
            params.put("ids", ids);
            params.put("userJson", JsonUtil.DtoTojson(getAdminLoginUser(request)));
            String url = Constant.serviceURL(Constant.CtrInstrBoxsConstant.RMC_HEAD, Constant.CommonURI.RMM_DELETE);
            message = HttpUtil.postResponseString(url, params, this.getAdminLoginUser(request));
        } catch (Exception e) {
            logger.error(e.getMessage() , e);
        }
        return message;
    }

}
