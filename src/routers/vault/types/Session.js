const uuidv4 = require("uuid/v4");

/**
 * holds a cache of all the user data fetched from SQL
 */
module.exports = class Session {
    /** expiry Date */
    expires = new Date();
    /** Vault account id */
    vault = null;
    /** whether the user logged in */
    authenticated = false;
    /** the identity that was used to log in */
    identity = null;
    /** the email address of the identity that was used to log in */
    email;
    /** the secret that is sent after authentication */
    secret;
    /** cache holding all identities */
    identities = [];
    /** the main identity of the account */
    primaryIdentity = null;
    /** whether to allow logging in with a non-primary ident */
    allowNonPrimary = true;
    /** LegacyAccount[] cache holding all legacy game accounts */
    legacyAccounts = [];
    /** EvolAccount[] cache holding all evol game accounts */
    gameAccounts = [];
    /** ip that was used to init the session */
    ip;
    /** refuse to authenticate a session with a different IP */
    strictIPCheck = true;

    constructor (ip, email) {
        this.ip = ip;
        this.email = email.toLowerCase();
        this.secret = uuidv4();
    }

    /**
     * serialize for sending over the network
     * @param {*} key
     */
    toJSON (key) {
        return {
            expires: this.expires,
            identity: this.identity,
        }
    }
}
