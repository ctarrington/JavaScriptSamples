nvm use    
npm install -g typescript    
npm install -g concurrently    
npm install -g nodemon    
npm install -g tslint    
npm install -g typings    
npm install -g browser-sync    

typings install    

concurrently --kill-others "tsc -w --sourceMap" "browser-sync start --server"