import { describe, it, expect, vi } from "vitest";
import { render, fireEvent } from "@testing-library/react";
import AlarmList from "..";

vi.doMock("@/components", async (importOriginal) => {
  const actual: any = await importOriginal();
  return {
    ...actual,
    Alarm: ({ close }: { close: () => void }) => (
      <div>
        Mock Alarm Component<button onClick={close}>Cancel</button>
      </div>
    ),
  };
});

describe("AlarmList component", () => {
  it("renders the list of alarms", () => {
    const alarms = [
      { time: 1717880566998, repeat: false, id: "somerandomuid" },
      { time: 1717880566888, repeat: true, id: "somerandomuid2" },
    ];

    const { getAllByText } = render(<AlarmList />);
    const alarmTexts = getAllByText((text) =>
      alarms.some((alarm) => text.includes("Everyday"))
    );

    expect(alarmTexts.length).toBe(1);
  });

  it("opens modal when 'Add alarm' button is clicked", () => {
    const { getByText, queryByText } = render(<AlarmList />);
    const addAlarmButton = getByText("Add alarm");

    fireEvent.click(addAlarmButton);
    const modalTitle = queryByText("Mock Alarm Component");

    expect(modalTitle).toBeInTheDocument();
  });

  it("closes modal when 'Cancel' button is clicked", () => {
    const { getByText, queryByText } = render(<AlarmList />);
    const addAlarmButton = getByText("Add alarm");

    fireEvent.click(addAlarmButton);
    const cancelButton = getByText("Cancel");

    fireEvent.click(cancelButton);
    const modalTitle = queryByText("Mock Alarm Component");

    expect(modalTitle).not.toBeInTheDocument();
  });
});
