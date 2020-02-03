import React from 'react';
import {render, cleanup, fireEvent } from '@testing-library/react';
import { Checkbox } from '../components/Checkbox';


beforeEach(cleanup);

jest.mock('../firebase.js', ()=>({
	firebase : {
		firestore : jest.fn(()=>({
			collection : jest.fn(()=>({
				doc : jest.fn(()=>({
					update : jest.fn(),
				})),
			})),
		})),
	},
}));


describe('</Checkbox', ()=> {
	describe('success', ()=>{
		it('renders the task checkbox', () => {
			const { queryByTestId } = render(
				<Checkbox id ="1" taskDesc="Getting my feeting wet in React" />
			);

			expect( queryByTestId('checkbox-action')).toBeTruthy();
			//debug();
		});

		it('renders the task checkbox and accept a click', ()=>{
			const { queryByTestId } = render(
				<Checkbox id="1" taskDesc="Getting my feeting wet in React" />
			);

			expect(queryByTestId('checkbox-action')).toBeTruthy();
			fireEvent.click(queryByTestId('checkbox-action'))
		});
		
		it('renders the task checkbox and accept a keyDown', ()=>{
			const { queryByTestId } = render(
				<Checkbox id="1" taskDesc="Getting my feeting wet in React" />
			);

			expect(queryByTestId('checkbox-action')).toBeTruthy();
			fireEvent.keyDown(queryByTestId('checkbox-action'))
		});
	})
});