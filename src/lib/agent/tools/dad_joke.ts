export const dadJoke = async ({}) => {
  const res = await fetch("https://icanhazdadjoke.com/", {
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json"
    }
  });

  const joke = ((await res.json()) as { joke: string }).joke;
  console.log("[tool_call: dad_joke]: ", joke);
  return joke;
};
