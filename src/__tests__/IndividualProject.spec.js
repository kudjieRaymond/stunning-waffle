import React from "react";
import { render, cleanup, fireEvent } from "@testing-library/react";
import { IndividualProject } from "../components/IndividualProject";

beforeEach(cleanup);

jest.mock("../firebase.js", () => ({
	firebase: {
		firestore: jest.fn(() => ({
			collection: jest.fn(() => ({
				doc: jest.fn(() => ({
					delete: jest.fn(() => Promise.resolve("I just mocked firebase"))
				})),
				update: jest.fn()
			}))
		}))
	}
}));

jest.mock("../context", () => ({
	useSelectedProjectValue: jest.fn(() => ({
		setSelectedProject: jest.fn(() => "INBOX")
	})),
	useProjectsValue: jest.fn(() => ({
		setProjects: jest.fn(),
		projects: [
			{
				name: "Project 101",
				projectId: "2",
				userId: "e6o3v6R22X9WkrgdI98",
				docId: "john-doe"
			}
		]
	}))
}));

describe("<IndividualProject/>", () => {
	const project = {
		name: "Project 101",
		projectId: "2",
		userId: "e6o3v6R22X9WkrgdI98",
		docId: "john-doe"
	};

	describe("Success", ()=>{
		it("renders our project", ()=>{
			const {getByText } = render(<IndividualProject  project={project} />);
			expect(getByText("Project 101")).toBeTruthy();
		});

		it("renders the delete overlay and then deletes a project using onClick", () => {

			const { queryByTestId, getByText } = render(
				<IndividualProject project={project} />
			);
			fireEvent.click(queryByTestId("delete-project"));
			expect(
				getByText("Are you sure you want to delete this project?")
			).toBeTruthy();

			fireEvent.click(getByText('Delete'));
		});

		it("renders the delete overlay and then deletes a project using onKeyDown", () => {
			const { queryByTestId, getByText } = render(
				<IndividualProject project={project} />
			);
			fireEvent.keyDown(queryByTestId("delete-project"));
			expect(
				getByText("Are you sure you want to delete this project?")
			).toBeTruthy();

			fireEvent.click(getByText("Delete"));
		});

		it("renders the delete overlay and then cancels using onClick", ()=>{
			const {queryByTestId, getByText }  = render(<IndividualProject project={project} />);

			fireEvent.click(queryByTestId("delete-project"));
			expect(
				getByText("Are you sure you want to delete this project?")
			).toBeTruthy();

			fireEvent.click(getByText("Cancel")) ;
		});

		
	});
});
