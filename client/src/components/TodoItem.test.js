import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import TodoItem from './TodoItem';

describe('Todo Item component', () => {
    test('title are visible', () => {
        const title = 'Test item';

        render(<TodoItem title={title} />, { wrapper: MemoryRouter });

        const titleElement = screen.getByText(title);

        expect(titleElement).toBeInTheDocument();
    });
});