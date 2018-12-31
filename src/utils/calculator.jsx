
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

// * Pre-Boil Gravity
export function preBoilG(OG, boilTime, vol, evap) {
  const PBVol = preBoilVol(boilTime, vol, evap);
  // Pre-boil specific gravity points = (Post-boil volume * Post-boil gravity points) / Pre-boil volume
  const PreBoilG = (vol * convertToGravityPoints(OG)) / PBVol;

  // convert back to gravity units and return
  return convertToGravityUnits(PreBoilG);
}

// * Pre-Boil Volume
export function preBoilVol(boilTime, vol, evap) {
  // calculate pre-boil volume: PBVol = vol + (1.5 * hours) 1.5 is assumed boiling losses (gal)
  const hrs = boilTime / 60;
  const PBVol = (evap * hrs) + parseInt(vol);

  return PBVol;
}

// * Strike Temperature
export function strikeTemp(T1, T2, R = 1.5) {
  // R - ratio of water to grain, T1 - initial temp of grain, T2 - mash temp target
  // Strike Water Temperature Tw = (0.2 / R)(T2 - T1) + T2
  const Tw = ((0.2 / R) * (T2 - T1) + parseInt(T2)).toFixed(2);
  return Tw;
}

// * Strike Volume
export function strikeVolume(weight, ratio = 1.5) {
  const sVol = (ratio * weight) / 4;
  return sVol;
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