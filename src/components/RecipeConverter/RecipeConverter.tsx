/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState } from "react";
import { getImage, getRecipe } from "../../api/api";
import { Card } from "../Card/Card";
import styles from "./RecipeConverter.module.scss";

const RecipeConverter: React.FC = () => {
  const [ingredients, setIngredients] = useState<string[]>([]);
  const [ingredient, setIngredient] = useState<string[]>([]);
  const [value, setValue] = useState<any>("");
  const [recipe, setRecipe] = useState<any>(null);
  const [image, setImage] = useState<any>(null);

  const handleConvert = async () => {
    if (ingredients.length > 0) {
      setIngredient([]);
      try {
        const response = await getRecipe(ingredients);
        if (response?.choices[0]?.message?.content) {
          const recipe = JSON.parse(response?.choices[0]?.message?.content);
          const image = await getImage(recipe.Title);
          setIngredients([""]);
          setRecipe(JSON.parse(response?.choices[0]?.message?.content));
          setImage(image.text);
        }
      } catch (error) {
        console.error("Error converting ingredients to recipe:", error);
      }
    }
  };
  const addIngredient = () => {
    const data = [...ingredient, value];
    setValue("");
    setIngredient(data);
    setIngredients(data);
    setRecipe(null);
    setImage(null);
  };
  const clearAll = () => {
    setValue("");
    setIngredient([]);
    setIngredients([]);
    setRecipe("");
    setImage("");
  };
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        flexDirection: "column",
        alignItems: "center",
        gap: "5px",
      }}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          gap: "10px",
        }}
      >
        <h1 className={styles.h1}>Recipe Converter</h1>
        <div className={styles.container}>
          Enter ingredients
          <input
            className={styles.input}
            type="text"
            value={value}
            onChange={(e) => setValue(e.target.value)}
          />
          <button className={styles.button} onClick={addIngredient}>
            Add ingredient
          </button>
          <button className={styles.button} onClick={handleConvert}>
            Convert to Recipe
          </button>
          <button className={styles.button} onClick={clearAll}>
            Clear
          </button>
        </div>
        {ingredient.map((item) => (
          <p key={item}>{item}</p>
        ))}
      </div>
      {recipe && (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            flexDirection: "column",
            alignItems: "center",
            gap: "5px",
          }}
        >
          <h3
            style={{
              fontSize: "28px",
            }}
          >
            Recipe
          </h3>
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              flexDirection: "column",
              alignItems: "center",
              gap: "5px",
            }}
          >
            <h2
              style={{
                fontSize: "24px",
              }}
            >
              {recipe.Title}
            </h2>
            <h2
              style={{
                fontSize: "24px",
              }}
            >
              Ingredients Amount
            </h2>
            <Card data={recipe.IngredientsAmount} />
            <h2
              style={{
                fontSize: "24px",
              }}
            >
              Steps to Cook
            </h2>
            <Card data={recipe.StepsToCook} />
            <h2
              style={{
                fontSize: "24px",
              }}
            >
              Time To Cook - {recipe.TimeToCook}
            </h2>
            <h2
              style={{
                fontSize: "24px",
              }}
            >
              Difficulty - {recipe.Difficulty}
            </h2>
          </div>
          <img src={image} alt="" />
        </div>
      )}
    </div>
  );
};

export default RecipeConverter;
