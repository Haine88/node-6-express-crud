// ---------------------------------
// Boilerplate Code to Set Up Server
// ---------------------------------

import express from 'express';
import fs from 'fs/promises';

const app = express();
const port = 3000;

app.use(express.json());

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});

// ---------------------------------
// Helper Functions
// ---------------------------------

// 1. getAllRecipes()

async function getAllRecipes() {
    const data = await fs.readFile("recipes-data.json", "utf8");
    const parsedRecipes = JSON.parse(data);
    return parsedRecipes;
}

// 2. getOneRecipe(index)

async function getOneRecipe(index) {
    const data = await fs.readFile("recipes-data.json", "utf8");
    const parsedRecipe = JSON.parse(data);
    return parsedRecipe[index];
}

// 3. getAllRecipeNames()

async function getAllRecipeNames() {
    const data = await fs.readFile("recipes-data.json", "utf8");
    const parsedRecipes = JSON.parse(data);
    return parsedRecipes.map(recipe => recipe.name); 
}

// 4. getRecipesCount()

async function getRecipesCount() {
    const data = await fs.readFile("recipes-data.json", "utf8");
    const parsedRecipes = JSON.parse(data);
    return parsedRecipes.length;
}

// ---------------------------------
// API Endpoints
// ---------------------------------

// 1. GET /get-all-recipes

app.get("/get-all-recipes", async (req, res) => {
    const recipes = await getAllRecipes();
    res.json(recipes);
});

// 2. GET /get-one-recipe/:index

app.get("/get-one-recipe/:index", async (req, res) => {
    const index = req.params.index;
    const recipe = await getOneRecipe(index);
    res.json(recipe);
});

// 3. GET /get-all-recipe-names

app.get("/get-all-recipe-names", async (req, res) => {
    const names = await getAllRecipeNames();
    res.json(names);
});


// 4. GET /get-recipes-count

app.get("/get-recipes-count", async (req, res) => {
    const count = await getRecipesCount();
    res.json(count);
});
