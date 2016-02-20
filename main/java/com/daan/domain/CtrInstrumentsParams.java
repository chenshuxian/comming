package com.daan.domain;

import java.util.Date;

import com.daan.enums.CheckBoxType;
import com.daan.enums.ComPortType;
import com.daan.enums.CtrInstrumentsType;
import com.daan.enums.ParityBitType;
import com.daan.enums.ProtocolType;
import com.daan.enums.TransferModeType;
import com.daan.logBean.Log;
import com.daan.logBean.LogModule;

/**
 * @ClassName: CtrInstrumentsParams
 * @Description: [中心仪器通讯参数表]
 * @author zhoujie
 * @date 2015年11月26日 下午20:06:01
 */
@LogModule(moduleName = Constant.MODULE_CTRINSTR_PARAMS, entityName = Constant.ENTITY_CTRINSTR_PARAMS, moduleId = Constant.MODULEID_CTRINSTRUMENTS)
public class CtrInstrumentsParams {

	private Long instrumentId; // 仪器id
	private String frontClassName;// 前端通讯类
	private String className;// 通讯类名
	private Integer comPort;// 端口号
	private String comPortName;// 端口号Name
	private Integer transferMode;// 通信模式
	private String transferModeName;// 通信模式Name
	private Integer protocol;// 协议
	private String protocolName;// 协议Name
	private Integer baudRate;// 波特率
	private Integer dataBit;// 数据位
	private Integer stopBit;// 停止位
	private Integer parityBit;// 奇偶校验位
	private String parityBitName;// 奇偶校验位Name
	private String endCode;// 结束码
	private String respondCode;// 回应码
	private String respondingCode;// 回应遇到码
	private Integer isRespond;// 需要回应
	private String isRespondName;// 需要回应Name
	private Integer isDtr;// DTR
	private String isDtrName;// DTR Name
	private Integer isRts;// RTS
	private String isRtsName;// RTS Name
	private Integer interval;// 解析间隔时间
	private String serverIp;// 主机ip
	private String port;// 端口
	private Date timeVersion;// 时间版本

	private String instrumentName;//仪器名称
	private String codeNo;//编码
	
	public CtrInstrumentsParams() {
	}

	public Long getInstrumentId() {
		return instrumentId;
	}

	public void setInstrumentId(Long instrumentId) {
		this.instrumentId = instrumentId;
	}

	@Log(name = "前端通讯类")
	public String getFrontClassName() {
		return frontClassName;
	}

	public void setFrontClassName(String frontClassName) {
		this.frontClassName = frontClassName;
	}

	@Log(name = "通讯类名")
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
	
	@Log(name = "端口号")
	public String getComPortName() {
		return ComPortType.getTextByOrdinal(this.comPort);
	}

	public void setComPortName(String comPortName) {
		this.comPortName = comPortName;
	}

	public Integer getTransferMode() {
		return transferMode;
	}

	public void setTransferMode(Integer transferMode) {
		this.transferMode = transferMode;
	}

	@Log(name = "通信模式")
	public String getTransferModeName() {
		return TransferModeType.getTextByOrdinal(this.transferMode);
	}

	public void setTransferModeName(String transferModeName) {
		this.transferModeName = transferModeName;
	}

	public Integer getProtocol() {
		return protocol;
	}

	public void setProtocol(Integer protocol) {
		this.protocol = protocol;
	}

	@Log(name = "协议")
	public String getProtocolName() {
		return ProtocolType.getTextByOrdinal(this.protocol);
	}

	public void setProtocolName(String protocolName) {
		this.protocolName = protocolName;
	}

	@Log(name = "波特率")
	public Integer getBaudRate() {
		return baudRate;
	}

	public void setBaudRate(Integer baudRate) {
		this.baudRate = baudRate;
	}

	@Log(name = "数据位")
	public Integer getDataBit() {
		return dataBit;
	}

	public void setDataBit(Integer dataBit) {
		this.dataBit = dataBit;
	}

	@Log(name = "停止位")
	public Integer getStopBit() {
		return stopBit;
	}

	public void setStopBit(Integer stopBit) {
		this.stopBit = stopBit;
	}

	public Integer getParityBit() {
		return parityBit;
	}

	public void setParityBit(Integer parityBit) {
		this.parityBit = parityBit;
	}

	@Log(name = "奇偶校验位")
	public String getParityBitName() {
		return ParityBitType.getTextByOrdinal(this.parityBit);
	}

	public void setParityBitName(String parityBitName) {
		this.parityBitName = parityBitName;
	}

	@Log(name = "结束码")
	public String getEndCode() {
		return endCode;
	}

	public void setEndCode(String endCode) {
		this.endCode = endCode;
	}

	public Integer getIsRespond() {
		return isRespond;
	}

	public void setIsRespond(Integer isRespond) {
		this.isRespond = isRespond;
	}

	@Log(name = "需要回应")
	public String getIsRespondName() {
		return CheckBoxType.getTextByOrdinal(this.isRespond);
	}

	public void setIsRespondName(String isRespondName) {
		this.isRespondName = isRespondName;
	}

	@Log(name = "回应码")
	public String getRespondCode() {
		return respondCode;
	}

	public void setRespondCode(String respondCode) {
		this.respondCode = respondCode;
	}

	@Log(name = "回应遇到码")
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

	@Log(name = "DTR")
	public String getIsDtrName() {
		return CheckBoxType.getTextByOrdinal(this.isDtr);
	}

	public void setIsDtrName(String isDtrName) {
		this.isDtrName = isDtrName;
	}

	public Integer getIsRts() {
		return isRts;
	}

	public void setIsRts(Integer isRts) {
		this.isRts = isRts;
	}

	@Log(name = "RTS")
	public String getIsRtsName() {
		return CheckBoxType.getTextByOrdinal(this.isRts);
	}

	public void setIsRtsName(String isRtsName) {
		this.isRtsName = isRtsName;
	}

	public Integer getInterval() {
		return interval;
	}

	public void setInterval(Integer interval) {
		this.interval = interval;
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

	public Date getTimeVersion() {
		return timeVersion;
	}

	public void setTimeVersion(Date timeVersion) {
		this.timeVersion = timeVersion;
	}
	
	@Log(name = "仪器名称", order = 2, isSummary = true)
	public String getInstrumentName() {
		return instrumentName;
	}

	public void setInstrumentName(String instrumentName) {
		this.instrumentName = instrumentName;
	}
	
	@Log(name = "仪器代码", order = 1, isSummary = true)
	public String getCodeNo() {
		return codeNo;
	}

	public void setCodeNo(String codeNo) {
		this.codeNo = codeNo;
	}
}
