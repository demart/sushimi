package kz.sushimi.models.announcement;

import java.util.ArrayList;
import java.util.Calendar;
import java.util.List;

import kz.sushimi.persistence.Announcement;

public class GetAnnouncementsAjaxResponse {

	public boolean Active;
	public List<Blog> Blogs;
	public int	Page;
	public int PageCount;
	public int PageSize;
	public String Type;
	public String Year;
	
	
	public GetAnnouncementsAjaxResponse(List<Announcement> announcements) {
    	this.Active = true;
    	this.Page = 1;
    	this.PageCount = announcements.size();
    	this.PageSize = announcements.size();
    	this.Type = "2";
    	this.Year = null;
    	this.Blogs = new ArrayList();
    	
    	for (Announcement announcement : announcements) {
    		Blog blog = new Blog();
    		
    		blog.Announce = announcement.getDescription();
    		blog.Banners = null;
    		blog.Created = "/Date(1398837674723)/";
    		blog.Date = "/Date(1398837674723)/";;
    		blog.Day = String.valueOf(announcement.getPublishDate().get(Calendar.DAY_OF_MONTH));
    		blog.DepartmentIds = new ArrayList();
    		blog.Departments = new ArrayList();
    		blog.DateString = "30.04.2014";
    		blog.Id = String.valueOf(announcement.getId());
    		
    		String prefix = (announcement.getType() == 1 ? "actions/" : "news/");
    		blog.Link = prefix + announcement.getPublishDate().get(Calendar.YEAR) + "/" 
    		   + (announcement.getPublishDate().get(Calendar.MONTH)+1) + "/" 
    		   + announcement.getPublishDate().get(Calendar.DATE) + "/"
    		   + announcement.getUniqueName() + "/";
    		
    		blog.NextPath = null;
    		blog.NextTitle = null;
    		blog.PrevPath = null;
    		blog.PrevTitle = null;
    		blog.Slug = String.valueOf(announcement.getId());
    		blog.SpecifyDate = announcement.getPublishDate().getTime().toString();
    		blog.Text = announcement.getContent();
    		blog.Title = announcement.getTitle();
    		blog.Type = "2";
    		blog.Visible = "true";
    		
    		
    		blog.Images = new ArrayList();
    		
    		Image img = new Image();
    		img.Extension = ".jpg";
    		img.Height = "833";
    		img.Id = "9382";
    		img.Kind = "1";
    		img.Link = "/public/images/announcements/" + announcement.getImageLink();
    		img.Name = "" + announcement.getId();
    		img.Path = "/public/images/announcements/" + announcement.getImageLink();
    		img.Sort = "0";
    		img.SubFolder = "";
    		img.Thumbnails = new ArrayList();
    		
    		Image thumb = new Image();
    		thumb.Extension = ".jpg";
    		thumb.Height = "230";
    		thumb.Id = "9383";
    		thumb.Kind = "1";
    		thumb.Link = "/public/images/announcements/" + announcement.getImageLink120x120();
    		thumb.Name = "" + announcement.getId();
    		thumb.Path = "/public/images/announcements/" + announcement.getImageLink120x120();
    		thumb.Sort = "0";
    		thumb.SubFolder = "";
    		thumb.Width = "230";
    		
    		img.Thumbnails.add(thumb);
    		
    		blog.Images.add(img);
    		
    		this.Blogs.add(blog);
		}
	}
	
}
