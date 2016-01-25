package kz.sushimi.models.order;

import java.util.ArrayList;
import java.util.List;

public class CartProductItemFileModel {

	public String Blob;
	public String Description;
	public String Extension;
	public int Height;
	public int Id;
	public int King;
	public String Link;
	public String Name;
	public String Path;
	public int Sort;
	public String SubFolder;
	public List<CartProductItemFileModel> Thumbnails = new ArrayList<CartProductItemFileModel>();
	public int Version;
	public boolean Visible;
	public int Width;
	
}
