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
        ['example-pattern', '$z', 'textbox'],
        ['example-maxlength', '123', 'textbox'],
        ['example-email', 'me@example.com', 'textbox'],
        ['example-url', 'www.example.com', 'textbox'],
        ['example-number', 11, 'spinbutton'],
        ['example-numbermax', 9, 'spinbutton'],
        ['example-numbermin', 3, 'spinbutton'],
      ])('.when %s intereacted with', (name, changeValue, ariaRole) => {
        it('should be a React controlled input', () => {
            render(<Form />);

            const observed = screen.getAllByRole(ariaRole);
            const index = observed.findIndex((element) => 
                element.getAttribute('id') === name);

            fireEvent.change(observed[index], {target: {value: changeValue}});

            expect(observed[index].value).toBe(changeValue.toString());
            expect(observed[index]).toHaveValue(changeValue);
            expect(screen.getByDisplayValue(changeValue.toString())).toBeInTheDocument();
        });

        it('should submit state', () => {
            const spySubmit = jest.fn();
            render(<Form onSubmitHandler={spySubmit}/>);

            const observed = screen.getAllByRole(ariaRole);
            const index = observed.findIndex((element) => 
                element.getAttribute('id') === name);

            fireEvent.change(observed[index], {target: {value: changeValue}});

            const requirednput = screen.getByRole('textbox', {name: 'Required'});
            fireEvent.change(requirednput, {target: {value: 'satisfy required'}});

            const buttonSubmit = screen.getByRole('button', {name: 'do native validation'});
            fireEvent.submit(buttonSubmit);

            expect(spySubmit).toBeCalledTimes(1);
            expect(spySubmit).toHaveBeenCalledWith(
                expect.objectContaining({
                'example-required': 'satisfy required',
                [name]: changeValue.toString()
            }))
        });
    });

    describe.each([
        ['example-required', 'takeMeAway', '', 'textbox'],
        ['example-email', 'notAnEmail', undefined, 'textbox'],
        ['example-url', 'notAURL', undefined, 'textbox'],
        ['example-numbermax', 11, undefined, 'spinbutton'],
        ['example-numbermin', 2, undefined, 'spinbutton'],
      ])('.when aria-invalid for %s input', (id, changeValue1, changeValue2, ariaRole) => {
        it('should turn on error mode only for target form group', () => {
            render(<Form />);

            const observedForAriaInvalidCheck = screen.getAllByRole(ariaRole);
            const invalidExpectedIndex = observedForAriaInvalidCheck.findIndex((element) => 
                element.getAttribute('id') === id);

            fireEvent.change(observedForAriaInvalidCheck[invalidExpectedIndex], {target: {value: changeValue1}});
            if(changeValue2 !== undefined) {
                fireEvent.change(observedForAriaInvalidCheck[invalidExpectedIndex], {target: {value: changeValue2}});
            }

            expect(observedForAriaInvalidCheck[invalidExpectedIndex]).toBeInvalid();
            observedForAriaInvalidCheck.splice(invalidExpectedIndex, 1);
            observedForAriaInvalidCheck.forEach( i => {
                if (i.getAttribute('id') !== 'example-required') {
                    expect(i).toBeValid();
                }
            });
        });
    });

    describe.each([
        ['Required', 'takeMeAway', '', 'textbox'],
        ['Email', 'notAnEmail', undefined, 'textbox'],
        ['URL', 'notAURL', undefined, 'textbox'],
        ['Number max', 11, undefined, 'spinbutton'],
        ['Number min', 2, undefined, 'spinbutton'],
      ])('.when aria-invalid for %s input', (accessibleName, changeValue1, changeValue2, ariaRole) => {
        it('should add all the error styles', () => {
            render(<Form />);

            const maybeInput = screen.getAllByRole(ariaRole, {name: accessibleName});
            expect(maybeInput.length).toEqual(1);

            fireEvent.change(maybeInput[0], {target: {value: changeValue1}});
            if(changeValue2 !== undefined) {
                fireEvent.change(maybeInput[0], {target: {value: changeValue2}});
            }

            expect(maybeInput[0]).toBeInvalid();
            expect(maybeInput[0]).toHaveAttribute('aria-invalid', 'true');
            expect(maybeInput[0].parentElement).toHaveClass('Mui-error');
            expect(maybeInput[0].parentElement.previousElementSibling).toHaveClass('Mui-error');
        });
    });

    it('should add all the error styles when pattern constraint violated', () => {
        render(<Form />);

        const maybeInput = screen.getAllByRole('textbox', {name: 'Pattern'});
        expect(maybeInput.length).toEqual(1);

        //bug in jsdom misses pattern constraint violations, so hard-code validity check
        fireEvent.change(maybeInput[0], {target: {value: '*', checkValidity: () => false }});

        expect(maybeInput[0]).toBeInvalid();
        expect(maybeInput[0]).toHaveAttribute('aria-invalid', 'true');
        expect(maybeInput[0].parentElement).toHaveClass('Mui-error');
        expect(maybeInput[0].parentElement.previousElementSibling).toHaveClass('Mui-error');
    });

    it('should add all the error styles when maxlength constraint violated', () => {
        render(<Form />);

        const maybeInput = screen.getAllByRole('textbox', {name: 'Max length'});
        expect(maybeInput.length).toEqual(1);

        //bug in jsdom misses max length constraint violations, so hard-code validity check
        fireEvent.change(maybeInput[0], {target: {value: '1234567', checkValidity: () => false }});

        expect(maybeInput[0]).toBeInvalid();
        expect(maybeInput[0]).toHaveAttribute('aria-invalid', 'true');
        expect(maybeInput[0].parentElement).toHaveClass('Mui-error');
        expect(maybeInput[0].parentElement.previousElementSibling).toHaveClass('Mui-error');
    });

    describe.each([
        ['Number', '1', 'notANumber', 'spinbutton'],
      ])('.when aria-invalid for %s spinbutton', (accessibleName, changeValue1, changeValue2, ariaRole) => {
        it('should prevent invalid input', () => {
            render(<Form />);

            const maybeInput = screen.getAllByRole(ariaRole, {name: accessibleName});

            fireEvent.change(maybeInput[0], {target: {value: changeValue1}});
            expect(maybeInput[0].value).toBe(changeValue1);
            fireEvent.change(maybeInput[0], {target: {value: changeValue2}});

            expect(maybeInput[0].value).toBe('');
            expect(maybeInput[0].value).not.toBe(changeValue2);
            expect(maybeInput[0]).toBeValid();
            expect(maybeInput[0]).toHaveAttribute('aria-invalid', 'false');
        });
    });

    it('should do complicated, custom constraint validation rule - fail - email', () => {
        render(<Form />);
        
        const emailInput = screen.getByRole('textbox', {name: 'Email'});
        const requirednput = screen.getByRole('textbox', {name: 'Required'});
        const customInput = screen.getByRole('textbox', {name: 'Custom'});
        fireEvent.change(requirednput, {target: {value: 'something'}});
        fireEvent.change(emailInput, {target: {value: 'yes@example.com'}});
        fireEvent.change(customInput, {target: {value: 'count to 100, come and count with me'}});

        expect(customInput).toBeInvalid();
        expect(customInput.parentElement).toHaveClass('Mui-error');
        expect(customInput.parentElement.previousElementSibling).toHaveClass('Mui-error');
        expect(screen.getByText('It\'s all very complicated "value" contains a conflict between optional exclusive peers [example-email, example-url, example-custom]')).toBeDefined();
    });

    it('should not attempt submit if anything on form invalid', () => {
        const spySubmit = jest.fn();
        render(<Form onSubmitHandler={spySubmit}/>);

        const buttonSubmit = screen.getByRole('button', {name: 'do native validation'});
        fireEvent.submit(buttonSubmit, {target: { checkValidity: () => false }});
        
        expect(spySubmit).toHaveBeenCalledTimes(0);
    });

    it('should do complicated, custom constraint validation rule - fail - url', () => {
        render(<Form />);
        
        const urlInput = screen.getByRole('textbox', {name: 'URL'});
        const requirednput = screen.getByRole('textbox', {name: 'Required'});
        const customInput = screen.getByRole('textbox', {name: 'Custom'});
        fireEvent.change(requirednput, {target: {value: 'something'}});
        fireEvent.change(urlInput, {target: {value: 'https://www.example.com'}});
        fireEvent.change(customInput, {target: {value: 'count to 100, come and count with me'}});

        expect(customInput).toBeInvalid();
        expect(customInput.parentElement).toHaveClass('Mui-error');
        expect(customInput.parentElement.previousElementSibling).toHaveClass('Mui-error');
        expect(screen.getByText('It\'s all very complicated "value" contains a conflict between optional exclusive peers [example-email, example-url, example-custom]')).toBeDefined();
    });

    describe.each([
        ['Custom', 'Email', 'URL', 'anything', 'me@example.com'],
        ['Email', 'URL', 'Custom', 'me@example.com', 'http://example.com'],
        ['URL', 'Custom', 'Email', 'http://example.com', 'anything'],
      ])('.when any constraint peers of %s invalid', (peerPrimary, peerWithUserInput, peerWithoutUserInput, firstContent, secondContent) => {
        it('should use styles to communicate multi-input constraint violations', () => {
            render(<Form />);
        
            const requirednput = screen.getByRole('textbox', {name: 'Required'});
            const givenInputPeerFirst = screen.getByRole('textbox', {name: peerPrimary});
            const givenInputPeerSecond = screen.getByRole('textbox', {name: peerWithUserInput});
            const givenInputPeerThird = screen.getByRole('textbox', {name: peerWithoutUserInput});
            fireEvent.change(requirednput, {target: {value: 'something'}});
            fireEvent.change(givenInputPeerFirst, {target: {value: 'anything'}});
            fireEvent.change(givenInputPeerSecond, {target: {value: 'anything constraint peer'}});

            const constraintPeers = [givenInputPeerFirst, givenInputPeerSecond, givenInputPeerThird];
    
            constraintPeers.forEach(peer => {
                expect(peer).toBeInvalid();
                expect(peer.parentElement).toHaveClass('Mui-error');
                expect(peer.parentElement.previousElementSibling).toHaveClass('Mui-error');
            });
        });

        it('should remove styles used to communicate multi-input constraint violations from all peers', () => {
            render(<Form />);
        
            const requirednput = screen.getByRole('textbox', {name: 'Required'});
            const givenInputPeerFirst = screen.getByRole('textbox', {name: peerPrimary});
            const givenInputPeerSecond = screen.getByRole('textbox', {name: peerWithUserInput});
            const givenInputPeerThird = screen.getByRole('textbox', {name: peerWithoutUserInput});
            fireEvent.change(requirednput, {target: {value: 'something'}});
            fireEvent.change(givenInputPeerFirst, {target: {value: firstContent}});
            fireEvent.change(givenInputPeerSecond, {target: {value: secondContent}});

            const constraintPeers = [givenInputPeerFirst, givenInputPeerSecond, givenInputPeerThird];

            constraintPeers.forEach(peer => {
                expect(peer).toBeInvalid();
                expect(peer.parentElement).toHaveClass('Mui-error');
                expect(peer.parentElement.previousElementSibling).toHaveClass('Mui-error');
            });

            fireEvent.change(givenInputPeerFirst, {target: {value: ''}});

            constraintPeers.forEach(peer => {
                expect(peer).toBeValid();
                expect(peer.parentElement).not.toHaveClass('Mui-error');
                expect(peer.parentElement.previousElementSibling).not.toHaveClass('Mui-error');
            }); 
        });
    });

    it('should clear custom constraint validation error when corrected', () => {
        render(<Form />);
        
        const urlInput = screen.getByRole('textbox', {name: 'URL'});
        const requirednput = screen.getByRole('textbox', {name: 'Required'});
        const customInput = screen.getByRole('textbox', {name: 'Custom'});
        fireEvent.change(requirednput, {target: {value: 'something'}});
        fireEvent.change(urlInput, {target: {value: 'https://www.example.com'}});
        fireEvent.change(customInput, {target: {value: 'c'}});

        expect(customInput).toBeInvalid();

        fireEvent.change(customInput, {target: {value: ''}});
        expect(customInput).toBeValid();
    });

    it('should do complicated, custom constraint validation rule - pass', () => {
        const spySubmit = jest.fn();
        render(<Form onSubmitHandler={spySubmit}/>);
        
        const requirednput = screen.getByRole('textbox', {name: 'Required'});
        const customInput = screen.getByRole('textbox', {name: 'Custom'});
        fireEvent.change(requirednput, {target: {value: 'something'}});
        fireEvent.change(customInput, {target: {value: 'count to 100, come and count with me'}});

        expect(customInput).toBeValid();

        const buttonSubmit = screen.getByRole('button', {name: 'do native validation'});
        fireEvent.submit(buttonSubmit);
        expect(spySubmit).toHaveBeenCalledTimes(1);
    });

    it('should always assgin TextField an id for accessibility', () => {
        render(<Form />);

        const maybeAccessibleInputs = screen.getAllByRole('textbox');

        maybeAccessibleInputs.forEach((i) => {
            expect(i.id).toBeDefined();
        })
    });
});