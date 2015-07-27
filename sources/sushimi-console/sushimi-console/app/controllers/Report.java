package controllers;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Calendar;
import java.util.List;

import kz.sushimi.console.models.reports.IngredientPeriodModel;
import kz.sushimi.console.models.reports.OrderPeriodModel;
import kz.sushimi.console.models.reports.ProductPeriodModel;
import kz.sushimi.console.services.ReportService;

public class Report extends SecuredController {
	
    public static void index() {
        render();
    }

    public static void readOrderPeriodStat(String from, String to) throws ParseException {
    	SimpleDateFormat parserSDF=new SimpleDateFormat("MM/dd/yyyy");

		Calendar fromCal = Calendar.getInstance();
		fromCal.setTime(parserSDF.parse(from));
		fromCal.set(Calendar.HOUR, 9);
		
		Calendar toCal = Calendar.getInstance();
		toCal.setTime(parserSDF.parse(to));	
		toCal.add(Calendar.DATE, 1);
		toCal.set(Calendar.HOUR, 9);
		
		System.out.println("");
		System.out.println(fromCal.getTime().toLocaleString());
		System.out.println("");
		System.out.println(toCal.getTime().toLocaleString());
		
		List<OrderPeriodModel> models = ReportService.getOrderPeriodReport(fromCal, toCal);
		
		renderJSON(models);
    }
    
    public static void readProductPeriodStat(String from, String to) throws ParseException {
    	SimpleDateFormat parserSDF=new SimpleDateFormat("MM/dd/yyyy");

		Calendar fromCal = Calendar.getInstance();
		fromCal.setTime(parserSDF.parse(from));
		fromCal.set(Calendar.HOUR, 9);
		
		Calendar toCal = Calendar.getInstance();
		toCal.setTime(parserSDF.parse(to));	
		toCal.add(Calendar.DATE, 1);
		toCal.set(Calendar.HOUR, 9);
		
		System.out.println("");
		System.out.println(fromCal.getTime().toLocaleString());
		System.out.println("");
		System.out.println(toCal.getTime().toLocaleString());
		
		List<ProductPeriodModel> models = ReportService.getProductPeriodReport(fromCal, toCal);
		
		renderJSON(models);
    }    
    
    
    public static void readIngredientPeriodStat(String from, String to) throws ParseException {
    	SimpleDateFormat parserSDF=new SimpleDateFormat("MM/dd/yyyy");

		Calendar fromCal = Calendar.getInstance();
		fromCal.setTime(parserSDF.parse(from));
		fromCal.set(Calendar.HOUR, 9);
		
		Calendar toCal = Calendar.getInstance();
		toCal.setTime(parserSDF.parse(to));	
		toCal.add(Calendar.DATE, 1);
		toCal.set(Calendar.HOUR, 9);
		
		System.out.println("");
		System.out.println(fromCal.getTime().toLocaleString());
		System.out.println("");
		System.out.println(toCal.getTime().toLocaleString());
		
		List<IngredientPeriodModel> models = ReportService.getIngredientPeriodReport(fromCal, toCal);
		
		renderJSON(models);
    }   
    
}