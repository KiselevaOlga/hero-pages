import React from 'react';
import { act, render, screen } from '@testing-library/react';
import App from './App';
import { MemoryRouter } from 'react-router-dom';

test('renders login page', () => {
    // Render app
    render(
      <MemoryRouter initialEntries={['/heroes']}>
        <App />
      </MemoryRouter>,
    );
    // find text for login page
    const text = screen.getByText(/Hello There!/i)  
    // Check that redirect path is working and instead of heroes page it shows login page
    expect(text).toBeInTheDocument();
});
