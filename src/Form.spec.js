import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
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

    describe.each([
        ['example-required', 'takeMeAway', '', 'textbox'],
        ['example-pattern', '*', undefined, 'textbox'],
        ['example-maxlength', '1234567', undefined, 'textbox'],
        ['example-email', 'notAnEmail', undefined, 'textbox'],
        ['example-url', 'notAURL', undefined, 'textbox'],
        ['example-numbermax', 11, undefined, 'spinbutton'],
        ['example-numbermin', 2, undefined, 'spinbutton'],
        ['example-number', 'notANumber', undefined, 'spinbutton'],
      ])('.when aria-invalid for %s input', (id, changeValue1, changeValue2, ariaRole) => {
        it('should turn on error mode only for target form group', () => {
            render(<Form />);

            const observedForAriaInvalidCheck = screen.getAllByRole(ariaRole);
            const invalidExpectedIndex = observedForAriaInvalidCheck.findIndex((element) => 
                element.getAttribute('id') === id);

            fireEvent.change(observedForAriaInvalidCheck[invalidExpectedIndex], {target: {value: changeValue1}});
            if(changeValue2 !== undefined) {
                fireEvent.change(observedForAriaInvalidCheck[invalidExpectedIndex], {target: {value: ''}});
            }

            expect(observedForAriaInvalidCheck[invalidExpectedIndex]).toBeInvalid();
            delete observedForAriaInvalidCheck[invalidExpectedIndex];
            observedForAriaInvalidCheck.forEach( i => {
                expect(i).toBeValid();
            });
        });
    });

    describe.each([
        ['Required', 'takeMeAway', '', 'textbox'],
        ['Pattern', '*', undefined, 'textbox'],
        ['Max length', '1234567', undefined, 'textbox'],
        ['Email', 'notAnEmail', undefined, 'textbox'],
        ['URL', 'notAURL', undefined, 'textbox'],
        ['Number max', 11, undefined, 'spinbutton'],
        ['Number min', 2, undefined, 'spinbutton'],
        ['Number', 'notANumber', undefined, 'spinbutton'],
      ])('.when aria-invalid for %s input', (accessibleName, changeValue1, changeValue2, ariaRole) => {
        it('should add all the error styles', () => {
            render(<Form />);

            const maybeRequiredInput = screen.getAllByRole(ariaRole, {name: accessibleName});

            fireEvent.change(maybeRequiredInput[0], {target: {value: changeValue1}});
            if(changeValue2 !== undefined) {
                fireEvent.change(maybeRequiredInput[0], {target: {value: changeValue2}});
            }

            expect(maybeRequiredInput[0]).toBeInvalid();
            expect(maybeRequiredInput[0]).toHaveAttribute('aria-invalid', 'true');
            expect(maybeRequiredInput[0].parentElement).toHaveClass('Mui-error');
            expect(maybeRequiredInput[0].parentElement.previousElementSibling).toHaveClass('Mui-error');
        });
    });

    it('should always assgin TextField an id for accessibility', () => {
        render(<Form />);

        const maybeAccessibleInputs = screen.getAllByRole('textbox');

        maybeAccessibleInputs.forEach((i) => {
            expect(i.id).toBeDefined();
        })
    });
});