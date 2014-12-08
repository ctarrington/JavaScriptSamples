function createFuzzyLine(y0, slope, fuzzyness)
{
    var line = {
        y0: y0,
        slope: slope,
        fuzzyness: fuzzyness,

        getPoints: function(x0, deltaX, numPoints) {
            var points = [];
            for (var ctr = 0; ctr < numPoints; ctr++)
            {
                var noise = Math.random()*this.fuzzyness*2 - this.fuzzyness;
                var x = x0+deltaX*ctr;
                var y = this.slope*x +this.y0+noise;

                var point = [];
                point.push(x);
                point.push(y);

                points.push(point);
            }

            return points;
        }
    };

    return line;
}
