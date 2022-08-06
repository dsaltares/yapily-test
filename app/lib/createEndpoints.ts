import type { NextApiHandler, NextApiRequest } from 'next';

const createEndpoints =
  (definitions: EndpointDefinition[]): NextApiHandler =>
  async (req, res) => {
    const method = (req.method?.toUpperCase() || 'GET') as Method;
    const endpoint = definitions.find(
      ({ method: endpointMethod }) => endpointMethod === method
    );
    if (!endpoint) {
      res.status(404).send({
        error: { message: 'Endpoint not found' },
      });
      return;
    }

    const result = await endpoint.handler(req);
    if (result.headers) {
      Object.entries(result.headers).forEach(([key, value]) =>
        res.setHeader(key, value)
      );
    }
    if (result.redirect) {
      res.redirect(result.status || 307, result.redirect);
    } else {
      res.status(result.status || 200).send(result.body);
    }
  };

export default createEndpoints;

export type EndpointDefinition = {
  method: Method;
  handler: (req: NextApiRequest) => Promise<EndpointResult>;
};

type EndpointResult = {
  status?: number;
  body?: unknown;
  redirect?: string;
  headers?: Record<string, string>;
};

type Method = 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH';
