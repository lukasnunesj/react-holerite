import { calcTotalHoras } from "../utils";

describe('calcTotalHoras', () => {

  // correctly sums multiple time strings in "HH:MM" format
  it('should correctly sum multiple time strings in "HH:MM" format', () => {
    const input = ["01:30", "02:45", "00:50"];
    const result = calcTotalHoras(input);
    expect(result).toBe("05:05");
  });

  // handles empty array input
  it('should return "0:00" when input is an empty array', () => {
    const input = [];
    const result = calcTotalHoras(input);
    expect(result).toBe("00:00");
  });
});
