import { Request, Response } from "express";
import Database from "../../../core/data/connections/Database";
import { Message } from "../../../core/data/database/entities/Message"

export default class messagesController {
	// Add a message
	public async store(req: Request, res: Response) {
		const connection = new Database().getConnection();
		const user_id:number = Number(req.params.userid);
		const { description, details } = req.body;
		const result: Message = await new Message(description.slice(0,44), details.slice(0,149), user_id).save();
		const temp:object = { details: details, description: description, user_id: user_id };
		return res.status(200).json(temp);
	}

	// Get all messages form a user
	public async view(req: Request, res: Response) {
		const connection = new Database().getConnection();
		const user_id:number = Number(req.params.userid);
		const messages = await Message.find( { where: [ { user_id: user_id}]});
		return res.status(200).render('messages', {data:messages});  // To EJS
	}

	// Find one message to start the edit process
	public async index(req: Request, res: Response) {
		const connection = new Database().getConnection();
		const user_id:number = Number(req.params.userid);
		const message_id:number = Number(req.params.messageid);
		const message: Message | undefined = await Message.findOne({
			where: [ {uid: message_id, user_id: user_id} ]});
		const temp:object = { details: message!.details, description: message!.description };
		return res.status(200).json(temp);
	}

	// Store the edited message
	public async update(req: Request, res: Response) {
		const connection = new Database().getConnection();
		const user_id:number = Number(req.params.userid);
		const message_id:number = Number(req.params.messageid);
		const { description, details }: { description: string; details: string } = req.body;
		const message: Message | undefined = await Message.findOne({
			where: [ {uid: message_id, user_id: user_id} ]});
		message!.description = description;
		message!.details = details;
		await Message.save(message!);
		const temp:object = { details: details, description: description };
		return res.status(200).json(temp);
	}

	// remove a message
	public async destroy(req: Request, res: Response) {
		const connection = new Database().getConnection();
		const user_id:number = Number(req.params.userid);
		const message_id:number = Number(req.params.messageid);
		const message: Message | undefined = await Message.findOne({
			where: [ {uid: message_id, user_id: user_id} ]});
		const temp:object={details: message!.details, description: message!.description}
		const remove = await Message.remove(message!);
		return res.status(200).json(temp);
	}
}
