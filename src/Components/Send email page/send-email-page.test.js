import { screen, render } from "@testing-library/react";
import SendMail from "./send-email-page";


describe("render signin page", () => {
  test("Test 'To' label in form ", () => {
    //Arrage
    render(<SendMail />);

    //Act
    //Nothing...

    //Assert
    const element = screen.getByText("To : ", { exact: false });
    expect(element).toBeInTheDocument();
  });

  it("Testing 'Content : '", () => {
    //Arrage
    render(<SendMail />);

    //Act
    //Nothing...
    const element = screen.getByText("To : ", { exact: false });
    expect(element).toBeInTheDocument();
    
  });
});
