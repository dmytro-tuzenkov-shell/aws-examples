import { bootstrap } from './src/bootstrap';
import { container } from './src/ioc';

;(async () => {
        
      const app = bootstrap(container);
      const { statusCode, json } = await app.handle(null, null);
    
      console.log({ statusCode, json });

})()