package com.daan.domain;

import java.util.ArrayList;
import java.util.List;

/**
 * EasyUI DataGrid模型
 *
 * @author subanmiao
 */
public class DataGrid implements java.io.Serializable {

    private Long total = 0L;
    private List rows = new ArrayList();
    
    public DataGrid(List rows) {
        this.rows = rows;
    }
    
    public DataGrid(Long total, List rows) {
        this.total = total;
        this.rows = rows;
    }

    public Long getTotal() {
        return total;
    }

    public void setTotal(Long total) {
        this.total = total;
    }

    public List getRows() {
        return rows;
    }

    public void setRows(List rows) {
        this.rows = rows;
    }

}
