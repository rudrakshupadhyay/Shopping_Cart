import { render, screen } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import {useOutletContext, MemoryRouter } from "react-router";
import userEvent from "@testing-library/user-event";
import Cart from "./pages/cart";
import Navbar from "./components/Navbar";
import Shop from "./pages/shop";
import getItem from "./services/data";

vi.mock("./services/data", () => ({ default: vi.fn() }));

vi.mock("react-router", async () => {
  const actual = await vi.importActual("react-router");

  return {
    ...actual,
    useOutletContext: vi.fn(),
  };
});

describe("Cart Page test", () => {
  it("renders empty cart message when cart is empty", () => {
    useOutletContext.mockReturnValue({
      itemsList: [],
      addToCart: vi.fn(),
      removeFromCart: vi.fn(),
      updateQuantity: vi.fn(),
    });
    render(<Cart />);

    expect(screen.getByText("The cart is empty")).toBeInTheDocument();
  });

  it("renders cart items when cart is not empty", () => {
    useOutletContext.mockReturnValue({
      itemsList: [
        {
          id: 1,
          title: "Product 1",
          price: 10,
          image: "/path/to/image1.jpg",
          quantity: 2,
        },
      ],
      addToCart: vi.fn(),
      removeFromCart: vi.fn(),
      updateQuantity: vi.fn(),
    });
    render(<Cart />);

    expect(screen.getByText("Product 1")).toBeInTheDocument();
    expect(screen.getByText("Quantity:")).toBeInTheDocument();
    expect(screen.getByText("2")).toBeInTheDocument();
    expect(screen.getByText("$20.00")).toBeInTheDocument();
  });
  it("button clicks call the appropriate functions", async () => {
    const removeFromCart = vi.fn();
    const updateQuantity = vi.fn();
    useOutletContext.mockReturnValue({
      itemsList: [
        {
          id: 1,
          title: "Product 1",
          price: 10,
          image: "/path/to/image1.jpg",
          quantity: 2,
        },
      ],
      addToCart: vi.fn(),
      removeFromCart,
      updateQuantity,
    });
    render(<Cart />);
    const user = userEvent.setup();
    await user.click(screen.getByRole("button", { name: "-" }));
    expect(updateQuantity).toHaveBeenCalledWith(1, 1);
    await user.click(screen.getByRole("button", { name: "+" }));
    expect(updateQuantity).toHaveBeenCalledWith(1, 3);
    await user.click(screen.getByRole("button", { name: "Remove" }));
    expect(removeFromCart).toHaveBeenCalledWith(1);
  });
});

describe("Navbar component test", () => {
  it("test the navbar showing the number of items in the cart", () => {
    render(
      <MemoryRouter>
        <Navbar numberCartItem={3} />
      </MemoryRouter>,
    );
    expect(screen.getByText("3")).toBeInTheDocument();
  });
});

describe("Shop page test", () => {
  it("renders products and handles add to cart", async () => {
    const addToCart = vi.fn();
    useOutletContext.mockReturnValue({
      itemsList: [],
      addToCart,
      removeFromCart: vi.fn(),
      updateQuantity: vi.fn(),
    });
    getItem.mockResolvedValue([
      {
        id: 1,
        title: "Product 1",
        description: "Description 1",
        price: 10,
        image: "/path/to/image1.jpg",
      },
    ]);
    render(<Shop />);
    const user = userEvent.setup();
    const button = await screen.findByRole("button", { name: "Add to Cart" });
    await user.click(button);
    expect(addToCart).toHaveBeenCalled();
  });
});
