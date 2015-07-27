package controllers;

import java.util.List;

import kz.sushimi.console.exceptions.ValidationException;
import kz.sushimi.console.persistence.dictionaries.Category;
import kz.sushimi.console.persistence.dictionaries.Unit;
import kz.sushimi.console.persistence.warehouses.WarehouseIncome;
import kz.sushimi.console.persistence.warehouses.WarehouseOutcome;
import kz.sushimi.console.services.WarehouseService;
import kz.sushimi.console.services.dictionaries.CategoryService;
import kz.sushimi.console.services.dictionaries.UnitService;
import play.Logger;

public class TestController extends SecuredController {
    
    public static void testWI() {
    	long count = WarehouseService.getWarehouseIncomesCount();
    	Logger.info("WarehouseIncomes.Count: " + count);
    	List<WarehouseIncome> warehouseIncomes = WarehouseService.getWarehouseIncomes(0, 1000);
    	Logger.info("WarehouseIncomes.Size: " + warehouseIncomes.size());
    	render(warehouseIncomes);
    }
    
    public static void testWO() {
    	long count = WarehouseService.getWarehouseOutcomesCount();
    	Logger.info("WarehouseOutcomes.Count: " + count);
    	List<WarehouseOutcome> warehouseOutcomes = WarehouseService.getWarehouseOutcomes(0, 1000);
    	Logger.info("WarehouseOutcomes.Size: " + warehouseOutcomes.size());
    	render(warehouseOutcomes);
    }
    
    
    public static void testListUnit() throws ValidationException {
    	Long count = UnitService.getUnitsCount();
    	Logger.info("Unit.size(): " + count);
    	List<Unit> units = UnitService.getUnits(0, 1000);
    	renderJSON(units);
    }

    public static void testDeleteUnit(Long id) throws ValidationException {
    	Long unitId = UnitService.deleteUnit(id, Security.connected());
    	renderJSON(new String("Ok. Deleted UnitId: " + unitId));
    }        
    
    // =========== CATEGORY =================
    
    public static void testListCategory() throws ValidationException {
    	Long count = CategoryService.getCategoriesCount();
    	Logger.info("Category.size(): " + count);
    	List<Category> categories = CategoryService.getCategories(0, 1000);
    	renderJSON(categories);
    }

    public static void testDeleteCategory(Long id) throws ValidationException {
    	Long categoryId = CategoryService.deleteCategory(id, Security.connected());
    	renderJSON(new String("Ok. Deleted CategoryId: " + categoryId));
    }    
}
