import { render, screen, waitFor, fireEvent } from "@testing-library/react"
import { act } from "react-dom/test-utils";
import ReactDOM  from "react-dom/client";
import Register from "./Register";
import { MemoryRouter } from "react-router-dom";
import { createMemoryHistory } from 'history';

let container;

beforeEach(() => {
    container = document.createElement("div");
    document.body.appendChild(container);
});

afterEach(() => {
    document.body.removeChild(container);
    container = null;
})

test('Attempt to create account with different passwords', () => {
  act(() => {ReactDOM.createRoot(container).render(<MemoryRouter><Register /></MemoryRouter>);} );
   
    const username = screen.queryByTestId('username-input');
    const password = screen.queryByTestId('password-input');
    const password_confirm = screen.queryByTestId('password-confirm-input');

    fireEvent.change(username, { target: { value: 'testUser' } });
    fireEvent.change(password, { target: { value: 'password' } });
    fireEvent.change(password_confirm, { target: { value: 'password_different' } });

    waitFor(() => expect(screen.getByText('Warning! Passwords do not match!')).toBeInTheDocument());
});

test('Create new account with valid credentials', () => {
    act(() => {ReactDOM.createRoot(container).render(<MemoryRouter initialEntries={["/register"]}><Register /></MemoryRouter>);} );
    
    const history = createMemoryHistory({initialEntries: ['/Register']});
    const username = screen.queryByTestId('username-input');
    const password = screen.queryByTestId('password-input');
    const password_confirm = screen.queryByTestId('password-confirm-input');
    const submit_button = screen.queryByTestId('submit-button');

    fireEvent.change(username, { target: { value: 'testUser32' } });
    fireEvent.change(password, { target: { value: 'password' } });
    fireEvent.change(password_confirm, { target: { value: 'password' } });

    expect(history.location.pathname).toBe('/Register');
    
    act(() => {
        submit_button.dispatchEvent(new MouseEvent("click", { bubbles: true }));
    })
    waitFor(() => expect(history.location.pathname).toBe('/login'));

});
