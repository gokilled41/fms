package com.gson.bean;

import java.io.Serializable;

public class Image implements Serializable {

    private static final long serialVersionUID = 1L;

    private String MediaId;

    public String getMediaId() {
        return MediaId;
    }

    public void setMediaId(String mediaId) {
        MediaId = mediaId;
    }
}
