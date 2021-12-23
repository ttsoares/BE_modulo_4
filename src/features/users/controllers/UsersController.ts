import { Request, Response } from "express";
import Database from "../../../core/data/connections/Database";

export default class UsersController {

	// cadastra um usuário
	public async store(req: Request, res: Response) {
		const connection = new Database().getConnection();
		const { name, password } = req.body;

		// verificar se o 'name' já existe
		const exist: Array<Object> = await connection.query(`select FROM users WHERE name = '${name}'`);

		if (exist.length) { // se volta 0 segue o código
			return res.status(400).send("user existe")
		}

		const result = await connection.query(
			`insert into users(name, password) values('${name}', '${password}')`);

		console.log(result);
		return res.status(200).json(result);
	}

	// verifica a senha de um usuário
	public async index(req: Request, res: Response) {
		const connection = new Database().getConnection();

		const { name, password }: { name: string; password: string } = req.body;

		// verificar se o 'name' já existe
		const exist: Array<Object> = await connection.query(`SELECT name FROM users WHERE name = '${name}'`);

		if (!exist.length) { // se volta um nome segue o código
			return res.status(400).send("usuário não existe")
		}

		const userID: Array<Object> = await connection.query(`SELECT uid FROM users WHERE
			name = '${name}' AND password = '${password}'`);

		if (userID.length) {
			return res.status(200).send(true); // senha correta
		} else {
			return res.status(400).send(false); // senha incorreta
		}
	}
}
