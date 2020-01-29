import React, { useState } from "react";
import { firebase } from "../fireabse";
import moment from "moment";
import { useSelectedProjectValue } from "../context";
import { FaRegListAlt, FaRegCalendarAlt } from "react-icons/fa";
import { ProjectOverlay } from "./ProjectOverlay";
import { TaskDate } from "./TaskDate";

export const AddTask = ({
	showAddTaskMain = true,
	shouldShowMain = false,
	showQuickAddTask,
	setShowQuickAddTask
}) => {
	const [task, setTask] = useState("");
	const [taskDate, setTaskDate] = useState("");
	const [project, setProject] = useState("");
	const [showMain, setShowMain] = useState(shouldShowMain);
	const [showProjectOverlay, setShowProjectOverlay] = useState(false);
	const [showTaskDate, setShowTaskDate] = useState(false);

	const { selectedProject } = useSelectedProjectValue();

	const addTask = () => {
		const projectId = project || selectedProject;
		let collatedDate = "";

		if (projectId === "TODAY") {
			collatedDate = moment().format("DD/MM/YYYY");
		} else if (projectId === "NEXT_7") {
			collatedDate = moment()
				.add(7, "days")
				.format("DD/MM/YYYY");
		}

		return (
			task &&
			projectId &&
			firebase
				.firestore()
				.collection("tasks")
				.add({
					archived: false,
					projectId,
					task,
					date: collatedDate || taskDate,
					userId: "e6o3v6R22X9WkrgdI50"
				})
				.then(() => {
					setTask("");
					setProject("");
					setShowMain("");
					setShowProjectOverlay(false);
				})
		);
	};

	return (
		<div
			data-testid="add-task-comp"
			className={showQuickAddTask ? "add-task add-task__overlay" : "add-task"}
		>
			{showAddTaskMain && (
				<div
					tabIndex={0}
					aria-label="Add task"
					role="button"
					className="add-task__shallow"
					data-testid="show-main-action"
					onClick={() => {
						setShowMain(!showMain);
					}}
					onKeyDown={() => {
						setShowMain(!showMain);
					}}
				>
					<span className="add-task__plus">+</span>
					<span className="add-task__text">Add Task</span>
				</div>
			)}

			{(showMain || showQuickAddTask) && (
				<div className="add-task__main" data-testid="add-task-main">
					{showQuickAddTask && (
						<>
							<div data-testid="quick-add-task">
								<h2 className="header"> Quick Add Task</h2>
								<span
									aria-label="Cancel adding task"
									tabIndex={0}
									role="button"
									className="add-task__cancel-x"
									data-testid="add-task-quick-cancel"
									onClick={() => {
										setShowMain(false);
										setShowProjectOverlay(false);
										setShowQuickAddTask(false);
									}}
									onKeyDown={() => {
										setShowMain(false);
										setShowProjectOverlay(false);
										setShowQuickAddTask(false);
									}}
								>
									X
								</span>
							</div>
						</>
					)}
					<ProjectOverlay
						setProject={setProject}
						showProjectOverlay={showProjectOverlay}
						setShowProjectOverlay={setShowProjectOverlay}
					/>
					<TaskDate
						setTaskDate={setTaskDate}
						showTaskDate={showTaskDate}
						setShowTaskDate={setShowTaskDate}
					/>

					<input
						aria-label="Enter your task"
						type="text"
						value={task}
						className="add-task__content"
						onChange={e => {
							setTask(e.target.value);
						}}
					/>
					<button
						data-testid="add-task"
						type="button"
						className="add-task__submit"
						onClick={() => {
							showQuickAddTask
								? setShowQuickAddTask(false) && addTask()
								: addTask();
						}}
					>
						Add Task
					</button>

					{!showQuickAddTask && (
						<span
							data-testid="add-task-main-cancel"
							className="add-task__cancel"
							onClick={() => {
								setShowMain(false);
								setShowProjectOverlay(false);
							}}
							onKeyDown={() => {
								setShowMain(false);
								setShowProjectOverlay(false);
							}}
							aria-label="Cancel adding a task"
							tabIndex={0}
							role="button"
						>
							Cancel
						</span>
					)}
					<span
						className="add-task__project"
						data-testid="show-project-overlay"
						onClick={() => {
							setShowProjectOverlay(!showProjectOverlay);
						}}
						onKeyDown={() => setShowProjectOverlay(!showProjectOverlay)}
						tabIndex={0}
						role="button"
					>
						<FaRegListAlt />
					</span>
					<span
						className="add-task__date"
						data-testid="show-task-date-overlay"
						onClick={() => setShowTaskDate(!showTaskDate)}
						onKeyDown={() => setShowTaskDate(!showTaskDate)}
						tabIndex={0}
						role="button"
					>
						<FaRegCalendarAlt />
					</span>
				</div>
			)}
		</div>
	);
};
