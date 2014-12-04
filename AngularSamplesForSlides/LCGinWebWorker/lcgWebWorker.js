function createValues(seed, size)
{
  var last = seed;
  var a = 1664525;
  var b = 1013904223;
  var m = Math.pow(2,32);
  
  var min = 1;
  var max = 0;
  var sum = 0;
  
  for (var ctr=0;ctr < size; ctr++)
  {
    var thenext = (a * last + b) % m;
    last = thenext;
    
    var ratio = thenext / (m-1);
    
    min = Math.min(min, ratio);
    max = Math.max(max, ratio);
    sum = sum + ratio;
  }
  
  var result = {
    min: min,
    max: max,
    average: sum/size
  };
  
  return result;

}


onmessage = function (evt) {
    var result = createValues(evt.data.seed, evt.data.size);
    postMessage(result);
};