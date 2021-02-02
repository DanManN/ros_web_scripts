#!/usr/bin/env python

import os
import ssl
import sys
import socketserver
import http.server as httpserver

ADDRESS = sys.argv[1] if len(sys.argv) > 1 else 'localhost'
PORT = int(sys.argv[2]) if len(sys.argv) > 2 else 4443

httpd = socketserver.TCPServer((ADDRESS, PORT), httpserver.SimpleHTTPRequestHandler)
httpd.socket = ssl.wrap_socket(httpd.socket, certfile='signed_cert.pem', server_side=True)

print(f"Serving HTTPS on {ADDRESS} port {PORT} (https://{ADDRESS}:{PORT}/)")
httpd.serve_forever()
