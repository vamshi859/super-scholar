import server from "../index.js";
import chai from "chai";
import chaiHttp from "chai-http";

chai.should();
chai.use(chaiHttp);

describe("Project APIs", () => {
  describe("POST request to /boards", () => {
    it("It should POST a new project", () => {
      const body = {
        title: "Create a new project",
      };
      chai
        .request(server)
        .post("/boards")
        .send(body)
        .end((err, response) => {
          response.should.have.status(201);
          response.body.should.be.a("object");
          response.body.should.have.property("id").eq(response.body.id);
          response.body.should.have.property("stage").eq(1);
          response.body.should.have.property("title").a("string");
        });
    });

    it("It should have a title", () => {
      const body = {
        title: "",
      };
      chai
        .request(server)
        .post("/boards")
        .send(body)
        .end((err, response) => {
          response.should.have.status(400);
          response.body.should.have.property("stage").eq(1);
          response.body.should.have.eq("No requirements");
        });
    });
  });

  describe("PUT requests to boards/:id", () => {
    it("ID not exists in database", () => {
      const id = 1000;
      const body = {
        stage: 2,
      };
      chai
        .request(server)
        .put("/boards/" + id)
        .send(body)
        .end((err, response) => {
          response.should.have.status(400);
          response.body.should.be.a("string");
          response.body.should.be.eq("No requirements");
        });
    });

    it("Stage should be 1,2 or 3", () => {
      const id = 1;
      const stage = 4;
      const body = {
        stage,
      };
      if (stage === 1 || stage === 2 || stage === 3) {
        chai
          .request(server)
          .put("/boards/" + id)
          .send(body)
          .end((err, response) => {
            response.should.have.status(200);
            response.body.should.be.a("object");
            response.body.should.have.property("id").eq(response.body.id);
            response.body.should.have.property("stage").eq(stage);
            response.body.should.have.property("title").to.be.a("string");
          });
      } else {
        chai
          .request(server)
          .put("/boards/" + id)
          .send(body)
          .end((err, response) => {
            response.should.have.status(400);
            response.body.should.be.a("string");
            response.body.should.be.eq("No requirements");
          });
      }
    });
  });
});
