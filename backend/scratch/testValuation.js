const ValuationEngineService = require('../src/services/valuationEngine.service');

async function test() {
  try {
    const result = await ValuationEngineService.calculateValuation('DEV001', 'REC001');
    console.log(JSON.stringify(result, null, 2));
    process.exit(0);
  } catch (error) {
    console.error("Test failed:", error);
    process.exit(1);
  }
}

test();
