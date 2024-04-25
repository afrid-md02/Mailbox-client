import { render, screen } from '@testing-library/react';
import SignUpPage from './sign-up-page';

describe('Testing sign up page', () =>{
    test('finding signup page heading', () => {
        render(<SignUpPage/>);
        const linkElement = screen.getByText(/sign up/i);
        expect(linkElement).toBeInTheDocument();
    });

    test('testing text in submit button', () => {
        render(<SignUpPage/>);
        const linkElement = screen.getByText(/create new account/i);
        expect(linkElement).toBeInTheDocument();
    });
})

