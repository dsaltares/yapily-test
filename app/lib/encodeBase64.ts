const encodeBase64 = (data: string) => Buffer.from(data).toString('base64');

export default encodeBase64;
