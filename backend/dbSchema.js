//The purpuse of this file is to allow the creation of the DB file in place
//All the relevant SQL commands to do so will live here (tables, data, test-data, etc.)
//IF NOT EXITS and INSERT OR IGNORE should prevent duplicate tables and records

//SQL commands for creating tables
export const tables = [
    `CREATE TABLE IF NOT EXISTS "Categories" (
        "category_id"	INTEGER NOT NULL UNIQUE,
        "name"	TEXT NOT NULL UNIQUE,
        PRIMARY KEY("category_id" AUTOINCREMENT)
    );`,
    `CREATE TABLE IF NOT EXISTS "Inventory" (
        "item_id"	INTEGER NOT NULL UNIQUE,
        "name"	TEXT NOT NULL UNIQUE,
        "category"	INTEGER,
        "stock"	INTEGER,
        "par"	INTEGER DEFAULT (NULL),
        PRIMARY KEY("item_id" AUTOINCREMENT),
        FOREIGN KEY("category") REFERENCES "Categories"("category_id")
    );`,
    `CREATE TABLE IF NOT EXISTS "Roles" (
        "role_id"	INTEGER NOT NULL UNIQUE,
        "name"	TEXT NOT NULL UNIQUE,
        PRIMARY KEY("role_id" AUTOINCREMENT)
    );`,
    `CREATE TABLE IF NOT EXISTS "Users" (
        "user_id"	INTEGER NOT NULL UNIQUE,
        "first_name"	TEXT NOT NULL,
        "last_name"	TEXT,
        "role"	INTEGER,
        "password"	TEXT NOT NULL,
        PRIMARY KEY("user_id" AUTOINCREMENT),
        FOREIGN KEY("role") REFERENCES "Roles"("role_id") ON UPDATE CASCADE ON DELETE SET NULL
    );`
]

//default data (categories, roles, etc.)
export const dataDefaults = [
    `INSERT OR IGNORE INTO "Categories" VALUES 
        (1,'General'),
        (2,'Fridge'),
        (3,'Fresh Fruit'),
        (4,'Fresh Veg'),
        (5,'Hygiene'),
        (6,'Household Products'),
        (7,'Freezer'),
        (9,'Canned Goods'),
        (10,'Pets'),
        (11,'Baby'),
        (13,'TestCategory2'),
        (14,'TestCategory3'),
        (15,'TestCategory4');
    `,
    `INSERT OR IGNORE INTO "Roles" VALUES (1,'admin'),
        (2,'volunteer');
    `
]

//stock data for testing
export const testData = [
    `INSERT OR IGNORE INTO "Inventory" VALUES 
        (1,'Soup',9,27,10),
        (2,'Chunky Soup',9,15,10),
        (3,'Canned Ham',9,7,10),
        (4,'Canned Tuna',9,9,10),
        (5,'Canned Turkey',9,12,10),
        (6,'Canned Vegetables',9,7,10),
        (7,'Canned Tomatoes',9,6,10),
        (8,'Pasta Sauce',9,12,10),
        (9,'Chick Peas',9,9,10),
        (10,'Black Beans',9,5,10),
        (11,'Baked Beans',9,2,10),
        (12,'Ravioli Mixed',9,9,10),
        (13,'Canned Spam',9,13,10),
        (14,'Rice',1,30,10),
        (15,'Pasta',1,25,10),
        (16,'Kraft Diner',1,40,10),
        (17,'Tea',1,12,10),
        (18,'Sugar',1,21,10),
        (19,'Powdered Milk',1,7,10),
        (20,'Canned Fruit',9,2,10),
        (21,'Crackers',1,8,10),
        (22,'Mustard',1,9,10),
        (23,'Relish',1,4,10),
        (25,'Mayo',1,2,10),
        (26,'Ketchup',1,5,10),
        (27,'Cookies',1,13,10),
        (28,'Granola',1,15,10),
        (29,'Margarine',2,4,10),
        (30,'Cheese',2,21,10),
        (31,'Eggs',2,40,10),
        (32,'Milk - Sleeve',2,18,10),
        (33,'Yogurt',2,27,10),
        (34,'Apples',3,14,10),
        (35,'Oranges',3,13,10),
        (36,'Pears',3,9,10),
        (37,'Potatoes',4,17,10),
        (38,'Onions',4,4,10),
        (39,'Carrots',5,32,10),
        (40,'Cake Mix + Icing',1,10,10),
        (41,'Pancake Mix + Syrup',1,5,10),
        (42,'Flour',1,12,10),
        (43,'Juice',1,17,10),
        (44,'Peanut Butter',1,5,10),
        (45,'Jam',1,9,10),
        (46,'Cereal',1,7,10),
        (47,'Oatmeal',1,4,10),
        (48,'Shampoo',5,3,10),
        (49,'Conditioner',5,9,10),
        (50,'Deoderant (F)',5,2,10),
        (51,'Deodorant (M)',5,4,10),
        (52,'Toothbrush',5,6,10),
        (53,'Tooth Paste',5,15,10),
        (54,'Paper Towel',6,7,10),
        (55,'Tissues',6,12,10),
        (56,'Dish Soap',6,4,10),
        (57,'Chicken',7,12,10),
        (58,'Ground Beef',7,16,10),
        (59,'Bacon',7,17,10),
        (60,'Pork',7,19,10),
        (61,'Sausage',7,5,10),
        (62,'Frozen Veg',7,3,10),
        (63,'Cat Food',10,17,10),
        (64,'Dog Food',10,15,10),
        (65,'Diapers',11,12,10),
        (66,'Baby Food',11,11,10);
    `,
    `INSERT OR IGNORE INTO "Users" VALUES 
        (1,'Jarrod','Hoddinott',2,'123'),
        (2,'Maxwell','Schriner',2,'456'),
        (3,'Bob','Bobertson',1,'789');
    `
]

