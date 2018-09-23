const calculateNewPositionFromSpeedAndBearing = function(lonInDegrees: number, latInDegrees: number, speedInMetersPerSecond: number, bearingInDegrees: number, elapsedTimeInHours: number = 1 ) : {lonInDegrees: number, latInDegrees: number} {

  const speedInKph = speedInMetersPerSecond * 3600 / 1000;
  const distanceInKilometers = speedInKph * elapsedTimeInHours;

  const lonInRadians = lonInDegrees * Math.PI / 180;
  const latInRadians = latInDegrees * Math.PI / 180;
  const bearingInRadians = bearingInDegrees * Math.PI / 180;
  const angularDistance = distanceInKilometers / 6371;  // divide by earth's radius

  const lat2InRadians = Math.asin(
    Math.sin(latInRadians) * Math.cos(angularDistance) +
    Math.cos(latInRadians)*Math.sin(angularDistance)*Math.cos(bearingInRadians)
  );

  const lon2InRadians = lonInRadians + Math.atan2(
    Math.sin(bearingInRadians) * Math.sin(angularDistance) * Math.cos(latInRadians),
    Math.cos(angularDistance) - Math.sin(latInRadians) * Math.sin(lat2InRadians)
  );

  const lat2InDegrees = lat2InRadians * 180 / Math.PI;
  const lon2InDegrees = lon2InRadians * 180 / Math.PI;

  return {lonInDegrees: lon2InDegrees, latInDegrees: lat2InDegrees};
};


export {calculateNewPositionFromSpeedAndBearing};