#!/bin/bash

curl -i -X PUT -H "Content-Type: application/json" -d '{"make":"Subaruuuu","model":"Outback", "cylinders": 4, "horsePower": 105, "mpg": 28}' http://localhost:3001/cars/0