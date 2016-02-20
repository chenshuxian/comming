package com.daan.enums;

public final class EnumList {
	private IsAbleEnum[] isAble = IsAbleEnum.values(); // 状态
	private FrontClassType[] frontClass = FrontClassType.values(); // 前台通信类
	private InstrumentsSortEnum[] instrumentsSort = InstrumentsSortEnum.values(); // 中心仪器信息排序

	public IsAbleEnum[] getIsAble() {
		return isAble;
	}

	public void setIsAble(IsAbleEnum[] isAble) {
		this.isAble = isAble;
	}

	public FrontClassType[] getFrontClass() {
		return frontClass;
	}

	public void setFrontClass(FrontClassType[] frontClass) {
		this.frontClass = frontClass;
	}

	public InstrumentsSortEnum[] getInstrumentsSort() {
		return instrumentsSort;
	}

	public void setInstrumentsSort(InstrumentsSortEnum[] instrumentsSort) {
		this.instrumentsSort = instrumentsSort;
	}

}