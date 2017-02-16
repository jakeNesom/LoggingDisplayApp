
import { InMemoryDbService } from 'angular-in-memory-web-api';


export class InMemoryDataService implements InMemoryDbService {

    createDb() {

        let loggerData = [

            {id: 1, client: "Client 1", time: "12:00:00"},
            {id: 2, client: "Client 1", time: "12:01:00"},
            {id: 3, client: "Client 2", time: "12:010:00"},
            {id: 4, client: "Client 1", time: "12:03:00"},
            {id: 5, client: "Client 3", time: "12:31:00"},
            {id: 6, client: "Client 2", time: "12:32:00"},
            {id: 7, client: "Client 1", time: "12:33:00"},
            {id: 8, client: "Client 4", time: "12:29:00"},
            {id: 9, client: "Client 3", time: "12:16:00"},
            {id: 10, client: "Client 1", time: "12:20:00"}
            
        ];
    

        return { loggerData };
    }

    
}