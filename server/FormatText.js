const FormatText = (text) => {
  return text
    .split(" ")
    .map((x) => {
      if (x.at(0) === "%" && x.at(-1) === "%") {
        return `\${${x.slice(1, -1)}}`;
      }

      return x;
    })
    .join(" ");
};

module.exports = FormatText;
