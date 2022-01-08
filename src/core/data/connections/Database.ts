// importa typeorm functions 
import { Connection, createConnection } from 'typeorm';

// Database class definition
export default class Database {

    // Creation of the connection object
    private static connection: Connection;

    // getConnection definition of Cnnection kind
    public getConnection(): Connection {

        if (Database.connection === null || Database.connection === undefined) {
            throw new Error('CONEXAO_DATABASE_NAO_ABERTA');
        }
        return Database.connection;
    }

    public async openConnection(): Promise<void> {
        if (Database.connection === null || Database.connection === undefined) {
            try {
                Database.connection = await createConnection();
            } catch (error) {
                console.error('ERRO AO CONECTAR NO BANCO ->', error);
                throw new Error(`ERRO AO CONECTAR AO BANCO -> ${error}`)
            }
        }
    }
}
