import React, { useState, useEffect } from "react";

const TodoList = () => {
	//estados
	const [task, setTask] = useState({});
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

	useEffect(() => {
		leerTareas();
	}, []);

	const agregar = () => {
		// Si uso setList de una, no le da tiempo a setear la list y cuando la llamo el fetch manda la vieja, de esta forma, renderiza la
		// list nueva y a la vez actualiza el estado en paralelo de modo que cuando termina, está actualizado. No es necesario leer devuelta
		// la API, ya que renderizo con variable local, sabiendo que se esta actualizando la API para la proxima vez que haga el GET.
		let newList = [...list, task];
		setList(newList);

		fetch("https://assets.breatheco.de/apis/fake/todos/user/alexander", {
			method: "PUT",
			body: JSON.stringify(newList),
			headers: {
				"Content-Type": "application/json"
			}
		})
			.then(resp => {
				return resp; // (returns promise) will try to parse the result as json as return a promise that you can .then for results
			})
			.then(data => data)
			.catch(error => {
				//error handling
				console.log(error);
			});
		setTask({ label: "" });
	};

	// const remover = index => {
	// 	let newList = list.filter(word => word.label != list[index].label);
	// 	setList(newList);
	// };

	const remover = index => {
		// Esta funciona, solo cuando n>1 por como esta hecha la API:
		// let newList = list.filter(elemento => elemento.label != list[index].label);
		let newList;

		if (index != 0) {
			newList = list.filter(
				elemento => elemento.label != list[index].label
			);
		} else {
			list[index].done = true;
			newList = list;
		}

		setList(newList);

		fetch("https://assets.breatheco.de/apis/fake/todos/user/alexander", {
			method: "PUT",
			body: JSON.stringify(newList),
			headers: {
				"Content-Type": "application/json"
			}
		})
			.then(resp => {
				return resp;
			})
			.then(data => data)
			.catch(error => {
				console.log(error);
			});
	};

	const submitTask = e => {
		if (e.key == "Enter") {
			agregar();
		}
	};

	// Podría hacerlo poniendo todos los "done" en true, pero eso no limpiaría la API.
	const clearList = () => {
		let newList = [];
		setList(newList);
		fetch("https://assets.breatheco.de/apis/fake/todos/user/alexander", {
			method: "PUT",
			body: JSON.stringify([{ label: "Invisible", done: true }]),
			headers: {
				"Content-Type": "application/json"
			}
		})
			.then(resp => {
				return resp;
			})
			.then(console.log(list))
			.catch(error => {
				console.log(error);
			});
	};

	return (
		<div>
			<ul className="list-group lista mt-0">
				<input
					className="list-group-item py-2 px-5"
					onChange={e => {
						setTask({ label: e.target.value, done: false });
					}}
					type="text"
					placeholder="What needs to be done?"
					value={task.label}
					onKeyDown={submitTask}
				/>
				{list.map((item, index) => {
					if (item.done == false) {
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
											<i
												className="fas fa-times"
												onClick={() =>
													remover(index)
												}></i>
										</div>
									) : (
										""
									)}
								</div>
							</li>
						);
					}
				})}
			</ul>

			<div className="cruzContainer">
				<button
					type="button"
					className="btn clearBtn"
					onClick={clearList}>
					Clear list
				</button>
			</div>
		</div>
	);
};

export default TodoList;
