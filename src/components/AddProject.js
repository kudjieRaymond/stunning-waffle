import React, { useState } from "react";
import { firebase } from "../firebase";
import { useProjectsValue } from "../context";
import { generatePushId } from "../helpers";

export const AddProject = ({ shouldShow = false }) => {
	const [show, setShow] = useState(shouldShow);
	const [projectName, setProjectName] = useState("");

	const projectId = generatePushId();
	const { projects, setProjects } = useProjectsValue();

	const addProject = () => {
		projectName &&
			firebase()
				.firestore()
				.collection("projects")
				.add({
					projectId,
					name: projectName,
					userId: "e6o3v6R22X9WkrgdI50"
				})
				.then(() => {
					setProjects([...projects]);
					setProjectName("");
					setShow(false);
				});
	};

	return (
		<div className="add-project" data-testid="add-project">
			{show && (
				<div className="add-project__input" data-testid="add-project-inner">
					<input
						className="add-project__name"
						data-testid="project-name"
						type="text"
						placeholder="Enter project name"
						value={projectName}
						onChange={e => setProjectName(e.target.value)}
					/>
					<button
						className="add-project__submit"
						data-test-id="add-project-submit"
						type="button"
						onClick={() => addProject()}
					>
						Add Project
					</button>
					<span
						data-testid="hide-project-overlay"
						className="hide-project__cancel"
						onClick={() => {
							setShow(false);
						}}
					>
						Cancel
					</span>
				</div>
			)}
			<span className="add-project__plus">+</span>
			<span className="add-project__text" data-testid="add-project-action"
			onClick={()=> setShow(!show)}
			>
				Add Project
			</span>
		</div>
	);
};
