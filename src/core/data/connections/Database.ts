// importa duas funções do typeorm
import { Connection, createConnection } from 'typeorm';

// definição da classe 'Database'
export default class Database {

    // criação do objeto connection do tipo Connection
    private static connection: Connection;

    // definição do método getConnection do tipo Connection
    public getConnection(): Connection {

        if (Database.connection === null || Database.connection === undefined) {
            throw new Error('CONEXAO_DATABASE_NAO_ABERTA');
        }
        return Database.connection;
    }

    public async openConnection(): Promise<void> {
        if (Database.connection === null || Database.connection === undefined) {
            try {
                // dados sobre o DB no ormconfig.js
                Database.connection = await createConnection();
            } catch (error) {
                console.error('ERRO AO CONECTAR NO BANCO ->', error);
                throw new Error(`ERRO AO CONECTAR AO BANCO -> ${error}`)
            }
        }
    }
}
