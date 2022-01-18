import { Request, Response } from "express";
import Database from "../../../core/data/connections/Database";
import { User } from "../../../core/data/database/entities/User"

const usrNenc = "Usuário não encntrado"

export default class UsersController {
	// Add a user
	public async store(req: Request, res: Response) {
		const connection = new Database().getConnection();
		const { name, password } = req.body;
		const userExists: User | undefined = await User.findOne({where: [{name: name}]})
		if (userExists)  return res.status(400).send("Usuário já existe !")

		try {
			const newUser: User = await new User(name.slice(0,19), password.slice(0,14)).save();
			return res.status(200).json(newUser);
		} catch {
			return res.status(400).send("Não foi possível criar o usuário");
		}
	}

	// Check the user's password
	public async index(req: Request, res: Response) {
		const connection = new Database().getConnection();
		const { name, password }: { name: string; password: string } = req.body;

		try {
			const userExist: User | undefined = await User.findOne({where: [{name: name}]})
			if ( ! userExist ) return res.status(404).send(`${usrNenc}`)

			if (userExist.password !== password) return res.status(400).send("Senha incorreta");

			return res.status(200).send(`${userExist.uid}`);
		} catch {
			return res.status(400).send("Não foi possível verificar o usuário");
		}
	}

	// List all Users
	public async view(req: Request, res: Response) {
		const connection = new Database().getConnection();
		const allUsers = await User.find()
		return res.status(200).render('users', {data:allUsers});  // To EJS
	}

	// Delete an user
	public async destroy(req: Request, res: Response) {
		const connection = new Database().getConnection();
		const user_id:number = Number(req.params.userid)
		const findUser: User | undefined = await User.findOne(user_id)
		if (!findUser) return res.status(404).send(`${usrNenc}`);
		const temp:object={name: findUser.name, password: findUser.password}
		const remove = await User.remove(findUser)
		return res.status(200).json(temp);
	}

	// Find one user to start the edit process
	public async index2(req: Request, res: Response) {
		const connection = new Database().getConnection();
		const user_id:number = Number(req.params.userid)
		const findUser: User | undefined = await User.findOne({
			where: [ {uid: user_id}]});
			const temp:object = { name: findUser!.name, password: findUser!.password };
			return res.status(200).json(temp);
	}

	// Store the edited user
	public async update(req: Request, res: Response) {
		const connection = new Database().getConnection();
		const user_id:number = Number(req.params.userid);
		const { name, password }: { name: string; password: string } = req.body;
		// empty password is not allowed
		if ( password.replace(/\s+/g,'') === '') return res.status(400).send("Senha vazia !");

		const findUser: User | undefined = await User.findOne({
			where: [ {uid: user_id}]});
		findUser!.name = name;
		findUser!.password = password;
		await User.save(findUser!);
		const temp:object = { name: name, password: password }
		return res.status(200).json(temp);
	}
}
