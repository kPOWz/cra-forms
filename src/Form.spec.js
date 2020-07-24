import React from 'react';
import { render } from '@testing-library/react';
import Form from './Form'

describe('Form', () => {
    it('renders welcome message', () => {
        const { getByText } = render(<Form />);
        expect(getByText('Learn React')).toBeInTheDocument();
    });
});