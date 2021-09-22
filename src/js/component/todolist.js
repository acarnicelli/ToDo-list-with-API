import React, { useState } from "react";

const TodoList = () => {
	//estados
	const [task, setTask] = useState();

	const [list, setList] = useState([]);

	//Para que aparezca la cruz de "cerrar" al hacer hover en el <li>
	const [indexHover, setIndexHover] = useState();

	//Llamado a la API
	const leerTareas = () => {
		fetch("https://assets.breatheco.de/apis/fake/todos/user/alexander", {
			method: "GET"
		})
			.then(response => response.json())
			.then(data => setList(data));
	};

	leerTareas();

	// ******************* tengo el get y sale en la consola pero tengo que juntarlo con lo otro ********************
	const agregar = () => {
		// setList([...list, { label: task, done: false }]);

		fetch("https://assets.breatheco.de/apis/fake/todos/user/alexander", {
			method: "PUT",
			body: JSON.stringify([...list, { label: task, done: false }]),
			headers: {
				"Content-Type": "application/json"
			}
		})
			.then(resp => {
				console.log(resp.ok); // will be true if the response is successfull
				console.log(resp.status); // the status code = 200 or code = 400 etc.
				console.log(resp.text()); // will try return the exact result as string
				return resp.json(); // (returns promise) will try to parse the result as json as return a promise that you can .then for results
			})
			.then(data => {
				//here is were your code should start after the fetch finishes
				// setList([...list, { label: task, done: false }]);

				console.log(`This is data: ${data}`); //this will print on the console the exact object received from the server
			})
			.catch(error => {
				//error handling
				console.log(error);
			});
		setTask("");
	};

	// const agregar = () => {
	// 	setList([...list, task]);
	// 	setTask("");
	// };

	// const remover = index => {
	// 	let newList = list.filter(word => word.label != list[index]);
	// 	setList(newList);
	// };

	const submitTask = e => {
		if (e.key == "Enter") {
			agregar();
		}
	};

	return (
		<div>
			<ul className="list-group lista mt-0">
				<input
					className="list-group-item py-2 px-5"
					onChange={e => {
						setTask(e.target.value);
					}}
					type="text"
					placeholder="What needs to be done?"
					value={task}
					onKeyDown={submitTask}
				/>
				{list.map((item, index) => {
					return (
						<li
							className="list-group-item py-2 px-5"
							key={index}
							onMouseOver={() => setIndexHover(index)}
							onMouseLeave={() => setIndexHover(-1)}>
							<div className="cruzContainer">
								{item.label}
								{indexHover == index ? (
									<div className="cruz">
										{/* <i
											className="fas fa-times"
											onClick={() => remover(index)}></i> */}
									</div>
								) : (
									""
								)}
							</div>
						</li>
					);
				})}
			</ul>
		</div>
	);
};

export default TodoList;
