export default async (URL, type) => {
  const bodyOptions = {
    method: "POST",
    body: JSON.stringify(type),
  };
  const res = await fetch(URL, bodyOptions);
  const data = await res.json();
  console.log(data);
  return data.data !== undefined ? data.data : [];
};
