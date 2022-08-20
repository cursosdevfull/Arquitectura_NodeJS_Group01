interface Req {
  querystring: { [key: string]: string };
  params: { [key: string]: string };
}

interface Req {
  body: { [key: string]: string };
}

const request: Req = {
  querystring: { title: "The Lord of the Rings" },
  params: { id: "1" },
  body: { name: "John" },
};
