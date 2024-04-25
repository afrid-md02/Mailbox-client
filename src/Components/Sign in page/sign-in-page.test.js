import { screen, render } from "@testing-library/react";
import SignInPage from "./sign-in-page";
import SignUpPage from "../Sign up page/sign-up-page";
import { userEvent } from "@testing-library/user-event";
import { shallow } from "enzyme";

describe("render signin page", () => {
  test("Test sign in heading", () => {
    //Arrage
    render(<SignInPage />);

    //Act
    //Nothing...

    //Assert
    const element = screen.getByText("sign in", { exact: false });
    expect(element).toBeInTheDocument();
  });

  it("Test the page is swithcing on click", () => {
    //Arrage
    // render(<SignInPage />);
    const mockCallBack = jest.fn();

    //Act
    //Nothing...
    const buttonElement = shallow((
      <button onClick={mockCallBack}>
        Don't have an account? Sign up
      </button>
    ));
    buttonElement.find('button').simulate('click');

    expect(mockCallBack).toEqual(render(<SignUpPage/>));

  });

  test("Test sign in heading", () => {
    //Arrage
    render(<SignInPage />);

    //Act
    //Nothing...
    const button = screen.queryAllByText('Log in')[1];
    userEvent.click(button);

    //Assert
    const element = screen.getByText("validating your details", { exact: false });
    expect(element).toBeInTheDocument();
  });
});
