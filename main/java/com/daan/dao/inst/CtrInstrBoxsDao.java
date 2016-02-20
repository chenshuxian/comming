package com.daan.dao.inst;


import com.daan.domain.inst.CtrInstrBoxs;

import java.util.HashMap;
import java.util.List;

/**
 * Created by reach-pc on 2016/1/25.
 */
public interface CtrInstrBoxsDao {
    public List<CtrInstrBoxs> doPageList(HashMap map);

    public Integer doPageCount(HashMap map);

    public Integer selectTest();

    public CtrInstrBoxs isExistedBarCode(String barcode);

    public CtrInstrBoxs isExistedBoxIp(String boxIp);

    public int addCtrInstrBoxs(CtrInstrBoxs ctrInstrBoxs);

    public CtrInstrBoxs findById(String id);

    public int modifyCtrInstrBoxs(CtrInstrBoxs ctrInstrBoxs);

    public int deleteById(String id);
}
