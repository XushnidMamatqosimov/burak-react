type DividerProps = {
  width?: number | string;
  height?: number | string;
  bg?: string;
};

function getSize(value: number | string) {
  if (typeof value === "string" && /^\d+(\.\d+)?$/.test(value)) {
    return `${value}px`;
  }

  return value;
}

export default function Divider({
  width = "100%",
  height = 1,
  bg = "#d9d9d9",
}: DividerProps) {
  return (
    <div
      className="divider"
      style={{
        width: getSize(width),
        height: getSize(height),
        backgroundColor: bg,
        flexShrink: 0,
      }}
    />
  );
}