package com.acti.jdo;

import java.io.Serializable;
import java.util.ArrayList;

import javax.jdo.annotations.IdGeneratorStrategy;
import javax.jdo.annotations.PersistenceCapable;
import javax.jdo.annotations.Persistent;
import javax.jdo.annotations.PrimaryKey;

import com.google.appengine.api.datastore.Text;


@PersistenceCapable
public class videodetails implements Serializable {
	
	@PrimaryKey
    @Persistent(valueStrategy = IdGeneratorStrategy.IDENTITY)
    private String key;
	
	@Persistent
	private String VideoId;
	@Persistent
	private String vidtitle;
	@Persistent
	private Text viddesc;
	@Persistent
	private String Videourl;
	@Persistent
	private String videothumbnail;
	@Persistent
	private String companyId;
	
	public String getCompanyId() {
		return companyId;
	}
	public void setCompanyId(String companyId) {
		this.companyId = companyId;
	}
	public String getKey() {
		return key;
	}
	public void setKey(String key) {
		this.key = key;
	}
	public String getVideoId() {
		return VideoId;
	}
	public void setVideoId(String videoId) {
		VideoId = videoId;
	}
	public String getVidtitle() {
		return vidtitle;
	}
	public void setVidtitle(String vidtitle) {
		this.vidtitle = vidtitle;
	}
	public Text getViddesc() {
		return viddesc;
	}
	public void setViddesc(Text viddesc) {
		this.viddesc = viddesc;
	}
	public String getVideourl() {
		return Videourl;
	}
	public void setVideourl(String videourl) {
		Videourl = videourl;
	}
	public String getVideothumbnail() {
		return videothumbnail;
	}
	public void setVideothumbnail(String videothumbnail) {
		this.videothumbnail = videothumbnail;
	}

	
	

	
	
	
	
	
	
	


}
