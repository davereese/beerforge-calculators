// CONSTANTS
const trubLoss = 0.5; // gal
const shrinkage = 4; // 4%
const equipmentLoss = 1; // gal
const absorptionRate = 0.15; // gal/lb of grain


// PRIVATE FUNCTIONS

function convertToGravityUnits(value) {
  return ((value / 1000) + 1).toFixed(3);
}

function convertToGravityPoints(gravity) {
  return (gravity - 1) * 1000;
}

function convertToPlato(SG) {
  // E = -668.962 + (1262.45 * SG) - (776.43 * SG^2) + (182.94 * SG^3)  - specific gravity to plato
  const E = -668.962 + (1262.45 * SG) - (776.43 * Math.pow(SG, 2)) + (182.94 * Math.pow(SG, 3));
  return E;
}

function calculateRealExtract(OE, AE) {
  // RE (real extract) = (0.8114 * AE) + (0.1886 * OE)
  const RE = (0.8114 * AE) + (0.1886 * OE);
  return RE;
}


// PUBLIC FUNCTIONS

// * Total Water
export function totalWater(batchSize, boilTime, boilOff, grainWeight) {
  // boilTime is in hours, hense (boilTime / 60)
  // totalWater = (((batchSize + trubLoss) / (1 - (shrinkage / 100))) / (1 - (boilTime * (boilOff / 100)))) + equipmentLoss + (grainWeight * absorptionRate)

  const totalWater = (((batchSize + trubLoss) / (1 - (shrinkage / 100))) / (1 - ((boilTime / 60) * (boilOff / 100)))) + equipmentLoss + (grainWeight * absorptionRate);
  return totalWater.toFixed(2);
}

// * Strike Water Volume
export function strikeVolume(grainWeight, ratio = 1.5) {
  const sVol = (ratio * grainWeight) / 4;
  return sVol;
}

// * Strike Water Temperature
export function strikeTemp(grainTemp, targetTemp, ratio, vGrain, strikeVolume) {
  // R - ratio of water to grain, T1 - initial temp of grain, T2 - mash temp target
  // Strike Water Temperature Tw = (0.2 / R)(T2 - T1) + T2
  const Tw = ((0.2 / ratio) * (targetTemp - grainTemp) + parseInt(targetTemp)).toFixed(2);
  return Tw;
}

// * Sparge Water Volume
export function spargeVolume(totalWater, mashVolume) {
  return (totalWater - mashVolume).toFixed(2);
}

// Boil-Off Evaporation Percentage
export function evaporationPercent(postBoilV, preBoilV, minutes) {
  // 100 - (postBoil volume * 100 / preBoil volume)
  const result = (100 - (postBoilV * 100 / preBoilV)) / (minutes / 60);
  return result.toFixed(1);
}

// * Pre-Boil Gravity
export function preBoilG(OG, grainVol, totalWaterVol, vol) {
  const PBVol = preBoilVol(totalWaterVol, grainVol);
  // Pre-boil specific gravity points = (Post-boil volume * Post-boil gravity points) / Pre-boil volume
  const PreBoilG = (vol * convertToGravityPoints(OG)) / PBVol;

  // convert back to gravity units and return
  return convertToGravityUnits(PreBoilG);
}

// * Pre-Boil Volume
export function preBoilVol(totalWaterVol, grainVol) {
  // totalWaterVol - (grainVol * absorptionRate) - equipmentLoss
  const result = totalWaterVol - (grainVol * absorptionRate) - equipmentLoss;
  return result.toFixed(2)
}

// * Original Gravity
export function OG(malts, efficiency, volume) {
  let totalPoints = 0,
      OG = null;

  for ( let i = 0; i < malts.length; i++ ) {
    totalPoints += convertToGravityPoints(malts[i].potential) * malts[i].weight;
  }

  // multiply by efficiency factor
  OG = totalPoints * (efficiency/100) / volume;

  // convert back to gravity units and return
  return convertToGravityUnits(OG);
}

// * Final Gravity
export function FG(OG, attenuation) {
  // (Gravity points - (Gravity points * Attenuation rate%) + 1000) / 1000
  const gravity = convertToGravityPoints(OG);
  const aPercentage = attenuation/100;

  return ((gravity - (gravity * aPercentage) + 1000) / 1000).toFixed(3);
}

// * Alcohol Content
export function alcoholContent(OG, FG, type = 'ABV') {
  // ABW = (OE - RE) / (2.0665 - (.010665 * OE) )      - alcohol by weight
  // ABV = (ABW * (FG / .794) )                        - alcohol by vol
  const OE = convertToPlato(OG);
  const AE = convertToPlato(FG);
  const RE = calculateRealExtract(OE, AE);
  const ABW = (OE - RE) / (2.0665 - (.010665 * OE) );
  const ABV = (ABW * (FG / .794) ).toFixed(2);

  const result = type === 'ABW' ? ABW : ABV;

  return result;
}

// * Attenuation
export function attenuation(OG, FG) {
  // A = 100 * (OG – FG)/(OG – 1.0)
  const A = (100 * (OG - FG)/(OG - 1.0)).toFixed(1);
  return A;
}