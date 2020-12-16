const chai = require("chai");
const chaiHttp = require("chai-http");
const app = require("../app.js");

chai.should();
chai.use(chaiHttp);

describe("/POST register", () => {
    it("it should return 400", done => {
        chai
            .request(app)
            .post(`/register/`)
            .send({})
            .end((err, res) => {
                res.should.have.status(400);
                res.body.should.have
                    .property("error");
                done();
            });
    });
});
