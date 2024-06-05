// auth.ts
import { UserManager } from "oidc-client"
import axios from "axios"

const VITE_OIDC_BASE_URL = import.meta.env.VITE_OIDC_BASE_URL
const VITE_OIDC_REDIRECT_LOGIN = import.meta.env.VITE_OIDC_REDIRECT_LOGIN
const VITE_OIDC_REDIRECT_LOGOUT = import.meta.env.VITE_OIDC_REDIRECT_LOGOUT
const VITE_OIDC_SCOPE = import.meta.env.VITE_OIDC_SCOPE
const VITE_OIDC_CLIENT_SECRET = import.meta.env.VITE_OIDC_CLIENT_SECRET

const oidcSettings = {
	authority: `${VITE_OIDC_BASE_URL}/realms/TMD_PORTAL/protocol/openid-connect/token`,
	client_id: `oms-fulfilment`,
	redirect_uri: `${VITE_OIDC_REDIRECT_LOGIN}`,
	client_secret: `${VITE_OIDC_CLIENT_SECRET}`,
	response_type: "code",
	scope: `${VITE_OIDC_SCOPE}`,
	post_logout_redirect_uri: `${VITE_OIDC_REDIRECT_LOGOUT}`,
	// Add the specific endpoints for your Identity Server
	metadata: await getMetadata(),
}

const userManager = new UserManager(oidcSettings);

const signinRedirect = () => userManager.signinRedirect();
const signoutRedirect = () => userManager.signoutRedirect();

function getMetadata() {
  return axios.get(
    "https://sso.clicksbiz.com/realms/SCGJWD-Portal/.well-known/openid-configuration"
  )
    .then(response => {
      // Store the response in localStorage
      localStorage.setItem('metadata', JSON.stringify(response.data));
      return response.data;
    })
    .catch(error => {
      console.error('Error fetching metadata:', error);
      throw error;
    });
}
export { userManager, signinRedirect, signoutRedirect }
