INSERT INTO products(
            id, cost, description, deleted, published, item_count, name, 
            category_id, image_link, small_image_link, icon_image_link, weight, calories, 
            type, is_hit, is_new, recomended,  
            is_hot, is_vegatable, popular, carbohydrates, fats, proteins, popular_age, popular_sex)
    VALUES (46,
	    95, 
	   'Пиво Гиннесс 0.5 л.', 
	    false, true, 8, 
	    'Пиво Гиннесс 0.5 л.',
            15, 
            'drinks-sprite/drings-coca-cola-light.jps', -- big
            'drinks-sprite/drings-coca-cola-light-210x167.jpg', -- small
            'drinks-sprite/drings-coca-cola-light-32x32.png', -- icon
	    1  , -- weight
            1   , -- calories
            0, 
            false, -- hit
            false, -- new
            false, -- recommended
            false, -- hot
            false, -- vegetable
            false, -- popular
	    0, 0, 0, 
            0, -- age
            0); -- sex
