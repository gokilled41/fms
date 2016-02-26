package com.gson.bean;

/**
 * 创建时间：2015年6月26日 下午4:44:25
 * 
 * @author andy
 * @version 2.2
 */

public class TransferCustomerMessage extends OutMessage {

    private String MsgType = "transfer_customer_service";

    public String getMsgType() {
        return MsgType;
    }

    public void setMsgType(String msgType) {
        MsgType = msgType;
    }

}
