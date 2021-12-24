import { Request, Response } from "express";
import Database from "../../../core/data/connections/Database";

export default class commentsController {

	// Add a message
	public async store(req: Request, res: Response) {
		const connection = new Database().getConnection();

		const user_id:number = Number(req.params.userid)
		const { description, details } = req.body;

		// The 'uid' colummn is a Serial kind in the Messages table
		const result = await connection.query(
			`insert into messages(description, details, user_id)
			 values ('${description}', '${details}', '${user_id}')
		`);

		const temp:object = { details: details, description: description, user_id: user_id }
		return res.status(200).json(temp);
	}

	// mostra todas as mensagens
	public async index(req: Request, res: Response) {
		const connection = new Database().getConnection();

		const user_id:number = Number(req.params.userid)

		const messages: Array<Object> = await connection.query(`select uid, description,
			details from messages WHERE user_id = '${user_id}'`);

		return res.status(200).render('messages', {data:messages});  // To EJS
	}

	// busca uma mensagem para o processo de edição
	public async view(req: Request, res: Response) {
		const connection = new Database().getConnection();

		const user_id:number = Number(req.params.userid)
		const message_id:number = Number(req.params.messageid)

		const message = await connection.query(
			`select uid, details, description from messages where uid = '${message_id}'
			 AND user_id = '${user_id}'`);

		const temp:object = { details: message[0].details, description: message[0].description }
		return res.status(200).json(temp);
	}

	// grava as modificações em uma mensagem
	public async update(req: Request, res: Response) {
		const connection = new Database().getConnection();

		const user_id:number = Number(req.params.userid)
		const message_id:number = Number(req.params.messageid)
		const { description, details }: { description: string; details: string } = req.body;

		if ( user_id && message_id && description && details ) {

			const result = await connection.query(`
        UPDATE messages SET description='${description}', details='${details}' WHERE uid = '${message_id}' AND user_id = '${user_id}'
        `);

			const temp:object = { details: details, description: description }
			return res.status(200).json(temp);
		} else {
			return res.status(400).send("Parâmetros faltando");
		}
	}

	// remove uma mensagem
	public async destroy(req: Request, res: Response) {
		const connection = new Database().getConnection();

		const user_id:number = Number(req.params.userid)
		const message_id:number = Number(req.params.messageid)

		if ( user_id && message_id) {

			const message = await connection.query(
				`select * from messages where uid='${message_id}' AND user_id = '${user_id}'`);

			const result = await connection.query(
				`DELETE FROM messages WHERE uid='${message_id}' AND user_id = '${user_id}'`);

			const temp:object={details: message[0].details, description: message[0].description}
			return res.status(200).json(temp);

		} else {
			return res.status(400).send("Parâmetros faltando");
		}
	}
}
