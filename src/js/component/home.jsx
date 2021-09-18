import React from "react";
import TodoList from "./todolist";

//create your first component
const Home = () => {
	return (
		<div className="container wrapper">
			<p>todos</p>
			<TodoList />
		</div>
	);
};

export default Home;
