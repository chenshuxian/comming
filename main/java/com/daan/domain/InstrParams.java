package com.daan.domain;

import java.io.Serializable;
import java.util.Date;

import com.daan.logBean.LogModule;
import com.daan.util.StringUtil;

/**
 * @ClassName: InstrParams
 * @Description: [仪器通讯参数表]
 * @author xiaobing
 * @date 2015年12月10日 下午11:06:01
 */
@LogModule(moduleName = Constant.MODULE_INSTRPARAMS, entityName = Constant.ENTITY_INSTRPARAMS, moduleId = Constant.CODE_INSTRUMENTS)
public class InstrParams implements Serializable{
	
	private static final long serialVersionUID = 152189572773714584L;
	private Long id; // [仪器id] — 使用 【中心字典id规则】
	private Long 	instrumentId;     // [仪器id] — 关键字id，与instruments.id 是一对一的关系。       
	private Long 	orgId;    	      // [实验室、机构id] — 一个字典对应一个实验室，对应 labs.id.  
	private Long	appId;			  // [系统id] — 功能点、菜单对应那个系统，对应applications.id 
	private String  boxBarcode; 	  // [盒子条码号] — 对应盒子instr_boxs.box_barcode 字段。
	private String	frontClassName;   // [前端通讯类] — 前端通讯类名                                                                          
	private String	className;    	  // [通讯类名] — 通讯使用的类名称                                                                       
	private Integer comPort;          // [端口号] — 仪器对应盒子的端口号: 1— com1, 2—com2… 入此类摧总共有15个端口号。     
	private Integer	protocol;         // [协议] — 串口通讯协议 ,1 — XonXof, 2 — RTS or CTS, 3 — ASTS                                       
	private Integer dataBit;          // [数据位] — 串口的数据位 内容：1,2,3,4,5,6,7                                                         
	private Integer baudRate;         // [波特率] — 串口的波特率, 内容如下：1200,2400,4800,9600,1920,38400,115200                          
	private Integer stopBit;          // [停止位] — 串口停止位，内容: 1,2,3                                                                   
	private String  parityBit;        // [奇偶校验位] — 串口的奇偶校验位，内容：0— 无校验, 1—奇校验, 2—偶校验。         
	private Integer isRespond;        // [需要回应] — 回应标志，0— 不需要回应，1— 需要回应。                                     
	private String	endCode;          // [结束码] —                                                                                                   
	private String	respondCode;      // [回应码] — 回应码                                                                                         
	private String	respondingCode;   // [回应遇到码] —                                                                                             
	private Integer isDtr;            // [DTR] — DTR标志， 0—否， 1— 是                                                                        
	private String  intervals;        // [解析间隔时间] — 仪器解析间隔时间                                                                 
	private Integer isRts;            // [RTS] — rts标志， 0— 否， 1— 是                                                                       
	private String	serverIp;         // [主机ip] — 主机ip或服务器地址                                                                         
	private String 	port;    		  // [端口] —  服务器端口                                                                                     
	private Long 	virutalInstrId;   // [虚拟仪器id] — 当前仪器对应的虚拟仪器。         
	private Long 	virutalInstrName; // [虚拟仪器名称]                
	private String  virutalType;      // [虚拟仪器方式] — 虚拟仪器分正反向虚拟, 0— 正向虚拟，1— 反向虚拟                    
	private Date  	timeVersion;      // [时间版本] — 当新增、修改都需要把当前服务器时间写入次字段，用于同步数据用。  
	private Integer transferMode; // [通信模式] — 通讯模式标志位： 0— 无通信, 1— 单向,2—
	// 双向（无校验位）,3— 双向（带校验位）, 4—其它，默认值为无通信。
	
	public Long getInstrumentId() {
		return instrumentId;
	}
	public void setInstrumentId(Long instrumentId) {
		this.instrumentId = instrumentId;
	}
	public Long getAppId() {
		return appId;
	}
	public void setAppId(Long appId) {
		this.appId = appId;
	}
	public String getFrontClassName() {
		return frontClassName;
	}
	public void setFrontClassName(String frontClassName) {
		this.frontClassName = frontClassName;
	}
	public String getClassName() {
		return className;
	}
	public void setClassName(String className) {
		this.className = className;
	}
	public Integer getComPort() {
		return comPort;
	}
	public void setComPort(Integer comPort) {
		this.comPort = comPort;
	}
	public Integer getProtocol() {
		return protocol;
	}
	public void setProtocol(Integer protocol) {
		this.protocol = protocol;
	}
	public Integer getDataBit() {
		return dataBit;
	}
	public void setDataBit(Integer dataBit) {
		this.dataBit = dataBit;
	}
	public Integer getBaudRate() {
		return baudRate;
	}
	public void setBaudRate(Integer baudRate) {
		this.baudRate = baudRate;
	}
	public Integer getStopBit() {
		return stopBit;
	}
	public void setStopBit(Integer stopBit) {
		this.stopBit = stopBit;
	}
	public String getParityBit() {
		return parityBit;
	}
	public void setParityBit(String parityBit) {
		if(StringUtil.isEmpty(parityBit)){
			this.parityBit = null;
		}else{
			this.parityBit = parityBit;
		}
	}
	public Integer getIsRespond() {
		return isRespond;
	}
	public void setIsRespond(Integer isRespond) {
		this.isRespond = isRespond;
	}
	public String getEndCode() {
		return endCode;
	}
	public void setEndCode(String endCode) {
		this.endCode = endCode;
	}
	public String getRespondCode() {
		return respondCode;
	}
	public void setRespondCode(String respondCode) {
		this.respondCode = respondCode;
	}
	public String getRespondingCode() {
		return respondingCode;
	}
	public void setRespondingCode(String respondingCode) {
		this.respondingCode = respondingCode;
	}
	public Integer getIsDtr() {
		return isDtr;
	}
	public void setIsDtr(Integer isDtr) {
		this.isDtr = isDtr;
	}
	public String getIntervals() {
		return intervals;
	}
	public void setIntervals(String intervals) {
		if(StringUtil.isEmpty(intervals)){
			this.intervals = null;
		}else{
			this.intervals = intervals;
		}
	}
	public Integer getIsRts() {
		return isRts;
	}
	public void setIsRts(Integer isRts) {
		this.isRts = isRts;
	}
	public String getServerIp() {
		return serverIp;
	}
	public void setServerIp(String serverIp) {
		this.serverIp = serverIp;
	}
	public String getPort() {
		return port;
	}
	public void setPort(String port) {
		this.port = port;
	}
	public Long getVirutalInstrId() {
		return virutalInstrId;
	}
	public void setVirutalInstrId(Long virutalInstrId) {
		this.virutalInstrId = virutalInstrId;
	}
	public Long getVirutalInstrName() {
		return virutalInstrName;
	}
	public void setVirutalInstrName(Long virutalInstrName) {
		this.virutalInstrName = virutalInstrName;
	}
	public String getVirutalType() {
		return virutalType;
	}
	public void setVirutalType(String virutalType) {
		if(StringUtil.isEmpty(virutalType)){
			this.virutalType = null;
		}else{
			this.virutalType = virutalType;
		}
	}
	public Date getTimeVersion() {
		return timeVersion;
	}
	public void setTimeVersion(Date timeVersion) {
		this.timeVersion = timeVersion;
	}
	public Long getOrgId() {
		return orgId;
	}
	public void setOrgId(Long orgId) {
		this.orgId = orgId;
	}
	public String getBoxBarcode() {
		return boxBarcode;
	}
	public void setBoxBarcode(String boxBarcode) {
		this.boxBarcode = boxBarcode;
	}
	public Long getId() {
		return id;
	}
	public void setId(Long id) {
		this.id = id;
	}
	public Integer getTransferMode() {
		return transferMode;
	}
	public void setTransferMode(Integer transferMode) {
		this.transferMode = transferMode;
	}
	
}
