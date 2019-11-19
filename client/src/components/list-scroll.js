import React, { Component } from 'react';
import { FixedSizeList as List } from 'react-window';
import axios from 'axios';
 
export default class ListScroll extends Component {

	state = {
			count: 0,
			tasks: []
	}	

	componentDidMount =  () => {
		this.timerID = setInterval(
      () => this.updateTasks(),
      1000
    );
		
		let count = 0;
		 axios.get('http://localhost:5000/tasks/')
			.then(res => { 
				count = res.data.tasks.length;
				this.setState({
					count: count,
					tasks: this.state.tasks.concat(res.data.tasks)	
				});				
			});	
	}
	
	updateTasks() {
		axios.post('http://localhost:5000/tasks/edit-random',{})
			.then(res => { 
				console.log(res.data.action);
				let arr = this.state.tasks;
				switch(res.data.action) {					
					case 0: // delete
						let tasks = [];
						arr.forEach(item => {
							if (item.key !== res.data.key) {
								tasks.push(item);
							}
						});
						this.setState({
							count: this.state.count-1,
							tasks: tasks	
						});
					break;

					case 1: // insert	
						if (arr.length > 0) {
							let tasks = arr.map(item=>{return item;});
							tasks.unshift(res.data.payload);
							this.setState({
								count: this.state.count+1,
								tasks: tasks
							});
						}						
					break;

					case 2: // update
						let tasksUpdate = [];
						arr.forEach(item => {
							if (item.key === res.data.key) {
								item.taskTitle = res.data.payload.taskTitle;
							}
							console.log('item',item)
							tasksUpdate.push(item);
						});
						this.setState({
							tasks: tasksUpdate	
						});					
					break;
				}
		});
  }
	
	changeItem = (index) => {
		console.log('index', index);
    axios.post('http://localhost:5000/tasks/', {offset: (index+1)})
      .then(res => { 
				console.log('next', res.data);
				if (res.data.tasks.length > 0){
					let count = res.data.tasks.length
					this.setState({
						count: (index+1)+count,
						tasks: this.state.tasks.concat(res.data.tasks)
					});
				} 			
				
			});    
  }

	Row = ({index, style}) => {
		if (this.state.tasks[index] !== undefined) {
			const task= this.state.tasks[index];
			let date = new Date(task.dateCreation * 1000),
				dateFormat = (date.getDate() + '/' + (date.getMonth()+1) + '/' +
				+ date.getFullYear() + ' | ' + date.getHours() + ' : ' + date.getMinutes() + ' : ' + date.getSeconds());						
			
				if (index >= (this.state.count-1)) { this.changeItem(index); }
				if (index % 2) {							
					return (					
						<div className={index % 2 ? 'ListItemOdd' : 'ListItemEven'} style={style}>
						{task.key}.	Title: {task.taskTitle} <br/>
						Date: {dateFormat}
						</div>
					);
				}		
				return (<div className='ListItemEven' style={style}>
					{task.key}.	Title: {task.taskTitle} <br/>
						Date: {dateFormat}
				</div>);				
	
		} else {
			return false;
		}
	};
	
	render() {		
		return (
			<div>
				<List
					height={300}
					itemCount={this.state.count}
					itemSize={50}
					width={1000}
				>
				{this.Row}
				</List>
			</div>
		);
	}
}


