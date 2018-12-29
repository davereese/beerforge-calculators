
// PRIVATE FUNCTIONS

function convertToGravityUnits(value) {
  return (value / 1000) + 1;
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
    totalPoints += Math.round( ((malts[i].potential - 1) * 1000 * malts[i].weight) * 100 ) / 100;
  }

  // multiply by efficiency factor
  OG = Math.round( (totalPoints * (efficiency/100) / volume) * 1 ) / 1;

  // convert back to gravity units and return
  return convertToGravityUnits(OG);
}

// * Pre-Boil Gravity
export function PreBoilG(OG, boilTime, vol, evap) {
  const PBVol = preBoilVol(boilTime, vol, evap);
  // Pre-boil specific gravity points = (Post-boil volume * Post-boil gravity points) / Pre-boil volume
  const PreBoilG = Math.round( ((vol * (OG - 1) * 1000) / PBVol) * 1 ) / 1;

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

// * Final Gravity
export function FG(OG, attenuation) {
  // (Gravity-1000)-((Gravity-1000)*Attenuation rate%)+1000
  const gravity = (OG - 1) * 1000,
      aPercentage = attenuation/100;

  return Math.round( ((gravity - (gravity * aPercentage) + 1000) / 1000) * 1000 ) / 1000;
}

// * Alcohol Content
export function alcoholContent(OG, FG, type = 'ABV') {
  // ABW = (OE - RE) / (2.0665 - (.010665 * OE) )      - alcohol by weight
  // ABV = (ABW * (FG / .794) )                        - alcohol by vol

  const OE = convertToPlato(OG);
  const AE = convertToPlato(FG);
  const RE = calculateRealExtract(OE, AE);
  const ABW = (OE - RE) / (2.0665 - (.010665 * OE) );
  const ABV = Math.round( (ABW * (FG / .794) ) * 100 ) / 100;

  const result = type === 'ABW' ? ABW : ABV;

  return result;
}