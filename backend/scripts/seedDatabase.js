const { db } = require('../src/config/firebase');

if (!db) {
  console.error("Firebase database could not be initialized. Check serviceAccountKey.json.");
  process.exit(1);
}

const devicesData = [
  {
    id: "DEV001",
    data: {
      categoryId: "CAT001", categoryName: "Smartphone", brand: "Apple", name: "iPhone 11",
      year: 2019, baseWeight: 0.194, batteryType: "Li-Ion", screenType: "LCD", pcbType: "Multi-layer",
      materialProfileId: "MAT001", configId: "CFG001"
    }
  },
  {
    id: "DEV002",
    data: {
      categoryId: "CAT001", categoryName: "Smartphone", brand: "Apple", name: "iPhone 12",
      year: 2020, baseWeight: 0.164, batteryType: "Li-Ion", screenType: "OLED", pcbType: "Multi-layer",
      materialProfileId: "MAT002", configId: "CFG002"
    }
  },
  {
    id: "DEV003",
    data: {
      categoryId: "CAT001", categoryName: "Smartphone", brand: "Samsung", name: "Galaxy S21",
      year: 2021, baseWeight: 0.171, batteryType: "Li-Ion", screenType: "AMOLED", pcbType: "Multi-layer",
      materialProfileId: "MAT003", configId: "CFG003"
    }
  },
  {
    id: "DEV004",
    data: {
      categoryId: "CAT002", categoryName: "Laptop", brand: "Dell", name: "Inspiron 15",
      year: 2021, baseWeight: 1.85, batteryType: "Li-Ion", screenType: "LCD", pcbType: "Multi-layer",
      materialProfileId: "MAT004", configId: "CFG004"
    }
  },
  {
    id: "DEV005",
    data: {
      categoryId: "CAT003", categoryName: "Monitor", brand: "LG", name: "24MP59G",
      year: 2020, baseWeight: 3.2, batteryType: "None", screenType: "IPS LCD", pcbType: "Standard",
      materialProfileId: "MAT005", configId: "CFG005"
    }
  }
];

const materialProfilesData = [
  {
    id: "MAT001",
    data: {
      materialsPercentage: { "Copper": 0.08, "Aluminium": 0.05, "Iron/Steel": 0.02, "Plastic": 0.34, "Glass": 0.30, "PCB": 0.07, "Battery": 0.06 },
      preciousMetalsGrams: { "Gold": 0.034, "Silver": 0.34, "Palladium": 0.015, "Lithium": 3.1, "Cobalt": 6.4 }
    }
  },
  {
    id: "MAT002",
    data: {
      materialsPercentage: { "Copper": 0.07, "Aluminium": 0.06, "Iron/Steel": 0.02, "Plastic": 0.36, "Glass": 0.28, "PCB": 0.08, "Battery": 0.06 },
      preciousMetalsGrams: { "Gold": 0.031, "Silver": 0.32, "Palladium": 0.014, "Lithium": 3.0, "Cobalt": 6.1 }
    }
  },
  {
    id: "MAT003",
    data: {
      materialsPercentage: { "Copper": 0.08, "Aluminium": 0.05, "Iron/Steel": 0.03, "Plastic": 0.35, "Glass": 0.27, "PCB": 0.08, "Battery": 0.07 },
      preciousMetalsGrams: { "Gold": 0.036, "Silver": 0.35, "Palladium": 0.016, "Lithium": 3.3, "Cobalt": 6.5 }
    }
  },
  {
    id: "MAT004",
    data: {
      materialsPercentage: { "Copper": 0.11, "Aluminium": 0.13, "Iron/Steel": 0.18, "Plastic": 0.24, "Glass": 0.12, "PCB": 0.08, "Battery": 0.09 },
      preciousMetalsGrams: { "Gold": 0.041, "Silver": 0.41, "Palladium": 0.018, "Lithium": 11, "Cobalt": 22 }
    }
  },
  {
    id: "MAT005",
    data: {
      materialsPercentage: { "Copper": 0.09, "Aluminium": 0.08, "Iron/Steel": 0.16, "Plastic": 0.18, "Glass": 0.41, "PCB": 0.04, "Battery": 0 },
      preciousMetalsGrams: { "Gold": 0, "Silver": 0, "Palladium": 0, "Lithium": 0, "Cobalt": 0 }
    }
  }
];

const recyclerPricingData = [
  {
    id: "REC001",
    data: {
      name: "GreenCycle",
      rates: { "Copper": 870, "Aluminium": 210, "PCB": 4000, "Battery": 150, "Gold": 7800, "Silver": 95, "Plastic": 25 }
    }
  },
  {
    id: "REC002",
    data: {
      name: "EcoRecycle India",
      rates: { "Copper": 860, "Aluminium": 205, "PCB": 3850, "Battery": 145, "Gold": 7750, "Silver": 93, "Plastic": 22 }
    }
  },
  {
    id: "REC003",
    data: {
      name: "Attero",
      rates: { "Copper": 890, "Aluminium": 215, "PCB": 4200, "Battery": 165, "Gold": 7900, "Silver": 98, "Plastic": 28 }
    }
  },
  {
    id: "REC004",
    data: {
      name: "E-Parisaraa",
      rates: { "Copper": 850, "Aluminium": 200, "PCB": 3800, "Battery": 140, "Gold": 7700, "Silver": 90, "Plastic": 20 }
    }
  },
  {
    id: "REC005",
    data: {
      name: "Cerebra Green",
      rates: { "Copper": 875, "Aluminium": 212, "PCB": 4050, "Battery": 155, "Gold": 7850, "Silver": 96, "Plastic": 26 }
    }
  }
];

async function seedDatabase() {
  try {
    const batch = db.batch();

    console.log("Seeding Devices...");
    devicesData.forEach(({ id, data }) => {
      const docRef = db.collection('Devices').doc(id);
      batch.set(docRef, data);
    });

    console.log("Seeding MaterialProfiles...");
    materialProfilesData.forEach(({ id, data }) => {
      const docRef = db.collection('MaterialProfiles').doc(id);
      batch.set(docRef, data);
    });

    console.log("Seeding RecyclerPricing...");
    recyclerPricingData.forEach(({ id, data }) => {
      const docRef = db.collection('RecyclerPricing').doc(id);
      batch.set(docRef, data);
    });

    await batch.commit();
    console.log("Database successfully seeded!");
    process.exit(0);
  } catch (error) {
    console.error("Error seeding database:", error);
    process.exit(1);
  }
}

seedDatabase();
