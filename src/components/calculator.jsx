
function convertToGravityUnits(value) {
  return (value / 1000) + 1;
}

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