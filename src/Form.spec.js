import React from 'react';
import { render, screen } from '@testing-library/react';
import Form from './Form'

describe('Form', () => {
    it('renders required input', () => {
        render(<Form />);

        const maybeRequiredInput = screen.getAllByRole('textbox', {name: 'Required'});
        expect(maybeRequiredInput.length).toEqual(1);
    });

    it('renders pattern input', () => {
        render(<Form />);

        const maybePatternInput = screen.getAllByRole('textbox', {name: 'Pattern'});
        expect(maybePatternInput.length).toEqual(1);
    });

    it('renders max length input', () => {
        render(<Form />);

        const maybeMaxLengthInput = screen.getAllByRole('textbox', {name: 'Max length'});
        expect(maybeMaxLengthInput.length).toEqual(1);
    });

    it('renders email input', () => {
        render(<Form />);

        const maybeEmailInput = screen.getAllByRole('textbox', {name: 'Email'});
        expect(maybeEmailInput.length).toEqual(1);
    });

    it('renders URL input', () => {
        render(<Form />);

        const maybeUrlInput = screen.getAllByRole('textbox', {name: 'URL'});
        expect(maybeUrlInput.length).toEqual(1);
    });

    it('renders Number input', () => {
        render(<Form />);

        const maybeNumberInput = screen.getAllByRole('spinbutton', {name: 'Number'});
        expect(maybeNumberInput.length).toEqual(1);
    });

    it('renders Number max input', () => {
        render(<Form />);

        const maybeNumberMaxInput = screen.getAllByRole('spinbutton', {name: 'Number max'});
        expect(maybeNumberMaxInput.length).toEqual(1);
    });

    it('renders Number min input', () => {
        render(<Form />);

        const maybeNumberMinInput = screen.getAllByRole('spinbutton', {name: 'Number min'});
        expect(maybeNumberMinInput.length).toEqual(1);
    });

    it('should always assgin TextField an id for accessibility', () => {
        render(<Form />);

        const maybeAccessibleInputs = screen.getAllByRole('textbox');

        maybeAccessibleInputs.forEach((i) => {
            expect(i.id).toBeDefined();
        })
    });
});