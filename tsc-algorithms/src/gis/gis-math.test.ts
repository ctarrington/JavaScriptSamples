import {calculateNewPositionFromSpeedAndBearing} from './gis-math';

// tests derived using
// https://www.movable-type.co.uk/scripts/latlong.html

test('basic calculation', () => {
  const newPosition = calculateNewPositionFromSpeedAndBearing(
    -78.0,
    35.0,
    2.0,
    45.0,
    1);
  expect(newPosition.lonInDegrees).toBeCloseTo(-77.9441);
  expect(newPosition.latInDegrees).toBeCloseTo(35.0458);
});

test('north pole - diagonal down', () => {
  const newPosition = calculateNewPositionFromSpeedAndBearing(
    0.0,
    90.0,
    2.0,
    45.0,
    1);
  expect(newPosition.lonInDegrees).toBeCloseTo(90.0);
  expect(newPosition.latInDegrees).toBeCloseTo(89.93527778);
});

test('near north pole - around', () => {
  const newPosition = calculateNewPositionFromSpeedAndBearing(
    0.0,
    89.97916667,
    2.0,
    45.0,
    1);
  expect(newPosition.lonInDegrees).toBeCloseTo(118.58972222);
  expect(newPosition.latInDegrees).toBeCloseTo(89.94777778);
});