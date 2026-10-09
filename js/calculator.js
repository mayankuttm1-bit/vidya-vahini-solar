/**
 * Vidya Vahini Solar Agency & Risaenergy Pvt Ltd
 * Interactive Solar & PM Surya Ghar Subsidy Calculator Engine
 * (Zero PDF Dependencies - Instant On-Screen Sizing & WhatsApp Dossier)
 */

const SOLAR_CONFIG = {
  averageTariff: 7.5,           // INR per kWh (UPPCL Domestic average)
  sunHoursPerDay: 4.5,          // Average peak solar hours in Prayagraj region
  daysPerMonth: 30,
  costPerKw: 60000,             // INR per kW turnkey (Tier-1 hardware)
  maxCentralSubsidy: 78000,     // Central MNRE DBT limit (3kW+)
  upStateTopUpPerKw: 3000,      // UP State subsidy top-up per kW
  maxUpStateSubsidy: 30000,     // UP State maximum top-up cap
  whatsappNumber: '918953011508' // Official Field & Inquiry Line
};

function formatINR(number) {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0
  }).format(number);
}

function calculateSolarPlan(monthlyBill) {
  // 1. Calculate monthly units consumed
  const monthlyUnits = monthlyBill / SOLAR_CONFIG.averageTariff;
  
  // 2. Daily units required
  const dailyUnits = monthlyUnits / SOLAR_CONFIG.daysPerMonth;
  
  // 3. Recommended system capacity (kW) - rounded to nearest 0.5 kW, minimum 1 kW
  let rawKw = dailyUnits / SOLAR_CONFIG.sunHoursPerDay;
  let recommendedKw = Math.max(1, Math.round(rawKw * 2) / 2);
  
  // 4. Gross Estimated Turnkey Cost
  const grossCost = recommendedKw * SOLAR_CONFIG.costPerKw;
  
  // 5. Central Government MNRE Subsidy (PM Surya Ghar)
  let centralSubsidy = 0;
  if (recommendedKw >= 3) {
    centralSubsidy = 78000;
  } else if (recommendedKw >= 2) {
    centralSubsidy = 60000;
  } else {
    centralSubsidy = 30000;
  }
  
  // 6. Uttar Pradesh State Government Top-Up Subsidy
  let stateSubsidy = Math.min(SOLAR_CONFIG.maxUpStateSubsidy, recommendedKw * SOLAR_CONFIG.upStateTopUpPerKw);
  const totalSubsidy = centralSubsidy + stateSubsidy;
  
  // 7. Net Investment Required by Consumer
  const netInvestment = Math.max(0, grossCost - totalSubsidy);
  
  // 8. Financial Return & Savings
  const annualSavings = monthlyBill * 12;
  const paybackYears = (netInvestment / annualSavings).toFixed(1);
  const lifetime25YearSavings = (annualSavings * 25) - netInvestment;
  const co2OffsetTonnes = ((monthlyUnits * 12 * 0.82 * 25) / 1000).toFixed(1);

  return {
    recommendedKw,
    monthlyUnits: Math.round(monthlyUnits),
    grossCost,
    centralSubsidy,
    stateSubsidy,
    totalSubsidy,
    netInvestment,
    annualSavings,
    paybackYears: paybackYears > 0 ? paybackYears : '2.5',
    lifetime25YearSavings,
    co2OffsetTonnes
  };
}

function updateCalculatorUI(bill) {
  const result = calculateSolarPlan(bill);

  // Update DOM elements if present
  const elBillVal = document.getElementById('calc-bill-value');
  const elKw = document.getElementById('calc-recommended-kw');
  const elUnits = document.getElementById('calc-monthly-units');
  const elGross = document.getElementById('calc-gross-cost');
  const elSubsidy = document.getElementById('calc-total-subsidy');
  const elNet = document.getElementById('calc-net-cost');
  const elAnnual = document.getElementById('calc-annual-savings');
  const elPayback = document.getElementById('calc-payback-years');
  const elLifetime = document.getElementById('calc-lifetime-savings');
  const elCo2 = document.getElementById('calc-co2-offset');
  const elWhatsAppBtn = document.getElementById('calc-whatsapp-btn');

  if (elBillVal) elBillVal.textContent = formatINR(bill);
  if (elKw) elKw.textContent = `${result.recommendedKw} kW`;
  if (elUnits) elUnits.textContent = `${result.monthlyUnits} Units`;
  if (elGross) elGross.textContent = formatINR(result.grossCost);
  if (elSubsidy) elSubsidy.textContent = `- ${formatINR(result.totalSubsidy)}`;
  if (elNet) elNet.textContent = formatINR(result.netInvestment);
  if (elAnnual) elAnnual.textContent = `${formatINR(result.annualSavings)}/yr`;
  if (elPayback) elPayback.textContent = `${result.paybackYears} Years`;
  if (elLifetime) elLifetime.textContent = formatINR(result.lifetime25YearSavings);
  if (elCo2) elCo2.textContent = `${result.co2OffsetTonnes} Tonnes`;

  // Trigger tactile pop animation on key dynamic figures
  [elKw, elSubsidy, elNet, elAnnual].forEach(el => {
    if (el) {
      el.classList.remove('calc-pop');
      void el.offsetWidth;
      el.classList.add('calc-pop');
    }
  });

  // Dynamic WhatsApp pre-filled dossier link
  if (elWhatsAppBtn) {
    const message = `Hello Vidya Vahini Solar Agency,

I calculated my rooftop solar requirements on your website:
• Monthly Electricity Bill: ${formatINR(bill)}
• Recommended System: ${result.recommendedKw} kW Rooftop Solar
• Estimated Project Cost: ${formatINR(result.grossCost)}
• PM Surya Ghar Govt Subsidy: ${formatINR(result.totalSubsidy)}
• Net Investment: ${formatINR(result.netInvestment)}
• Estimated Payback: ${result.paybackYears} Years

Please arrange a free site survey in Prayagraj and send a formal quotation.`;

    const encoded = encodeURIComponent(message);
    elWhatsAppBtn.href = `https://wa.me/${SOLAR_CONFIG.whatsappNumber}?text=${encoded}`;
  }
}

// Initialize on DOMContentLoaded
document.addEventListener('DOMContentLoaded', () => {
  const slider = document.getElementById('solar-bill-slider');
  if (slider) {
    // Initial calculation
    updateCalculatorUI(parseInt(slider.value, 10));

    // Listen to slider changes
    slider.addEventListener('input', (e) => {
      updateCalculatorUI(parseInt(e.target.value, 10));
    });
  }
});
