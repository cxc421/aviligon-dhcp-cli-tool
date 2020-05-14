import axios, { AxiosInstance } from "axios";
import { DhcpInfo } from "./interfaces";

export class Cgi {
  private httpInstance: AxiosInstance;
  constructor(baseURL: string, account: string, password: string) {
    this.httpInstance = axios.create({
      baseURL,
      headers: {
        Authorization: `Basic ${Buffer.from(`${account}:${password}`).toString(
          "base64"
        )}`,
      },
      timeout: 5000,
    });
  }

  async getDhcpInfo(): Promise<DhcpInfo> {
    const result = await this.httpInstance.get(
      "/cgi-bin/dhcp_server.cgi?R=dhcp_server_state%;dhcp_ip%;"
    );
    if (result.status !== 200) {
      throw new Error(`Connect DHCP server failed.`);
    }
    const [enable, ipStartFrom] = result.data.split("%;");
    return {
      ipStartFrom,
      status: parseInt(enable) === 1 ? "Enable" : "Disable",
    };
  }

  async setDhcpEnable(enable: boolean): Promise<boolean> {
    const result = await this.httpInstance.post(
      "/cgi-bin/dhcp_server.cgi",
      `W=dhcp_server_state=${enable ? 1 : 0}%;`
    );
    if (result.status !== 200) {
      throw new Error(`Connect DHCP server failed.`);
    }
    return result.data.split("\n")[0] === "OK";
  }
}
