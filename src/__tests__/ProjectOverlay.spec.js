import React from 'react';
import {render, cleanup, fireEvent } from '@testing-library/react';
import { ProjectOverlay } from '../components/ProjectOverlay';
import { useProjectsValue } from '../context';

beforeEach(cleanup);

jest.mock("../context", () => ({
	useProjectsValue: jest.fn(() => ({
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

describe('<ProjectOverlay />', ()=>{
	afterAll(() => {
		jest.clearAllMocks();
	});

	describe('success', () =>{
		it("renders the project overlay and calls setShowProjectOverlay using onClick", () => {
			const showProjectOverlay = true;
			const setProject = jest.fn();
			const setShowProjectOverlay = jest.fn(()=>!showProjectOverlay);

			const { queryByTestId } = render(
				<ProjectOverlay
					showProjectOverlay
					setProject={setProject}
					setShowProjectOverlay={setShowProjectOverlay}
				/>
			);
			
			expect(queryByTestId("project-overlay")).toBeTruthy();
			fireEvent.click(queryByTestId("project-overlay-action"));
			expect(setProject).toHaveBeenCalled();	

		});
	});

	describe('Failure', ()=>{
		it("does not render the project overlay with any projects", ()=>{
			useProjectsValue.mockImplementation(()=>({
				projects :[],
			}));

			 const { queryByTestId } = render(<ProjectOverlay showProjectOverlay />);
			 expect(queryByTestId("project-overlay")).toBeTruthy();
			 expect(queryByTestId("project-overlay-action")).toBeFalsy();

		});
	});

})

