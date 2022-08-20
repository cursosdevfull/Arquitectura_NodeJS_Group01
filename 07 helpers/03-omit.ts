interface InfoRequest {
  querystring: { [key: string]: string };
  params: { [key: string]: string };
  body: { [key: string]: string };
}

interface InfoRequestHttp {
  body: string;
}

type Info = Omit<InfoRequest, "body"> & InfoRequestHttp;

const requestInfo: Info = {
  querystring: { title: "The Lord of the Rings" },
  params: { id: "1" },
  body: "John",
};
