import { calcTotalHoras, sanitizeCurrency } from "../utils";

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

  it('should carry minutes over into hours', () => {
    expect(calcTotalHoras(["00:45", "00:45", "00:30"])).toBe("02:00");
  });
});

describe('sanitizeCurrency', () => {
  it('should turn a masked BRL value into a decimal string for the API', () => {
    expect(sanitizeCurrency("1.234,56")).toBe("1234.56");
  });

  it('should handle values without thousands separator', () => {
    expect(sanitizeCurrency("98,70")).toBe("98.70");
  });
});
