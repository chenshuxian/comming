package com.daan.util;

import java.io.IOException;
import java.io.PrintWriter;
import java.util.ArrayList;
import java.util.List;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import com.daan.domain.Constant;
import com.daan.domain.User;
import com.daan.dto.IsAbleEnumsDto;
import com.daan.enums.IsAbleEnum;

/**
 * 提供printGridData 方法向客户端打印数据。
 * 
 */
public abstract class CommonComponentController {

	protected Logger logger = LoggerFactory.getLogger(getClass());

	/**
	 * 打印xml数据
	 * 
	 * @param xml
	 * @param response
	 */
	public void printXmlData(String xml, HttpServletResponse response) {

		ServletUtils.setXmlAjaxResponseHeader(response);

		PrintWriter pw;
		try {
			pw = response.getWriter();
			pw.print(xml);
			pw.close();
		} catch (IOException e) {
			e.printStackTrace();
			logger.error(e.getMessage() , e);
		}
	}

	/**
	 * 打印text数据
	 * 
	 * @param xml
	 * @param response
	 */
	public void printTextData(String text, HttpServletResponse response) {

		ServletUtils.setTextAjaxResponseHeader(response);

		PrintWriter pw;
		try {
			pw = response.getWriter();
			pw.print(text);
			pw.close();
		} catch (IOException e) {
			e.printStackTrace();
			logger.error(e.getMessage() , e);
		}
	}

	/**
	 * 打印json数据
	 * 
	 * @param xml
	 * @param response
	 */
	public void printJsonData(String json, HttpServletResponse response) {

		ServletUtils.setJsonAjaxResponseHeader(response);

		PrintWriter pw;
		try {
			pw = response.getWriter();
			pw.print(json);
			pw.close();
		} catch (IOException e) {
			e.printStackTrace();
			logger.error(e.getMessage() , e);
		}
	}

	/**
	 * 获取后台管理用户的session
	 * 
	 * @param xml
	 * @param response
	 */
	public User getAdminLoginUser(HttpServletRequest request) {
		User user=(User)request.getSession().getAttribute(Constant.SESSION_KEY);
		return user;
	}
	/**
	 * @Title: isAbleEnumsDtoList 
	 * @Description: TODO(封装成一个是否可用的list) 
	 * @return List<IsAbleEnumsDto>
	 * @throws
	 */
	public List<IsAbleEnumsDto> isAbleEnumsDtoList(){
		List<IsAbleEnumsDto> dtos = new ArrayList<IsAbleEnumsDto>();
		for (IsAbleEnum isAbleEnum : IsAbleEnum.values()) {
			IsAbleEnumsDto dto = new IsAbleEnumsDto();
			dto.setIndex(isAbleEnum.ordinal());
			dto.setName(isAbleEnum.getName());
			dto.setText(isAbleEnum.getText());
			dtos.add(dto);
		}
		return dtos;
	}
}
