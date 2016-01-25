INSERT INTO categories VALUES (30, false, true, 'Супы', 2, 0, 'supi', '30', 'ANTISUSHI', NULL, NULL, 0, false, NULL);
INSERT INTO categories VALUES (31, false, true, 'Пасты', 2, 0, 'pasti', '31', 'ANTISUSHI', NULL, NULL, 0, false, NULL);
INSERT INTO categories VALUES (32, false, true, 'Пицца 36см', 25, 0, 'pizza36', '32', 'ANTISUSHI', NULL, NULL, 0, false, NULL);
INSERT INTO categories VALUES (33, false, true, 'Пицца 28см', 25, 0, 'pizza28', '33', 'ANTISUSHI', NULL, NULL, 0, false, NULL);


UPDATE products SET is_new = 'FALSE' WHERE deleted = 'FALSE';
UPDATE products SET category_id = 33 WHERE category_id = 25;
UPDATE products SET deleted = 'TRUE' WHERE id = 139;
UPDATE products SET published = 'FALSE' WHERE id = 139;
UPDATE products SET description = 'Теплый ролл с копченным угрем, крабом, огуречной соломкой и японском соусе терияки' WHERE id = 144;

INSERT INTO products VALUES (220, 1400, 'Свежие огурцы, болгарский перец, салат айсберг, сыр Фета, помидоры, Греческий соус, маслины, красный лук шалот.', false, true, 1, 'Салат Греческий', 28, 'salad-grecheskii/salad-grecheskii.jpg', 'salad-grecheskii/salad-grecheskii-210x167.jpg', false, true, false, 0, 0, 0, false, false, false, 0, 0, 'salad-grecheskii/salad-grecheskii-32x32.png', 0, '195', NULL, NULL, 'NONE', NULL);
INSERT INTO products VALUES (221, 1650, 'Обжаренное куриное филе, помидоры Черри,айсберг, чесночные гренки, перепелиные яйца, фирменный соус Цезарь, сыр Пармезан.', false, true, 1, 'Салат Цезарь с куриной грудкой', 28, 'salad-cezar-s-kuricei/salad-cezar-s-kuricei.jpg', 'salad-cezar-s-kuricei/salad-cezar-s-kuricei-210x167.jpg', false, true, false, 0, 0, 0, false, false, false, 0, 0, 'salad-cezar-s-kuricei/salad-cezar-s-kuricei-32x32.png', 0, '196', NULL, NULL, 'NONE', NULL);
INSERT INTO products VALUES (222, 1350, 'Мильфей из ветчины,салями, свежих  и соленых огурчиков, подкопченной куриной грудки, шампиньонов и хрустящим картофелем пай.', false, true, 1, 'Салат Лионский', 28, 'salad-lionskii/salad-lionskii.jpg', 'salad-lionskii/salad-lionskii-210x167.jpg', false, true, false, 0, 0, 0, false, false, false, 0, 0, 'salad-lionskii/salad-lionskii-32x32.png', 0, '198', NULL, NULL, 'NONE', NULL);
INSERT INTO products VALUES (223, 1850, 'Листья хрустящего салата айсберг с фирменной заправкой Цезарь, крутонами, перепелиными яйцами, помидорками черри, сыром пармезан и обжаренными тигровыми креветками.', false, true, 1, 'Салат Цезарь с тигровыми креветками', 28, 'salad-cezar-s-krevetkoi/salad-cezar-s-krevetkoi.jpg', 'salad-cezar-s-krevetkoi/salad-cezar-s-krevetkoi-210x167.jpg', false, true, false, 0, 0, 0, false, false, false, 0, 0, 'salad-cezar-s-krevetkoi/salad-cezar-s-krevetkoi-32x32.png', 0, '197', NULL, NULL, 'NONE', NULL);

INSERT INTO products VALUES (209, 1600, 'Нежные хрустящие куриные крылья в японских сухарях канеширо.', false, true, 1, 'Куриные крылья в панировке', 23, 'chicken-wings-v-panirovke/chicken-wings-v-panirovke.jpg', 'chicken-wings-v-panirovke/chicken-wings-v-panirovke-210x167.jpg', false, true, false, 0, 0, 0, false, false, false, 0, 0, 'chicken-wings-v-panirovke/chicken-wings-v-panirovke-32x32.png', 0, '209', NULL, NULL, 'NONE', NULL);
INSERT INTO products VALUES (210, 1600, 'Сочное куриное филе в соусе барбекю с овощами вок и острым соусом чили.', false, true, 1, 'Куриная грудка BBQ', 23, 'chicken-bbq/chicken-bbq.jpg', 'chicken-bbq/chicken-bbq-210x167.jpg', false, true, false, 0, 0, 0, false, false, false, 0, 0, 'chicken-bbq/chicken-bbq-32x32.png', 0, '210', NULL, NULL, 'NONE', NULL);
INSERT INTO products VALUES (211, 1650, 'Хрустящее сочное куриное филе  в японской панировке канеширо с картофелем фри.', false, true, 1, 'Куриная грудка канеширо', 23, 'chicken-kaneshiro/chicken-kaneshiro.jpg', 'chicken-kaneshiro/chicken-kaneshiro-210x167.jpg', false, true, false, 0, 0, 0, false, false, false, 0, 0, 'chicken-kaneshiro/chicken-kaneshiro-32x32.png', 0, '211', NULL, NULL, 'NONE', NULL);
INSERT INTO products VALUES (212, 1650, 'Острые сочные куриные крылья в соусе луизиана.', false, true, 1, 'Куриные крылья Луизиана', 23, 'chicken-wings-louisiana/chicken-wings-louisiana.jpg', 'chicken-wings-louisiana/chicken-wings-louisiana-210x167.jpg', false, true, false, 0, 0, 0, false, false, false, 0, 0, 'chicken-wings-louisiana/chicken-wings-louisiana-32x32.png', 0, '212', NULL, NULL, 'NONE', NULL);
INSERT INTO products VALUES (213, 1650, 'Cочные ломтики норвежского лосося в нежных японских сухарях канеширо.', false, true, 1, 'Лосось в панировке', 23, 'losos-v-panirovke/losos-v-panirovke.jpg', 'losos-v-panirovke/losos-v-panirovke-210x167.jpg', false, true, false, 0, 0, 0, false, false, false, 0, 0, 'losos-v-panirovke/losos-v-panirovke-32x32.png', 0, '213', NULL, NULL, 'NONE', NULL);
INSERT INTO products VALUES (214, 900, 'Картофельные дольки с грибами по-домашнему.', false, true, 1, 'Картофельные дольки с грибами по-домашнему', 23, 'kartofelnie-dolki-s-gribami/kartofelnie-dolki-s-gribami.jpg', 'kartofelnie-dolki-s-gribami/kartofelnie-dolki-s-gribami-210x167.jpg', false, true, false, 0, 0, 0, false, false, false, 0, 0, 'kartofelnie-dolki-s-gribami/kartofelnie-dolki-s-gribami-32x32.png', 0, '233', NULL, NULL, 'NONE', NULL);


INSERT INTO products VALUES (199, 1200, 'Нежный крем суп из белых грибов подается с чесночными крутонами.', false, true, 1, 'Крем суп грибной', 30, 'sup-gribnoi/sup-gribnoi.jpg', 'sup-gribnoi/sup-gribnoi-210x167.jpg', false, true, false, 0, 0, 0, false, false, false, 0, 0, 'sup-gribnoi/sup-gribnoi-32x32.png', 0, '199', NULL, NULL, 'NONE', NULL);
INSERT INTO products VALUES (200, 1500, 'Нежный крем суп из кабачков цукини подается с чесночными крутонами.', false, true, 1, 'Крем суп из кабачков', 30, 'sup-iz-kabachkov/sup-iz-kabachkov.jpg', 'sup-iz-kabachkov/sup-iz-kabachkov-210x167.jpg', false, true, false, 0, 0, 0, false, false, false, 0, 0, 'sup-iz-kabachkov/sup-iz-kabachkov-32x32.png', 0, '200', NULL, NULL, 'NONE', NULL);
INSERT INTO products VALUES (201, 1450, 'Американский сливочный суп с креветками, осьминогами, лососем, кальмаром, миксом из овощей и петрушкой.', false, true, 1, 'Чаудер с морепродуктами', 30, 'chauder-s-moreproduktami/chauder-s-moreproduktami.jpg', 'chauder-s-moreproduktami/chauder-s-moreproduktami-210x167.jpg', false, true, false, 0, 0, 0, false, false, false, 0, 0, 'chauder-s-moreproduktami/chauder-s-moreproduktami-32x32.png', 0, '201', NULL, NULL, 'NONE', NULL);
INSERT INTO products VALUES (203, 800, 'Бульон мисо, соевый творог Тофу, водоросли Вакамэ, лук зеленый.', false, true, 1, 'Миссо classic', 30, 'misso-classic/misso-classic.jpg', 'misso-classic/misso-classic-210x167.jpg', false, true, false, 0, 0, 0, false, false, false, 0, 0, 'misso-classic/misso-classic-32x32.png', 0, '203', NULL, NULL, 'NONE', NULL);
INSERT INTO products VALUES (204, 1500, 'Классический Мисо-суп с лососем и творогом Тофу.', false, true, 1, 'Миссо с лососем', 30, 'misso-s-lososem/misso-s-lososem.jpg', 'misso-s-lososem/misso-s-lososem-210x167.jpg', false, true, false, 0, 0, 0, false, false, false, 0, 0, 'misso-s-lososem/misso-s-lososem-32x32.png', 0, '204', NULL, NULL, 'NONE', NULL);
INSERT INTO products VALUES (205, 1400, 'Ароматный японский бульон с грибами шиитаке, яйцом и жареными гёдза.', false, true, 1, 'Японский суп с пельменями гедза', 30, 'japanesse-sup-s-pelmenyami/japanesse-sup-s-pelmenyami.jpg', 'japanesse-sup-s-pelmenyami/japanesse-sup-s-pelmenyami-210x167.jpg', false, true, false, 0, 0, 0, false, false, false, 0, 0, 'japanesse-sup-s-pelmenyami/japanesse-sup-s-pelmenyami-32x32.png', 0, '205', NULL, NULL, 'NONE', NULL);
INSERT INTO products VALUES (206, 1500, 'Острый тайский суп на кокосовом молоке с тигровыми креветками,долькой лимона, грибами,и зеленьюи пшеничной лапшой удон и крабовым мясом.', false, true, 1, 'Острый тайский суп с лапшой Удон', 30, 'ostriy-taiskii-sup/ostriy-taiskii-sup.jpg', 'ostriy-taiskii-sup/ostriy-taiskii-sup-210x167.jpg', false, true, false, 0, 0, 0, false, false, false, 0, 0, 'ostriy-taiskii-sup/ostriy-taiskii-sup-32x32.png', 0, '206', NULL, NULL, 'NONE', NULL);
INSERT INTO products VALUES (247, 1100, 'Питательный суп пюре из чечевицы с кусочками бекона подается с долькой лимона и чесночными гренками.', false, true, 1, 'Суп чечевичный', 30, 'sup-chechevichnii/sup-chechevichnii.jpg', 'sup-chechevichnii/sup-chechevichnii-210x167.jpg', false, true, false, 0, 0, 0, false, false, false, 0, 0, 'sup-chechevichnii/sup-chechevichnii-32x32.png', 0, '252', NULL, NULL, 'NONE', NULL);


INSERT INTO products VALUES (215, 1650, 'Широкая паста феттучини с ветчиной и свежими шампиньонами в сливочном соусе с итальянским сыром пармезан.', false, true,1, 'Феттучини с грибами и ветчиной', 31, 'fettuchini-s-gribami-i-vetchinoi/fettuchini-s-gribami-i-vetchinoi.jpg', 'fettuchini-s-gribami-i-vetchinoi/fettuchini-s-gribami-i-vetchinoi-210x167.jpg', false, true, false, 0, 0, 0, false, false, false, 0, 0, 'fettuchini-s-gribami-i-vetchinoi/fettuchini-s-gribami-i-vetchinoi-32x32.png', 0, '194', NULL, NULL, 'NONE', NULL);
INSERT INTO products VALUES (216, 1750, 'Широкая паста феттучини с куриной грудкой и свежими шампиньонами в сливочном соусе альфредо с итальянским сыром пармезан.', false, true, 1, 'Феттучини с грибами и куриной грудкой', 31, 'fettuchini-s-gribami-i-kuricei/fettuchini-s-gribami-i-kuricei.jpg', 'fettuchini-s-gribami-i-kuricei/fettuchini-s-gribami-i-kuricei-210x167.jpg', false, true, false, 0, 0, 0, false, false, false, 0, 0, 'fettuchini-s-gribami-i-kuricei/fettuchini-s-gribami-i-kuricei-32x32.png', 0, '193', NULL, NULL, 'NONE', NULL);
INSERT INTO products VALUES (217, 1550, 'Классическая итальянская паста спагетти  с томатным соусом балоньезе и сыром пармезан.', false, true, 1, 'Cпагетти болоньезе', 31, 'spagetti-bolonieza/spagetti-bolonieza.jpg', 'spagetti-bolonieza/spagetti-bolonieza-210x167.jpg', false, true, false, 0, 0, 0, false, false, false, 0, 0, 'spagetti-bolonieza/spagetti-bolonieza-32x32.png', 0, '192', NULL, NULL, 'NONE', NULL);
INSERT INTO products VALUES (218, 1750, 'Итальянская паста феттучини с беконом и свежими шампиньонами в нежном сливочном соусе, луком шалот и сыром пармезан.', false, true, 1, 'Паста Карбонара', 31, 'pasta-carbonara/pasta-carbonara.jpg', 'pasta-carbonara/pasta-carbonara-210x167.jpg', false, true, false, 0, 0, 0, false, false, false, 0, 0, 'pasta-carbonara/pasta-carbonara-32x32.png', 0, '191', NULL, NULL, 'NONE', NULL);
INSERT INTO products VALUES (219, 1850, 'Традиционная итальянская паста тальятелле из свежего шпината с морскими деликатесами в томатном соусе и сыром пармезан.', false, true, 1, 'Тальятелле из шпината с морепродуктами в томатном соусе', 31, 'talyatelle-s-moreproductami/talyatelle-s-moreproductami.jpg', 'talyatelle-s-moreproductami/talyatelle-s-moreproductami-210x167.jpg', false, true, false, 0, 0, 0, false, false, false, 0, 0, 'talyatelle-s-moreproductami/talyatelle-s-moreproductami-32x32.png', 0, '190', NULL, NULL, 'NONE', NULL);

INSERT INTO products VALUES (224, 1600, 'Традиционная японская пшеничная лапша удон с куриной грудкой и овощами с соусом терияки.', false, true, 0, 'Удон с куриной грудкой и овощами', 23, 'udon-s-curicei/udon-s-curicei.jpg', 'udon-s-curicei/udon-s-curicei-210x167.jpg', false, true, false, 0, 0, 0, false, false, false, 0, 0, 'udon-s-curicei/udon-s-curicei-32x32.png', 0, '208', NULL, NULL, 'NONE', NULL);

INSERT INTO products VALUES (225, 1750, 'Сыр моцарелла, лосось, анчоусы, карамелизированный лук , орегано, итальянский соус для пиццы.', false, true, 1, 'Пицца с лососем', 33, 'pizza-s-lososem/pizza-s-lososem.jpg', 'pizza-s-lososem/pizza-s-lososem-210x167.jpg', false, true, false, 0, 0, 0, false, false, false, 0, 0, 'pizza-s-lososem/pizza-s-lososem-32x32.png', 0, '231', NULL, NULL, 'NONE', NULL);
INSERT INTO products VALUES (226, 2200, 'Сыр моцарелла, лосось, анчоусы, карамелизированный лук , орегано, итальянский соус для пиццы.', false, true, 1, 'Пицца с лососем', 32, 'pizza-s-lososem/pizza-s-lososem.jpg', 'pizza-s-lososem/pizza-s-lososem-210x167.jpg', false, true, false, 0, 0, 0, false, false, false, 0, 0, 'pizza-s-lososem/pizza-s-lososem-32x32.png', 0, '232', NULL, NULL, 'NONE', NULL);
INSERT INTO products VALUES (227, 1700, 'Сыр моцарелла, соус тар-тар, фарш болоньезе, вяленные помидоры ,бекон, охотничьи колбаски, зелень,  орегано, итальянский соус для пиццы.', false, true, 1, 'Пицца с беконом', 33, 'pizza-s-bekonom/pizza-s-bekonom.jpg', 'pizza-s-bekonom/pizza-s-bekonom-210x167.jpg', false, true, false, 0, 0, 0, false, false, false, 0, 0, 'pizza-s-bekonom/pizza-s-bekonom-32x32.png', 0, '233', NULL, NULL, 'NONE', NULL);
INSERT INTO products VALUES (228, 2150, 'Сыр моцарелла, соус тар-тар, фарш болоньезе, вяленные помидоры ,бекон, охотничьи колбаски, зелень,  орегано, итальянский соус для пиццы.', false, true, 1, 'Пицца с беконом', 32, 'pizza-s-bekonom/pizza-s-bekonom.jpg', 'pizza-s-bekonom/pizza-s-bekonom-210x167.jpg', false, true, false, 0, 0, 0, false, false, false, 0, 0, 'pizza-s-bekonom/pizza-s-bekonom-32x32.png', 0, '234', NULL, NULL, 'NONE', NULL);
INSERT INTO products VALUES (229, 1750, 'Сыр моцарелла, лук карамелизированный, шампиньоны,карнишоны,перец светофор, бекон, маслины,  орегано, итальянский соус для пиццы.', false, true, 1, 'Капричеза', 33, 'pizza-kapricheza/pizza-kapricheza.jpg', 'pizza-kapricheza/pizza-kapricheza-210x167.jpg', false, true, false, 0, 0, 0, false, false, false, 0, 0, 'pizza-kapricheza/pizza-kapricheza-32x32.png', 0, '235', NULL, NULL, 'NONE', NULL);
INSERT INTO products VALUES (230, 2200, 'Сыр моцарелла, лук карамелизированный, шампиньоны,карнишоны,перец светофор, бекон, маслины,  орегано, итальянский соус для пиццы.', false, true, 1, 'Капричеза', 32, 'pizza-kapricheza/pizza-kapricheza.jpg', 'pizza-kapricheza/pizza-kapricheza-210x167.jpg', false, true, false, 0, 0, 0, false, false, false, 0, 0, 'pizza-kapricheza/pizza-kapricheza-32x32.png', 0, '236', NULL, NULL, 'NONE', NULL);

INSERT INTO products VALUES (231, 1500, 'Классический ролл с нежным мясом краба, авокадо, икрой масаго и японским майонезом.', false, true, 8, 'Калифорния с крабом', 8, 'roll-california-s-krabom/roll-california-s-krabom.jpg', 'roll-california-s-krabom/roll-california-s-krabom-210x167.jpg', false, true, false, 0, 0, 0, false, false, false, 0, 0, 'roll-california-s-krabom/roll-california-s-krabom-32x32.png', 0, '237', NULL, NULL, 'SUSHI', NULL);
INSERT INTO products VALUES (232, 1650, 'Теплый  ролл с  копченным угрем, японским омлетом и соусом унаги.', false, true, 8, 'Теплый Ролл Майами с угрем', 8, 'tepliy-roll-mayami-s-ugrem/tepliy-roll-mayami-s-ugrem.jpg', 'tepliy-roll-mayami-s-ugrem/tepliy-roll-mayami-s-ugrem-210x167.jpg', false, true, false, 0, 0, 0, false, false, false, 0, 0, 'tepliy-roll-mayami-s-ugrem/tepliy-roll-mayami-s-ugrem-32x32.png', 0, '238', NULL, NULL, 'SUSHI', NULL);
INSERT INTO products VALUES (233, 1350, 'Норвежский лосось, сыр филадельфия и свежая огуречная соломка.', false, true, 8, 'Филадельфия с огурцом', 8, 'roll-filadelfiya-s-ogurcom/roll-filadelfiya-s-ogurcom.jpg', 'roll-filadelfiya-s-ogurcom/roll-filadelfiya-s-ogurcom-210x167.jpg', false, true, false, 0, 0, 0, false, false, false, 0, 0, 'roll-filadelfiya-s-ogurcom/roll-filadelfiya-s-ogurcom-32x32.png', 0, '239', NULL, NULL, 'SUSHI', NULL);
INSERT INTO products VALUES (234, 1700, 'Норвежский лосось, сыр филадельфия и копченный угорь в японском соусе унаги.', false, true, 8, 'Филадельфия с угрем', 8, 'roll-filadelfiya-s-ugrem/roll-filadelfiya-s-ugrem.jpg', 'roll-filadelfiya-s-ugrem/roll-filadelfiya-s-ugrem-210x167.jpg', false, true, false, 0, 0, 0, false, false, false, 0, 0, 'roll-filadelfiya-s-ugrem/roll-filadelfiya-s-ugrem-32x32.png', 0, '240', NULL, NULL, 'SUSHI', NULL);
INSERT INTO products VALUES (235, 1650, 'Норвежский лосось, сыр филадельфия в дуэте тобики и икуры.', false, true, 8, 'Филадельфия с икрой', 8, 'roll-filadelfiya-s-ikroy/roll-filadelfiya-s-ikroy.jpg', 'roll-filadelfiya-s-ikroy/roll-filadelfiya-s-ikroy-210x167.jpg', false, true, false, 0, 0, 0, false, false, false, 0, 0, 'roll-filadelfiya-s-ikroy/roll-filadelfiya-s-ikroy-32x32.png', 0, '241', NULL, NULL, 'SUSHI', NULL);
INSERT INTO products VALUES (236, 500, 'Одна из популярных разновидностей суши в виде  колодца овальной формы с нежным крабовым мясом и соусом спайси.', false, true, 1, 'Гункан краб', 5, 'gunkan-krab/gunkan-krab.jpg', 'gunkan-krab/gunkan-krab-210x167.jpg', false, true, false, 0, 0, 0, false, false, false, 0, 0, 'gunkan-krab/gunkan-krab-32x32.png', 0, '242', NULL, NULL, 'SUSHI', NULL);
INSERT INTO products VALUES (245, 1300, 'Ролл с лососем, имбирем, японским омлетом и  огурцом.', false, true, 8, 'Ролл Нежность', 8, 'roll-nejnost/roll-nejnost.jpg', 'roll-nejnost/roll-nejnost-210x167.jpg', false, true, false, 0, 0, 0, false, false, false, 0, 0, 'roll-nejnost/roll-nejnost-32x32.png', 0, '250', NULL, NULL, 'SUSHI', NULL);


INSERT INTO products VALUES (237, 300, 'Соус барбекю', false, true, 1, 'Соус барбекю', 22, 'sauce-bbq/sauce-bbq.jpg', 'sauce-bbq/sauce-bbq.jpg', false, true, false, 0, 0, 0, false, false, false, 0, 0, 'sauce-bbq/sauce-bbq-32x32.png', 0, '243', NULL, NULL, 'NONE', NULL);

INSERT INTO products VALUES (238, 6000, 'Ролл Калифорния с лососем 8шт., Калифорния Мix 8шт., Ролл Калифорния с креветкой 8шт., Ролл Калифорния с крабом 8 шт..', false, true, 1, 'Сет Калифорния(32шт.)', 9, 'set-kalifornia/set-kalifornia.jpg', 'set-kalifornia/set-kalifornia-210x167.jpg', false, true, false, 0, 0, 0, false, false, false, 0, 0, 'set-kalifornia/set-kalifornia-32x32.png', 0, '243', NULL, NULL, 'SUSHI', NULL);
INSERT INTO products VALUES (239, 5400, 'Теплый Ролл Майами с лососем 8шт., Ролл темпура с креветкой 8шт., Ролл темпура с угрем 8шт., Темпура Лосось гриль 8 шт..', false, true, 1, 'Сет Темпура(32шт.)', 9, 'set-tempura/set-tempura.jpg', 'set-tempura/set-tempura-210x167.jpg', false, true, false, 0, 0, 0, false, false, false, 0, 0, 'set-tempura/set-tempura-32x32.png', 0, '244', NULL, NULL, 'SUSHI', NULL);
INSERT INTO products VALUES (240, 3000, 'Ролл Вегетарианский 8шт., Ролл Авокадо 8шт., Ролл Огурец 8шт., Ролл Чука Маки 8 шт..', false, true, 1, 'Cет Вегетарианский(32шт.)', 9, 'set-vegetariasky/set-vegetariasky.jpg', 'set-vegetariasky/set-vegetariasky-210x167.jpg', false, true, false, 0, 0, 0, false, false, false, 0, 0, 'set-vegetariasky/set-vegetariasky-32x32.png', 0, '245', NULL, NULL, 'SUSHI', NULL);
INSERT INTO products VALUES (241, 6500, 'Ролл Сливочный Угорь 8шт., Ролл темпура с угрем 8шт., Ролл Угорь 8шт., Нигири угорь 3 шт..', false, true, 1, 'Cет Унаги(27шт.)', 9, 'set-unagi/set-unagi.jpg', 'set-unagi/set-unagi-210x167.jpg', false, true, false, 0, 0, 0, false, false, false, 0, 0, 'set-unagi/set-unagi-32x32.png', 0, '246', NULL, NULL, 'SUSHI', NULL);
INSERT INTO products VALUES (242, 3200, 'Куриные крылья Луизиана, Куриные крылья в панировке, Картофель Фри, Охотничьи колбаски, Сырные палочки', false, true, 1, 'Ассорти из мясных горячих закусок', 9, 'assorti-iz-myasnix-zakusok/assorti-iz-myasnix-zakusok.jpg', 'assorti-iz-myasnix-zakusok/assorti-iz-myasnix-zakusok-210x167.jpg', false, true, false, 0, 0, 0, false, false, false, 0, 0, 'assorti-iz-myasnix-zakusok/assorti-iz-myasnix-zakusok-32x32.png', 0, '247', NULL, NULL, 'NONE', NULL);
INSERT INTO products VALUES (243, 6400, 'Лосось в панировке, Кольца кальмара, Картофель Фри, Кольца лука, Креветки Темпура', false, true, 1, 'Ассорти из морских горячих закусок', 9, 'assorti-iz-morskix-zakusok/assorti-iz-morskix-zakusok.jpg', 'assorti-iz-morskix-zakusok/assorti-iz-morskix-zakusok-210x167.jpg', false, true, false, 0, 0, 0, false, false, false, 0, 0, 'assorti-iz-morskix-zakusok/assorti-iz-morskix-zakusok-32x32.png', 0, '248', NULL, NULL, 'NONE', NULL);
INSERT INTO products VALUES (244, 3200, 'Лосось в панировке, Кольца кальмара, Картофель Фри, Кольца лука, Креветки Темпура', false, true, 1, 'Половинка ассорти из морских горячих закусок', 9, 'assorti-iz-morskix-zakusok/assorti-iz-morskix-zakusok.jpg', 'assorti-iz-morskix-zakusok/assorti-iz-morskix-zakusok-210x167.jpg', false, true, false, 0, 0, 0, false, false, false, 0, 0, 'assorti-iz-morskix-zakusok/assorti-iz-morskix-zakusok-32x32.png', 0, '249', NULL, NULL, 'NONE', NULL);
INSERT INTO products VALUES (246, 20000, 'Ролл Калифорния с лососем 8шт., Ролл Филадельфия 8шт., Ролл Сливочный Угорь 8шт., Ролл Огурец 4шт., Ролл Сливочный Лосось 8шт., Ролл Лосось 4шт., Бонито Ролл с лососем 8шт., Ролл Авокадо 4шт., Ролл Тунец 4 шт., Ролл Пирамида 8шт., Ролл Вулкан с лососем 8шт., Ролл Чука 8шт., Теплый Ролл Майами с угрем 8шт., Гункан Краб 2шт., Гункан Тобико 2шт., Нигири креветка, Нигири угорь, Нигири лосось.', false, true, 1, 'Сет Премимум(101шт.)', 9, 'set-premium-101/set-premium-101.jpg', 'set-premium-101/set-premium-101-210x167.jpg', false, true, false, 0, 0, 0, false, false, false, 0, 0, 'set-premium-101/set-premium-101-32x32.png', 0, '251', NULL, NULL, 'SUSHI', NULL);

INSERT INTO products VALUES (248, 2050, 'Пепперони, шампиньоны, Пицца-соус, сыр «Моцарелла».', false, true, 1, 'Пепперони', 32, 'pizza-peperoni/pizza-peperoni.jpg', 'pizza-peperoni/pizza-peperoni-210x167.jpg', false, true, false, 0, 0, 0, false, false, false, 0, 0, 'pizza-peperoni/pizza-peperoni-32x32.png', 0, '253', NULL, NULL, 'NONE', NULL);
INSERT INTO products VALUES (249, 2200, 'Фарш говяжий , болгарский перец, томаты, пицца-соус, сыр «Моцарелла», перец черный молотый, зелень.', false, true, 1, 'Болоньезе', 32, 'pizza-bolonese/pizza-bolonese.jpg', 'pizza-bolonese/pizza-bolonese-210x167.jpg', false, true, false, 0, 0, 0, false, false, false, 0, 0, 'pizza-bolonese/pizza-bolonese-32x32.png', 0, '254', NULL, NULL, 'NONE', NULL);
INSERT INTO products VALUES (250, 2200, 'Пицца-соус, сыр «Моцарелла», шампиньоны, ветчина, куриная грудка, пеперони.', false, true, 1, 'Четыре сезона', 32, 'pizza-four-seasons/pizza-four-seasons.jpg', 'pizza-four-seasons/pizza-four-seasons-210x167.jpg', false, true, false, 0, 0, 0, false, false, false, 0, 0, 'pizza-four-seasons/pizza-four-seasons-32x32.png', 0, '255', NULL, NULL, 'NONE', NULL);
INSERT INTO products VALUES (251, 1900, 'Пицца-соус, сыр «Моцарелла», орегано.', false, true, 1, 'Маргарита', 32, 'pizza-margarita/pizza-margarita.jpg', 'pizza-margarita/pizza-margarita-210x167.jpg', false, true, false, 0, 0, 0, false, false, false, 0, 0, 'pizza-margarita/pizza-margarita-32x32.png', 0, '256', NULL, NULL, 'NONE', NULL);
INSERT INTO products VALUES (252, 2600, 'Пепперони, ветчина, куриная грудка, охотничьи колбаски, зелень, соус «техасский барбекю», сыр «Моцарелла».', false, true, 1, 'Барбекю', 32, 'pizza-barbeque/pizza-barbeque.jpg', 'pizza-barbeque/pizza-barbeque-210x167.jpg', false, true, false, 0, 0, 0, false, false, false, 0, 0, 'pizza-barbeque/pizza-barbeque-32x32.png', 0, '257', NULL, NULL, 'NONE', NULL);
INSERT INTO products VALUES (253, 2350, 'Говядина фарш, томаты, ветчина, болгарский перец, лук репчатый, специи под сыром «Моцарелла», соус Чили.', false, true, 1, 'Чили', 32, 'pizza-chili/pizza-chili.jpg', 'pizza-chili/pizza-chili-210x167.jpg', false, true, false, 0, 0, 0, false, false, false, 0, 0, 'pizza-chili/pizza-chili-32x32.png', 0, '258', NULL, NULL, 'NONE', NULL);
INSERT INTO products VALUES (254, 2500, 'Cоус «Тар-тар», сыр «Моцарелла», креветки, лосось, кальмары, осьминоги, зелень, лимон.', false, true, 1, 'Средиземноморская', 32, 'pizza-srednezemnomorskaya/pizza-srednezemnomorskaya.jpg', 'pizza-srednezemnomorskaya/pizza-srednezemnomorskaya-210x167.jpg', false, true, false, 0, 0, 0, false, false, false, 0, 0, 'pizza-srednezemnomorskaya/pizza-srednezemnomorskaya-32x32.png', 0, '259', NULL, NULL, 'NONE', NULL);
INSERT INTO products VALUES (255, 2050, 'Соус «Техасский барбекю», сыр «Моцарелла», куриная грудка, томаты, ветчина, зелень.', false, true, 1, 'Чикен-Барбекю', 32, 'pizza-chicken-barbeque/pizza-chicken-barbeque.jpg', 'pizza-chicken-barbeque/pizza-chicken-barbeque-210x167.jpg', false, true, false, 0, 0, 0, false, false, false, 0, 0, 'pizza-chicken-barbeque/pizza-chicken-barbeque-32x32.png', 0, '260', NULL, NULL, 'NONE', NULL);
INSERT INTO products VALUES (256, 2050, 'Сыр моцарелла, Сыр Филадельфия, Сыр Гауда, Сыр Каманбер.', false, true, 1, 'Четыре сыра', 32, 'pizza-four-cheeses/pizza-four-cheeses.jpg', 'pizza-four-cheeses/pizza-four-cheeses-210x167.jpg', false, true, false, 0, 0, 0, false, false, false, 0, 0, 'pizza-four-cheeses/pizza-four-cheeses-32x32.png', 0, '261', NULL, NULL, 'NONE', NULL);
INSERT INTO products VALUES (257, 2200, 'Пицца-соус, сыр «Моцарелла», лук красный, колбаса «Пепперони», томаты, маслины, зелень.', false, true, 1, 'Римская', 32, 'pizza-rim/pizza-rim.jpg', 'pizza-rim/pizza-rim-210x167.jpg', false, true, false, 0, 0, 0, false, false, false, 0, 0, 'pizza-rim/pizza-rim-32x32.png', 0, '262', NULL, NULL, 'NONE', NULL);
INSERT INTO products VALUES (258, 2200, 'Салями, ветчина, грибы, перец болгарский, томаты, зелень., соус «томатно-горчичный», сыр «Моцарелла», соус Тар-Тар.', false, true, 1, 'Сушими', 32, 'pizza-sushimi/pizza-sushimi.jpg', 'pizza-sushimi/pizza-sushimi-210x167.jpg', false, true, false, 0, 0, 0, false, false, false, 0, 0, 'pizza-sushimi/pizza-sushimi-32x32.png', 0, '263', NULL, NULL, 'NONE', NULL);
INSERT INTO products VALUES (259, 2200, 'Соус «тар-тар», сыр «моцарелла», шампиньоны, пепперони, ветчина, томаты, перец болгарский.', false, true, 1, 'Вечер романтики', 32, 'pizza-vecher-romantiki/pizza-vecher-romantiki.jpg', 'pizza-vecher-romantiki/pizza-vecher-romantiki-210x167.jpg', false, true, false, 0, 0, 0, false, false, false, 0, 0, 'pizza-vecher-romantiki/pizza-vecher-romantiki-32x32.png', 0, '264', NULL, NULL, 'NONE', NULL);
INSERT INTO products VALUES (260, 2450, 'Ветчина, куриная грудка, колбаски охотничьи, фарш, томаты, зелень, орегано, пицца-соус, сыр «Моцарелла».', false, true, 1, 'Мясная', 32, 'pizza-meat-assorti/pizza-meat-assorti.jpg', 'pizza-meat-assorti/pizza-meat-assorti-210x167.jpg', false, true, false, 0, 0, 0, false, false, false, 0, 0, 'pizza-meat-assorti/pizza-meat-assorti-32x32.png', 0, '265', NULL, NULL, 'NONE', NULL);
INSERT INTO products VALUES (261, 2000, 'Грибы шампиньоны, болгарский перец, томаты, чукка, маслины, лук, зелень, пицца-соус, сыр «Моцарелла».', false, true, 1, 'Вегетарианская', 32, 'pizza-vegetable/pizza-vegetable.jpg', 'pizza-vegetable/pizza-vegetable-210x167.jpg', false, true, false, 0, 0, 0, false, false, false, 0, 0, 'pizza-vegetable/pizza-vegetable-32x32.png', 0, '266', NULL, NULL, 'NONE', NULL);
INSERT INTO products VALUES (262, 2300, 'Грибы, ветчина, пепперони, томаты, куриная грудка, чеснок, лук, зелень, горчичный соус (Дижон), сыр «Моцарелла».', false, true, 1, 'Столичная', 32, 'pizza-stolichnaya/pizza-stolichnaya.jpg', 'pizza-stolichnaya/pizza-stolichnaya-210x167.jpg', false, true, false, 0, 0, 0, false, false, false, 0, 0, 'pizza-stolichnaya/pizza-stolichnaya-32x32.png', 0, '267', NULL, NULL, 'NONE', NULL);



