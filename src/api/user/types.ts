/*
{
	"id": i32,
	"username": String,
	"email": String,
	"oidc_provider": String, // non-api
	"oidc_subject": String, // non-api
	"oidc_access_token": String, // non-api
	"oidc_refresh_token": String, // non-api
	"admin": bool,
	"avatar_fetchable_id": i32?,
	"created_at": DateTime<UTC>,
}
 */

export interface User {
  id: number;
  username: string | null;
  email: string;
  admin: boolean;
  avatar_fetchable_id: number | null;
  avatar_url: string | null;
  created_at: string;
}
