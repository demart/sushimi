package kz.sushimi.restapi.v1.models.cart;

import java.util.ArrayList;
import java.util.List;

public class CartProductItemFileModel {

	public String description;
	public String extension;
	public int height;
	public int id;
	public String link;
	public String name;
	public int sort;
	public List<CartProductItemFileModel> thumbnails = new ArrayList<CartProductItemFileModel>();
	public int width;
	
}
