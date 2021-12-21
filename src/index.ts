import express, {Request, Response} from 'express';
const app = express();

import 'dotenv/config'

import cors from 'cors';
app.use(cors())

app.set('view engine', 'ejs');

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

const port = process.env.PORT || 7777

app.listen(port, () => {
	console.log(`Server up on PORT ${port}`)
});

// ***************************************************************
// The 'userID' _is_ the index of the element user inside AllUsers
// The array Msgs starts from zero for each user

class Msgs {
	constructor(public description:string, public details: string ){}
}
class User {
	constructor(public name:string, public password:string, public messages: Msgs[]=[]) {}
}

// The database allways starts with these two objects
let AllUsers:User[] = [
    {
      name: "marcio",
      password: "123",
      messages: [
        {
          description: "AAA",
          details: "aaaaaaaaaaa"
        },
				{
          description: "BBB",
          details: "bbbbbbbbbb"
        }
      ]
    },
		{
      name: "paulo",
      password: "321",
      messages: [
        {
          description: "CCC",
          details: "ccccccccccccc"
        },
				{
          description: "DDD",
          details: "ddddddddddddddd"
        }
      ]
    }
  ]
let Ident: number = 1  // LAST INDEX OF THE AllUsers ARRAY

// ****************************************************************
app.get('/', function(req, res){
	return res.status(200).send("<h1>RODANDO !</H1>")
})

// ****************************************************************

// CREATE A USER
app.post('/user', (req: Request, res: Response) => {
  const { name, pass }: { name: string; pass: string } = req.body;

	let flag = false
	AllUsers.forEach((elm) => {
		console.log("...............")
		console.log(name, elm.name)

    if (elm.name == name){
			console.log("EXISTE !!!!")
			flag = true
		}
  })

	if (flag) {
		return res.status(400).send("exist")
	}

	Ident++
	let tempMsgs:Msgs[] = []
	const temp:User = new User(name, pass, tempMsgs)
	AllUsers.push(temp)

	const index = AllUsers.length - 1

	return res.status(200).json(AllUsers[index])
})

// GET MESSAGES FROM AN USER
app.get('/user/:userid', (req: Request, res: Response) => {
	const userID:number = Number(req.params.userid)

	const data:Array<Msgs> = [...AllUsers[userID].messages]

	return res.status(200).render('messages', {data:data})

})

// ADD MESSAGES TO AN USER
app.post('/user/:userid', (req: Request, res: Response) => {
	const userID:number = Number(req.params.userid)
	const { description, details }: { description: string; details: string } = req.body;

	const temp:Msgs = new Msgs(description, details)
	AllUsers[userID].messages.push(temp)

	const index = AllUsers[userID].messages.length - 1
	return res.status(200).json(AllUsers[userID].messages[index])
})

// DELETE MESSAGES FROM AN USER
app.delete('/user/:userid/message/:messageid', (req: Request, res: Response) => {
	const userID:number = Number(req.params.userid)
	const messageID:number = Number(req.params.messageid)

	const temp:Msgs = AllUsers[userID].messages[messageID]
	AllUsers[userID].messages.splice(messageID,1)
	return res.status(200).json(temp)
})

// RETURN ONE MESSAGE FROM AN USER
app.get('/user/:userid/message/:messageid', (req: Request, res: Response) => {
	const userID:number = Number(req.params.userid)
	const messageID:number = Number(req.params.messageid)

	const temp:Msgs = AllUsers[userID].messages[messageID]

	return res.status(200).send(temp)
})


// SAVE EDITED MESSAGE FROM AN USER
app.put('/user/:userid/message/:messageid', (req: Request, res: Response) => {
	const userID:number = Number(req.params.userid)
	const messageID:number = Number(req.params.messageid)

	const { description, details }: { description: string; details: string } = req.body;

	AllUsers[userID].messages[messageID].description = description
	AllUsers[userID].messages[messageID].details = details

	const temp:Msgs = AllUsers[userID].messages[messageID]
	return res.status(200).json(temp)
 })

//¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨

// LIST ALL USERNAMES
app.get('/all', (req: Request, res: Response) => {

	const temp:any[] = []
	 AllUsers.forEach( (elm) => {
		 const { password, messages, ...name } = elm
		 temp.push(name)
	 })

	return res.status(200).json(temp)
})

// GET USER PASS
app.put('/pass', (req: Request, res: Response) => {
  const { name, pass }: { name: string; pass: string } = req.body;

		const indice = AllUsers.findIndex(elm => elm.name == name)

		if (indice < 0) return res.status(400).send(`${name} não existe`)

			if (AllUsers[indice].password == pass) {
				res.status(200).send(`${indice}`)
				res.end()
				return
			}
})
