import React from 'react';
import { render, cleanup, fireEvent } from '@testing-library/react';
import { App } from '../App';

beforeEach(cleanup);

describe('<App/>', ()=>{
	it('renders the app', ()=>{
		const { queryByTestId, debug } = render( <App/>);

		expect(queryByTestId('application')).toBeTruthy();
		expect(queryByTestId('application').classList.contains('darkmode')).toBeFalsy();
		
	});

	it('renders the app using dark mode', ()=>{
		const { queryByTestId } = render(<App darkModeDefault />);

		expect(queryByTestId('application')).toBeTruthy();
		expect(queryByTestId('application').classList.contains('darkmode')).toBeTruthy();
	});
});
