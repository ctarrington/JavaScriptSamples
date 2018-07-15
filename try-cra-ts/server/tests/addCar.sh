#!/bin/bash

curl -i -H "Content-Type: application/json" -d '{"make":"Subaru","model":"Outback", "cylinders": 4, "horsePower": 105, "mpg": 28}' http://localhost:3001/cars