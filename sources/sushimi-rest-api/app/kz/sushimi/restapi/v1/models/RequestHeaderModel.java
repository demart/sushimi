package kz.sushimi.restapi.v1.models;

import play.mvc.Http;
import play.mvc.Http.Header;

public class RequestHeaderModel {

	private Http.Request request;
	
	private String xRealIp;
	private String xUri;
	private String xHost;
	private String xUserAgent;
	
	
	private String systemName;
	private String systemVersion;
	private String systemUniqueIdentifier;
	private String systemApplicationIdentifier;
	private String applicationVerison;
	
	// COMMON
	public static final String X_IP_KEY = "x-real-ip";
	public static final String X_URI_KEY = "x-uri";
	public static final String X_HOST_KEY = "x-host";
	public static final String USER_AGENT_KEY = "user-agent";
	
	// SUSHIMI
	public static final String SYSTEM_NAME_KEY = "sushimi-system-name";
	public static final String SYSTEM_VERSION_KEY = "sushimi-system-version";
	public static final String SYSTEM_UNIQUE_ID_KEY = "sushimi-system-unique-identifier";
	public static final String SYSTEM_APP_ID_KEY = "sushimi-system-application-identifier";
	public static final String APP_VERSION_KEY = "sushimi-app-version";

	public String getMessageForLogging() {
		return 	
				"Ip: " + this.xRealIp +
				" User-Agent: " + this.xUserAgent +
				" Host: " + this.xHost + 
				" Url: " + this.xUri + 
				" SystemName: " + this.systemName + 
				" SystemVersion: " + this.systemVersion + 
				" SystemUniqueIdentificator:" + this.systemUniqueIdentifier +
				" SystemApplicationIdentificator:" + this.systemApplicationIdentifier +
				" ApplicationVerison:" + this.applicationVerison;
	}
	
	public static RequestHeaderModel extractHeaders(Http.Request request) {
		RequestHeaderModel model = new RequestHeaderModel();
		model.request = request;
		model.parseRequestHeadersIntoModel();
		return model;
	}
	
	public void parseRequestHeadersIntoModel() {
		Header header = null;
		for (String headerKey : this.request.headers.keySet()) {	
			switch (headerKey) {
			case X_IP_KEY:
				header = request.headers.get(X_IP_KEY);
				if (header != null)
					this.xRealIp = header.value();
				break;
			case X_URI_KEY:
				header = request.headers.get(X_URI_KEY);
				if (header != null)
					this.xUri = header.value();
				break;
			case X_HOST_KEY:
				header = request.headers.get(X_HOST_KEY);
				if (header != null)
					this.xHost = header.value();
				break;
			case USER_AGENT_KEY:
				header = request.headers.get(USER_AGENT_KEY);
				if (header != null)
					this.xUserAgent = header.value();
				break;
				
			case SYSTEM_NAME_KEY:
				header = request.headers.get(SYSTEM_NAME_KEY);
				if (header != null)
					this.systemName = header.value();
				break;
			case SYSTEM_VERSION_KEY:
				header = request.headers.get(SYSTEM_VERSION_KEY);
				if (header != null)
					this.systemVersion = header.value();
				break;
			case SYSTEM_UNIQUE_ID_KEY:
				header = request.headers.get(SYSTEM_UNIQUE_ID_KEY);
				if (header != null)
					this.systemUniqueIdentifier = header.value();
				break;
			case SYSTEM_APP_ID_KEY:
				header = request.headers.get(SYSTEM_APP_ID_KEY);
				if (header != null)
					this.systemApplicationIdentifier = header.value();
				break;
			case APP_VERSION_KEY:
				header = request.headers.get(APP_VERSION_KEY);
				if (header != null)
					this.applicationVerison = header.value();
				break;
			default:
				break;
			}
		}
	}

	public Http.Request getRequest() {
		return request;
	}

	public String getxRealIp() {
		return xRealIp;
	}

	public String getxUri() {
		return xUri;
	}

	public String getxHost() {
		return xHost;
	}

	public String getxUserAgent() {
		return xUserAgent;
	}

	public String getSystemName() {
		return systemName;
	}

	public String getSystemVersion() {
		return systemVersion;
	}

	public String getSystemUniqueIdentifier() {
		return systemUniqueIdentifier;
	}

	public String getSystemApplicationIdentifier() {
		return systemApplicationIdentifier;
	}

	public String getApplicationVerison() {
		return applicationVerison;
	}
	
}
