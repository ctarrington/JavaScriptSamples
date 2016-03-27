nvm use    
npm install -g typescript    
npm install -g concurrently       
npm install -g tslint    
npm install -g typings    
npm install -g browser-sync    

typings install    

concurrently "tslint *.ts" "tsc -w --sourceMap" "browser-sync start --server"