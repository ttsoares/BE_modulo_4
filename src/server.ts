// Importar a função Express e seu objetos request e response
import express, { Request, Response } from "express";

import 'dotenv/config'
import cors from 'cors';

// Importar a função necessária para o TypeORM
import "reflect-metadata";

// Imortar as clases com as definições de rotas e controles
import UsersRoutes from "./features/users/routes/Routes";
import MessagesRoutes from "./features/messages/routes/Routes";

// Imortar a classe cujos métodos fazem a conexão do Node com o P_SQL
import Database from "./core/data/connections/Database";

// Clona a função express() criando a função 'app'
const app = express();

// Conecta o middleware json() na instância 'app'
app.use(express.json());

app.use(cors())
app.set('view engine', 'ejs');
//app.use(express.urlencoded({ extended: false }));

// rota de teste
app.get("/", (req: Request, res: Response) => {
	res.send("OK");
});

// Instanciamento das classes e respectivas inicializações.
const usersRoutes = new UsersRoutes().init();
const messagesRoutes = new MessagesRoutes().init();

// Inserir na função 'app' os respectivos objetos vinculados a cada tabela
app.use(usersRoutes);
app.use(messagesRoutes);

const port = process.env.PORT || 7777

// Abrir a coneção como o PSQL e associar a ela o serviço Express
// na porta 'port'
new Database()
	.openConnection()
	.then(() => app.listen(port, () => console.log(`Server up on PORT ${port}`)));
