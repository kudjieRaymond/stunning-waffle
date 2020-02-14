import React from "react";
import { cleanup, render, fireEvent } from "@testing-library/react";
import { AddProject } from "../components/AddProject";

beforeEach(cleanup);
jest.mock("../firebase.js", () => ({
	firebase: {
		firestore: jest.fn(() => ({
			collection: jest.fn(() => ({
				add: jest.fn(() => Promise.resolve("I just mocked firebase"))
			}))
		}))
	}
}));

jest.mock("../context", () => ({
	useSelectedProjectValue: jest.fn(),
	useProjectsValue: jest.fn(() => ({
		setProjects: jest.fn(),
		projects : [
			{
				name: "Project 101",
				projectId: "1",
				userId: "e6o3v6R22X9WkrgdI98",
				docId: "john-doe"
			},
			{
				name: "Project 101",
				projectId: "2",
				userId: "e6o3v6R22X9WkrgdI98",
				docId: "teaching"
			},
			{
				name: "Project 101",
				projectId: "2",
				userId: "e6o3v6R22X9WkrgdI98",
				docId: "technical-writing"
			},
			{
				name: "Project 104",
				projectId: "4",
				userId: "e6o3v6R22X9WkrgdI98",
				docId: "dance"
			}
		]
	}))
}));

describe("<AddProject/>", () => {
	afterEach(() => {
		jest.clearAllMocks();
	});

	describe("Success", () => {
		it("renders <AddProject />", () => {
			const { queryByTestId } = render(<AddProject shouldShow />);
			expect(queryByTestId("add-project")).toBeTruthy();
		});

		it("renders <AddProject /> and adds a project using onClick", () => {
			const { queryByTestId } = render(<AddProject shouldShow />);

			expect(queryByTestId("add-project")).toBeTruthy();

			fireEvent.change(queryByTestId("project-name"), {
				target: {
					value: "this is a test project"
				}
			});
			expect(queryByTestId("project-name").value).toBe(
				"this is a test project"
			);

			fireEvent.click(queryByTestId("add-project-submit"));
		});

		it("hides the project overlay when cancelled using onClick", () => {
			const { queryByTestId, getByText } = render(<AddProject shouldShow />);

			expect(queryByTestId("add-project")).toBeTruthy();
			expect(queryByTestId("add-project-inner")).toBeTruthy();

			fireEvent.click(getByText("Cancel"));
			expect(queryByTestId("add-project")).toBeTruthy();
			expect(queryByTestId("add-project-inner")).toBeFalsy();
		});

		it("hides the project overlay when cancelled using onKeyDown", () => {
			const { queryByTestId, getByText } = render(<AddProject shouldShow />);

			expect(queryByTestId("add-project")).toBeTruthy();
			expect(queryByTestId("add-project-inner")).toBeTruthy();

			fireEvent.keyDown(getByText("Cancel"));
			expect(queryByTestId("add-project")).toBeTruthy();
			expect(queryByTestId("add-project-inner")).toBeFalsy();
		});

		it("hides the project overlay using onClick singular and reverse action", () => {
			const { queryByTestId } = render(<AddProject shouldShow />);

			expect(queryByTestId("add-project")).toBeTruthy();
			expect(queryByTestId("add-project-inner")).toBeTruthy();

			fireEvent.click(queryByTestId("add-project-action"));
			expect(queryByTestId("add-project")).toBeTruthy();
			expect(queryByTestId("add-project-inner")).toBeFalsy();
		});

		it("hides the project overlay using onKeyDown singular and reverse action", () => {
			const { queryByTestId } = render(<AddProject shouldShow />);
			expect(queryByTestId("add-project")).toBeTruthy();
			expect(queryByTestId("add-project-inner")).toBeTruthy();

			fireEvent.keyDown(queryByTestId("add-project-action"));
			expect(queryByTestId("add-project")).toBeTruthy();
			expect(queryByTestId("add-project-inner")).toBeFalsy();
		});
	});
});
