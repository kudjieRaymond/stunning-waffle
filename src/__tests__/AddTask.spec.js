import React from "react";
import { render, cleanup, fireEvent } from "@testing-library/react";
import { AddTask } from "../components/AddTask";
import { useSelectedProjectValue } from "../context";
import { firebase } from "../firebase";

beforeEach(cleanup);

jest.mock("../context", () => ({
	useSelectedProjectValue: jest.fn(() => ({ selectedProject: 1 })),
	useProjectsValue: jest.fn(() => ({ projects: [] }))
}));

jest.mock("../firebase", () => ({
	firebase: {
		firestore: jest.fn(() => ({
			collection: jest.fn(() => ({
				add: jest.fn(() => Promise.resolve("Dont mock firebase"))
			}))
		}))
	}
}));

describe("<AddTask/>", () => {
	afterEach(() => {
		jest.clearAllMocks();
	});

	describe("success", () => {
		it("renders the <AddTask />", () => {
			const { queryByTestId } = render(<AddTask />);

			expect(queryByTestId("add-task-comp")).toBeTruthy();
		});

		it("renders the <AddTask /> quick overlay", () => {
			const setShowQuickAddTask = jest.fn();

			const { queryByTestId } = render(
				<AddTask
					showAddTaskMain
					shouldShowMain={false}
					showQuickAddTask
					setShowQuickAddTask={setShowQuickAddTask}
				/>
			);

			expect(queryByTestId("quick-add-task")).toBeTruthy();
		});

		it("renders the <AddTask/> main showable using onClick", () => {
			const { queryByTestId } = render(<AddTask showAddTaskMain />);

			fireEvent.click(queryByTestId("show-main-action"));
			expect(queryByTestId("add-task-main")).toBeTruthy();
		});

		it("renders the <AddTask/> main showable using onKeyDown", () => {
			const { queryByTestId } = render(<AddTask showAddTaskMain />);

			fireEvent.keyDown(queryByTestId("show-main-action"));
			expect(queryByTestId("add-task-main")).toBeTruthy();
		});

		it("renders the <AddTask /> project overlay when using onClick", () => {
			const { queryByTestId } = render(<AddTask showAddTaskMain />);

			fireEvent.click(queryByTestId("show-main-action"));
			expect(queryByTestId("add-task-main")).toBeTruthy();

			fireEvent.click(queryByTestId("show-project-overlay"));
			expect(queryByTestId("project-overlay")).toBeTruthy();
		});

		it("renders the <AddTask /> project overlay when using onKeyDown", () => {
			const { queryByTestId } = render(<AddTask showAddTaskMain />);

			fireEvent.keyDown(queryByTestId("show-main-action"));
			expect(queryByTestId("add-task-main")).toBeTruthy();

			fireEvent.keyDown(queryByTestId("show-project-overlay"));
			expect(queryByTestId("project-overlay")).toBeTruthy();
		});

		it("renders the <AddTask /> task date overlay when using onClick", () => {
			const { queryByTestId } = render(<AddTask showAddTaskMain />);

			fireEvent.click(queryByTestId("show-main-action"));
			expect(queryByTestId("add-task-main")).toBeTruthy();

			fireEvent.click(queryByTestId("show-task-date-overlay"));
			expect(queryByTestId("task-date-overlay")).toBeTruthy();
		});

		it("renders the <AddTask /> task date overlay when using onKeyDown", () => {
			const { queryByTestId } = render(<AddTask showAddTaskMain />);

			fireEvent.keyDown(queryByTestId("show-main-action"));
			expect(queryByTestId("add-task-main")).toBeTruthy();

			fireEvent.keyDown(queryByTestId("show-task-date-overlay"));
			expect(queryByTestId("task-date-overlay")).toBeTruthy();
		});

		it("hides the <AddTask /> main when cancel is clicked using onClick", () => {
			const { queryByTestId } = render(<AddTask showAddTaskMain />);

			fireEvent.click(queryByTestId("show-main-action"));
			expect(queryByTestId("add-task-main")).toBeTruthy();

			fireEvent.click(queryByTestId("add-task-main-cancel"));
			expect(queryByTestId("add-task-main")).toBeFalsy();
		});

		it("hides the <AddTask /> main when cancel is clicked using onKeyDown", () => {
			const { queryByTestId } = render(<AddTask showAddTaskMain />);

			fireEvent.keyDown(queryByTestId("show-main-action"));
			expect(queryByTestId("add-task-main")).toBeTruthy();

			fireEvent.keyDown(queryByTestId("add-task-main-cancel"));
			expect(queryByTestId("add-task-main")).toBeFalsy();
		});

		it("renders <AddTask /> for quick add task and then clicks cancel using onClick", () => {
			const showQuickAddTask = true;
			const setShowQuickAddTask = jest.fn(() => !showQuickAddTask);
			const { queryByTestId } = render(
				<AddTask showQuickAddTask setShowQuickAddTask={setShowQuickAddTask} />
			);

			fireEvent.click(queryByTestId("show-main-action"));
			expect(queryByTestId("add-task-main")).toBeTruthy();

			fireEvent.click(queryByTestId("add-task-quick-cancel"));
			expect(setShowQuickAddTask).toHaveBeenCalled();
		});

		it("renders <AddTask /> for quick add task and then clicks cancel using onKeyDown", () => {
			const showQuickAddTask = true;
			const setShowQuickAddTask = jest.fn(() => !showQuickAddTask);
			const { queryByTestId } = render(
				<AddTask showQuickAddTask setShowQuickAddTask={setShowQuickAddTask} />
			);

			fireEvent.keyDown(queryByTestId("show-main-action"));
			expect(queryByTestId("add-task-main")).toBeTruthy();

			fireEvent.keyDown(queryByTestId("add-task-quick-cancel"));
			expect(setShowQuickAddTask).toHaveBeenCalled();
		});

		it("renders <AddTask /> and adds a task to the inbox (TODAY) and clear state", () => {
			useSelectedProjectValue.mockImplementation(() => ({
				selectedProject: "TODAY"
			}));
			const showQuickAddTask = true;
			const setShowQuickAddTask = jest.fn(() => !showQuickAddTask);

			const { queryByTestId } = render(
				<AddTask showQuickAddTask setShowQuickAddTask={setShowQuickAddTask} />
			);

			fireEvent.click(queryByTestId("show-main-action"));
			expect(queryByTestId("show-main-action")).toBeTruthy();

			fireEvent.change(queryByTestId("add-task-content"), {
				target: {
					value: "I am getting my feet wet"
				}
			});

			expect(queryByTestId("add-task-content").value).toBe(
				"I am getting my feet wet"
			);

			fireEvent.click(queryByTestId("add-task"));
			expect(setShowQuickAddTask).toHaveBeenCalled();
		});

		it("renders <AddTask /> and adds a task to NEXT_7 and clear state", () => {
			useSelectedProjectValue.mockImplementation(() => ({
				selectedProject: "NEXT_7"
			}));
			const showQuickAddTask = true;
			const setShowQuickAddTask = jest.fn(() => !showQuickAddTask);
			const { queryByTestId } = render(
				<AddTask showQuickAddTask setShowQuickAddTask={setShowQuickAddTask} />
			);

			fireEvent.click(queryByTestId("show-main-action"));
			expect(queryByTestId("show-main-action")).toBeTruthy();

			fireEvent.change(queryByTestId("add-task-content"), {
				target: {
					value: "add a task to NEXT_7"
				}
			});
			expect(queryByTestId("add-task-content").value).toBe(
				"add a task to NEXT_7"
			);

			fireEvent.click(queryByTestId("add-task"));
			expect(setShowQuickAddTask).toHaveBeenCalled();
		});

		it("renders <AddTask /> and adds a task with a task date of TODAY", async () => {
			useSelectedProjectValue.mockImplementation(() => ({
				selectedProject: "1"
			}));

			const { queryByTestId } = render(<AddTask showMain />);

			fireEvent.click(queryByTestId("show-main-action"));
			expect(queryByTestId("add-task-content")).toBeTruthy();
			expect(queryByTestId("add-task-main")).toBeTruthy();

			fireEvent.change(queryByTestId("add-task-content"), {
				target: { value: "add a task to TODAY!" }
			});
			expect(queryByTestId("add-task-content").value).toBe(
				"add a task to TODAY!"
			);

			fireEvent.click(queryByTestId("show-task-date-overlay"));
			expect(queryByTestId("task-date-overlay")).toBeTruthy();

			fireEvent.click(queryByTestId("task-date-today"));
			expect(queryByTestId("task-date-overlay")).toBeFalsy();

			fireEvent.click(queryByTestId("show-task-date-overlay"));
			expect(queryByTestId("task-date-overlay")).toBeTruthy();

			fireEvent.keyDown(queryByTestId("task-date-today"));
			expect(queryByTestId("task-date-overlay")).toBeFalsy();

		  fireEvent.click(queryByTestId("add-task"));
		});

		 
	});
});
