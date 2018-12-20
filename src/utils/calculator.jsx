
// PRIVATE FUNCTIONS

function convertToGravityUnits(value) {
  return (value / 1000) + 1;
}


// PUBLIC FUNCTIONS

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

export function PreBoilG(OG, boilTime, vol, evap) {
  const PBVol = preBoilVol(boilTime, vol, evap);
  // Pre-boil specific gravity points = (Post-boil volume * Post-boil gravity points) / Pre-boil volume
  const PreBoilG = Math.round( ((vol * (OG - 1) * 1000) / PBVol) * 1 ) / 1;

  // convert back to gravity units and return
  return convertToGravityUnits(PreBoilG);
}

export function preBoilVol(boilTime, vol, evap) {
  // calculate pre-boil volume: PBVol = vol + (1.5 * hours) 1.5 is assumed boiling losses (gal)
  const hrs = parseInt(boilTime) / 60;
  const PBVol = (evap * hrs) + parseInt(vol);

  return PBVol;
}