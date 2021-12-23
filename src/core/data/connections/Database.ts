// importa duas funções do typeorm
import { Connection, createConnection } from 'typeorm';

// definição da classe 'Database'
export default class Database {

    // criação do objeto connection do tipo Connection
    private static connection: Connection;

    // definição do método getConnection do tipo Connection
    public getConnection(): Connection {
// o que é este \/ 'Database' ?
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
                console.error('ERRO AO CONECTAR NO BANCO ->', error)
            }
        }
    }

}
