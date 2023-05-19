export type OIDCProvider = "google";

export interface OIDCOption {
  name: OIDCProvider;
  url: string;
}

export type OIDCResponse = OIDCOption[];

export interface AuthResponse {
  token: string;
  needs_username: boolean;
}
