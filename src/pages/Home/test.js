import React from 'react'
import ShallowRenderer from 'react-test-renderer/shallow'

import { Home } from './index'
import chats from '../../../_mocks/state-chats'

describe('Home', () => {
    it('Render', () => {
        const renderer = new ShallowRenderer();
        const store = {
            chats
        }
        const getChatsListSuccess = jest.fn();
        getChatsListSuccess.mockReturnValue();
        
        const addChatSuccess = jest.fn();
        addChatSuccess.mockReturnValue();

        const history = {
            push: jest.fn()
        }
        
        const result = renderer.render(<Home
            { ...store }
            history={ history }
            getChatsListSuccess={ getChatsListSuccess }
            addChatSuccess={ addChatSuccess }
        />)

        expect(result).toMatchSnapshot();
    });
});