import React from 'react';

import TestHelper from '@efr/medservice-react-test'
import Avatar from './Avatar';

const image = './icon/avatar.png';

const dataId = 'dataId';

describe('Avatar', () => {
    describe('Test render', () => {
        test('Render component ', () => {
            let avatar = TestHelper.render(<Avatar dataId={dataId}/>);

            expect(avatar).toBePresent();
            expect(avatar.hasClass('avatar-size-big')).toEqual(true);
            expect(avatar.find('.avatar-empty')).toBePresent();
            expect(avatar.find('.avatar-button')).not.toBePresent();
            expect(avatar.find('img')).not.toBePresent();
        });
        test('Check control`s identifier', () => {
            let avatar = TestHelper.render(<Avatar dataId={dataId} editable/>);

            expect(avatar.find('.file-input').prop('data-id')).toEqual(dataId + '-download');
        });
        test('Control have editable attribute => Button will be render', () => {
            let avatar = TestHelper.render(<Avatar dataId={dataId} editable/>);

            expect(avatar.find('.avatar-button')).toBePresent();
            expect(avatar.find('.file-input')).toBePresent();
        });
        test('Control have gender attribute => Control have default image with gender type', () => {
            const genderType = "female";
            let avatar = TestHelper.render(<Avatar dataId={dataId} gender={genderType}/>);

            expect(avatar.find('.avatar-empty').hasClass(`avatar-empty-${genderType}`)).toEqual(true);
        });

        test('Control have editable attribute and icon => Control have edit button and haven`t remove button', () => {
            const avatar = TestHelper.render(<Avatar dataId={dataId} icon={image} editable/>);

            expect(avatar.find('.avatar-button-editable')).toBePresent();
            expect(avatar.find('.avatar-button-remove')).not.toBePresent();
        });
        test('Control have editable attribute, icon and remove attribute => Control have remove button', () => {
            const avatar = TestHelper.render(<Avatar dataId={dataId} icon={image} editable remove/>);

            expect(avatar.find('.avatar-button-remove')).toBePresent();
        });
        test('Control have editable attribute and have`t icon => Control have download button', () => {
            const avatar = TestHelper.render(<Avatar dataId={dataId} editable/>);

            expect(avatar.find('.avatar-button-download')).toBePresent();
            expect(avatar.find('.avatar-button-editable')).not.toBePresent();
            expect(avatar.find('.avatar-button-remove')).not.toBePresent();
        });
        test('Control have size attribute => Control render with selected size', () => {
            const size = "medium";
            let avatar = TestHelper.render(<Avatar dataId={dataId} size={size}/>);

            expect(avatar.hasClass(`avatar-size-${size}`)).toEqual(true);
        });
        test('Control have icon attribute => Control render with icon image', () => {
            let avatar = TestHelper.render(<Avatar icon={image} dataId={dataId} editable/>);

            expect(avatar.find('.avatar-user-image').getDOMNode().style.backgroundImage).toBeDefined();
        });
        test('Check tabIndex value ', () => {
            const tabIndex = 2;
            const avatar = TestHelper.render(<Avatar dataId={dataId} editable tabIndex={tabIndex}/>);

            expect(avatar.find('.avatar-button').getDOMNode().tabIndex).toEqual(tabIndex);
        });

    });
});