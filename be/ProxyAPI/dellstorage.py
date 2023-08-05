import requests, urllib3
urllib3.disable_warnings()

class unity:
    def __init__(self, host, username, password):
        self.host = host
        self.cookieJar = requests.cookies.RequestsCookieJar()
        self.session = requests.Session()
        self.headers = {'Content-type': 'application/json', 'Accept': 'application/json', 'X-EMC-REST-CLIENT': 'true'}
        
        login_session_url = f'https://{self.host}/api/types/loginSessionInfo'
        response = self.session.get(login_session_url, verify=False, auth=(username, password), headers=self.headers, cookies=self.cookieJar)
        self.headers['EMC-CSRF-TOKEN'] = response.headers['EMC-CSRF-TOKEN']
    
    def call(self, method, path, payload={}, params={}):
        url = f'https://{self.host}' + path
        if method == 'GET':
            return self.session.get(url, verify=False, params=params ,headers=self.headers, cookies=self.cookieJar)
        elif method == 'POST':
            return self.session.post(url, verify=False, json=payload, headers=self.headers, cookies=self.cookieJar)
        elif method == 'PUT':
            return self.session.put(url, verify=False, json=payload, headers=self.headers, cookies=self.cookieJar)
        elif method == 'DELETE':
            return self.session.delete(url, verify=False, json=payload, headers=self.headers, cookies=self.cookieJar)
        else:
            return 'Error: The specified method is invalid!'

class powerscale:
    def __init__(self, host, username, password, port='8080'):
        self.session = requests.Session()
        self.cookieJar = requests.cookies.RequestsCookieJar()
        self.headers = {'Content-Type': 'application/json'}
        
        auth_payload = '{"username" : "' + username + '", "password" : "' + password +'", "services" : ["platform", "namespace"]}'
        
        get_session_url = f'https://{host}:{port}/session/1/session'
        get_platform_api_url = f'https://{host}:{port}/platform/latest'
        
        response = self.session.post(get_session_url, verify=False, data=auth_payload, headers=self.headers, cookies=self.cookieJar)

        self.headers['X-CSRF-Token'] = response.cookies["isicsrf"]
        self.headers['Cookie'] = f'isisessid={response.cookies["isisessid"]}'
        self.headers['Origin'] = f'https://{host}:{port}'

        response = self.session.get(get_platform_api_url, verify=False, data=auth_payload, headers=self.headers, cookies=self.cookieJar)

        latest = response.json()['latest']
        self.base_url = f'https://{host}:{port}'
        self.platform_url = f'/platform/{latest}'

    def call(self, method, path, payload={}, params={}):
        url = self.base_url + path if 'namespace' in path else self.base_url + self.platform_url + path

        if method == 'GET':
            return self.session.get(url, verify=False, params=params ,headers=self.headers, cookies=self.cookieJar)
        elif method == 'HEAD':
            return self.session.head(url, verify=False, params=params, headers=self.headers, cookies=self.cookieJar)
        elif method == 'POST':
            return self.session.post(url, verify=False, json=payload, headers=self.headers, cookies=self.cookieJar)
        elif method == 'PUT':
            return self.session.put(url, verify=False, json=payload, headers=self.headers, cookies=self.cookieJar)
        elif method == 'DELETE':
            return self.session.delete(url, verify=False, json=payload, headers=self.headers, cookies=self.cookieJar)
        else:
            return 'Error: The specified method is invalid!'
    
    def close(self):
        url = f'{self.base_url}/session/1/session'
        return self.session.delete(url, verify=False, headers=self.headers, cookies=self.cookieJar)

class ecs:
    def __init__(self, host, username, password, port='4443'):
        self.session = requests.Session()
        self.cookieJar = requests.cookies.RequestsCookieJar()
        self.headers = {'Content-Type': 'application/json'}

        self.base_url = f'https://{host}:{port}'
        login_url = self.base_url + '/login'
        
        response = self.session.get(login_url, verify=False, auth=(username, password), headers=self.headers, cookies=self.cookieJar)
        self.headers['X-SDS-AUTH-TOKEN'] = response.headers['X-SDS-AUTH-TOKEN']

    def call(self, method, path, payload={}, params={}):
        url = self.base_url + path
        if method == 'GET':
            return self.session.get(url, verify=False, params=params ,headers=self.headers, cookies=self.cookieJar)
        elif method == 'HEAD':
            return self.session.head(url, verify=False, params=params, headers=self.headers, cookies=self.cookieJar)
        elif method == 'POST':
            return self.session.post(url, verify=False, json=payload, headers=self.headers, cookies=self.cookieJar)
        elif method == 'PUT':
            return self.session.put(url, verify=False, json=payload, headers=self.headers, cookies=self.cookieJar)
        elif method == 'DELETE':
            return self.session.delete(url, verify=False, json=payload, headers=self.headers, cookies=self.cookieJar)
        else:
            return 'Error: The specified method is invalid!'