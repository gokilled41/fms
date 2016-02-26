package com.gson.bean;

public class ImageOutMessage extends OutMessage {

    private String MsgType = "image";

    private Image Image;

    public ImageOutMessage() {
    }

    public String getMsgType() {
        return MsgType;
    }

    public void setMsgType(String msgType) {
        MsgType = msgType;
    }

    public Image getImage() {
        return Image;
    }

    public void setImage(Image image) {
        Image = image;
    }

}
