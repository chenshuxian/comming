package com.daan.domain.inst;

import java.util.Date;

/**
 * Created by reach-pc on 2016/1/25.
 */
public class CtrInstrBoxs {
    private String id;
    private String app_id;
    private String org_id;
    private String code_no;
    private String box_barcode;
    private String box_ip;
    private Integer display_order;
    private String memo;
    private String status;
    private Date time_version;

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getOrg_id() {
        return org_id;
    }

    public void setOrg_id(String org_id) {
        this.org_id = org_id;
    }

    public String getCode_no() {
        return code_no;
    }

    public void setCode_no(String code_no) {
        this.code_no = code_no;
    }

    public String getBox_barcode() {
        return box_barcode;
    }

    public void setBox_barcode(String box_barcode) {
        this.box_barcode = box_barcode;
    }

    public String getBox_ip() {
        return box_ip;
    }

    public void setBox_ip(String box_ip) {
        this.box_ip = box_ip;
    }

    public Integer getDisplay_order() {
        return display_order;
    }

    public void setDisplay_order(Integer display_order) {
        this.display_order = display_order;
    }

    public String getMemo() {
        return memo;
    }

    public void setMemo(String memo) {
        this.memo = memo;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public Date getTime_version() {
        return time_version;
    }

    public void setTime_version(Date time_version) {
        this.time_version = time_version;
    }


    public String getApp_id() {
        return app_id;
    }

    public void setApp_id(String app_id) {
        this.app_id = app_id;
    }
}
