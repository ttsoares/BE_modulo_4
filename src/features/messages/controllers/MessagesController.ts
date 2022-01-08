import { Request, Response } from "express";
import Database from "../../../core/data/connections/Database";

import { Message } from "../../../core/data/database/entities/Messages"

export default class messagesController {

	// Add a message
	public async storeMsgs(req: Request, res: Response) {
		const connection = new Database().getConnection();

		const user_id:number = Number(req.params.userid)
		const { description, details } = req.body;

		// const result = await connection.query(
		// 	`insert into messages(description, details, user_id)
		// 	 values ('${description}', '${details}', '${user_id}')
		// `);

		const result: Message = await new Message(description.slice(0,44), details.slice(0,149), user_id).save();

		const temp:object = { details: details, description: description, user_id: user_id }
		return res.status(200).json(temp);
	}

	// Get all messages form a user
	public async indexMsgs(req: Request, res: Response) {
		const connection = new Database().getConnection();

		const user_id:number = Number(req.params.userid)

		// const messages: Array<Object> = await connection.query(`select uid, description,
		// 	details from messages WHERE user_id = '${user_id}'`);

		const messages = await Message.find( { where: [ { user_id: user_id } ] } )

		return res.status(200).render('messages', {data:messages});  // To EJS
	}

	// Find one message to start the edit process
	public async view(req: Request, res: Response) {
		const connection = new Database().getConnection();

		const user_id:number = Number(req.params.userid)
		const message_id:number = Number(req.params.messageid)

		// const message = await connection.query(
		// 	`select uid, details, description from messages where uid = '${message_id}'
		// 	 AND user_id = '${user_id}'`);

		const message: Message | undefined = await Message.findOne({
			where: [ {uid: message_id, user_id: user_id} ]
		})

		if (message) {
			const temp:object = { details: message.details, description: message.description }
			return res.status(200).json(temp);
		} else {
			res.status(400).send("Error");
		}
	}

	// Store the edited message
	public async update(req: Request, res: Response) {
		const connection = new Database().getConnection();

		const user_id:number = Number(req.params.userid)
		const message_id:number = Number(req.params.messageid)
		const { description, details }: { description: string; details: string } = req.body;

		if ( user_id && message_id && description && details ) {

			// const result = await connection.query(`
      //   UPDATE messages SET description='${description}', details='${details}' WHERE uid = '${message_id}' AND user_id = '${user_id}'
      //   `);

			const message: Message | undefined = await Message.findOne({
				where: [ {uid: message_id, user_id: user_id} ]
			})

			if (message) {
				message.description = description;
				message.details = details
				await Message.save(message);
				const temp:object = { details: details, description: description }
				return res.status(200).json(temp);
			} else {
					return res.status(400).send("Mensagem não encontrada !");
			}

		} else {
			return res.status(400).send("Parâmetros faltando");
		}
	}

	// remove a message
	public async destroyMsgs(req: Request, res: Response) {
		const connection = new Database().getConnection();

		const user_id:number = Number(req.params.userid)
		const message_id:number = Number(req.params.messageid)

		if ( user_id && message_id) {

			// const message = await connection.query(
			// 	`select * from messages where uid='${message_id}' AND user_id = '${user_id}'`);

			const message: Message | undefined = await Message.findOne({
				where: [ {uid: message_id, user_id: user_id} ]
			})

			if (message) {
				const temp:object={details: message.details, description: message.description}

				// const result = await connection.query(
				// 	`DELETE FROM messages WHERE uid='${message_id}' AND user_id = '${user_id}'`);

				const remove = await Message.remove(message!)
				return res.status(200).json(temp);
			} else {
					return res.status(400).send("Mensagem não encontrada");
			}
		} else {
			return res.status(400).send("Parâmetros faltando");
		}
	}
}
