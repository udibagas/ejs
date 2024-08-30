const pool = require('../config/connection');
const {readFile} = require('fs').promises;

async function seedData() {
    try {
        let categories = JSON.parse(await readFile('./data/categories.json', 'utf-8'))
        .map(el => `('${el.name}')`).join(',\n');

        let menus = JSON.parse(await readFile('./data/menus.json', 'utf-8'))
        .map(el => `('${el.name}', ${el.category}, ${el.stock}, ${el.price}, '${el.createdAt}')`).join(',\n');
        
        let createCategories = `INSERT INTO "Categories" (name) VALUES ${categories};`;

        let createMenus = `INSERT INTO "Menus" (name, "categoryId", stock, price, "createdAt") VALUES ${menus};`;

        pool.query(createCategories);
        console.log('INSERT CATEGORIES SUCCESS');
        
        pool.query(createMenus);
        console.log('INSERT MENUS SUCCESS');
        
    } catch (error) {
        console.log(error);
    }
}

seedData();