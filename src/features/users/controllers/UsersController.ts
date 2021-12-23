import { Request, Response } from "express";
import Database from "../../../core/data/connections/Database";

export default class UsersController {

	// cadastra um usuário
	public async store(req: Request, res: Response) {
		const connection = new Database().getConnection();
		const { name, password } = req.body;

		console.log(name, password)

		// verificar se o 'name' já existe
		const exist: Array<Object> = await connection.query(`select FROM users WHERE name = '${name}'`);

		if (exist.length) { // se volta 0 segue o código
			return res.status(400).send("user existe")
		}

		await connection.query(`insert into users(name, password) values('${name}', '${password}')`);

		return res.status(200).send("OK");
	}

	// verifica a senha de um usuário
	public async index(req: Request, res: Response) {
		const connection = new Database().getConnection();

//		const { name, password }: { name: string; password: string } = req.body;
		const name = req.query.name;
		const password = req.query.password;

		console.log(name, password)


		// verificar se o 'name' já existe
		const exist: Array<Object> = await connection.query(`SELECT name FROM users WHERE name = '${name}'`);

		if (!exist.length) { // se volta um nome segue o código
			return res.status(400).send("usuário não existe")
		}
//----------------------------
		interface User_ID { uid: number; }
//-----------------------------
		const userID: Array<User_ID> = await connection.query(`SELECT uid FROM users WHERE
			name = '${name}' AND password = '${password}'`);

		if (userID.length) {
			return res.status(200).send(`${userID[0].uid}`); // senha correta
		} else {
			return res.status(400).send(false); // senha incorreta
		}
	}
}
