import React from 'react';
import {render, cleanup, fireEvent} from '@testing-library/react';
import { Tasks } from '../components/Tasks';
import { useSelectedProjectValue } from "../context";


jest.mock("../context", () => ({
	useSelectedProjectValue: jest.fn(),
	useProjectsValue: jest.fn(() => ({
		projects: [
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

jest.mock("../hooks", () => ({
	useTasks: jest.fn(() => ({
		tasks: [
			{
				id: "kl5gpkXpF38vYqMGbVtd",
				archived: false,
				date: "14/02/2020",
				projectId: "1",
				task: "this is a dummy task",
				userId: "e6o3v6R22X9WkrgdI98w"
			}
		]
	}))
}));

beforeEach(cleanup);

describe("<Tasks />", ()=>{
	afterEach(()=>{
		jest.clearAllMocks();
	})

	it("renders tasks", ()=>{
		useSelectedProjectValue.mockImplementation(() => ({
			setSelectedProject: jest.fn(() => "INBOX"),
			selectedProject: "INBOX"
		}));

		const {queryByTestId} = render(<Tasks />);
		expect(queryByTestId('tasks')).toBeTruthy();
		expect(queryByTestId("project-name").textContent).toBe("Inbox");
	});

	it("renders a task with a project title", () => {
		useSelectedProjectValue.mockImplementation(() => ({
			setSelectedProject: jest.fn(() => "1"),
			selectedProject: "1"
		}));

		const { queryByTestId } = render(<Tasks />);
		expect(queryByTestId("tasks")).toBeTruthy();
		expect(queryByTestId("project-name").textContent).toBe("Project 101");
	});

	it("renders a task with a collated title", () => {
		useSelectedProjectValue.mockImplementation(() => ({
			setSelectedProject: jest.fn(() => "INBOX"),
			selectedProject: "INBOX"
		}));

		const { queryByTestId } = render(<Tasks />);
		expect(queryByTestId("tasks")).toBeTruthy();
		expect(queryByTestId("project-name").textContent).toBe("Inbox");
	});

	
});
