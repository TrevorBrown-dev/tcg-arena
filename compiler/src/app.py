from flask import Flask, request, make_response


app = Flask(__name__)


@app.route('/', methods=['GET', 'POST'])
def root():
    if request.method == 'GET':
        resp = make_response(f"You said {request.args.get('test')}")
        resp.headers['Content-Type'] = 'text/plain'
        return resp


if __name__ == '__main__':
    app.debug = True
    app.run(host="0.0.0.0", port=6969, debug=True)
