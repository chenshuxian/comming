package com.daan.util;

import java.util.List;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.jsp.JspTagException;
import javax.servlet.jsp.jstl.core.ConditionalTagSupport;

import com.daan.domain.auth.AuthUsers;
import org.apache.commons.lang.StringUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import com.daan.domain.Constant;
import com.daan.domain.User;

/**
 * 权限认证标签
 * 
 * @author wistronITS
 *
 */
public class AuthorizedTag extends ConditionalTagSupport {
	
	protected final Logger logger = LoggerFactory.getLogger(getClass());
	
	private String value;

    private List<String> rights;

    /**
     * condition
     *
     * @return boolean
     * @throws JspTagException : JspTagException
     */
    @Override
    protected boolean condition() throws JspTagException {
        boolean result = false;

//        if (StringUtils.isNotEmpty(value)) {
//            HttpServletRequest req = (HttpServletRequest) pageContext.getRequest();
//            AuthUsers user = (AuthUsers)  req.getSession().getAttribute(Constant.SESSION_KEY);
//            if(user != null ) {
//                if (user.getFuncCodeString().contains(value)) {
//                    result = true;
//                }
//            }
//         }
        result = true;
        return result;
    }

    public String getValue() {
        return value;
    }

    public void setValue(String value) {
        this.value = value;
    }

}
