import { query as q, Client as Fauna } from 'faunadb';

const FaunaClient = new Fauna({
  secret: FAUNA_KEY,
  fetch: (input, init) => {
    if (init.signal) {
      delete init.signal;
    }
    return fetch(input, init);
  },
});

export async function processUrl(id) {
  const res = await FaunaClient.query(q.Get(q.Ref(q.Collection('urls'), id)));
	return res.data.url.url;
}

export async function createUrl(url) {
  return await FaunaClient.query(
    q.Select(
      ['ref', 'id'],
      q.Create(q.Collection('urls'), {
        data: {
          url,
        },
      })
    )
  );
}
