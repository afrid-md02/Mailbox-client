import { screen, render } from "@testing-library/react";
import Navbar from '../Navbar in home/navbar';
import LeftSpan from '../Home body left span/home-body-left-span';


describe("render home-page", () => {
  test("Test 'mail box client' text in navbar ", () => {
    //Arrage
    render(<Navbar/>);

    //Act
    //Nothing...

    //Assert
    const element = screen.getByText("mail box client", { exact: false });
    expect(element).toBeInTheDocument();
  });

  test("Testing 'signed in as :'", () => {
    //Arrage
    render(<Navbar />);

    //Act
    //Nothing...
    const element = screen.getByText("signed in as :", { exact: false });
    expect(element).toBeInTheDocument();
    
  });

  test("Testing 'inbox' text in left side of home page", () => {
    //Arrage
    render(<LeftSpan />);

    //Act
    //Nothing...
    const element = screen.getByText("inbox", { exact: false });
    expect(element).toBeInTheDocument();
    
  });

  test("Testing 'sent' text in left side of home page", () => {
    //Arrage
    render(<LeftSpan />);

    //Act
    //Nothing...
    const element = screen.getByText("sent", { exact: false });
    expect(element).toBeInTheDocument();
    
  });

  test("Testing 'deleted' text in left side of home page", () => {
    //Arrage
    render(<LeftSpan />);

    //Act
    //Nothing...
    const element = screen.getByText("deleted", { exact: false });
    expect(element).toBeInTheDocument();
    
  });
});
