const device = { baseWeight: 0.194 };
const profile = {
  materialsPercentage: { "Copper": 0.08, "Aluminium": 0.05, "Iron/Steel": 0.02, "Plastic": 0.34, "Glass": 0.30, "PCB": 0.07, "Battery": 0.06 },
  preciousMetalsGrams: { "Gold": 0.034, "Silver": 0.34, "Palladium": 0.015, "Lithium": 3.1, "Cobalt": 6.4 }
};
const pricing = {
  rates: { "Copper": 870, "Aluminium": 210, "PCB": 4000, "Battery": 150, "Gold": 7800, "Silver": 95, "Plastic": 25 }
};

let totalValue = 0;

for (const [material, percentage] of Object.entries(profile.materialsPercentage)) {
  const rate = pricing.rates[material] || 0;
  const weightOfMaterial = device.baseWeight * percentage;
  const value = weightOfMaterial * rate;
  totalValue += value;
}

for (const [metal, grams] of Object.entries(profile.preciousMetalsGrams)) {
  const rate = pricing.rates[metal] || 0;
  // rate is likely per gram for precious metals, let's assume it is since Gold is 7800
  const value = grams * rate;
  totalValue += value;
}

console.log("Total Value:", totalValue);
