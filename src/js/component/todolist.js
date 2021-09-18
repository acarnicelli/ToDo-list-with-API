import { Button } from "bootstrap";
import React, { useState } from "react";

const TodoList = () => {
	//estados
	const [task, setTask] = useState("");

	const [list, setList] = useState([]);

	//Para que aparezca la cruz de "cerrar" al hacer hover en el <li>
	const [indexHover, setIndexHover] = useState();

	const agregar = () => {
		setList([...list, task]);
		setTask("");
	};

	const remover = index => {
		let newList = list.splice(index, 1);
		setList(newList);
	};

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
					onChange={e => setTask(e.target.value)}
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
								{item}
								{indexHover == index ? (
									<div className="cruz">
										<i
											className="fas fa-times"
											onClick={() => remover(index)}></i>
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
