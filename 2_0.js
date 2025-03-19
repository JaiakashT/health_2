import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";

export default function HealeoSense() {
  const [formData, setFormData] = useState({
    bp: "",
    sugar: "",
    protein: "",
    calories: "",
    fiber: "",
  });
  const [menu, setMenu] = useState({ veg: [], nonVeg: [] });
  const [dietPreference, setDietPreference] = useState("balanced");
  const [darkMode, setDarkMode] = useState(false);
  const [waterIntake, setWaterIntake] = useState(0);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  const generateRandomHealthData = () => {
    return {
      bp: (90 + Math.floor(Math.random() * 40)).toString(),
      sugar: (70 + Math.floor(Math.random() * 80)).toString(),
      protein: (50 + Math.floor(Math.random() * 50)).toString(),
      calories: (1500 + Math.floor(Math.random() * 500)).toString(),
      fiber: (20 + Math.floor(Math.random() * 10)).toString(),
    };
  };

  const getMealType = () => {
    const now = new Date();
    const istOffset = 5.5 * 60 * 60 * 1000;
    const istTime = new Date(now.getTime() + istOffset);
    const hour = istTime.getUTCHours();

    if (hour >= 5 && hour < 11) return "Breakfast";
    if (hour >= 11 && hour < 16) return "Lunch";
    if (hour >= 16 && hour < 20) return "Evening Snacks";
    return "Dinner";
  };

  const getPersonalizedMenu = (mealType, healthData, preference) => {
    const vegMeals = {
      Breakfast: ["Oats with fruits", "Idli with sambar", "Vegetable Poha"],
      Lunch: ["Dal with roti", "Vegetable Biryani", "Chickpea salad"],
      Dinner: ["Palak paneer with rice", "Khichdi", "Vegetable soup"]
    };

    const nonVegMeals = {
      Breakfast: ["Egg omelette with toast", "Chicken sandwich", "Boiled eggs with fruits"],
      Lunch: ["Grilled chicken with rice", "Fish curry", "Egg curry with chapati"],
      Dinner: ["Chicken stew with rice", "Grilled fish", "Mutton soup"]
    };

    if (preference === "vegetarian") {
      return { veg: vegMeals[mealType] || [], nonVeg: [] };
    } else if (preference === "high-protein") {
      return { veg: ["Paneer tikka", "Tofu stir fry"], nonVeg: ["Grilled chicken", "Salmon steak"] };
    }
    return { veg: vegMeals[mealType] || [], nonVeg: nonVegMeals[mealType] || [] };
  };

  const calculateWaterIntake = (healthData) => {
    let intake = 2.5;
    if (parseInt(healthData.bp) > 130) intake += 0.5;
    if (parseInt(healthData.sugar) > 150) intake += 0.5;
    if (parseInt(healthData.protein) > 80) intake -= 0.5;
    setWaterIntake(intake);
  };

  useEffect(() => {
    const randomData = generateRandomHealthData();
    setFormData(randomData);
    const mealType = getMealType();
    setMenu(getPersonalizedMenu(mealType, randomData, dietPreference));
    calculateWaterIntake(randomData);
  }, [dietPreference]);

  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.9 }} 
      animate={{ opacity: 1, scale: 1 }} 
      transition={{ duration: 0.5 }}
      className={`p-6 max-w-lg mx-auto rounded-xl shadow-md space-y-4 ${darkMode ? 'bg-gray-900 text-gray-200' : 'bg-white text-black'}`}
    >
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-bold">Real-Time Health Monitoring (Test Mode)</h2>
        <button onClick={toggleDarkMode} className="px-4 py-2 bg-gray-500 text-white rounded-md">
          {darkMode ? "Light Mode" : "Dark Mode"}
        </button>
      </div>
      <div className="space-y-2">
        {Object.keys(formData).map((key) => (
          <motion.div
            key={key}
            className={`w-full p-2 border rounded-md text-center ${darkMode ? 'bg-gray-700 text-gray-200' : 'bg-gray-100 text-black'}`}
            whileHover={{ scale: 1.05 }}
          >
            <strong>{key.toUpperCase()}:</strong> {formData[key]}
          </motion.div>
        ))}
      </div>
      <div className="flex space-x-2">
        <button onClick={() => setDietPreference("balanced")} className="px-4 py-2 bg-blue-500 text-white rounded-md">Balanced</button>
        <button onClick={() => setDietPreference("vegetarian")} className="px-4 py-2 bg-green-500 text-white rounded-md">Vegetarian</button>
        <button onClick={() => setDietPreference("high-protein")} className="px-4 py-2 bg-red-500 text-white rounded-md">High-Protein</button>
        <button onClick={() => setDietPreference("non-veg")} className="px-4 py-2 bg-yellow-500 text-white rounded-md">Non-Veg</button>
      </div>
      <motion.div 
        initial={{ opacity: 0 }} 
        animate={{ opacity: 1 }} 
        transition={{ duration: 0.5 }}
        className={`p-4 rounded-md mt-4 ${darkMode ? 'bg-gray-800 text-gray-200' : 'bg-gray-100 text-black'}`}
      >
        <h3 className="font-bold">Personalized Indian Menu ({getMealType()})</h3>
        <table className="w-full border-collapse border border-gray-400 mt-2">
          <thead>
            <tr className={`${darkMode ? 'bg-gray-700 text-gray-200' : 'bg-gray-300 text-black'}` }>
              <th className="border border-gray-400 p-2">Vegetarian</th>
              <th className="border border-gray-400 p-2">Non-Vegetarian</th>
            </tr>
          </thead>
          <tbody>
            {menu.veg.map((vegItem, index) => (
              <tr key={index} className={`${darkMode ? 'bg-gray-700 text-gray-200' : 'bg-white text-black'}`}> 
                <td className="border border-gray-400 p-2">{vegItem}</td>
                <td className="border border-gray-400 p-2">{menu.nonVeg[index] || "-"}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </motion.div>
    </motion.div>
  );
}
