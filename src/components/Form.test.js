import axios from "axios";
import { render, screen } from "@testing-library/react";
import Form from "./Form";

jest.mock("axios");

describe("Form component", () => {
  test("should render input field and search button", () => {
    render(<Form />);
    const input = screen.getByPlaceholderText("Search for any movie");
    const button = screen.getByText("Search");
    expect(input).toBeInTheDocument();
    expect(button).toBeInTheDocument();
  });

  test("should update the search state when input field value changes", () => {
    render(<Form />);
    const input = screen.getByPlaceholderText("Search for any movie");
    const inputValue = "test";
    input.value = inputValue;
    fireEvent.change(input);
    expect(input.value).toBe(inputValue);
  });

  test("should render movie cards when search button is clicked", async () => {
    const mockData = {
      data: {
        results: [
          { id: 1, title: "Movie 1" },
          { id: 2, title: "Movie 2" },
          { id: 3, title: "Movie 3" },
        ],
      },
    };
    axios.get.mockResolvedValue(mockData);
    render(<Form />);
    const input = screen.getByPlaceholderText("Search for any movie");
    const button = screen.getByText("Search");
    const result = await screen.findAllByTestId("card");
    expect(input).toBeInTheDocument();
    expect(button).toBeInTheDocument();
    expect(result).toHaveLength(mockData.data.results.length);
  });
});