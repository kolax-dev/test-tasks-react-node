const express = require('express');
const router = express.Router();
const knex = require('../config/db');
const faker = require('faker');


/* GET users listing. */
router.get('/',  async (req, res, next) => {
	const items = await knex.select('*').from('tasks').limit(100).orderBy('create_date', 'desc');
	const tasks = items.map((item) => {
		return {
			taskTitle: item.task_title,
			key: item.key,
			dateCreation: item.create_date
		};
	});
  res.send({tasks: tasks});
});

router.post('/',  async (req, res, next) => {
	const offset = req.body.offset;	
	if (offset) {
		const items = await knex.select('*').from('tasks').offset(offset).limit(100).orderBy('create_date', 'desc');
		const tasks = items.map((item) => {
			return {
				taskTitle: item.task_title,
				key: item.key,
				dateCreation: item.create_date
			};
		});		
		res.send({tasks: tasks});
	} else {
		res.send({tasks: []});
	}	
});

router.post('/edit-random',  async (req, res, next) => {
	const action = Math.floor(Math.random() * 3);	
	const itemRandom = await knex.raw('SELECT key FROM tasks ORDER BY RANDOM()	LIMIT 1');
	if (itemRandom.rows.length > 0) {
		const keyRand = itemRandom.rows[0].key;
		const taskTitle = faker.lorem.word();
		const createTime = Math.floor(Number(new Date()) / 1000);
		switch(action) {
			case 0: // delete
				await knex('tasks')
						.where('key',keyRand)
						.del();
				res.send({
						key: keyRand,
						action: action
				});
			break;
			case 1: // insert		
				const result = await knex('tasks').insert([{
					task_title: taskTitle,
					create_date: createTime
				}], ['key']);
				res.send({
					action: action,
					payload: {						
						taskTitle: taskTitle,
						key: result[0].key,
						dateCreation: createTime
					}
				});
			break;
			case 2: // update
				await knex("tasks")
				.where('key', keyRand)
				.update({
					task_title: taskTitle
				});
				res.send({
					key: keyRand,
					action: action,
					payload: {
						taskTitle: taskTitle
					}
				});
			break;
		}	
	}	
});


router.get('/insert-fake-tasks',  async (req, res, next) => {

	let sql = `CREATE TABLE IF NOT EXISTS tasks
	(
		key SERIAL PRIMARY KEY,
		task_title character varying(255),
		create_date integer		
	)`;
	await knex.raw(sql);

	let createTime = (Math.floor(Number(new Date()) / 1000)+1);
	for (let i = 0; i < 1000; i++ ){
		let taskTitle = faker.lorem.word();
		createTime++;
		await knex('tasks').insert({
			task_title: taskTitle,
			create_date: createTime
		});
	}		
	res.send({message: '+1000 fake tasks added'});
});


module.exports = router;
