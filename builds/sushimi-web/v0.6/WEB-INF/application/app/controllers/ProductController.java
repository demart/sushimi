package controllers;

import java.util.ArrayList;
import java.util.List;
import java.util.Random;

import kz.sushimi.models.CityModel;
import kz.sushimi.models.OrderModel;
import kz.sushimi.models.PageModel;
import kz.sushimi.models.RegisterOrderModel;
import kz.sushimi.models.order.AddProductsModel;
import kz.sushimi.models.order.CartModel;
import kz.sushimi.models.order.CartProductItemFileModel;
import kz.sushimi.models.order.CartProductItemModel;
import kz.sushimi.models.order.CartProductModel;
import kz.sushimi.models.order.ChangeCartModel;
import kz.sushimi.models.order.ChangeCartResponseModel;
import kz.sushimi.models.order.ProductItemModel;
import kz.sushimi.models.order.PropertyModel;
import kz.sushimi.models.order.RemoveProductItemModel;
import kz.sushimi.models.order.ReplaceProductItemsModel;
import kz.sushimi.persistence.Cart;
import kz.sushimi.persistence.Page;
import kz.sushimi.persistence.dictionaries.Category;
import kz.sushimi.persistence.dictionaries.CategoryType;
import kz.sushimi.persistence.dictionaries.City;
import kz.sushimi.persistence.dictionaries.Product;
import kz.sushimi.persistence.orders.Order;
import kz.sushimi.service.CartService;
import kz.sushimi.service.DictionaryService;
import kz.sushimi.service.PageService;
import kz.sushimi.service.ProductService;
import play.Logger;
import play.mvc.Controller;
import play.mvc.Scope.Session;

import com.google.gson.Gson;

public class ProductController extends Controller {

	public static void index(String category, String subcategory) {
		List<Category> categories = ProductService.getCategories(category, subcategory);
		PageModel page = null;
		for (Category categoryObj : categories) {
			if (categoryObj.isSelected()) {
				List<Page> pages = PageService.getPagesByCategory(categoryObj);
				if (pages != null && pages.size() > 0)
					page = PageModel.buildFromPage(pages.get(0));
				break;
			}
		}
		
		page = page == null ? PageService.getPage("MENU") : page;
    	renderTemplate("/Products/index.html", categories, page);
	}
    
    public static void detail(String category, String subcategory, Long productId) {
    	// PAGE
    	PageModel page = PageService.getPage("PRODUCT_DETAILS"); 
    	
    	// DATA
    	Product product = ProductService.getProduct(productId);
    	if (product == null) 
    		error();
    	
    	renderTemplate("/Products/detail.html", product, page);
    }
    
    public static CartModel buildOrderModel() {
    	CartModel model = new CartModel();
    	model.setCityId(1);
    	
    	Random r = new Random();
    	int count = r.nextInt(5);
    	int totalSum = 0;
    	
    	model.setCount(count);
    	model.setIsEmpty(count == 0 ? true : false);
    	model.setMinSum(3000);
    	model.setOrderId(0);
    	
    	for (int i = 0; i < count ; i++) {
			CartProductModel productModel = new CartProductModel();
			productModel.setCost(count*100);
			productModel.setCount(i);
			
			CartProductItemModel itemModel = new CartProductItemModel();
			itemModel.Category = null;
			itemModel.category_id = 1;
			itemModel.DiscountCount = i;
			itemModel.DiscountId = 1;
			itemModel.DiscountPrice = 300;
			itemModel.DiscountPriceString = "300";
			itemModel.DiscountTime = null;
			itemModel.Id = 1;
			itemModel.Name = " Sushi " + r.nextInt();
			itemModel.Path = "";
			itemModel.Price = 1200;
			itemModel.PriceRound = 1200;
			itemModel.PriceString = "1200";
			
			totalSum += itemModel.Price;
			
			PropertyModel prop = new PropertyModel();
			prop.Id = 1231;
			prop.Item = null;
			prop.Name = "scallop";
			prop.Title = null;
			prop.Type = 0;
			prop.Value = "1";
			prop.item_id = 3;//itemModel.Id;
			//itemModel.Properties.add(prop);
			
			itemModel.Rating = 0;
			itemModel.RatingRound = "0.000";
			itemModel.RecomItems = null;
			itemModel.Remark = "Рис Японский, морской гребешок. " + r.nextInt();
			itemModel.Sort = 0;
			itemModel.Timestamp = null;
			itemModel.Uid = 2000000477;
			itemModel.UnitName = "гр.";
			itemModel.Version = 22233;
			itemModel.Weight = "31 гр.   31 ккал";
			itemModel.category_id = 100023; 
			
			// files-images
			CartProductItemFileModel image = new CartProductItemFileModel();
			image.Blob = null;
			image.Description = null;
			image.Extension = ".jpg";
			image.Height = 346;
			image.Id = 343;
			image.King = 1;
			image.Link = "/public/images/menu/items/nigiri-losos.jpg";
			image.Name = "nigiri-losos.jpg";
			image.Path = "/public/images/menu/items/nigiri-losos.jpg";
			image.Sort = 0;
			image.SubFolder = "imagesmenu";
			
			
			CartProductItemFileModel thumb = new CartProductItemFileModel();
			
			thumb.Blob = null;
			thumb.Description = null;
			thumb.Extension = ".png";
			thumb.Height = 32;
			thumb.Id = 5680;
			thumb.King = 1;
			thumb.Link = "/public/images/menu/items/nigiri-grebeshok-32x32.png";
			thumb.Name = "nigiri-grebeshok-32x32.png";
			thumb.Path = "/public/images/menu/items/nigiri-grebeshok-32x32.png";
			thumb.Sort = 0;
			thumb.SubFolder = "imagesmenu";
			thumb.Version = 0;
			thumb.Visible = false;
			thumb.Width = 32;
			
			image.Thumbnails.add(thumb);
			
			image.Version = 0;
			image.Visible = false;
			image.Width = 435;
			
			itemModel.Files.add(image);
			
			productModel.setItem(itemModel);
			
			model.getItems().add(productModel);
		}
    	
    	
    	model.setSum(totalSum);
    	model.setVersion(count);
    	
    	return model;
    }
    
}