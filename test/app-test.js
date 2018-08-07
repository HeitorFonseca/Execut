const app = require('../app')

console.log('APP TEST')

describe('GET /', function(){

	it('should render plain text', function(){
		request(app)
			.get('/api/authentication/login')
			.end((err, res) => {
				console.log("status:", res.status);
				expect(err).to.be.null;
				expect(res).to.have.status(200);
				done()
			});
	});
});