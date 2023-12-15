import React from 'react';

import TestHelper from '@efr/medservice-react-test'
import Textarea from './index';

const textareaId = "textarea1";

describe('Textarea', () => {
    describe('Test render', () => {
        test('Check default value ', () => {
            const itemValue = 'First summer day';
            const onChange= jest.fn();
            let textarea = TestHelper.render(<Textarea value={itemValue} onChange={onChange} dataId={textareaId}/>);

            expect(textarea.text()).toEqual(itemValue);
            expect((textarea.getDOMNode().tabIndex)).toEqual(0);
        });

        test('Check errors render ', () => {
            const onChange= jest.fn();
            let textarea = TestHelper.render(<Textarea error onChange={onChange} dataId={textareaId}/>);

            expect(textarea.hasClass('textarea-error')).toEqual(true);
        });

        test('Check tabIndex value ', () => {
            const onChange= jest.fn();
            const tabIndex = 2;
            let textarea = TestHelper.render(<Textarea tabIndex={tabIndex} onChange={onChange} dataId={textareaId}/>);

            expect(textarea.getDOMNode().tabIndex).toEqual(tabIndex);
        });

        test('Check control`s identifier', () => {
            const onChange= jest.fn();
            let textarea = TestHelper.render(<Textarea onChange={onChange} dataId={textareaId}/>);

            expect(textarea.find('.textarea').prop('data-id')).toEqual(textareaId);
        });

        test('Check control`s identifier', () => {
            const onChange= jest.fn();
            const controlWidth= "20%";
            let textarea = TestHelper.render(<Textarea onChange={onChange} dataId={textareaId}  width={controlWidth}/>);

            expect(textarea.getDOMNode().style.width).toEqual(controlWidth);
        });
    });

    describe('Test onChange', () => {
        test('When enabled Textarea => onChange fired', () => {
            const onChange = jest.fn();
            const newValue = 'New Value';
            let textarea = TestHelper.render(<Textarea  onChange={onChange} dataId={textareaId}/>);

            textarea.simulate('change', { target: { value: newValue } });
            expect(onChange).toHaveBeenCalledWith(newValue)
        });

        test('When Textarea is disabled => onChange not fired', () => {
            const onChange = jest.fn();
            const newValue = 'New Value';
            let textarea = TestHelper.render(<Textarea disabled={true} onChange={onChange} dataId={textareaId}/>);

            textarea.simulate('change', { target: { value: newValue } });
            expect(onChange).not.toBeCalled()
        });

    });

});