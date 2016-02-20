package com.daan.exception;

/**
 * 删除有关联数据抛出的自定义异常
 * Author subanmiao
 * Created at 2016/1/30
 */
public class FkException extends Exception {
    private static final long serialVersionUID = 1684692390174507202L;

    public FkException() {
    }

    public FkException(String message) {
        super(message);
    }

    public String getErrorCode(){
        return "-1";
    }
}
