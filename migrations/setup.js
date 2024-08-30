const pool = require('../config/connection');

async function setupTables() {
    try {
        let dropTable = `DROP TABLE IF EXISTS "Categories", "Menus"`;

        let createCategories = `CREATE TABLE IF NOT EXISTS "Categories" (id SERIAL PRIMARY KEY, name VARCHAR NOT NULL);`;

        let createMenus = `CREATE TABLE IF NOT EXISTS "Menus" (id SERIAL PRIMARY KEY, name VARCHAR NOT NULL, "categoryId" INTEGER NOT NULL REFERENCES "Categories"(id), stock INTEGER NOT NULL, price INTEGER NOT NULL, "createdAt" DATE NOT NULL);`;

        await pool.query(dropTable);
        console.log('DROP TABLE SUCCESS');

        await pool.query(createCategories);
        console.log('TABLE CATEGORIES SUCCESS');
        
        await pool.query(createMenus);
        console.log('TABLE MENUS SUCCESS');
        
    } catch (error) {
        console.log(error);
    }
}

setupTables();