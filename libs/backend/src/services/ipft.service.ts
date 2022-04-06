import fetch from 'node-fetch';

export class IpfsService {

  async get<T>(uri: string): Promise<T> {
    const url = this.uriToHttps(uri);
    if (!url) return null;
    const response = await fetch(this.uriToHttps(uri));
    return await response.json() as T;
  }

  private uriToHttps = (uri: string): string | undefined => {
    const protocol = uri.split(":")[0].toLowerCase();
    switch (protocol) {
      case "https":
        return uri;
      case "http":
        return "https" + uri.substring(4), uri;
      case "ipfs": {
        const hash = uri.replace("ipfs/", "").match(/^ipfs:(\/\/)?(.*)$/i)?.[2];
        return `https://ipfs.io/ipfs/${hash}/`;
      }
      case "ipns": {
        const name = uri.match(/^ipns:(\/\/)?(.*)$/i)?.[2];
        return `https://ipfs.io/ipns/${name}/`;
      }
      default:
        return undefined;
    }
  };
}

const ipfs = new IpfsService();
export { ipfs };
