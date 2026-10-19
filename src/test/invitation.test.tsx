import { cleanup, fireEvent, render, screen, waitFor } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import Index from "@/pages/Index";
import RsvpSection from "@/components/wedding/RsvpSection";
import PhotoAlbum from "@/components/wedding/PhotoAlbum";
import GiftSection from "@/components/wedding/GiftSection";
import en from "@/components/wedding/locales/en";
import id from "@/components/wedding/locales/id";

const { toastSuccess, toastError } = vi.hoisted(() => ({ toastSuccess: vi.fn(), toastError: vi.fn() }));
vi.mock("sonner", () => ({ toast: { error: toastError, success: toastSuccess } }));

beforeEach(() => {
  localStorage.clear();
  toastSuccess.mockReset();
  toastError.mockReset();
  vi.stubGlobal("IntersectionObserver", class {
    observe() {}
    unobserve() {}
    disconnect() {}
  });
});
afterEach(() => { cleanup(); vi.unstubAllGlobals(); });

function fillReply() {
  fireEvent.change(screen.getByLabelText(en.name), { target: { value: "  Wedding Guest  " } });
  fireEvent.change(screen.getByLabelText(en.email), { target: { value: "guest@example.com" } });
}

describe("original invitation polish", () => {
  it("keeps the original sections behind the opening and switches language without losing a draft", async () => {
    const view = render(<Index />);
    expect(screen.queryByRole("main")).not.toBeInTheDocument();
    fireEvent.click(screen.getByRole("button", { name: en.open }));
    await screen.findByRole("main");
    expect(document.querySelectorAll("main > section")).toHaveLength(13);
    fillReply();
    fireEvent.click(screen.getByRole("button", { name: "Bahasa Indonesia" }));
    expect(document.documentElement.lang).toBe("id");
    expect(screen.getByLabelText(id.name)).toHaveValue("  Wedding Guest  ");
    expect(screen.getByRole("heading", { name: id.groupTitle })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: id.send })).toBeInTheDocument();
    expect(localStorage.getItem("invitation-language")).toBe("id");
    view.unmount();
    render(<Index />);
    expect(screen.getByRole("button", { name: id.open })).toBeInTheDocument();
  });

  it("shows one wedding date and 24-hour event times", async () => {
    render(<Index />);
    fireEvent.click(screen.getByRole("button", { name: en.open }));
    await screen.findByRole("main");
    expect(screen.getAllByText("November 20, 2027").length).toBeGreaterThanOrEqual(2);
    expect(screen.getByText("10:00")).toBeInTheDocument();
    expect(screen.getByText("12:00")).toBeInTheDocument();
  });

  it("keeps RSVP answers but reports that sending is not connected yet", async () => {
    render(<RsvpSection />);
    fillReply();
    fireEvent.click(screen.getByRole("button", { name: en.send }));
    expect(await screen.findByRole("status")).toHaveTextContent(en.rsvpSoon);
    expect(screen.queryByLabelText(en.name)).not.toBeInTheDocument();
  });

  it("records a decline without a check-in ticket", async () => {
    render(<RsvpSection />);
    fillReply();
    fireEvent.click(screen.getByRole("button", { name: en.decline }));
    fireEvent.click(screen.getByRole("button", { name: en.send }));
    expect(await screen.findByRole("status")).toHaveTextContent(en.rsvpSoon);
  });

  it("rejects whitespace-only names and invalid email before showing the notice", async () => {
    render(<RsvpSection />);
    fillReply();
    fireEvent.change(screen.getByLabelText(en.name), { target: { value: "   " } });
    fireEvent.click(screen.getByRole("button", { name: en.send }));
    expect(await screen.findByRole("alert")).toHaveTextContent(en.rsvpInvalid);
    expect(screen.queryByRole("status")).not.toBeInTheDocument();
  });

  it("lets a guest pick the number of people", async () => {
    render(<RsvpSection />);
    fireEvent.click(screen.getByLabelText(en.guests));
    fireEvent.click(await screen.findByRole("option", { name: `3 ${en.people}` }));
    fillReply();
    fireEvent.click(screen.getByRole("button", { name: en.send }));
    expect(await screen.findByRole("status")).toHaveTextContent(en.rsvpSoon);
  });

  it("supports photo navigation and returns focus after closing, while placeholders stay non-interactive", async () => {
    render(<PhotoAlbum photos={[
      { src: "/first.jpg", caption: "First memory" },
      { src: "/placeholder.svg", caption: "Coming later" },
      { src: "/second.jpg", caption: "Second memory" },
    ]} />);
    const trigger = screen.getByRole("button", { name: `${en.photoOpen}: First memory` });
    expect(screen.getByRole("button", { name: `${en.photoOpen}: Coming later` })).toBeDisabled();
    fireEvent.click(trigger);
    expect(await screen.findByRole("dialog", { name: "First memory" })).toBeInTheDocument();
    fireEvent.click(screen.getByRole("button", { name: en.photoNext }));
    expect(screen.getByRole("dialog", { name: "Second memory" })).toBeInTheDocument();
    fireEvent.click(screen.getByRole("button", { name: en.photoClose }));
    await waitFor(() => expect(screen.queryByRole("dialog")).not.toBeInTheDocument());
    expect(trigger).toHaveFocus();
  });

  it("closes the gift dialog and reports an unconnected reservation", async () => {
    render(<GiftSection />);
    fireEvent.click(await screen.findByRole("button", { name: `${en.giftSend}: Honeymoon in Paris` }));
    fillReply();
    fireEvent.click(screen.getByRole("button", { name: en.giftConfirm }));
    await waitFor(() => expect(toastSuccess).toHaveBeenCalledWith(en.giftSoon));
    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
  });

  it("blocks a gift reservation with an empty email", async () => {
    render(<GiftSection />);
    fireEvent.click(await screen.findByRole("button", { name: `${en.giftSend}: Honeymoon in Paris` }));
    fireEvent.change(screen.getByLabelText(en.name), { target: { value: "Wedding Guest" } });
    fireEvent.click(screen.getByRole("button", { name: en.giftConfirm }));
    await waitFor(() => expect(toastError).toHaveBeenCalledWith(en.giftFields));
    expect(screen.getByRole("dialog")).toBeInTheDocument();
  });
});
