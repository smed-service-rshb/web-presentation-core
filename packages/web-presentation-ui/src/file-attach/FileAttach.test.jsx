import React from 'react';

import TestHelper from '@efr/medservice-react-test'
import FileAttach from './index';
import FileDownload from "../file-download/FileDownload";
import FileUpload from "../file-upload/FileUpload";

const name = "name";
const file = {};

describe('FilesAttachment', () => {
    describe('Test render', () => {
        test('Check the FileAttach was rendered  => Control is render withOut file', () => {
            const fileAttach = TestHelper.render(<FileAttach
                dataId="fileAttachWithOutFile"
            />);

            expect(fileAttach.hasClass('file-attach-wrapper')).toEqual(true);
            expect(fileAttach.find('.span-wrapper')).not.toBePresent();
            expect(fileAttach.find(`.input-display-true`)).toBePresent();
            expect(fileAttach.find(`.input-display-false`)).not.toBePresent();

            expect(fileAttach.find(FileUpload)).toBePresent();
            expect(fileAttach.find(FileDownload)).not.toBePresent();
        });
        test('Check the FileAttach was rendered  => Control is render with file', () => {
            const fileAttach = TestHelper.render(<FileAttach
                file={file}
                name={name}
                action={name}
                dataId="fileAttachWithFile"
            />);

            expect(fileAttach.hasClass('file-attach-wrapper')).toEqual(true);
            expect(fileAttach.find('.span-wrapper')).toBePresent();
            expect(fileAttach.find(`.input-display-true`)).not.toBePresent();
            expect(fileAttach.find(`.input-display-false`)).toBePresent();

            expect(fileAttach.find(FileUpload)).toBePresent();
            expect(fileAttach.find(FileDownload)).toBePresent();
        });
        test('Check the FileAttach was rendered  => Control is render with file and editable and removable', () => {
            const fileAttach = TestHelper.render(<FileAttach
                file={file}
                name={name}
                action={name}
                dataId="fileAttachWithFile"
                editable
                removable
            />);

            expect(fileAttach.find('.span-wrapper')).toBePresent();
            expect(fileAttach.find('.span-edit')).toBePresent();
            expect(fileAttach.find('.span-reset')).toBePresent();
        });
        test('Check the FileAttach was rendered  => Control is render with file and notEditable and notRemovable', () => {
            const fileAttach = TestHelper.render(<FileAttach
                file={file}
                name={name}
                action={name}
                dataId="fileAttachWithFile"
                editable={false}
                removable={false}
            />);

            expect(fileAttach.find('.span-wrapper')).toBePresent();
            expect(fileAttach.find('.span-edit')).not.toBePresent();
            expect(fileAttach.find('.span-reset')).not.toBePresent();
        });
        test('Check the FileAttach was rendered  => Control is render with file and notEditable and notRemovable', () => {
            const onChange = jest.fn();
            const fileAttach = TestHelper.render(<FileAttach
                file={file}
                name={name}
                action={name}
                onFileChange={onChange}
                dataId="fileAttachWithFile"
                removable
            />);

            fileAttach.find('.span-reset').simulate('click');
            expect(onChange).toBeCalled();
        });
    });
});